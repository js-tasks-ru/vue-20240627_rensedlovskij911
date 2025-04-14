import { defineComponent } from 'vue/dist/vue.esm-bundler.js'
import WeatherCard from './WeatherCard'

export default defineComponent({
  name: 'WeatherCardList',
  // В список передаем массив с данными для карточек
  props: {
    weatherDataList: {
      type: Array,
      required: true,
    },
  },

  components: {
    WeatherCard,
  },
  //   Список карточек. Данные по каждому вынесены в отедльный компонент WeatherCard
  template: `
      <ul class="weather-list unstyled-list">
      <!-- Переопределил добавления класса через объект, а не через тернарный оператор-->
        <li v-for="weatherData in weatherDataList"
        class="weather-card" 
        :class="{'weather-card--night': !(weatherData.current.dt > weatherData.current.sunrise && weatherData.current.dt < weatherData.current.sunset)}"
        >
        <WeatherCard :weather-data="weatherData"/>
        </li>
      </ul>
    `,
})
