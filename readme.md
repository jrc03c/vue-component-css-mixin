```js
Vue.component("foo", {
  template: `
    <div class="foo">
      Hello, world!
    </div>
  `,

  data() {
    return {
      cssRemovalDelay: 1500,

      css: `
        .foo {
          color: red;
        }
      `,
    }
  },
})
```
