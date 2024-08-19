import { defineComponent, ref, computed } from 'vue/dist/vue.esm-bundler.js'

export default defineComponent({
  name: 'CalculatorApp',

  setup() {
    const first_value = ref(0)
    const second_value = ref(0)
    const operator = ref('sum')

    const answer = computed(() => {
      if (operator.value === 'sum') {
        return first_value.value + second_value.value
      } else if (operator.value === 'subtract') {
        return first_value.value - second_value.value
      } else if (operator.value === 'multiply') {
        return first_value.value * second_value.value
      } else if (operator.value === 'divide') {
        return first_value.value / second_value.value
      }
    })

    return {
      first_value,
      second_value,
      operator,
      answer,
    }
  },

  template: `
    <div class="calculator">
      <input type="number" aria-label="First operand" v-model="first_value"/>

      <div class="calculator__operators">
        <label><input type="radio" name="operator" :checked = "operator === 'sum'" value="sum" v-model="operator" />➕</label>
        <label><input type="radio" name="operator" value="subtract" v-model="operator"/>➖</label>
        <label><input type="radio" name="operator" value="multiply" v-model="operator"/>✖</label>
        <label><input type="radio" name="operator" value="divide" v-model="operator"/>➗</label>
      </div>

      <input type="number" aria-label="Second operand" v-model="second_value"/>

      <div>=</div>

      <output>{{ answer }}</output>
    </div>
  `,
})
