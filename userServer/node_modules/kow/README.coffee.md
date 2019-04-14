KnockOut(JS) Widget
===================

An opinionated widget constructor for Browserify and CoffeeScript, using [KnockOutJS](http://knockoutjs.com/) and [teacup](http://goodeggs.github.io/teacup/)+[databind](https://github.com/shimaore/teacup-databind).

Usage
=====

In the main application:

```coffeescript
ko = require 'knockout'
{MyWidget,my_widget} = (require 'kow-my-widget') ko

# Later...
teacup = require 'teacup'
$('content').html = teacup.render ->
  my_widget 'foo'
# Provide default values for the fields.
values = new MyWidget 'bar'
ko.applyBindings foo: values

# Later...
field_value = values.observable_field()
```

In `kow-my-widget`:

```coffeescript
module.exports = (require 'kow') 'my-widget', ->

  ## The parameter of @data becomes MyWidget.
  ## @constructor and @model are synonims for @data
  ## You might also provide a CoffeeScript class instead of a function.
  @data (value) ->
    @observable_field = @ko.observable value

  @view ({$root,data}) ->
  ## the fields of the constructor are already injected in the data object
  ## the data object is available as {data}, {value} and {doc}

  @html ({div,input}) ->   # teacup+databind as parameter
    div '.layout', ->
      input '.name', -> bind: value: 'observable_field'
```

Widget creation
===============

The name provided is expected to be the HTML tag, it should be dash-separated: `my-widget`

    widget = (tag_name,f) ->

The class name is: `MyWidget`

      re = /(^.|-.)/gi
      class_name = tag_name.replace re, (x) -> (x.substr x.length-1).toUpperCase()

The Teacup tag name: `my_widget`

      re = /-/g
      widget_name = tag_name.replace re, '_'

The function provided to `widget` is called with a small DSL:

      ctx =
        tag_name: tag_name
        class_name: class_name
        widget_name: widget_name

      ctx._tag = (f) ->
        {tag} = teacup
        tag tag_name, params: "value:#{f},$root:$root"

- `data` is the constructor for the data model; ideally it should work with `ko.toJS`

      ctx.data = ctx.constructor = ctx.model = (data) ->
        ctx._data = data

- `view` is the view model (behavior); the root of `this` is already populated with copies of the content of the object set by `data`

      ctx.view = (view) ->
        ctx._view = view

- `html` is the content as a Teacup template; teacup+databind is provided as parameter

      ctx.html = (html) ->
        ctx._html = html

The widget module returns a function that must be called with the instance of Knockout

      (ko) ->

        init ko

        ctx.ko = ko
        f.call ctx, ko

If no `data` is provided the default behavior is to inject observables.
FIXME: Replace with ko.mapping?

        ctx._data ?= class DefaultData
          constructor: (value) ->
            if typeof value is 'object'
              for own k,v of value
                this[k] = ko.observable v
            else
              @value = ko.observable value

If no `view` is provided the default behavior is to do nothing.

        ctx._view ?= ->

If no `html` is provided the default behavior is to output a comment that it wasn't provided.

        ctx._html ?= -> "<!-- No html was provided in #{tag_name} -->"

        if ko.components.isRegistered tag_name
          console.log "Not registering #{tag_name} twice."
        else
          ko.components.register tag_name,
            viewModel: ({value,$root}) ->
              for own k,v of value
                this[k] = v
              ctx._view.call this, {value,$root,ko,data:value,doc:value}
            template: teacup: ctx._html

        res = {tag_name,widget_name,class_name}

and returns a new Teacup widget

        res[widget_name] = ctx._tag

and the data-model constructor

        res[class_name] = ctx._data
        res

Loaders for Knockout
====================

    init = (ko) ->
      return if ko.__kow_init
      ko.__kow_init = true

      loader =

This allows us to dynamically render Teacup template. This solves for example problems with non-unique names for radio-buttons across multiple renderings.

        loadTemplate: (name, config, next) ->
          if config.teacup?
            html = teacup.render config.teacup, teacup
            ko.components.defaultLoader.loadTemplate name, html, next
          else
            next null

      ###
        loadViewModel: (name, config, next) ->
          if config.special
            constructor = ->
              config.special.apply this, arguments
            ko.components.defaultLoader.loadViewModel name, constructor, next
      ###

      ko.components.loaders.unshift loader

    teacup = require 'teacup'
    teacup.use (require 'teacup-databind')()

    module.exports = widget
    module.exports.widget = widget
