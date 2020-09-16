import Vue from 'vue'

import VueProgressBar from 'vue-progressbar'
import VueTailwindPicker from 'vue-tailwind-picker'
import VueSweetalert2 from 'vue-sweetalert2';

const options = {
  color: '#38b2ac',
  failedColor: '#874b4b',
  thickness: '5px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}

Vue.use(VueProgressBar, options)
Vue.use(VueTailwindPicker);
Vue.use(VueSweetalert2)
