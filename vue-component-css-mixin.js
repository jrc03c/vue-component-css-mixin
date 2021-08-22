const dict = {}

VueComponentCSSMixin = {
  install: function (Vue, options) {
    Vue.mixin({
      beforeMount: async function () {
        const self = this
        const tagKey = self.$options.name + "-style-tag"
        const countKey = tagKey + "-count"

        if (self.css) {
          if (!dict.hasOwnProperty(countKey)) dict[countKey] = 0
          dict[countKey]++

          if (!dict.hasOwnProperty(tagKey)) {
            const styleTag = document.createElement("style")
            dict[tagKey] = styleTag
            styleTag.innerHTML = self.css
            document.head.appendChild(styleTag)
          }
        }
      },

      destroyed: function () {
        const self = this
        const tagKey = self.$options.name + "-style-tag"
        const countKey = tagKey + "-count"

        if (self.css) {
          dict[countKey]--

          if (dict[countKey] < 1) {
            setTimeout(() => {
              if (dict[countKey] > 0) return
              document.head.removeChild(dict[tagKey])
              delete dict[tagKey]
              delete dict[countKey]
            }, self.cssRemovalDelay || 0)
          }
        }
      },
    })
  },
}

if (typeof module !== "undefined") {
  module.exports = VueComponentCSSMixin
}

if (typeof window !== "undefined") {
  window.VueComponentCSSMixin = VueComponentCSSMixin
}
