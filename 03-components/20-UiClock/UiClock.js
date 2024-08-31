import { defineComponent, ref, onMounted, onUnmounted } from 'vue/dist/vue.esm-bundler.js'

export default defineComponent({
  name: 'UiClock',

  setup() {
    // timer - для устаноки интервала, чтоб потом чистить этот интервал
    const timer = ref(null)
    // ms - миллисекунды для далнейшего форматирования
    const ms = ref(Date.now())

    // Устанавливаем интервал на 1000 мс, чтобы изменялись секунды. Делаем это
    // при монтировании компонента
    onMounted(() => {
      timer.value = setInterval(() => {
        ms.value += 1000
      }, 1000)
    })

    // При размонтировании чистим интервал
    onUnmounted(() => {
      clearInterval(timer.value)
    })

    // Функция форматирования миллисекунд в нормальные "часы"
    function formatTime(msValue) {
      return new Date(msValue).toLocaleTimeString(navigator.language, { timeStyle: 'medium' })
    }

    return {
      ms,
      formatTime,
    }
  },

  template: `<div class="clock">{{ formatTime(ms) }}</div>`,
})
