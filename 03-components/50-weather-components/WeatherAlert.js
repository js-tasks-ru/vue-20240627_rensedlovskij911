import { defineComponent } from 'vue/dist/vue.esm-bundler.js'

export default defineComponent({
  name: 'WeatherAlert',

  //   Здесь отдельно вынес элементы для предупреждения
  template: `
    <div class="weather-alert">
        <span class="weather-alert__icon">⚠️</span>
        <span class="weather-alert__description">Королевская метеослужба короля Арагорна II: Предвещается наступление сильного шторма.</span>
    </div>
  `,
})
