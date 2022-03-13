import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { isMobile } from '@/utils/isSomthing'
import { 
  Input,
  Button,
  Row, 
  Col,
  List,
  Avatar,
  Card,
  Form
} from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';
import VueI18n from 'vue-i18n'
import messages from '@/utils/i18n'
import '@/style/index.less'

Vue.use(Input)
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(List)
Vue.use(List)
Vue.use(Avatar)
Vue.use(Card)
Vue.use(Form)
Vue.use(VueI18n)

Vue.prototype._deviceInfo = {
  isMobile: isMobile()
}
Vue.config.productionTip = false

const locale = 'zhCN'

const i18n = new VueI18n({
  locale,
  messages
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
