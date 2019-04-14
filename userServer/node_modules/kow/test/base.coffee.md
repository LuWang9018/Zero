    describe 'The module', ->
      it 'should compile', ->
        require '..'

      it 'should generate widget', ->
        widget = (require '..') 'foo', ->
          @data class Foo
            constructor: (@bar) ->
          @view ->
          @html ->
        assert widget?

    describe 'The widget', ->
      widget = (require '..') 'foo', ->
        @data class Foo
          constructor: (@bar) ->
        @view ->
        @html ({div}) ->
          div -> 'hello'

      it 'should create data', ->
        ko = require 'knockout'
        {Foo,foo} = widget ko
        assert Foo?
        assert foo?
        data = new Foo 42
        assert data?
        assert data.bar?
        assert data.bar is 42
        # ko.applyBindings data


    assert = require 'assert'
