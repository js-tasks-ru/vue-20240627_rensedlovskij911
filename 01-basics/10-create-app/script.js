import { defineComponent, createApp } from 'vue/dist/vue.esm-bundler.js'

const App = defineComponent({
  name: 'App',
  setup() {
    // Определение функции для вычисления даты
    function todayDate() {
      return new Date().toLocaleDateString(navigator.language, { dateStyle: 'long' })
    }
    return {
      todayDate,
    }
  },
  // Шаблон, в котором вычисляется дата
  template: `
    <div>Сегодня {{todayDate()}}</div>
    `,
})

const app = createApp(App)

app.mount('#app')
