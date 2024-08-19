import { markRaw } from 'vue'
import { computed, defineComponent, ref } from 'vue/dist/vue.esm-bundler.js'

// Значения взяты из https://jsonplaceholder.typicode.com/comments
export const emails = [
  'Eliseo@gardner.biz',
  'Jayne_Kuhic@sydney.com',
  'Nikita@garfield.biz',
  'Lew@alysha.tv',
  'Hayden@althea.biz',
  'Presley.Mueller@myrl.com',
  'Dallas@ole.me',
  'Mallory_Kunze@marie.org',
  'Meghan_Littel@rene.us',
  'Carmen_Keeling@caroline.name',
  'Veronica_Goodwin@timmothy.net',
  'Oswald.Vandervort@leanne.org',
  'Kariane@jadyn.tv',
  'Nathan@solon.io',
  'Maynard.Hodkiewicz@roberta.com',
  'Christine@ayana.info',
  'Preston_Hudson@blaise.tv',
  'Vincenza_Klocko@albertha.name',
  'Madelynn.Gorczany@darion.biz',
  'Mariana_Orn@preston.org',
  'Noemie@marques.me',
  'Khalil@emile.co.uk',
  'Sophia@arianna.co.uk',
  'Jeffery@juwan.us',
  'Isaias_Kuhic@jarrett.net',
]

export default defineComponent({
  name: 'MarkedEmailsApp',

  setup() {
    const emails_list = ref(emails)
    const filter = ref('')
    const filtered_emails_list = computed(() => {
      return emails_list.value.map(item => {
        if (item.includes(filter.value) && filter.value !== '') {
          return { email: item, marked: true }
        } else {
          return { email: item, marked: false }
        }
      })
    })

    return {
      filter,
      filtered_emails_list,
    }
  },

  template: `
    <div>
      <div class="form-group">
        <input type="search" aria-label="Search" v-model="filter"/>
      </div>
      <ul aria-label="Emails" v-for="email in filtered_emails_list">
        <li :class="{'marked': email.marked}">
          {{ email.email }}
        </li>
      </ul>
    </div>
  `,
})
