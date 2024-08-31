import { defineComponent } from 'vue/dist/vue.esm-bundler.js'
import { getWeatherData } from './weather.service.ts'
import WeatherCardList from './components/WeatherCardList.js'
import './WeatherApp.css'

export default defineComponent({
  name: 'WeatherApp',

  components: {
    WeatherCardList,
  },

  setup() {
    // Импорт объектов с данными
    const weatherDataList = getWeatherData()

    return {
      weatherDataList,
    }
  },
  // Главный компонент, в котором список карточек погоды
  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>
      <WeatherCardList :weather-data-list="weatherDataList" />
    </div>
  `,
})
