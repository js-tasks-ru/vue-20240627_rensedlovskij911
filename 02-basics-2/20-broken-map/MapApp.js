import { defineComponent, ref, watch } from 'vue/dist/vue.esm-bundler.js'

export default defineComponent({
  name: 'MapApp',

  setup() {
    // Реактивные переменные для хранения координат метки
    let x = ref(0)
    let y = ref(0)

    /**
     * Обработчик клика по карте для установки координат метки
     * @param {MouseEvent} event
     */
    function handleClick(event) {
      x.value = event.offsetX
      y.value = event.offsetY
    }

    // // Следим за X и Y для установки нового положения
    // watch([x, y], ([newX, newY]) => {
    //   // Находим метку и изменяем её положение
    //   const map = document.querySelector('.pin')
    //   map.style.left = `${newX}px`
    //   map.style.top = `${newY}px`
    // })

    return {
      x,
      y,
      handleClick,
    }
  },

  template: `
    <div class="map" @click="handleClick">
      <img class="map-image" src="./map.png" alt="Map" draggable="false" />
      <span class="pin" :style="{ left: x + 'px', top: y + 'px'}">📍</span>
    </div>
  `,
})
