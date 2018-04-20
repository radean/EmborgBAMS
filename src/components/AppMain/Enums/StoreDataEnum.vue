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
        <div class="caption alphaPanel" >Add product From Drop Down Selector.</div>
        <v-layout row wrap class="alphaPanel pa-0">
          <!--  Purchased Items  -->
          <v-flex xs12>
            <v-select
              tabindex="6"
              :items="skusEmborg"
              v-model="selectedProduct"
              label="Emborg Products"
              item-text="name"
              item-value="name"
              return-object
              @input="onSelectProduct"
              persistent-hint
              hint="Tap once to add Product"
              autocomplete
            ></v-select>
          </v-flex>

        </v-layout>
        <!--=====================================-->
        <v-divider></v-divider>
        <!--=====================================-->
        <!--Adding Search Objects-->
        <div class="caption alphaPanel" >Add Quantity of Each Item.</div>
        <v-layout row wrap class="alphaPanel pa-0">
          <!--  Purchased Items  -->
          <v-flex xs12>
            <v-text-field
              v-for="(item, index) in purchasedProducts"
              box
              label='{purchasedProducts.name}'
              v-model="purchaseQuantity"
              type="number"
              persistent-hint
            ></v-text-field>
          </v-flex>

        </v-layout>
        <!--=====================================-->
        <v-divider></v-divider>
        <!--=====================================-->
        <!--Radio Fields-->
        <v-layout row wrap class="alphaPanel pa-0">
          <!--  Conversion  -->
          <v-flex xs12>
            <div class="title alphaPanel" >Customer Conversion</div>
            <v-radio-group v-model="customerConversion">
              <v-radio
                key="1"
                label="Yes"
                value="Yes"
              ></v-radio>
              <v-radio
                key="2"
                label="No"
                value="No"
              ></v-radio>
            </v-radio-group>
            <!--  Taste Trial  -->
            <div class="title alphaPanel" >Customer Taste Trail</div>
            <v-radio-group v-model="customerTasteTrial">
              <v-radio
                key="1"
                label="Yes"
                value="Yes"
              ></v-radio>
              <v-radio
                key="2"
                label="No"
                value="No"
              ></v-radio>
            </v-radio-group>
            <!--  Gifts  -->
            <div class="title alphaPanel" >Gift</div>
            <v-radio-group v-model="customerGift">
              <v-radio
                key="1"
                label="Yes"
                value="Yes"
              ></v-radio>
              <v-radio
                key="2"
                label="No"
                value="No"
              ></v-radio>
            </v-radio-group>
          </v-flex>
          <!--=====================================-->
          <v-divider></v-divider>
          <!--=====================================-->
        </v-layout>

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
      customerConversion: null,
      customerTasteTrial: null,
      customerGift: null,
      purchaseQuantity: null,
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
        { name: ' Butter Unsalted 500gm', category: 'Dairy - Butter' },
        { name: ' Butter Unsalted 200gm', category: 'Dairy - Butter' },
        { name: ' Butter Unsalted 100gm', category: 'Dairy - Butter' },
        { name: ' Spreadable Butter 250gm', category: 'Dairy - Butter' },
        { name: ' Butter Salted Portion', category: 'Dairy - Butter' },
        { name: ' Butter Unsalted Portion', category: 'Dairy - Butter' },
        { name: ' Butter Unsalted 400gm', category: 'Dairy - Butter' },
        { name: ' Butter Unsalted 9x8gm', category: 'Dairy - Butter' },
        //        Cheese
        { name: ' Mild Color Cheese 200gm', category: 'Dairy - Cheese' },
        { name: ' Havarti Slices Cheese 150gm', category: 'Dairy - Cheese' },
        { name: ' Camembert Moulded Cheese 125gm', category: 'Dairy - Cheese' },
        { name: ' Brie Plastic Cup 125gm', category: 'Dairy - Cheese' },
        { name: ' Danablu 100gm', category: 'Dairy - Cheese' },
        { name: ' Cottage Cheese 500gm Tub', category: 'Dairy - Cheese' },
        { name: ' Edam Slice 8`S 150gm', category: 'Dairy - Cheese' },
        { name: ' Feta Chesse In Brine 200gm', category: 'Dairy - Cheese' },
        { name: ' Havarti Cheese 200gm', category: 'Dairy - Cheese' },
        { name: ' Feta In Oil With Herbs & Olives 300gm', category: 'Dairy - Cheese' },
        { name: ' Feta In Oil With Herbs & Spices 300gm', category: 'Dairy - Cheese' },
        { name: ' Feta Sliceable Cheese 200gm', category: 'Dairy - Cheese' },
        { name: ' Edam 230gm', category: 'Dairy - Cheese' },
        { name: ' Swiss Slices Emmental Cheese 200gm', category: 'Dairy - Cheese' },
        { name: ' Cheddar Cubes 150gm', category: 'Dairy - Cheese' },
        { name: ' Cheddar Slices 10x10 150gm', category: 'Dairy - Cheese' },
        { name: ' Emmentaler Cheese Sliced 150gm', category: 'Dairy - Cheese' },
        { name: ' Gouda Cubes 150gm', category: 'Dairy - Cheese' },
        { name: ' Gouda Slice 150gm', category: 'Dairy - Cheese' },
        //        Cream
        { name: ' Whipped Cream 250gm', category: 'Dairy - Cream' },
        { name: ' Whipped Cream Uht 200gm', category: 'Dairy - Cream' },
        { name: ' Cooking Cream 200ml', category: 'Dairy - Cream' },
        { name: ' Cream Cheese 200gm', category: 'Dairy - Cream' },
        { name: ' Cream Cheese Light 200gm', category: 'Dairy - Cream' },
        { name: ' Whipped Cream Uht 1ltr', category: 'Dairy - Cream' },
        { name: ' Sour Cream 1000gm', category: 'Dairy - Cream' },
        { name: ' Dessert Whip Cream 200ml', category: 'Dairy - Cream' },
        { name: ' Pasta Cream 200ml', category: 'Dairy - Cream' },
        //        Food Service
        { name: ' Cream Cheese 1.5kg', category: 'Dairy - Cream Food Service' },
        //        Milk
        { name: ' Full Cream Milk 1ltr', category: 'Dairy - Milk' },
        { name: ' Low Fat Milk 1ltr', category: 'Dairy - Milk' },
        { name: ' Skimmed Milk 1ltr', category: 'Dairy - Milk' },
        //       Process Cheese
        { name: ' American Cheddar Slice 10`S 200gm', category: 'Dairy - Process Cheese' },
        { name: ' Butter Salted 200gm', category: 'Dairy - Process Cheese' },
        { name: ' Italian Mozzarella Slice 10`S 200gm', category: 'Dairy - Process Cheese' },
        { name: ' Mild White Cheese 200gm', category: 'Dairy - Process Cheese' },
        { name: ' Sandwich Cheese Cheddar Taste 200gm', category: 'Dairy - Process Cheese' },
        { name: ' Sandwich Cheese Cheddar Taste 400gm', category: 'Dairy - Process Cheese' },
        { name: ' 8 Portions Cheese Bites 140gm', category: 'Dairy - Process Cheese' },
        { name: ' Cheddar Slices 84slices 1.033Kg', category: 'Dairy - Process Cheese' },
        { name: ' Dutch Slices Gouda Cheese 200gm', category: 'Dairy - Process Cheese' },
        { name: ' Sandwich Cheese Cheddar Taste 100gm', category: 'Dairy - Process Cheese' },
        { name: ' Cheese Snack 5`s 100gm', category: 'Dairy - Process Cheese' },
        { name: ' Sandwich 200gm X 2 Kinder Joy Bundle Pack', category: 'Dairy - Process Cheese' },
        //        Shakes
        { name: ' Protien Smoothie Orange & Mango 250ml', category: 'Dairy - Shakes' },
        { name: ' Protien Smoothie Pineapple & Coconut 250ml', category: 'Dairy - Shakes' },
        { name: ' Protien Smoothie Rasberry & Blueberry 250ml', category: 'Dairy - Shakes' },
        //        Shredded Cheese
        { name: ' Cheddar Shredded Cheese 200gm', category: 'Dairy - Shredded Cheese' },
        { name: ' Mozzarella Shredded Cheese 200gm', category: 'Dairy - Shredded Cheese' },
        { name: ' Pasta Shredded Cheese 200gm', category: 'Dairy - Shredded Cheese' },
        { name: ' Pizza Topping Shredded Cheese 200gm', category: 'Dairy - Shredded Cheese' },
        { name: ' Cheddar Topping Shredded White 200gm', category: 'Dairy - Shredded Cheese' },
        { name: ' Emmental Shredded Cheese 200gm', category: 'Dairy - Shredded Cheese' },
        { name: ' Parmesan Shredded Cheese 150gm', category: 'Dairy - Shredded Cheese' },
        { name: ' 3 Cheese Bake Shredded 200gm', category: 'Dairy - Shredded Cheese' },
        //        Fish
        { name: ' Pangasuis Fillet 1000gm', category: 'Frozen - Fish' },
        //        French Fries
        { name: ' French Fries Straight 1kg', category: 'Frozen - Frenchfries' },
        { name: ' French Fries Crinkle 1000gm', category: 'Frozen - Frenchfries' },
        { name: ' French Fries Shoestring 1000gm', category: 'Frozen - Frenchfries' },
        { name: ' French Fries Straight 2.5kg', category: 'Frozen - Frenchfries' },
        //        Fruits
        { name: ' Strawberries 450gm', category: 'Frozen - Fruits' },
        { name: ' Blueberries & Strawberries 400gm', category: 'Frozen - Fruits' },
        { name: ' Blueberries 400gm', category: 'Frozen - Fruits' },
        //        Meat
        { name: ' Chicken Franks 350gm', category: 'Frozen - Meat' },
        { name: ' Chicken Burgers 200gm 4`s', category: 'Frozen - Meat' },
        { name: ' Chicken Kabab 280gm 8`s', category: 'Frozen - Meat' },
        { name: ' Whole Turkey', category: 'Frozen - Meat' },
        { name: ' Chicken Nuggets 510gm', category: 'Frozen - Meat' },
        { name: ' Beef Burger Onion 200gm 4`s', category: 'Frozen - Meat' },
        { name: ' Chicken Burger 1200gm 24`s', category: 'Frozen - Meat' },
        { name: ' Beef Burger Onion 1200gm 24`s', category: 'Frozen - Meat' },
        { name: ' Beef Kabab 280gm 8`s', category: 'Frozen - Meat' },
        { name: ' Beef Burger Onion 1000gm 20`s', category: 'Frozen - Meat' },
        { name: ' Chicken Burgers 1000gm 20`s', category: 'Frozen - Meat' },
        //        Sea food
        { name: ' Surimi Crab Sticks 250gm', category: 'Frozen - Sea Food' },
        { name: ' Lumpfish Cavier Red 100gm', category: 'Frozen - Sea Food' },
        { name: ' Lumpfish Cavier Black 100gm', category: 'Frozen - Sea Food' },
        { name: ' Pepper Mackerel With Pepper 200gm', category: 'Frozen - Sea Food' },
        //        Vegetable
        { name: ' 4 Whole Corn On The Cob 950gm', category: 'Frozen - Vegetables' },
        { name: ' Chopped Spinach 450gm', category: 'Frozen - Vegetables' },
        { name: ' Malaysian Wokmix 450gm', category: 'Frozen - Vegetables' },
        { name: ' Mix Vegetable Frozen 450gm', category: 'Frozen - Vegetables' },
        { name: ' Mix Vegetable Frozen 900gm', category: 'Frozen - Vegetables' },
        { name: ' Peas & Carrots 450gm', category: 'Frozen - Vegetables' },
        { name: ' Sliced Mushroom 450gm', category: 'Frozen - Vegetables' },
        { name: ' Garden Mix 450gm', category: 'Frozen - Vegetables' },
        { name: ' Garden Peas Frozen 450gm', category: 'Frozen - Vegetables' },
        { name: ' 3-Floret Mix 450gm', category: 'Frozen - Vegetables' },
        { name: ' Broccoli Mix 450gm', category: 'Frozen - Vegetables' },
        { name: ' Onion Rings 450gm', category: 'Frozen - Vegetables' },
        { name: ' Whole Leaf Spinach 450gm', category: 'Frozen - Vegetables' },
        { name: ' Broccoli Florets 450gm', category: 'Frozen - Vegetables' },
        { name: ' Broccoli Mix 750gm', category: 'Frozen - Vegetables' },
        { name: ' Broad Beans 450gm', category: 'Frozen - Vegetables' },
        { name: ' Cut Bean 450gm', category: 'Frozen - Vegetables' },
        { name: ' French Salad Mix 450gm', category: 'Frozen - Vegetables' },
        { name: ' Garden Peas & Sweet Corn 450gm', category: 'Frozen - Vegetables' },
        { name: ' Brussels Sprouts 900gm', category: 'Frozen - Vegetables' },
        { name: ' Peas & Carrots 900gm', category: 'Frozen - Vegetables' },
        { name: ' Sweet Corn Frozen 450gm', category: 'Frozen - Vegetables' },
        { name: ' Oriental Mix 750gm', category: 'Frozen - Vegetables' },
        { name: ' 6 Half Ear Corn On The Cob 700gm', category: 'Frozen - Vegetables' },
        { name: ' Organic Garden Peas 400gm', category: 'Frozen - Vegetables' },
        { name: ' Organic Mix Vegetable 400gm', category: 'Frozen - Vegetables' },
        { name: ' Organic Spinach Chopped 400gm', category: 'Frozen - Vegetables' },
        { name: ' Organic Sweet Corn 400gm', category: 'Frozen - Vegetables' },
        { name: ' Sweet Corn Frozen 900gm', category: 'Frozen - Vegetables' },
        { name: ' Garden Peas Frozen 900gm', category: 'Frozen - Vegetables' },
        { name: ' Cut Bean 900gm', category: 'Frozen - Vegetables' },
        { name: ' Calamari Rings 500gm', category: 'Frozen - Vegetables' },
        { name: ' Broccoli & Vegetable Mix Bundle Pack', category: 'Frozen - Vegetables' },
        { name: ' Garden Peas & Sweet Corn Bundle Pack', category: 'Frozen - Vegetables' },

      ],
//      Purchased
      selectedProduct: null,
      purchasedProducts: [],
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
      this.selectedProduct = {};
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
