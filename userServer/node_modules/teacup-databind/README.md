Teacup Knockout helper
----------------------

A [Knockout](http://knockoutjs.com) helper plugin for [Teacup](http://goodeggs.github.io/teacup/).

    teacup = require 'teacup'
    teacup_databind = require 'teacup-databind'
    teacup.use teacup_databind()

    console.log teacup.render ->
      {input} = teacup

      input '.stylish',
        bind:
          value: 'name'
          disable: 'hasNoName()'

    # Outputs <input class="stylish" data-bind="value: name, disable: hasNoName()" />
