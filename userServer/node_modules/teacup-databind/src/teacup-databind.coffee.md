    renderKnockout = (obj) ->
      result = []
      for name, value of obj
        result.push "#{name}: #{value}"
      result.join ', '

    module.exports = (options) ->
      (teacup) ->
        return if teacup.renderAttrWithoutKnockout?
        teacup.renderAttrWithoutKnockout = teacup.renderAttr
        teacup.renderAttr = (name,value) ->
          if name is 'bind' and typeof value is 'object'
            teacup.renderAttrWithoutKnockout 'data-bind', renderKnockout value
          else
            teacup.renderAttrWithoutKnockout name, value
