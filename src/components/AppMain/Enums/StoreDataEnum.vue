<template>
  <v-container fill-height fluid class="mb-2">
    <!--Vuetify Circle Loader-->
    <!--<v-flex xs12><v-progress-circular v-if="pageLoading" indeterminate v-bind:size="70" v-bind:width="2" color="red"></v-progress-circular></v-flex>-->
    <v-layout row wrap v-if="!pageLoading">
      <v-flex xs12 text-xs-center >
        <div v-if="!checkConnection" class="caption red ma-0 pa-0 white--text">DISCONNECTED</div>
        <div class="title ma-0 pa-0">{{ appInfo.brandName }}</div>
        <div class="caption ma-0 pa-0">DC Software</div>
      </v-flex>
      <form @submit.prevent="onSubmitDetails">
      <!--Basic Information-->
      <v-flex xs12 text-xs-center >
          <v-list style="background: transparent;">
            <!--Customers Name-->
            <v-list-tile class="alphaTrans">
              <v-list-tile-content>
                <v-text-field
                  name="customer'sName"
                  autocomplete="false"
                  label="CUSTOMER'S NAME"
                  v-model="customerName"
                  tabindex="1"
                  type="text"
                ></v-text-field>
              </v-list-tile-content>
            </v-list-tile>
            <!--Customer Contact-->
            <v-list-tile class="alphaTrans">
              <v-list-tile-content>
                <v-text-field
                  name="ContactNumber"
                  label="CONTACT NUMBER"
                  tabindex="2"
                  v-model="customerContactNumber"
                  type="number"
                ></v-text-field>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-flex>

      <!--Timing of Submittion-->
      <v-flex xs12 text-xs-center >
        <div class="title ma-0 pa-0">{{ currentTime }}</div>
      </v-flex>
        <!--Heading of Content-->
      <v-flex xs12 text-xs-center >
        <div class="subheading">SKU's PURCHASED</div>
      </v-flex>

      <!--Customer's Entry-->
        <!--EMBORG Products-->
        <div class="title alphaPanel" >Previous User</div>
        <v-layout row wrap class="alphaPanel pa-0">
            <!--  BUTTER  -->
            <v-flex xs12>
              <v-select
                name="pUserButter"
                tabindex="3"
                v-validate="'min_value:0|max_value:1000'"
                :items="competitorButterList"
                v-model="competitorButter"
                label="Butter"
                autocomplete
              ></v-select>
            </v-flex>
            <!--  MILK  -->
            <v-flex xs12>
              <v-select
                name="pUserMilk"
                tabindex="4"
                v-validate="'min_value:0|max_value:1000'"
                :items="competitorCheeseList"
                v-model="competitorCheese"
                label="Cheese"
                autocomplete
              ></v-select>
            </v-flex>
            <!--  CHEESE  -->
            <v-flex xs12>
              <v-select
                name="pUserCheese"
                tabindex="5"
                v-validate="'min_value:0|max_value:1000'"
                :items="competitorFrozenList"
                v-model="competitorFrozen"
                label="Frozen Vegetable"
                autocomplete
              ></v-select>
            </v-flex>
        </v-layout>
        <!--=====================================-->
        <v-divider></v-divider>
        <!--=====================================-->
        <!--Adding Search Objects-->
        <div class="title alphaPanel" >Purchase</div>
        <v-layout row wrap class="alphaPanel pa-0">
          <!--  BUTTER  -->
          <v-flex xs12>
            <v-select
              :items="skusEmborg"
              v-model="selectedProduct"
              label="Emborg Products"
              single-line
              item-text="name"
              item-value="name"
              cache-items
              return-object
              @input="onSelectProduct"
              :hint="`${purchasedProducts.name}, ${purchasedProducts.category}`"
              persistent-hint
              autocomplete
            ></v-select>
          </v-flex>

        </v-layout>
        <!--=====================================-->
        <v-divider></v-divider>
        <!--=====================================-->
        <div class="title alphaPanel pb-0" >POLY</div>
        <v-layout row wrap class="alphaPanel pa-0">
          <v-flex xs6 text-xs-center >
            <v-text-field
              v-validate="'min_value:0|max_value:1000'"
              :error="errors.has('sscpoly1_5ltr')"
              :class="soyaSupremeStock.sscpoly1_5ltr > 0 ? 'input-group--focused' : 'transparent'"
              :hide-details="true"

              suffix="pc"
              name="sscpoly1_5ltr"
              label="1x5 Ltr"
              v-model="soyaSupremeStock.sscpoly1_5ltr"
              tabindex="6"
              placeholder="0"
              type="number"
            ></v-text-field>
          </v-flex>
        </v-layout>

        <div class="title alphaPanel pb-0" >Press & Pour</div>
        <v-layout row wrap class="alphaPanel pa-0">
          <!--5 Ltr-->
          <v-flex xs5>
            <v-text-field
              v-validate="'min_value:0|max_value:1000'"
              :error="errors.has('sscpresspour3ltr')"
              :class="soyaSupremeStock.sscpresspour3ltr > 0 ? 'input-group--focused' : 'transparent'"
              :hide-details="true"

              suffix="piece"
              name="sscpresspour3ltr"
              label="3 Ltr"
              v-model="soyaSupremeStock.sscpresspour3ltr"
              tabindex="7"
              placeholder="0"
              type="number"
            ></v-text-field>
          </v-flex>
          <!--10 Ltr-->
          <v-flex xs5>
            <v-text-field
              v-validate="'min_value:0|max_value:1000'"
              :error="errors.has('sscpresspour5ltr')"
              :class="soyaSupremeStock.sscpresspour5ltr > 0 ? 'input-group--focused' : 'transparent'"
              :hide-details="true"

              suffix="piece"
              name="sscpresspour5ltr"
              label="5 Ltr"
              v-model="soyaSupremeStock.sscpresspour5ltr"
              tabindex="8"
              placeholder="0"
              type="number"
            ></v-text-field>
          </v-flex>
        </v-layout>

        <div class="title alphaPanel pb-0" >TIN</div>
        <v-layout row wrap class="alphaPanel  pa-0">
          <!--2.5 Ltr-->
          <v-flex xs3>
            <v-text-field
              v-validate="'min_value:0|max_value:1000'"
              :error="errors.has('ssctin2_5ltr')"
              :class="soyaSupremeStock.ssctin2_5ltr > 0 ? 'input-group--focused' : 'transparent'"
              :hide-details="true"

              suffix="pc"
              name="ssctin2_5ltr"
              label="2.5 Ltr"
              v-model="soyaSupremeStock.ssctin2_5ltr"
              tabindex="9"
              placeholder="0"
              type="number"
            ></v-text-field>
          </v-flex>
          <!--5 Ltr-->
          <v-flex xs4>
            <v-text-field
              v-validate="'min_value:0|max_value:1000'"
              :error="errors.has('ssctin5ltr')"
              :class="soyaSupremeStock.ssctin5ltr > 0 ? 'input-group--focused' : 'transparent'"
              :hide-details="true"

              suffix="pc"
              name="ssctin5ltr"
              label="5 Ltr"
              v-model="soyaSupremeStock.ssctin5ltr"
              tabindex="10"
              placeholder="0"
              type="number"
            ></v-text-field>
          </v-flex>
          <!--10 Ltr-->
          <v-flex xs3>
            <v-text-field
              v-validate="'min_value:0|max_value:1000'"
              :error="errors.has('ssctin10ltr')"
              :class="soyaSupremeStock.ssctin10ltr > 0 ? 'input-group--focused' : 'transparent'"
              :hide-details="true"

              suffix="pc"
              name="ssctin10ltr"
              label="10 Ltr"
              v-model="soyaSupremeStock.ssctin10ltr"
              tabindex="11"
              placeholder="0"
              type="number"
            ></v-text-field>
          </v-flex>
        </v-layout>

        <div class="title alphaPanel pb-0" >J.CAN</div>
        <v-layout row wrap class="alphaPanel  pa-0">
          <!--10 Ltr-->
          <v-flex xs5>
            <v-text-field
              v-validate="'min_value:0|max_value:1000'"
              :error="errors.has('sscjcan10ltr')"
              :class="soyaSupremeStock.sscjcan10ltr > 0 ? 'input-group--focused' : 'transparent'"
              :hide-details="true"

              suffix="pc"
              name="sscjcan10ltr"
              label="10 Ltr"
              v-model="soyaSupremeStock.sscjcan10ltr"
              tabindex="12"
              placeholder="0"
              type="number"
            ></v-text-field>
          </v-flex>
          <!--16 Ltr-->
          <v-flex xs5>
            <v-text-field
              v-validate="'min_value:0|max_value:1000'"
              :error="errors.has('sscjcan16ltr')"
              :class="soyaSupremeStock.sscjcan16ltr > 0 ? 'input-group--focused' : 'transparent'"
              :hide-details="true"

              suffix="pc"
              name="sscjcan16ltr"
              label="16 Ltr"
              v-model="soyaSupremeStock.sscjcan16ltr"
              tabindex="13"
              placeholder="0"
              type="number"
            ></v-text-field>
          </v-flex>
        </v-layout>


        <!--=====================================-->



        <!--Smart Canola Oil-->
        <v-flex xs12 text-xs-center >
          <div class="title">Smart Canola Oil</div>
        </v-flex>

        <div class="title marginFields" >BOTTLE</div>
        <v-layout row wrap class="marginFields pb-0">
          <!--1 Ltr-->
          <v-flex xs3>
            <v-text-field
              v-validate="'min_value:0|max_value:1000'"
              :error="errors.has('scbottle1ltr')"
              :class="soyaSupremeStock.scbottle1ltr > 0 ? 'input-group--focused' : 'transparent'"
              :hide-details="true"

              suffix="pc"
              name="scbottle1ltr"
              label="1Ltr"
              v-model="soyaSupremeStock.scbottle1ltr"
              tabindex="14"
              placeholder="0"
              type="number"
            ></v-text-field>
          </v-flex>
          <!--3 Ltr-->
          <v-flex xs3>
            <v-text-field
              v-validate="'min_value:0|max_value:1000'"
              :error="errors.has('scbottle3ltr')"
              :class="soyaSupremeStock.scbottle3ltr > 0 ? 'input-group--focused' : 'transparent'"
              :hide-details="true"

              suffix="pc"
              name="scbottle3ltr"
              label="3 Ltr"
              v-model="soyaSupremeStock.scbottle3ltr"
              tabindex="15"
              placeholder="0"
              type="number"
            ></v-text-field>
          </v-flex>
          <v-flex xs3>
            <v-text-field
              v-validate="'min_value:0|max_value:1000'"
              :error="errors.has('scbottle4_5ltr')"
              :class="soyaSupremeStock.scbottle4_5ltr > 0 ? 'input-group--focused' : 'transparent'"
              :hide-details="true"

              suffix="pc"
              name="scbottle4_5ltr"
              label="4.5 Ltr"
              v-model="soyaSupremeStock.scbottle4_5ltr"
              tabindex="16"
              placeholder="0"
              type="number"
            ></v-text-field>
          </v-flex>
        </v-layout>

        <div class="title marginFields" >POLY</div>
        <v-layout row wrap class="marginFields pb-0">
          <v-flex xs6 text-xs-center >
            <v-text-field
              v-validate="'min_value:0|max_value:1000'"
              :error="errors.has('scpoly1_5ltr')"
              :class="soyaSupremeStock.scpoly1_5ltr > 0 ? 'input-group--focused' : 'transparent'"
              :hide-details="true"

              suffix="pc"
              name="scpoly1_5ltr"
              label="1x5 Ltr"
              v-model="soyaSupremeStock.scpoly1_5ltr"
              tabindex="17"
              placeholder="0"
              type="number"
            ></v-text-field>
          </v-flex>
        </v-layout>

        <div class="title marginFields" >J.CAN</div>
        <v-layout row wrap class="marginFields pb-0" >
          <!--10 Ltr-->
          <v-flex xs5>
            <v-text-field
              v-validate="'min_value:0|max_value:1000'"
              :error="errors.has('scjcan10ltr')"
              :class="soyaSupremeStock.scjcan10ltr > 0 ? 'input-group--focused' : 'transparent'"
              :hide-details="true"
              suffix="pc"
              name="scjcan10ltr"
              label="10 Ltr"
              v-model="soyaSupremeStock.scjcan10ltr"
              tabindex="18"
              placeholder="0"
              type="number"
            ></v-text-field>
          </v-flex>
          <!--16 Ltr-->
          <v-flex xs5>
            <v-text-field
              v-validate="'min_value:0|max_value:1000'"
              :error="errors.has('scjcan16ltr')"
              :class="soyaSupremeStock.scjcan16ltr > 0 ? 'input-group--focused' : 'transparent'"
              :hide-details="true"
              suffix="pc"
              name="scjcan16ltr"
              label="16 Ltr"
              v-model="soyaSupremeStock.scjcan16ltr"
              tabindex="19"
              placeholder="0"
              type="number"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <!--=====================================-->

        <v-flex xs12 text-xs-center class="mb-4">
          <!--<v-btn raised large color="black" dark to="/shoplist"><v-icon>chevron_left</v-icon> BACK </v-btn>-->
          <v-btn raised large color="green" :disabled="!formIsValid" dark type="submit"> SUBMIT REPORT <v-icon right>send</v-icon></v-btn>
        </v-flex><br>
      </form>
      <!--Compressor Loading-->
      <!--<v-dialog v-model="compressing" persistent >-->
        <!--&lt;!&ndash;<v-btn color="primary" dark slot="activator">Open Dialog</v-btn>&ndash;&gt;-->
        <!--<v-card dark>-->
          <!--<v-card-title class="headline">Compressing</v-card-title>-->
          <!--<v-card-text>This should take less than a minute</v-card-text>-->
          <!--<v-container>-->
            <!--<v-layout row wrap center>-->
              <!--<v-flex xs2 offset-xs5>-->
                <!--<v-progress-circular indeterminate v-bind:size="50" color="amber"></v-progress-circular>-->
              <!--</v-flex>-->
            <!--</v-layout>-->
          <!--</v-container>-->
        <!--</v-card>-->
      <!--</v-dialog>-->
    </v-layout><br>
  </v-container>
</template>

<script>
//  importing Image Library
//  import ImageCompressor from '@xkeshi/image-compressor';


//  Changing Text Fields Color
//const validator = (value, args){
//    if (value > 0){
//        return green;
//    }
//}


export default {
  data () {
    return {
//      Loading
      pageLoading: true,
//      GUI
      competitorButterList: [
        'Lurpak', 'Emborg', 'Blueband', 'Nurpur', 'Aseel', 'Mumtaz', 'Other'
      ],
      competitorCheeseList: [
        'Emborg', 'Happy Cow', 'Adams', 'President', 'Lactima', 'Other'
      ],
      competitorFrozenList: [
        'Star', 'Fresh & Freeze', 'Other'
      ],
//      App
//      baMode: false,
      currentTime: 0,
      baNames: null,
//      visits: {},
//      Basic Info
      customerName: null,
      customerContactNumber: null,
//      Previous user
      competitorButter: null,
      competitorCheese: null,
      competitorFrozen: null,
//      stock Report
      currentDate: '',
//      interceptions: '',
//      SKUS EMBORG
      skusEmborg:  [
        { name: 'Mozzarella Cheese 200gm', category: 'Dairy - Block Cheese' },
        { name: 'Bulk M.Cheese 2.32kg', category: 'Dairy - Block Cheese' },
        { name: 'Grana Padano Italian Cheese 200gm', category: 'Dairy - Block Cheese' },
        { name: 'Cheddar Cheese White 2.67kg', category: 'Dairy - Block Cheese' },
        { name: 'Irish Cheddar Coloured Cheese 400gm', category: 'Dairy - Block Cheese' },
        { name: 'Irish Cheddar White Cheese', category: 'Dairy - Block Cheese' },
        { name: 'Emmentaler Cheese 200gm', category: 'Dairy - Block Cheese' },
        { name: 'Gouda Cheese 350gm', category: 'Dairy - Block Cheese' },
        { name: 'Mature Cheddar Cheese 200gm', category: 'Dairy - Block Cheese' },
        { name: 'Vintage Cheddar Cheese 200gm', category: 'Dairy - Block Cheese' },
        { name: 'Gouda Wheel 4.5kg', category: 'Dairy - Block Cheese' },
        { name: 'Cheddar Cheese White 4.850kg', category: 'Dairy - Block Cheese' },
//        Butter

      ],
//      Purchased
      selectedProduct: { name: 'None', category: 'None' },
      purchasedProducts: [],
//      soya supreme cooking oil
      soyaSupremeStock: {
        sscbottle1ltr: null,
        sscbottle3ltr: null,
        sscbottle5ltr: null,
        sscpoly1_5ltr: null,
        ssctin2_5ltr: null,
        ssctin5ltr: null,
        ssctin10ltr: null,
        sscpresspour3ltr: null,
        sscpresspour5ltr: null,
        sscjcan10ltr: null,
        sscjcan16ltr: null,
//      smart canola oil
        scbottle1ltr: null,
        scbottle3ltr: null,
        scbottle4_5ltr: null,
        scpoly1_5ltr: null,
        sctin2_5ltr: null,
        scjcan10ltr: null,
        scjcan16ltr: null,
//      soya supreme banaspati
        ssbpoly1_5ltr: null,
        ssbtin25ltr: null,
        ssbtin5ltr: null,
//      soya supreme banaspati with Olive Oil
        ssbopoly1_5ltr: null,
        ssbotin5ltr: null,
        ssbotin25ltr: null,
      },
    }
  },
  computed: {
    formIsValid(){
      return this.customerName !== '' && this.customerName !== null
    },
    checkConnection(){
      return this.$store.getters.connectionStat;
    },
    userInfo(){
      return this.$store.getters.userInfo;
    },
    appInfo(){
      return this.$store.getters.appinfo;
    }
  },
  methods:{
//    converting Object to list array
//    chooseFile(field) {
//        document.getElementById(field).click();
//    },
//    Changing Shop Images
//    Getting Raw Files
//    onShopPicture(event){
////     Declaring Compressor
//      //set Loading FALSE
//      this.compressing = true;
//      const imageCompressor = new ImageCompressor();
//      const files = event.target.files[0];
//      imageCompressor.compress(files,{
//        quality: 0.6
//      }).then((result) => {
//        let imagename = result.filename;
//        const fileReader = new FileReader();
//        //adding Event listener. when file change
//        fileReader.addEventListener('load', () => {
//          this.storePic = fileReader.result
//        })
//        fileReader.readAsDataURL(result)
//        this.storePicImg = result
//        //set Loading FALSE
//        this.compressing = false;
//      })
//    },
//    onbaPicture(event){
//      //set Loading FALSE
//      this.compressing = true;
//      const imageCompressor = new ImageCompressor();
//      const files = event.target.files[0];
//      imageCompressor.compress(files,{
//        quality: 0.6
//      }).then((result) => {
//        let imagename = result.filename;
//        const fileReader = new FileReader();
////      adding Event listener. when file change
//        fileReader.addEventListener('load', () => {
//          this.baPicture = fileReader.result
//        })
//        fileReader.readAsDataURL(result)
//        this.baPictureImg = result
//        //set Loading FALSE
//        this.compressing = false;
//      })
//    },
//    onShelfPicture(event){
//      //set Loading FALSE
//      this.compressing = true;
//      const imageCompressor = new ImageCompressor();
//      const files = event.target.files[0];
//      imageCompressor.compress(files,{
//        quality: 0.6
//      }).then((result) => {
//        let imagename = result.filename;
//        const fileReader = new FileReader();
////      adding Event listener. when file change
//        fileReader.addEventListener('load', () => {
//          this.shelfPicture = fileReader.result
//        })
//        fileReader.readAsDataURL(result)
//        this.shelfPictureImg = result
//        //set Loading FALSE
//        this.compressing = false;
//      })
//    },
//    Getting files and compressing

    onSelectProduct(){
      console.log(this.purchasedProducts);
      this.purchasedProducts.push(this.selectedProduct);
      console.log(this.purchasedProducts);
    },
//    submitting Form Data
    onSubmitDetails(){

//      Removing Zeroes
      let soyaSupremeStock = this.soyaSupremeStock;
      let filtered = {};
      for (let key in soyaSupremeStock){
          if (soyaSupremeStock[key] == '' || soyaSupremeStock[key] == null){
              filtered[key] = 0
          } else {
              filtered[key] = soyaSupremeStock[key]
          }
      }
      console.log(soyaSupremeStock);
      console.log(filtered)
//    making an object for payload
      const report = {
        storename: this.store.name,
        storeid: this.store.id,
        storeAddress: this.store.address,
        purchased: filtered,
        customerContact: this.customerContactNumber,
        customerName: this.customerName,
        date: this.currentDate,
      };
      this.$store.dispatch('pushStoreReport', report).then(response => {
          setTimeout(() => {
            this.soyaSupremeStock = {
                sscbottle1ltr: null,
                sscbottle3ltr: null,
                sscbottle5ltr: null,
                sscpoly1_5ltr: null,
                ssctin2_5ltr: null,
                ssctin5ltr: null,
                ssctin10ltr: null,
                sscpresspour3ltr: null,
                sscpresspour5ltr: null,
                sscjcan10ltr: null,
                sscjcan16ltr: null,
//      smart canola oil
                scbottle1ltr: null,
                scbottle3ltr: null,
                scbottle4_5ltr: null,
                scpoly1_5ltr: null,
                sctin2_5ltr: null,
                scjcan10ltr: null,
                scjcan16ltr: null,
//      soya supreme banaspati
                ssbpoly1_5ltr: null,
                ssbtin25ltr: null,
                ssbtin5ltr: null,
//      soya supreme banaspati with Olive Oil
                ssbopoly1_5ltr: null,
                ssbotin5ltr: null,
                ssbotin25ltr: null,
            };
            this.customerName = null;
            this.customerContactNumber =  null;
          },1000)
      })
    }
  },
  created () {
//      Checking user role
//    switch (this.userInfo.role) {
//      case "Supervisor":
//        this.baMode = false;
//        this.$router.push('/shoplist');
//        break;
//
//      case "BrandAmbassador":
//        this.baMode = true;
//        break;
//    }
//      setting Informations
    setTimeout(() =>{
//      BANames Array to Object or ViseVersa
//      let obj = this.$store.getters.baList;
//      let convert = Object.keys(obj).map((key) => {
//        return obj[key].name
//      })

      this.baNames = this.userInfo.name;
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
<style>
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

<!--//        sscbottle1ltr: soyaSupremeStock.sscbottle1ltr,-->
<!--//        sscbottle3ltr: soyaSupremeStock.,-->
<!--//        sscbottle5ltr: soyaSupremeStock.,-->
<!--//        sscpoly1_5ltr: soyaSupremeStock.,-->
<!--//        ssctin2_5ltr: soyaSupremeStock.,-->
<!--//        ssctin5ltr: soyaSupremeStock.,-->
<!--//        ssctin10ltr: soyaSupremeStock.,-->
<!--//        sscpresspour3ltr: soyaSupremeStock.,-->
<!--//        sscpresspour5ltr: soyaSupremeStock.,-->
<!--//        sscjcan10ltr: soyaSupremeStock.,-->
<!--//        sscjcan16ltr: soyaSupremeStock.,-->
<!--////      smart canola oil-->
<!--//        scbottle1ltr: soyaSupremeStock.,-->
<!--//        scbottle3ltr: soyaSupremeStock.,-->
<!--//        scbottle4_5ltr: soyaSupremeStock.,-->
<!--//        scpoly1_5ltr: soyaSupremeStock.,-->
<!--//        sctin2_5ltr: soyaSupremeStock.,-->
<!--//        scjcan10ltr: soyaSupremeStock.,-->
<!--//        scjcan16ltr: soyaSupremeStock.,-->
<!--////      soya supreme banaspati-->
<!--//        ssbpoly1_5ltr: soyaSupremeStock.,-->
<!--//        ssbtin10ltr: soyaSupremeStock.,-->
<!--//        ssbtin16ltr: soyaSupremeStock.,-->
<!--////      soya supreme banaspati with Olive Oil-->
<!--//        ssbopoly1_5ltr: soyaSupremeStock.,-->
<!--//        ssbotin5ltr: soyaSupremeStock.,-->
<!--//        ssbotin25ltr: soyaSupremeStock.,-->
