<template>
  <v-container fill-height fluid class="mb-2">
    <v-layout row wrap>
      <v-flex xs12 text-xs-center >
        <div class="title ma-0 pa-0">PICTURE UPDATE </div>
      </v-flex>

      <form @submit.prevent="onSubmitDetails">
        <v-layout row wrap>
          <v-flex xs4 text-xs-center >
            <v-card ripple>
              <!--image-->
              <div style="height:0px;overflow:hidden">
              <input
                type="file"
                tabindex="100"
                id="storePicture"
                name="storePicture"
                accept="image/*"
                @change="onStorePicture"
              />
            </div>
              <v-card-media raised :src="storePic" height="64" v-on:click="chooseFile('storePicture')"></v-card-media>
            </v-card>
            <!--Title-->
              <h6 class="caption ma-2">STORE</h6>
          </v-flex>

          <v-flex xs4 text-xs-center fluid>
            <v-card ripple>
              <!--image--><!--image--><div style="height:0px;overflow:hidden">
              <input
                type="file"
                id="beforePicture"
                tabindex="101"
                name="beforePicture"
                accept="image/*"
                @change="onBeforePicture"
              />
            </div>
              <v-card-media raised :src="beforePicture" height="64" v-on:click="chooseFile('beforePicture')"></v-card-media>
            </v-card>
            <!--title-->
              <h6 class="caption ma-2">BEFORE</h6>
          </v-flex>
          <v-flex xs4 text-xs-center >
            <v-card ripple>
              <div style="height:0px;overflow:hidden">
              <input
                type="file"
                id="afterPicture"
                name="afterPicture"
                tabindex="102"
                accept="image/*"
                @change="onAfterPicture"
              />
            </div>
              <v-card-media raised :src="afterPicture" height="64" v-on:click="chooseFile('afterPicture')"></v-card-media>
            </v-card>
            <!--title-->
              <h6 class="caption ma-2">SHELF PICTURE</h6>
          </v-flex>
        </v-layout>

      <!--Basic Information-->
      <v-flex xs12 text-xs-center >
        <!--Timing of Submittion-->
        <v-flex xs12 text-xs-center >
          <div class="title ma-0 pa-0">{{ currentTime }}</div>
        </v-flex>
        <!--Heading of Content-->
        <v-flex xs12 text-xs-center >
          <div class="subheading">STOCK UPDATE</div>
          <div class="body-1">{{ appInfo.brandName }}</div>
        </v-flex>
        <h2 class="ma-3">Basic Information</h2>
        <v-layout row wrap class="alphaPanel">
          <!--Basic Information Fields-->
          <template v-for="field in basicInfoFields" >
            <v-flex xs5 text-xs-center class="ma-2 ">
              <v-text-field
                v-validate="'min_value:0|max_value:1000'"
                :error="errors.has(field.variable)"
                :class="stockData[field.variable] != null ? 'input-group--focused ' : 'transparent'"
                :hide-details="true"
                :name="field.title"
                :label='field.title'
                v-model='stockData[field.variable]'
                :tabindex="field.tabIndex"
                :type="field.type"
              ></v-text-field>
            </v-flex>
          </template>
        </v-layout>
          <!--Stock Fields-->
        <h2 class="ma-3">Stock Information</h2>
        <v-layout row wrap >
          <template v-for="field in stockFields" >
            <v-flex xs5 text-xs-center class="ma-2 ">
              <v-text-field
                v-validate="'min_value:0|max_value:1000'"
                :error="errors.has(field.variable)"
                :class="stockData[field.variable] != null ? 'input-group--focused ' : 'transparent'"
                :hide-details="true"
                :name="field.title"
                :label='field.title'
                v-model='stockData[field.variable]'
                :tabindex="field.tabIndex"
                :type="field.type"
              ></v-text-field>
            </v-flex>
          </template>
        </v-layout>
          <!--Other Fields-->
        <h2 class="ma-3">Other Information</h2>
        <v-layout row wrap class="alphaPanel">
          <template v-for="field in otherFields">
            <v-flex xs5 text-xs-center class="ma-2 ">
              <v-text-field
                v-validate="'min_value:0|max_value:1000'"
                :error="errors.has(field.variable)"
                :class="stockData[field.variable] != null ? 'input-group--focused ' : 'transparent'"
                :hide-details="true"
                :name="field.title"
                :label='field.title'
                v-model='stockData[field.variable]'
                :tabindex="field.tabIndex"
                :type="field.type"
              ></v-text-field>
            </v-flex>
          </template>
        </v-layout>
        </v-flex>

        <!--=====================================-->


        <!--Unlocker-->
        <!--<v-flex xs12 text-xs-center>-->
          <!--<v-btn raised color="purple" :disabled="!validAbsent" outline dark v-on:click="submitAbsent"> B.A Absent <v-icon right>send</v-icon></v-btn>-->
        <!--</v-flex>-->
        <v-flex xs12 text-xs-center>
          <v-radio-group v-model="stockData['area']" :mandatory="true">
              <v-radio tabindex="98" label="Nazimabad" value="Nazimabad" color="amber"></v-radio>
              <v-radio tabindex="99" label="Sharifabad" value="Sharifabad" color="amber"></v-radio>
          </v-radio-group>
        </v-flex>

        <v-flex xs12 text-xs-center class="mb-4 mt-4">
          <!--<v-btn raised large color="black" dark to="/storelist"><v-icon>chevron_left</v-icon> BACK </v-btn>-->
          <v-btn raised large color="green" :disabled="!formIsValid" dark type="submit"> SUBMIT REPORT <v-icon right>send</v-icon></v-btn>

        </v-flex><br>
      </form>
      <!--Compressor Loading-->
      <v-dialog v-model="compressing" persistent >
        <!--<v-btn color="primary" dark slot="activator">Open Dialog</v-btn>-->
        <v-card dark>
          <v-card-title class="headline">Compressing</v-card-title>
          <v-card-text>This should take less than a minute</v-card-text>
          <v-container>
            <v-layout row wrap center>
              <v-flex xs2 offset-xs5>
                <v-progress-circular indeterminate v-bind:size="50" color="amber"></v-progress-circular>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-dialog>
    </v-layout><br>
  </v-container>
</template>

<script>
//  importing Image Library
  import ImageCompressor from '@xkeshi/image-compressor';

export default {
  data () {
    return {
//      Loading
      compressing: false,
//      App
      baMode: false,
      currentTime: 0,
      baNames: [],
      visits: {},
      options: {
        quality: 0.1,
      },
//      Basic Info
//      baName: '',
//      REF
      storePic: '/static/img/app/placeholder.png',
      beforePicture: '/static/img/app/placeholder.png',
      afterPicture: '/static/img/app/placeholder.png',
//      REF DATA
      storePicImg: null,
      beforePictureImg: null,
      afterPictureImg: null,
//      stock Report
      currentDate: '',
//      interceptions: '',
      basicInfoFields: [],
      stockFields: [],
      otherFields: [],
      stockData: {
      },
//      soya supreme cooking oil
//      soyaSupremeStock: {
//        sscbottle1ltr: null,
//        sscbottle3ltr: null,
//        sscbottle5ltr: null,
//        sscpoly1_5ltr: null,
//        ssctin2_5ltr: null,
//        ssctin5ltr: null,
//        ssctin10ltr: null,
//        sscpresspour3ltr: null,
//        sscpresspour5ltr: null,
//        sscjcan10ltr: null,
//        sscjcan16ltr: null,
////      smart canola oil
//        scbottle1ltr: null,
//        scbottle3ltr: null,
//        scbottle4_5ltr: null,
//        scpoly1_5ltr: null,
////        sctin2_5ltr: null,
//        scjcan10ltr: null,
//        scjcan16ltr: null,
////      soya supreme banaspati
//        ssbpoly1_5ltr: null,
//        ssbtin5ltr: null,
//        ssbtin25ltr: null,
////      soya supreme banaspati with Olive Oil
//        ssbopoly1_5ltr: null,
//        ssbotin5ltr: null,
//        ssbotin25ltr: null,
//      },
    }
  },
  computed: {
    formIsValid(){
      return this.storePicImg !== null
    },
    appInfo() {
      return this.$store.getters.appinfo
    },
    userInfo(){
      return this.$store.getters.userInfo;
    },
    validAbsent(){
        if (this.storeName === 'Absent' || this.storeName === 'absent'){
          return true;
        } else{
          return false;
        }
    }
  },
  methods:{
//    converting Object to list array
    chooseFile(field) {
        document.getElementById(field).click();
    },
//    Changing store Images
//    Getting Raw Files
    onStorePicture(event){
//     Declaring Compressor
      //set Loading FALSE
      this.compressing = true;
      const imageCompressor = new ImageCompressor();
      const files = event.target.files[0];
      imageCompressor.compress(files,{
        quality: 0.6
      }).then((result) => {
        let imagename = result.filename;
        const fileReader = new FileReader();
        //adding Event listener. when file change
        fileReader.addEventListener('load', () => {
          this.storePic = fileReader.result
        })
        fileReader.readAsDataURL(result)
        this.storePicImg = result
        //set Loading FALSE
        this.compressing = false;
      })
    },
    onBeforePicture(event){
      //set Loading FALSE
      this.compressing = true;
      const imageCompressor = new ImageCompressor();
      const files = event.target.files[0];
      imageCompressor.compress(files,{
        quality: 0.6
      }).then((result) => {
        let imagename = result.filename;
        const fileReader = new FileReader();
//      adding Event listener. when file change
        fileReader.addEventListener('load', () => {
          this.beforePicture = fileReader.result
        })
        fileReader.readAsDataURL(result)
        this.beforePictureImg = result
        //set Loading FALSE
        this.compressing = false;
      })
    },
    onAfterPicture(event){
      //set Loading FALSE
      this.compressing = true;
      const imageCompressor = new ImageCompressor();
      const files = event.target.files[0];
      imageCompressor.compress(files,{
        quality: 0.6
      }).then((result) => {
        let imagename = result.filename;
        const fileReader = new FileReader();
//      adding Event listener. when file change
        fileReader.addEventListener('load', () => {
          this.afterPicture = fileReader.result
        })
        fileReader.readAsDataURL(result)
        this.afterPictureImg = result
        //set Loading FALSE
        this.compressing = false;
      })
    },
//    Getting files and compressing


//    submitting Form Data

//    On Absent
    submitAbsent () {
      //    making an object for payload
      const storeData = {
        storename: this.store.name,
        storeid: this.store.id,
        soyaSupremeStock: this.soyaSupremeStock,
        interceptions: this.interceptions,
        baName: this.baName,
        date: this.currentDate,
        visits: this.visits,
//        images
        storePicImg: this.storePicImg,
        beforePictureImg: this.beforePictureImg,
        afterPictureImg: this.afterPictureImg,
      };
      this.$store.dispatch('pushStoreData', storeData).then(response => {
        this.$router.push('/storelist')
      })
    },
//    On Present
    onSubmitDetails(){
//        let stock = this.stockData;
//        let filtered = {};
//      for (let key in stock){
//        if (stock[key] == '' || stock[key] == null){
//          filtered[key] = 0
//        } else {
//          filtered[key] = stock[key]
//        }
//      }
//    making an object for payload
      const stockData = {
        storeName: this.stockData.storeName,
        storeId: this.stockData.id,
        Stock: this.stockData,
//        interceptions: this.interceptions,
        keeperName: this.stockData.KeeperName,
        date: this.currentDate,
//        visits: this.visits,
//        images
        storePicImg: this.storePicImg,
        beforePictureImg: this.beforePictureImg,
        afterPictureImg: this.afterPictureImg,
      };
      this.$store.dispatch('pushStoreData', stockData).then(response => {
          this.$router.push('/storelist')
      })
    }
  },

  created () {
    setTimeout(() =>{
//        Setting fields data after described Time
      this.basicInfoFields = this.$store.getters.basicInfoFields;
      this.stockFields = this.$store.getters.stockFields;
      this.otherFields = this.$store.getters.otherFields;
//      Object Constructor
      let stockObject = {};
      let basicInfoFields = this.basicInfoFields;
      let stockFields = this.stockFields;
      let otherFields = this.otherFields;
      basicInfoFields.forEach((obj) => {
         stockObject[obj.variable] = obj.name;
      });
      stockFields.forEach((obj) => {
        stockObject[obj.variable] = obj.name;
      });
      otherFields.forEach((obj) => {
        stockObject[obj.variable] = obj.name;
      });
      this.stockData = stockObject;
//      Other Minor Tasks
      let obj = this.$store.getters.baList;
      let convert = Object.keys(obj).map((key) => {
        return obj[key].name
      })
      this.baNames = convert;
      this.$http.get('https://api.timezonedb.com/v2/list-time-zone?key=QNVJJL9QLWE4&format=json&country=PK').then(response => {
        let date = new Date((response.body.zones[0].timestamp * 1000) - response.body.zones[0].gmtOffset * 1000);
        let hours = date.getHours();
        let day = ("0" + date.getDate()).slice(-2);
        let month = date.getMonth() + 1;
        let minutes = "0" + date.getMinutes();
        this.currentDate = month + '-' + day;
        this.currentTime = hours + ':' + minutes.substr(-2)
        //    generating Variable
        this.visits[this.currentDate] = 'done';
      }).catch(() => {
        let date = new Date();
        let hours = date.getHours();
        let day = ("0" + date.getDate()).slice(-2);
        let month = date.getMonth() + 1;
        let minutes = "0" + date.getMinutes();
        this.currentDate = month + '-' + day;
        this.currentTime = hours + ':' + minutes.substr(-2)
        //    generating Variable
        this.visits[this.currentDate] = 'done';
      });
      this.pageLoading = false;
    }, 1000)
  },
  props: ['store']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .alphaTrans {
    background: rgba(255,255,255,0.2);
  }
  .alphaPanel {
    background: rgba(5,5,5,0.1);
    padding: 10px;
  }
  .alphaPanel div {
    margin: 5px
  }
  .marginFields {
    padding: 10px;
  }
  .marginFields div {
    margin: 5px
  }
  form {
    margin: 0px; margin-top: 5%; padding: 0px; width: 100%; height: fit-content;
  }

</style>
