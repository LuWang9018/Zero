    chai = require 'chai'
    chai.should()

    describe 'Databind', ->

      teacup = require 'teacup'
      teacup_databind = require '..'
      teacup.use teacup_databind()

      it 'should process other attributes', ->
        html = teacup.render ->
          {input} = teacup
          input name:'hello', value:'none'
        html.should.equal '<input name="hello" value="none" />'

      it 'should process `bind`', ->
        html = teacup.render ->
          {div} = teacup
          div bind: component: 'foo', -> 'hello'
        html.should.equal '<div data-bind="component: foo">hello</div>'

      it 'should process a mix of attributes', ->
        html = teacup.render ->
          {input} = teacup
          input name:'hello', bind: value:'helloValue'
        html.should.equal '<input name="hello" data-bind="value: helloValue" />'

      it 'should process `bind` with multiple values', ->
        html = teacup.render ->
          {div} = teacup
          div
            bind:
              component: 'foo'
              value: 'expect'
          , -> 'hello'
        html.should.equal '<div data-bind="component: foo, value: expect">hello</div>'

      it 'should still work if registered twice', ->
        teacup.use teacup_databind()
        html = teacup.render ->
          {input} = teacup
          input name:'hello', value:'none'
        html.should.equal '<input name="hello" value="none" />'
