import { defineComponent, computed, ref, onMounted, watch, watchEffect } from 'vue/dist/vue.esm-bundler.js'
import { getMeetup } from './meetupsService.ts'
import { isAwaitKeyword } from 'typescript'

export default defineComponent({
  name: 'SelectedMeetupApp',

  setup() {
    // Определено начальное состояние приложения, где при откртии выводится информация о 1 митапе
    const meetupIdValue = ref(1)
    const info = ref(null)

    // Реакция на смену ID митапа, получает данные для митапа
    watch(meetupIdValue, async () => {
      info.value = (await getMeetup(+meetupIdValue.value)).title
    })

    // При открытии приложения вывожу информацию о первом митапе
    onMounted(async () => {
      try {
        info.value = (await getMeetup(+meetupIdValue.value)).title
      } catch (error) {
        console.log(error)
      }
    })

    //  Логика работы кнопок
    function nextMeetup() {
      meetupIdValue.value++
    }

    function previousMeetup() {
      meetupIdValue.value--
    }

    return {
      meetupIdValue,
      info,
      nextMeetup,
      previousMeetup,
    }
  },

  template: `
    <div class="meetup-selector">
      <div class="meetup-selector__control">
        <button class="button button--secondary" type="button" @click="previousMeetup" :disabled="+meetupIdValue === 1">Предыдущий</button>

        <div class="radio-group" role="radiogroup">
          <div class="radio-group__button">
            <input
              id="meetup-id-1"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              value="1"
              v-model="meetupIdValue"
            />
            <label for="meetup-id-1" class="radio-group__label">1</label>
          </div>
          <div class="radio-group__button">
            <input
              id="meetup-id-2"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              value="2"
              v-model="meetupIdValue"
            />
            <label for="meetup-id-2" class="radio-group__label">2</label>
          </div>
          <div class="radio-group__button">
            <input
              id="meetup-id-3"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              value="3"
              v-model="meetupIdValue"
            />
            <label for="meetup-id-3" class="radio-group__label">3</label>
          </div>
          <div class="radio-group__button">
            <input
              id="meetup-id-4"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              value="4"
              v-model="meetupIdValue"
            />
            <label for="meetup-id-4" class="radio-group__label">4</label>
          </div>
          <div class="radio-group__button">
            <input
              id="meetup-id-5"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              value="5"
              v-model="meetupIdValue"
            />
            <label for="meetup-id-5" class="radio-group__label">5</label>
          </div>
        </div>

        <button class="button button--secondary" type="button" @click="nextMeetup" :disabled="+meetupIdValue === 5">Следующий</button>
      </div>

      <div class="meetup-selector__cover">
        <div class="meetup-cover">
          <h1 class="meetup-cover__title">{{ info }}</h1>
        </div>
      </div>

    </div>
  `,
})
