// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// importing Vuelidate
import VeeValidate from 'vee-validate'
// inporting vuetify
import Vuetify from 'Vuetify'
// importing Vue Resource
import VueResource from 'vue-resource'
// importing Firebase
import * as firebase from 'firebase'
// importing Routers
import VueRouter from'vue-router';
import { routes } from './routes';


// using Vuetify
Vue.use(Vuetify,{
  theme: {
    primary: '#00c1ff',
    secondary: '#b0bec5',
  }
});
console.log(Vuetify.version)
Vue.use(VeeValidate);
// using Vue Resource
Vue.use(VueResource);
// Setting HTTP
// using vue-router
Vue.use(VueRouter);

// using Image imageCompressor
// Vue.use(imageCompressor);
// Registring Routes
const router = new VueRouter({
  routes,
  mode: 'history'
});

// Adding Vuetify Css
import('../node_modules/vuetify/dist/vuetify.min.css');

Vue.config.productionTip = false;

// ENABLEING OFFLINE DATA

// Accesseing Storage
import { store } from './store/store'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created (){
    let config ={
      // ================================================
      // F  I  R  E  S  T  O  R  E
      // ================================================
      apiKey: "AIzaSyCKJGwsH2vCHTbBYAIa0kSdG3A_JjYdUzU",
      authDomain: "bams-vanilla.firebaseapp.com",
      databaseURL: "https://bams-vanilla.firebaseio.com",
      projectId: "bams-vanilla",
      storageBucket: "bams-vanilla.appspot.com",
      messagingSenderId: "572602321357"
      // ================================================
      // F  I  R  E  B  A  S  E
      // ================================================
      // apiKey: "AIzaSyD9xMA6OZnafkhfwmCP17VE-FtiDZ_KIGQ",
      // authDomain: "tasttrial.firebaseapp.com",
      // databaseURL: "https://tasttrial.firebaseio.com",
      // projectId: "tasttrial",
      // storageBucket: "tasttrial.appspot.com",
      // messagingSenderId: "328928648457"
    };
    firebase.initializeApp(config)
    const firestore = firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    firestore.settings(settings);
    firebase.firestore().enablePersistence()
      .catch(function(err) {
        if (err.code == 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
        } else if (err.code == 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
        }
      });
  }
})

// ====================
//  PUSH NOTIFICATION
// ====================
const messaging = firebase.messaging();
let topicName = 'Notify';
messaging.requestPermission().then(() => {
  console.log('Have Permission');
  return messaging.getToken()
})
  .then((token) => {
  if (token){

    let url = 'https://iid.googleapis.com/iid/v1/' + token + '/rel/topics/' + topicName;
    console.log(url)
    Vue.http.post(url,{},{
      headers: {'Authorization': 'key=AIzaSyDOUy35eMYN7woRgGdiRw0ypeShbHMDxgM'}
    })
  } else {
  }
})
  .catch((err) => {
  console.log(err)
})

messaging.onMessage((payload) => {
  let data = payload
  store.dispatch('onNotification', data);
})


// ===================
