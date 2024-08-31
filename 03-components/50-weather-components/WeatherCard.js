import { defineComponent } from 'vue/dist/vue.esm-bundler.js'
import { WeatherConditionIcons } from './weather.service'
import WeatherAlert from './WeatherAlert'

export default defineComponent({
  name: 'WeatherCard',

  components: {
    WeatherAlert,
  },

  //   Объект с данными для карточки
  props: {
    weatherData: {
      type: Object,
      required: true,
    },
  },

  setup() {
    function toMmHg(pressureInHpa) {
      return Math.round(pressureInHpa * 0.75)
    }

    return {
      WeatherConditionIcons,
      toMmHg,
    }
  },

  // Тут же используется компонент WeatherAlert
  template: `
        <WeatherAlert v-if="weatherData.alert"/>
        <div>
        <h2 class="weather-card__name">
            {{ weatherData.geographic_name }}
        </h2>
        <div class="weather-card__time">
            {{ weatherData.current.dt }}
        </div>
        </div>
        <div class="weather-conditions">
        <!-- -->
        <!-- Вот тут есть вопрос: уместно ли такие длинные конструкции выосить в отдельные функции, если длинная цепочка через . ? -->
        <div class="weather-conditions__icon" :title="weatherData.current.weather.description" >{{ WeatherConditionIcons[weatherData.current.weather.id] }}</div>
        <!-- Короткая функция внутри кода -->
        <div class="weather-conditions__temp">{{ (weatherData.current.temp - 273.15).toFixed(1) }} °C</div>
        </div>
        <div class="weather-details">
        <div class="weather-details__item">
            <div class="weather-details__item-label">Давление, мм рт. ст.</div>
            <div class="weather-details__item-value">{{ toMmHg(weatherData.current.pressure) }}</div>
        </div>
        <div class="weather-details__item">
            <div class="weather-details__item-label">Влажность, %</div>
            <div class="weather-details__item-value">{{ weatherData.current.humidity }}</div>
        </div>
        <div class="weather-details__item">
            <div class="weather-details__item-label">Облачность, %</div>
            <div class="weather-details__item-value">{{ weatherData.current.clouds }}</div>
        </div>
        <div class="weather-details__item">
            <div class="weather-details__item-label">Ветер, м/с</div>
            <div class="weather-details__item-value">{{ weatherData.current.wind_speed }}</div>
        </div>
        </div>
        `,
})
