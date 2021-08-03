const dict = {}

VueComponentCSSMixin = {
  install: function (Vue, options) {
    Vue.mixin({
      beforeMount: async function () {
        const self = this
        const tagKey = self.$options.name + "-style-tag"
        const countKey = tagKey + "-count"

        if (!dict.hasOwnProperty(countKey)) dict[countKey] = 0
        dict[countKey]++

        if (self.css && !dict.hasOwnProperty(tagKey)) {
          const styleTag = document.createElement("style")
          dict[tagKey] = styleTag
          styleTag.innerHTML = self.css
          document.head.appendChild(styleTag)
        }
      },

      destroyed: function () {
        const self = this
        const tagKey = self.$options.name + "-style-tag"
        const countKey = tagKey + "-count"

        dict[countKey]--

        if (dict[countKey] < 1) {
          document.head.removeChild(dict[tagKey])
          delete dict[tagKey]
          delete dict[countKey]
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
