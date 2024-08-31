import { defineComponent, computed } from 'vue/dist/vue.esm-bundler.js'
import { UiButton } from '@shgk/vue-course-ui'
import './UiCounter.css'

export default defineComponent({
  name: 'UiCounter',

  components: {
    UiButton,
  },

  props: {
    min: {
      type: Number,
      default: 0,
    },

    max: {
      type: Number,
      default: Infinity,
    },

    count: {
      type: Number,
      required: true,
      validator(value, props) {
        return value >= 0
      },
    },
  },

  emits: ['update:count'],

  setup(props, { emit }) {
    // Рекомендуется для практики реализовать обработку событий внутри setup, а не непосредственно в шаблоне
    const countValue = computed({
      get: () => props.count,
      set: value => emit('update:count', value),
    })

    const reachMin = computed(() => props.min === countValue.value)
    const reachMax = computed(() => props.max === countValue.value)

    function increment() {
      countValue.value++
    }

    function decrement() {
      countValue.value--
    }

    return {
      countValue,
      increment,
      decrement,
      reachMin,
      reachMax,
    }
  },

  template: `
    <div class="counter">
      <UiButton aria-label="Decrement" :disabled="reachMin" @click="decrement">➖</UiButton>
      <span class="count" data-testid="count">{{ countValue }}</span>
      <UiButton aria-label="Increment" :disabled="reachMax" @click="increment">➕</UiButton>
    </div>
  `,
})
