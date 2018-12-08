<template>
  <v-container fill-height fluid class="mb-2">
    <v-layout row wrap v-if="!pageLoading">
      <v-flex xs12 text-xs-center>
        <div v-if="!checkConnection" class="caption red ma-0 pa-0 white--text">DISCONNECTED</div>
        <div class="title ma-0 pa-0">{{ nodeMeta.brandName }}</div>
        <div class="subheading ma-0 pa-0">{{ nodeMeta.brandSlogan }}</div>
        <div class="caption ma-0 pa-0">{{ nodeMeta.fullname }}</div>
      </v-flex>
      <!--Timing of Submittion-->
      <v-flex xs12 text-xs-center >
        <div class="title ma-0 pa-0">{{ currentTime }}</div>
      </v-flex>
      <!--Heading of Content-->
      <v-flex xs12 text-xs-center >
        <div class="subheading">{{ storeDetail[0].name}} - {{ baNames }}</div>
      </v-flex>
      <form @submit.prevent="onSubmitDetails">
      <!--Basic Information-->
      <v-flex xs12 text-xs-center >
          <v-list style="background: transparent;">
            <!--Customers Name-->
            <v-list-tile class="alphaTrans">
                <v-text-field
                  name="customer'sName"
                  label="CUSTOMER'S NAME"
                  v-model="customerName"
                  tabindex="1"
                  type="text"
                ></v-text-field>
            </v-list-tile>
            <!--Customer Contact-->
            <v-list-tile class="alphaTrans">
                <v-text-field
                  name="ContactNumber"
                  label="CONTACT NUMBER"
                  tabindex="2"
                  v-model="customerContactNumber"
                  type="number"
                ></v-text-field>
            </v-list-tile>
          </v-list>
        </v-flex>

      <!--Customer's Entry-->
        <!--Initialize-->
        <div class="title alphaPanel" >Questions</div>
        <v-layout row wrap class="alphaPanel pa-0">
          <v-flex xs12 v-for="question in optionalQuestions" :key="question.id">
            <!--  BUTTER  -->
            <v-select
              class="ma-0 pa-0"
              name="question"
              tabindex="3"
              v-validate="'min_value:0|max_value:1000'"
              :items="question.answers"
              v-model="questions[question.id]"
              :label="question.question"
            ></v-select>
          </v-flex>
            <!--<v-flex xs12>-->
            <!--&lt;!&ndash;  BUTTER  &ndash;&gt;-->
              <!--<v-select-->
                <!--class="ma-0 pa-0"-->
                <!--name="pUserButter"-->
                <!--tabindex="3"-->
                <!--v-validate="'min_value:0|max_value:1000'"-->
                <!--:items="competitorButterList"-->
                <!--v-model="competitorButter"-->
                <!--label="Butter"-->
              <!--&gt;</v-select>-->
            <!--&lt;!&ndash;  MILK  &ndash;&gt;-->
              <!--<v-select-->
                <!--class="ma-0 pa-0"-->
                <!--name="pUserMilk"-->
                <!--tabindex="4"-->
                <!--v-validate="'min_value:0|max_value:1000'"-->
                <!--:items="competitorCheeseList"-->
                <!--v-model="competitorCheese"-->
                <!--label="Cheese"-->
              <!--&gt;</v-select>-->
            <!--&lt;!&ndash;  CHEESE  &ndash;&gt;-->
              <!--<v-select-->
                <!--class="ma-0 pa-0"-->
                <!--name="pUserCheese"-->
                <!--tabindex="5"-->
                <!--v-validate="'min_value:0|max_value:1000'"-->
                <!--:items="competitorFrozenList"-->
                <!--v-model="competitorFrozen"-->
                <!--label="Frozen Vegetable"-->
              <!--&gt;</v-select>-->
            <!--</v-flex>-->
        </v-layout>
        <!--=====================================-->
        <v-divider></v-divider>
        <!--=====================================-->
        <!--Adding Search Objects-->
        <div class="title alphaPanel" >Purchase</div>
        <div class="caption alphaPanel" >Add product From Drop Down Selector.</div>
        <v-layout row wrap class="alphaPanel pa-0 ma-0">
          <!--  Purchased Items  -->
          <v-flex xs12>
            <v-autocomplete
              tabindex="6"
              :items="skusList"
              v-model="selectedProduct"
              label="Products"
              item-text="name"
              item-value="name"
              return-object
              @input="onSelectProduct"
              persistent-hint
              hint="Tap once to add Product"
            ></v-autocomplete>
          </v-flex>

        </v-layout>
        <!--=====================================-->
        <v-divider></v-divider>
        <!--=====================================-->
        <!--Editing Added Objects-->
        <div class="caption alphaPanel" >Add Quantity of Each Item.</div>
        <v-layout row wrap class="alphaSolid pa-2">
          <!--  Purchased Items  -->

            <template v-for="(purchasedProduct, purchaseIndex) in purchasedProducts">
              <v-flex xs10>
                <v-text-field
                  :label="purchasedProduct.name"
                  v-model="purchasedProduct['quantity']"
                  type="number"
                  persistent-hint
                ></v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-btn
                  small
                  fab
                  color="redSmallBleed"
                  @click="onProductRemove(purchaseIndex)">
                  <v-icon>remove</v-icon>
                </v-btn>
              </v-flex>
            </template>
        </v-layout>
        <!--=====================================-->
        <v-divider></v-divider>
        <!--=====================================-->
        <!-- Optional Parameters-->
        <div class="title alphaPanel" >Questions</div>
        <v-layout row wrap class="alphaPanel pa-0">
          <!--Auto Generated Parameters-->
          <v-flex xs11 v-for="question in this.optionalParameter" :key="question.title" >
            <div class="title ma-0 pa-0" >{{question.title}}</div>
            <div class="subheading ma-0 pa-0" >{{question.description}}</div>
            <v-radio-group v-model="optionals[question.id]" row class="ma-0 pa-0">
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

            <!--  Remarks  -->
          <v-flex xs11>
            <!--<div class="title ma-0 pa-0" >Customer Conversion</div>-->
            <!--<v-radio-group v-model="customerConversion" row class="ma-0 pa-0">-->
              <!--<v-radio-->
                <!--key="1"-->
                <!--label="Yes"-->
                <!--value="Yes"-->
              <!--&gt;</v-radio>-->
              <!--<v-radio-->
                <!--key="2"-->
                <!--label="No"-->
                <!--value="No"-->
              <!--&gt;</v-radio>-->
            <!--</v-radio-group>-->
            <!--&lt;!&ndash;  Taste Trial  &ndash;&gt;-->
            <!--<div class="title ma-0 pa-0" >Customer Taste Trail</div>-->
            <!--<v-radio-group v-model="customerTasteTrial" row class="ma-0 pa-0">-->
              <!--<v-radio-->
                <!--key="1"-->
                <!--label="Yes"-->
                <!--value="Yes"-->
              <!--&gt;</v-radio>-->
              <!--<v-radio-->
                <!--key="2"-->
                <!--label="No"-->
                <!--value="No"-->
              <!--&gt;</v-radio>-->
            <!--</v-radio-group>-->
            <!--&lt;!&ndash;  Gifts  &ndash;&gt;-->
            <!--<div class="title ma-0 pa-0" >Gift</div>-->
            <!--<v-radio-group v-model="customerGift" row class="ma-0 pa-0">-->
              <!--<v-radio-->
                <!--key="1"-->
                <!--label="Yes"-->
                <!--value="Yes"-->
              <!--&gt;</v-radio>-->
              <!--<v-radio-->
                <!--key="2"-->
                <!--label="No"-->
                <!--value="No"-->
              <!--&gt;</v-radio>-->
            <!--</v-radio-group>-->
            <!--&lt;!&ndash;Remarks&ndash;&gt;-->
            <v-textarea
              name="remarks"
              label="Remarks"
              v-model="customerRemarks"
              dark
            ></v-textarea>
          </v-flex>
          <!--=====================================-->
          <v-divider></v-divider>
          <!--=====================================-->
        </v-layout>

        <v-flex xs12 text-xs-center class="mb-4">
          <!--<v-btn raised large color="black" dark to="/shoplist"><v-icon>chevron_left</v-icon> BACK </v-btn>-->
          <v-btn raised large color="blueBleed" :disabled="!formIsValid" dark type="submit"> SUBMIT INTERCEPTION <v-icon right>send</v-icon></v-btn>
        </v-flex><br>
      </form>
    </v-layout><br>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
//      Loading
      pageLoading: true,
      currentTime: 0,
      baNames: null,
//      Basic Info
      customerName: null,
      customerContactNumber: null,
      optionals: {},
      questions: {},
      customerRemarks: null,
//      stock Report
      currentDate: '',
//      interceptions: '',
//      SKUS EMBORG
//      skusList: [],
//      skusEmborg:  [
//        { name: ' Mozzarella Cheese 200gm', id:'1001', category: 'Dairy - Block Cheese'},
//        { name: ' Bulk M.Cheese 2.32kg', id:'1002', category: 'Dairy - Block Cheese'},
//        { name: ' Grana Padano Italian Cheese 200gm', id:'1003', category: 'Dairy - Block Cheese' },
//        { name: ' Cheddar Cheese White 2.67kg', id:'1004', category: 'Dairy - Block Cheese' },
//        { name: ' Irish Cheddar Coloured Cheese 400gm', id:'1005', category: 'Dairy - Block Cheese' },
//        { name: ' Irish Cheddar White Cheese 400gm', id:'1006', category: 'Dairy - Block Cheese' },
//        { name: ' Emmentaler Cheese 200gm', id:'1007', category: 'Dairy - Block Cheese' },
//        { name: ' Gouda Cheese 350gm', id:'1008', category: 'Dairy - Block Cheese' },
//        { name: ' Mature Cheddar Cheese 200gm', id:'1009', category: 'Dairy - Block Cheese' },
//        { name: ' Vintage Cheddar Cheese 200gm', id:'1010', category: 'Dairy - Block Cheese' },
//        { name: ' Gouda Wheel 4.5kg', id:'1011', category: 'Dairy - Block Cheese' },
//        { name: ' Cheddar Cheese White 4.850kg', id:'1012', category: 'Dairy - Block Cheese' },
//        //        Butter
//        { name: ' Butter Unsalted 500gm', id:'1013', category: 'Dairy - Butter' },
//        { name: ' Butter Unsalted 200gm', id:'1014', category: 'Dairy - Butter' },
//        { name: ' Butter Unsalted 100gm', id:'1015', category: 'Dairy - Butter' },
//        { name: ' Spreadable Butter 250gm', id:'1016', category: 'Dairy - Butter' },
//        { name: ' Butter Salted Portion', id:'1017', category: 'Dairy - Butter' },
//        { name: ' Butter Unsalted Portion', id:'1018', category: 'Dairy - Butter' },
//        { name: ' Butter Unsalted 400gm', id:'1019', category: 'Dairy - Butter' },
//        { name: ' Butter Unsalted 9x8gm', id:'1020', category: 'Dairy - Butter' },
//        //        Cheese
//        { name: ' Mild Color Cheese 200gm', id:'1021', category: 'Dairy - Cheese' },
//        { name: ' Havarti Slices Cheese 150gm', id:'1022', category: 'Dairy - Cheese' },
//        { name: ' Camembert Moulded Cheese 125gm', id:'1023', category: 'Dairy - Cheese' },
//        { name: ' Brie Plastic Cup 125gm', id:'1024', category: 'Dairy - Cheese' },
//        { name: ' Danablu 100gm', id:'1025', category: 'Dairy - Cheese' },
//        { name: ' Cottage Cheese 500gm Tub', id:'1026', category: 'Dairy - Cheese' },
//        { name: ' Edam Slice 8`S 150gm', id:'1027', category: 'Dairy - Cheese' },
//        { name: ' Feta Chesse In Brine 200gm', id:'1028', category: 'Dairy - Cheese' },
//        { name: ' Havarti Cheese 200gm', id:'1029', category: 'Dairy - Cheese' },
//        { name: ' Feta In Oil With Herbs & Olives 300gm', id:'1030', category: 'Dairy - Cheese' },
//        { name: ' Feta In Oil With Herbs & Spices 300gm', id:'1031', category: 'Dairy - Cheese' },
//        { name: ' Feta Sliceable Cheese 200gm', id:'1032', category: 'Dairy - Cheese' },
//        { name: ' Edam 230gm', id:'1033', category: 'Dairy - Cheese' },
//        { name: ' Swiss Slices Emmental Cheese 200gm', id:'1034', category: 'Dairy - Cheese' },
//        { name: ' Cheddar Cubes 150gm', id:'1035', category: 'Dairy - Cheese' },
//        { name: ' Cheddar Slices 10x10 150gm', id:'1036', category: 'Dairy - Cheese' },
//        { name: ' Emmentaler Cheese Sliced 150gm', id:'1037', category: 'Dairy - Cheese' },
//        { name: ' Gouda Cubes 150gm', id:'1038', category: 'Dairy - Cheese' },
//        { name: ' Gouda Slice 150gm', id:'1039', category: 'Dairy - Cheese' },
//        //        Cream
//        { name: ' Whipped Cream 250gm', id:'1040', category: 'Dairy - Cream' },
//        { name: ' Whipped Cream Uht 200gm', id:'1041', category: 'Dairy - Cream' },
//        { name: ' Cooking Cream 200ml', id:'1042', category: 'Dairy - Cream' },
//        { name: ' Cream Cheese 200gm', id:'1043', category: 'Dairy - Cream' },
//        { name: ' Cream Cheese Light 200gm', id:'1044', category: 'Dairy - Cream' },
//        { name: ' Whipped Cream Uht 1ltr', id:'1045', category: 'Dairy - Cream' },
//        { name: ' Sour Cream 1000gm', id:'1046', category: 'Dairy - Cream' },
//        { name: ' Dessert Whip Cream 200ml', id:'1047', category: 'Dairy - Cream' },
//        { name: ' Pasta Cream 200ml', id:'1048', category: 'Dairy - Cream' },
//        //        Food Service
//        { name: ' Cream Cheese 1.5kg', id:'1049', category: 'Dairy - Cream Food Service' },
//        //        Milk
//        { name: ' Full Cream Milk 1ltr', id:'1050', category: 'Dairy - Milk' },
//        { name: ' Low Fat Milk 1ltr', id:'1051', category: 'Dairy - Milk' },
//        { name: ' Skimmed Milk 1ltr', id:'1052', category: 'Dairy - Milk' },
//        //       Process Cheese
//        { name: ' American Cheddar Slice 10`S 200gm', id:'1053', category: 'Dairy - Process Cheese' },
//        { name: ' Butter Salted 200gm', id:'1054', category: 'Dairy - Process Cheese' },
//        { name: ' Italian Mozzarella Slice 10`S 200gm', id:'1055', category: 'Dairy - Process Cheese' },
//        { name: ' Mild White Cheese 200gm', id:'1056', category: 'Dairy - Process Cheese' },
//        { name: ' Sandwich Cheese Cheddar Taste 200gm', id:'1057', category: 'Dairy - Process Cheese' },
//        { name: ' Sandwich Cheese Cheddar Taste 400gm', id:'1058', category: 'Dairy - Process Cheese' },
//        { name: ' 8 Portions Cheese Bites 140gm', id:'1059', category: 'Dairy - Process Cheese' },
//        { name: ' Cheddar Slices 84slices 1.033Kg', id:'1060', category: 'Dairy - Process Cheese' },
//        { name: ' Dutch Slices Gouda Cheese 200gm', id:'1061', category: 'Dairy - Process Cheese' },
//        { name: ' Sandwich Cheese Cheddar Taste 100gm', id:'1062', category: 'Dairy - Process Cheese' },
//        { name: ' Cheese Snack 5`s 100gm', id:'1063', category: 'Dairy - Process Cheese' },
//        { name: ' Sandwich 200gm X 2 Kinder Joy Bundle Pack', id:'1064', category: 'Dairy - Process Cheese' },
//        //        Shakes
//        { name: ' Protien Smoothie Orange & Mango 250ml', id:'1065', category: 'Dairy - Shakes' },
//        { name: ' Protien Smoothie Pineapple & Coconut 250ml', id:'1066', category: 'Dairy - Shakes' },
//        { name: ' Protien Smoothie Rasberry & Blueberry 250ml', id:'1067', category: 'Dairy - Shakes' },
//        //        Shredded Cheese
//        { name: ' Cheddar Shredded Cheese 200gm', id:'1068', category: 'Dairy - Shredded Cheese' },
//        { name: ' Mozzarella Shredded Cheese 200gm', id:'1069', category: 'Dairy - Shredded Cheese' },
//        { name: ' Pasta Shredded Cheese 200gm', id:'1070', category: 'Dairy - Shredded Cheese' },
//        { name: ' Pizza Topping Shredded Cheese 200gm', id:'1071', category: 'Dairy - Shredded Cheese' },
//        { name: ' Cheddar Topping Shredded White 200gm', id:'1072', category: 'Dairy - Shredded Cheese' },
//        { name: ' Emmental Shredded Cheese 200gm', id:'1073', category: 'Dairy - Shredded Cheese' },
//        { name: ' Parmesan Shredded Cheese 150gm', id:'1074', category: 'Dairy - Shredded Cheese' },
//        { name: ' 3 Cheese Bake Shredded 200gm', id:'1075', category: 'Dairy - Shredded Cheese' },
//        //        Fish
//        { name: ' Pangasuis Fillet 1000gm', id:'1076', category: 'Frozen - Fish' },
//        //        French Fries
//        { name: ' French Fries Straight 1kg', id:'1077', category: 'Frozen - Frenchfries' },
//        { name: ' French Fries Crinkle 1000gm', id:'1078', category: 'Frozen - Frenchfries' },
//        { name: ' French Fries Shoestring 1000gm', id:'1079', category: 'Frozen - Frenchfries' },
//        { name: ' French Fries Straight 2.5kg', id:'1080', category: 'Frozen - Frenchfries' },
//        //        Fruits
//        { name: ' Strawberries 450gm', id:'1081', category: 'Frozen - Fruits' },
//        { name: ' Blueberries & Strawberries 400gm', id:'1082', category: 'Frozen - Fruits' },
//        { name: ' Blueberries 400gm', id:'1083', category: 'Frozen - Fruits' },
//        //        Meat
//        { name: ' Chicken Franks 350gm', id:'1084', category: 'Frozen - Meat' },
//        { name: ' Chicken Burgers 200gm 4`s', id:'1085', category: 'Frozen - Meat' },
//        { name: ' Chicken Kabab 280gm 8`s', id:'1086', category: 'Frozen - Meat' },
//        { name: ' Whole Turkey', id:'1087', category: 'Frozen - Meat' },
//        { name: ' Chicken Nuggets 510gm', id:'1088', category: 'Frozen - Meat' },
//        { name: ' Beef Burger Onion 200gm 4`s', id:'1089', category: 'Frozen - Meat' },
//        { name: ' Chicken Burger 1200gm 24`s', id:'1090', category: 'Frozen - Meat' },
//        { name: ' Beef Burger Onion 1200gm 24`s', id:'1091', category: 'Frozen - Meat' },
//        { name: ' Beef Kabab 280gm 8`s', id:'1092', category: 'Frozen - Meat' },
//        { name: ' Beef Burger Onion 1000gm 20`s', id:'1093', category: 'Frozen - Meat' },
//        { name: ' Chicken Burgers 1000gm 20`s', id:'1094', category: 'Frozen - Meat' },
//        //        Sea food
//        { name: ' Surimi Crab Sticks 250gm', id:'1095', category: 'Frozen - Sea Food' },
//        { name: ' Lumpfish Cavier Red 100gm', id:'1096', category: 'Frozen - Sea Food' },
//        { name: ' Lumpfish Cavier Black 100gm', id:'1097', category: 'Frozen - Sea Food' },
//        { name: ' Pepper Mackerel With Pepper 200gm', id:'1098', category: 'Frozen - Sea Food' },
//        //        Vegetable
//        { name: ' 4 Whole Corn On The Cob 950gm', id:'1099', category: 'Frozen - Vegetables' },
//        { name: ' Chopped Spinach 450gm', id:'1100', category: 'Frozen - Vegetables' },
//        { name: ' Malaysian Wokmix 450gm', id:'1101', category: 'Frozen - Vegetables' },
//        { name: ' Mix Vegetable Frozen 450gm', id:'1102', category: 'Frozen - Vegetables' },
//        { name: ' Mix Vegetable Frozen 900gm', id:'1103', category: 'Frozen - Vegetables' },
//        { name: ' Peas & Carrots 450gm', id:'1104', category: 'Frozen - Vegetables' },
//        { name: ' Sliced Mushroom 450gm', id:'1105', category: 'Frozen - Vegetables' },
//        { name: ' Garden Mix 450gm', id:'1106', category: 'Frozen - Vegetables' },
//        { name: ' Garden Peas Frozen 450gm', id:'1107', category: 'Frozen - Vegetables' },
//        { name: ' 3-Floret Mix 450gm', id:'1108', category: 'Frozen - Vegetables' },
//        { name: ' Broccoli Mix 450gm', id:'1109', category: 'Frozen - Vegetables' },
//        { name: ' Onion Rings 450gm', id:'1110', category: 'Frozen - Vegetables' },
//        { name: ' Whole Leaf Spinach 450gm', id:'1111', category: 'Frozen - Vegetables' },
//        { name: ' Broccoli Florets 450gm', id:'1112', category: 'Frozen - Vegetables' },
//        { name: ' Broccoli Mix 750gm', id:'1113', category: 'Frozen - Vegetables' },
//        { name: ' Broad Beans 450gm', id:'1114', category: 'Frozen - Vegetables' },
//        { name: ' Cut Bean 450gm', id:'1115', category: 'Frozen - Vegetables' },
//        { name: ' French Salad Mix 450gm', id:'1116', category: 'Frozen - Vegetables' },
//        { name: ' Garden Peas & Sweet Corn 450gm', id:'1117', category: 'Frozen - Vegetables' },
//        { name: ' Brussels Sprouts 900gm', id:'1118', category: 'Frozen - Vegetables' },
//        { name: ' Peas & Carrots 900gm', id:'1119', category: 'Frozen - Vegetables' },
//        { name: ' Sweet Corn Frozen 450gm', id:'1120', category: 'Frozen - Vegetables' },
//        { name: ' Oriental Mix 750gm', id:'1121', category: 'Frozen - Vegetables' },
//        { name: ' 6 Half Ear Corn On The Cob 700gm', id:'1122', category: 'Frozen - Vegetables' },
//        { name: ' Organic Garden Peas 400gm', id:'1123', category: 'Frozen - Vegetables' },
//        { name: ' Organic Mix Vegetable 400gm', id:'1124', category: 'Frozen - Vegetables' },
//        { name: ' Organic Spinach Chopped 400gm', id:'1125', category: 'Frozen - Vegetables' },
//        { name: ' Organic Sweet Corn 400gm', id:'1126', category: 'Frozen - Vegetables' },
//        { name: ' Sweet Corn Frozen 900gm', id:'1127', category: 'Frozen - Vegetables' },
//        { name: ' Garden Peas Frozen 900gm', id:'1128', category: 'Frozen - Vegetables' },
//        { name: ' Cut Bean 900gm', id:'1129', category: 'Frozen - Vegetables' },
//        { name: ' Calamari Rings 500gm', id:'1130', category: 'Frozen - Vegetables' },
//        { name: ' Broccoli & Vegetable Mix Bundle Pack', id:'1131', category: 'Frozen - Vegetables' },
//
//      ],
      selectedProduct: {},
//      Purchased
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
//    fetchCurrentTime(){
//      return this.$store.getters.currentTime;
//    },
    appInfo(){
      return this.$store.getters.appinfo;
    },
    nodeMeta(){
      return this.$store.getters.nodeMeta;
    },
    storeDetail() {
      return this.$store.getters.storeDetail
    },
    optionalQuestions() {
      let optionalQuestions = [];
      let downloadedOptionalQuestions = this.$store.getters.optionalQuestions;

//      Converting to array
      for(let key in downloadedOptionalQuestions) {
        optionalQuestions.push({
          question: downloadedOptionalQuestions[key].question,
          answers: downloadedOptionalQuestions[key].answers,
          description: downloadedOptionalQuestions[key].description,
          id: downloadedOptionalQuestions[key].id,
        })
      }

      return optionalQuestions
    },
    skusList() {
      let skus = [];
      let downloadedskus = this.$store.getters.skusLists;

//      Converting to array
      for(let key in downloadedskus) {
        skus.push({
          name: downloadedskus[key].name,
          category: downloadedskus[key].category,
          price: downloadedskus[key].price,
          id: downloadedskus[key].id
        })
      }

      return skus
    },
    optionalParameter() {
      let optionalParameter = [];
      let downloadedOptionalParameter = this.$store.getters.optionalParameter;

//      Converting to array
      for(let key in downloadedOptionalParameter) {
        optionalParameter.push({
          title: downloadedOptionalParameter[key].title,
          type: downloadedOptionalParameter[key].type,
          description: downloadedOptionalParameter[key].description,
          id: downloadedOptionalParameter[key].id,
        })
      }

      return optionalParameter
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
//    On Product Select From List
//    On product Select via Drop down
    onSelectProduct(){
      this.selectedProduct['quantity'] = '0';
      this.purchasedProducts.push(this.selectedProduct);
      this.selectedProduct = {};
//      console.log(productConvert)
    },
//    On Product Remove
    onProductRemove(index){
      this.purchasedProducts.splice(index, 1);
      console.log(index)
    },
//    submitting Form Data
    onSubmitDetails(){
//      Sanitizing Area
      let products = this.purchasedProducts;
      let productConvert = [];
      for (let i = 0, len = products.length; i < len; i++) {
        let product = products[i];
          productConvert[product.id] = product.quantity;
        }
//      Removing Zeroes
      let purchasedProducts = productConvert;
      let filtered = {};
      for (let key in purchasedProducts){
          if (purchasedProducts[key] == '' || purchasedProducts[key] == null){
              filtered[key] = 0
          } else {
              filtered[key] = purchasedProducts[key]
          }
      }


//    making an object for payload
      const report = {
        storename: this.storeDetail[0].name,
        storeid: this.storeDetail[0].id,
        storeAddress: this.storeDetail[0].address,
        shortQuestions: this.questions,
        optionalQuestions : this.optionals,
        purchased: filtered,
        customerContact: this.customerContactNumber,
        customerName: this.customerName,
        customerRemarks: this.customerRemarks,
        date: this.currentDate,
      };

//      console.log('From Store in OnSubmit', report)
//      console.log('Values sent to Storage', report);
      this.$store.dispatch('pushStoreReport', report).then(() => {
//        Reseting all Data
          setTimeout(() => {
            this.purchasedProducts = [];
            this.selectedProduct = {};
            this.optional = {};
            this.questions = {};
            this.customerContactNumber = null;
            this.customerName = null;
            this.customerRemarks = null;
          },500)
      })
    }
  },
  created () {
//      setting Informations
    setTimeout(() => {
      this.baNames = this.userInfo.name + ' ' + this.userInfo.lastName;
//      let serverTimestamp = this.fetchCurrentTime;
//      if (serverTimestamp != null || serverTimestamp != 0) {
//        let date = new Date((serverTimestamp * 1000) - 18000 * 1000);
//        let hours = date.getHours();
//        let year = (1900 + date.getYear());
//        let day = ("0" + date.getDate()).slice(-2);
//        let month = date.getMonth() + 1;
//        let minutes = "0" + date.getMinutes();
//        this.currentDate = month + '-' + day + '-' + year;
//        this.currentTime = hours + ':' + minutes.substr(-2)
//      } else {
//        let date = new Date();
//        let hours = date.getHours();
//        let year = (1900 + date.getYear());
//        let day = ("0" + date.getDate()).slice(-2);
//        let month = date.getMonth() + 1;
//        let minutes = "0" + date.getMinutes();
//        this.currentDate = month + '-' + day + '-' + year;
//        this.currentTime = hours + ':' + minutes.substr(-2)
////            generating Variable
//            this.visits[this.currentDate] = 'done';
//      }
      this.$http.get('https://api.timezonedb.com/v2/list-time-zone?key=QNVJJL9QLWE4&format=json&country=PK').then(response => {
        let date = new Date((response.body.zones[0].timestamp * 1000) - response.body.zones[0].gmtOffset * 1000);
        let hours = date.getHours();
        let year = (1900 + date.getYear());
        let day = ("0" + date.getDate()).slice(-2);
        let month = date.getMonth() + 1;
        let minutes = "0" + date.getMinutes();
        this.currentDate = month + '-' + day + '-' + year;
        this.currentTime = hours + ':' + minutes.substr(-2)
//            generating Variable
//        this.visits[this.currentDate] = 'done';
      }).catch((error) => {
          let date = new Date();
          let hours = date.getHours();
          let year = (1900 + date.getYear());
          let day = ("0" + date.getDate()).slice(-2);
          let month = date.getMonth() + 1;
          let minutes = "0" + date.getMinutes();
          this.currentDate = month + '-' + day + '-' + year;
          this.currentTime = hours + ':' + minutes.substr(-2)
//              generating Variable
//          this.visits[this.currentDate] = 'done';
        });
      this.pageLoading = false;
    }, 1000)
  },
//  props: ['store']
}
</script>

<style>
  .alphaTrans {
    background: rgba(255,255,255,0.2);
  }
  .alphaSolid {
    border-radius: 4px;
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
