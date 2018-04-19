<template>
  <v-container text-xs-center class="bg">
    <app-header></app-header>
    <v-layout row wrap>
      <v-flex xs12>
        <!--<v-avatar :tile="false" :size="'128px'" class="grey lighten-4 ma-1">-->
          <!--<img class="bordered" src="../../assets/placeholder.jpg" alt="avatar">-->
        <!--</v-avatar>-->
        <h2 class="heading">Welcome</h2>
        <h5>Enter your credentials in the given fields.</h5>
      </v-flex>
      <!--form initialization-->
      <form @submit.prevent="onSignIn">
      <!--username-->
      <v-flex xs10 offset-xs1 class="mt-3">
        <v-text-field
          v-validate="'required|email'"
          :error="errors.has('email')"
          autocomplete="false"
          name="email"
          label="E-MAIL"
          class="form-control letter-small text-field"
          type="text"
          v-model="useremail"
        >
        </v-text-field>
      </v-flex>
      <!--password-->
      <v-flex xs10 offset-xs1 >
        <v-text-field
          v-validate="'required|min:6|max:12'"
          :error="errors.has('password')"
          autocomplete="false"
          name="password"
          label="PASSCODE"
          min="6"
          v-model="userpass"
          type="password"
        >
        </v-text-field>
      </v-flex>
      <!--submission-->
      <v-flex xs12>
        <v-btn color="amber" :disabled="!formIsValid" type="submit"> SUBMIT <v-icon right>send</v-icon></v-btn>
      </v-flex>
      <v-flex xs12>
        <v-btn small color="red" >Forgotten Pass</v-btn>
      </v-flex>
      <!--Registration -->
      <v-flex xs12 class="mt-2">
        <h5>Tap info button at top left of the screen for help</h5>
        <!--<img align-center src="../../assets/BAMSlogob.png"  />-->
      </v-flex>
      <!-- Sponsers Logos -->
      <v-flex xs12 class="pa-3">
        <img src="../../assets/bamslogo.png" class="pr-3" width="128" alt="BAMS">
        <img src="../../assets/logo.png" width="32" alt="Vue">
      </v-flex>
      <!--<v-flex xs12>-->
        <!--<v-btn small color="white" to="Registration">Registration</v-btn>-->
      <!--</v-flex>-->

      </form>
    </v-layout>
  </v-container>
</template>

<script>
//  importing Temps
import Header from '../Temp/Header.vue'

export default {
  data () {
    return {
      appTitle: 'LOGIN',
//      userInfo
      useremail: '',
      userpass: '',
    }
  },
  computed: {
    formIsValid(){
      return this.username !== '' && this.userpass !== ''
    },
  },
  created(){
    this.$store.dispatch('userSession');
  },
  methods:{
    onSignIn() {
      this.$store.dispatch('userSignIn', {email: this.useremail, password: this.userpass})
    }
  },
  components:{
      'app-header': Header
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  input {
    text-transform: lowercase;
  }
<<<<<<< HEAD
  h5 {
    font-weight: 100;
  }
  .bordered {
    border: 4px solid #eee;
  }
  .heading {
    font-weight: 100;
    font-size: 8vh;
  }
  /*.bg {*/
    /*!*font-family: 'Marvel', sans-serif;*!*/
    /*!*background: url("../static/img/bg/bg.jpg") left  fixed;*!*/
    /*background: #000428;  !* fallback for old browsers *!*/
    /*background-image: url("../../assets/BG.jpg"), -webkit-linear-gradient(to top, #4791e0, #2f0046);  !* Chrome 10-25, Safari 5.1-6 *!*/
    /*background-image: url("../../assets/BG.jpg"), linear-gradient(to top, #4791e0, #2f0046); !* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ *!*/
    /*background-repeat: repeat;*/
    /*-webkit-animation: slide 120s ease-in-out infinite;*/
  /*}*/
  @-webkit-keyframes slide {
    from { background-position: 0 0; }
    to { background-position: -75em 0; }
  }
  .bordered {
    border: 4px solid #eee;
  }
</style>
