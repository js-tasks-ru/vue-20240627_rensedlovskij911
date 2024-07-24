import { defineComponent, computed } from 'vue/dist/vue.esm-bundler.js'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

export default defineComponent({
  name: 'WeatherApp',

  setup() {
    // Импорт объектов с данными
    const weatherDataList = getWeatherData()

    // Отдельная функция для перевода в мм. рт. ст.
    function toMmHg(pressureInHpa) {
      return Math.round(pressureInHpa * 0.75)
    }

    return {
      weatherDataList,
      WeatherConditionIcons,
      toMmHg,
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
      <!-- Переопределил добавления класса через объект, а не через тернарный оператор-->
        <li v-for="weatherData in weatherDataList"
          class="weather-card" 
          :class="{'weather-card--night': !(weatherData.current.dt > weatherData.current.sunrise && weatherData.current.dt < weatherData.current.sunset)}"
          >
          <div  v-if="weatherData.alert" class="weather-alert">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">Королевская метеослужба короля Арагорна II: Предвещается наступление сильного шторма.</span>
          </div>
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
        </li>
      </ul>
    </div>
  `,
})
