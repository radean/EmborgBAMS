<template>
  <v-layout row wrap>
    <v-flex xs12 sm8 offset-sm2 pb-5>
      <app-header></app-header>
      <app-storeDetail-Enum v-for="store in storeDetail" :key="store.id" :store="store"></app-storeDetail-Enum>
    </v-flex>
  </v-layout>
</template>

<script>
//  importing Components
import Header from '../Temp/Header.vue'
import storeDetailEnum from './Enums/StoreDataEnum.vue'
export default {
  data () {
    return {
      date: '265',
      drawer: false,
    }
  },
  computed: {
      storeDetail(){
          return this.$store.getters.storeDetail
      }
  },
  watch: {
    userInfo (value){
      if (value === null && value === undefined) {
          this.$router.push('Home');
        }
      }
    },
  components:{
      'app-header': Header,
      'app-storeDetail-Enum':storeDetailEnum
  },
  created(){
    if (this.$store.getters.user === null){
      this.$router.push('/')
    }
    this.$store.dispatch('fetchStoreDetails');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .alphaTrans {
    background: rgba(255,255,255,0.2);
  }

</style>
