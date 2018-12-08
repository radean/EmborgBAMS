/**
 * Created by VisionVr on 10/27/2017.
 */
// importing VUE X
import Vue from 'vue';
import Vuex from 'vuex';
// importing Routers
import { routes } from '../routes'
// importing Firebase
import * as firebase from 'firebase'
import 'firebase/firestore';
// importing Vue Resource
import VueResource from 'vue-resource'

Vue.use(Vuex);

// Storage
export const store = new Vuex.Store({
  state: {
    // Application Information
    // app:{
    //   name: 'BAMS™ Node',
    //   fullname: 'Brand Ambassador Control System',
    //   author : 'radean',
    //   authorEmail : 'radeanf@gmail.com',
    //   developer : 'radean',
    //   company : 'Vision Direct Marketing',
    //   brandName: 'Emborg™ Pakistan',
    //   brandSlogan: "Since 1947 ",
    //   version : 'v.0.206 build 6',
    //   theme: 'grey darken-3',
    //   connection: true,
    //   header:{
    //     name: 'BAMS™',
    //     location: 'Pakistan'
    //   },
    //   mode: '',
    //   status : true,
    //   isConnected: false,
    //   broadcast: true,
    //   subscription: true
    // },
    // Application meta Information
    app: {
      name : 'BAMS™ Global',
      fullname: 'B.A Management System Control System',
      author : 'radean',
      authorEmail : 'radeanf@gmail.com',
      developer : 'radean',
      company : 'Vision Direct Marketing',
      version : 'beta 0.01FD',
      brandName: 'Emborg™ Pakistan',
      brandSlogan: "Since 1947 ",
      header:{
        name: 'BAMS™',
        location: 'Pakistan'
      },
      status : true,
      theme: 'red accent-4',
      startDate: '4-24-2018',
      endDate: '5-22-2018',
      mode: '',
      broadcast: true,
      subscription: true
    },
    // Node Meta information
    nodeMeta: {},
    // Timing
    currentTime: 0,
    // Loading
    percentageLoadingState:{
      isLoading: false,
      percentage: 0,
      compressorLoadingStats: false,
    },
    // Presetted Meta Informaiton
    skusList: {},
    optionalParameter: {},
    optionalQuestions:{},
    // Notification
    notification:{
      title: null,
      body: null
    },
    // App Loading Stats
    successFlag: false,
    successMsg: 'Operation Successful',
    userError: false,
    snickError: {
      state: false,
      msg: 'Operation Failed',
    },
    loadingState:{
      mainLoading: false,
      compressorLoadingStats: false,
    },
    // setting Store ID
    sel_storeid: '30502',
    // storelists:
    stores: [],
    storeDetails: [],
    //User Session
    // Current user Details
    userinfo: {},
    baList: {},
    user: null,
    // OFFLINE SUPPORT ADDED
    // ====================
    offlineStoreReport: [],


  },
  mutations: {
    setConnectionStat (state, payload) {
      state.app.connection = payload;
    },
    setAppinformation (state, payload) {
      state.app = payload;
    },
    setNodeMeta (state, payload){
      state.nodeMeta = payload;
    },
    setCurrentTime (state, payload){
      state.currentTime = payload;
    },
    setOptionalParameter (state, payload){
      state.optionalParameter = payload;
    },
    setSkusList (state, payload){
      state.skusList = payload;
    },
    setOptionalQuestions (state, payload){
      state.optionalQuestions = payload;
    },
    setTheme(state, payload){
      state.app.theme = payload;
    },
    setAppHeader(state, payload){
      state.app.header.name = payload.name;
      state.app.header.location = payload.location;
    },
    setNotification(state, payload){
      state.notification.title = payload.title;
      state.notification.body = payload.body;
    },
    setUser (state, payload){
      state.user = payload;
    },
    setUserInfo (state, payload){
      state.userinfo = payload;
    },
    setSnickError(state, payload){
      state.snickError.active = payload.state;
      state.snickError.msg = payload.msg;
    },
    'SET_STORES'(state, payload){
      state.stores = payload;
    },
    'SET_STORE_DETAILS'(state, payload){
      state.storeDetails = payload;
    },
    'SET_SEL_STORE_ID'(state, payload){
      state.sel_storeid = payload;
    },
    'SET_MAIN_LOADING'(state, payload) {
      state.loadingState.mainLoading = payload;
    },
    'SET_USER_ERROR'(state, payload){
      state.userError = payload;
    },
    'SET_PERCENTAGE_LOADING'(state, payload){
      state.percentageLoadingState = payload;
    },
    'SET_SUCCESS_MSG'(state, payload){
      state.successFlag = !state.successFlag;
      state.successMsg = payload;
    }
  },
  actions: {

    // Application Basic Information
    fetchAppInformation({commit, getters}){
      // Getting information from Server
      // commit('SET_MAIN_LOADING', true);
      // Fetching from FireStore Server
      firebase.firestore().collection('app-init').get().then((appInfo) => {
        let appinfo = {};
        appInfo.forEach((app) => {
          appinfo = {
            name : app.data().name,
            fullname: app.data().fullname,
            company : app.data().company,
            version : app.data().version,
            status : app.data().status,
            theme: app.data().theme,
            mode: app.data().mode,
            startDate: app.data().startDate,
            endDate: app.data().endDate,
            subscription: app.data().subscription
          };
        });
        let initAppInfo = getters.appinfo;
        Object.assign( initAppInfo, appinfo);
        commit('setAppinformation', initAppInfo);
        commit('SET_PERCENTAGE_LOADING',{isLoading: true,  percentage: 25});
      })

      // Fetching from Node Meta

      // Getting things up
      firebase.firestore().collection('app-init').doc('initial').collection('node-guis').doc('main').get().then((nodeInfo) => {
        // Variable Initialization
        let nodeMeta = nodeInfo.data();

        // setting SKUS list
        commit('setNodeMeta', nodeMeta);
        // Setting Progress Bar
        commit('SET_PERCENTAGE_LOADING',{isLoading: true, percentage: 45});
      }).catch(function(error) {
        console.error("Error writing document: ", error);
      });

      // Fetching SKUS
      firebase.firestore().collection('app-init').doc('initial').collection('products').doc('skus').get().then((products) => {
        let skusData = [];
        let skus = products.data();

        // Filtering object
        for(let key in skus){
          skusData.push(skus[key]);
        }
        // setting SKUS list
        commit('setSkusList', skusData);
        // Setting Progress Bar
        commit('SET_PERCENTAGE_LOADING',{isLoading: true, percentage: 60});
      })

      // Fetching Dashboard Information
      // firebase.firestore().collection('app-init').doc('initial').collection('app-guis').get().then((dashboardGui) => {
      //   let dashboardData = {};
      //   dashboardGui.forEach((gui) => {
      //     dashboardData = gui.data()
      //   });
      //
      //   let appInfo = getters.appinfo;
      //   Object.assign( appInfo, dashboardData);
      //   commit('setAppinformation', appInfo);
      //   // Setting Progress Bar
      //   commit('SET_PERCENTAGE_LOADING',{isLoading: true, percentage: 75});
      // })
      firebase.database().ref('/.info/serverTimeOffset')
        .once('value')
        .then(function stv(data) {
          // setting Time
          commit('setCurrentTime', data.val() + Date.now());
        }, function (err) {
          return err;
        });

      // Fetching Optional Parameters
      firebase.firestore().collection('app-init').doc('initial').collection('optionals').doc('parameters').get().then((optional) => {
        let optionalParameter = optional.data();
        commit('setOptionalParameter', optionalParameter)
        // Setting Progress Bar
        commit('SET_PERCENTAGE_LOADING',{isLoading: true, percentage: 80});
        setTimeout(function () {
          commit('SET_PERCENTAGE_LOADING',{isLoading: false, percentage: 85});
        },2000)
      })

      // Fetching optional question Parameters
      firebase.firestore().collection('app-init').doc('initial').collection('optionals').doc('questions').get().then((optional) => {
        let optionalQuestions = optional.data();
        commit('setOptionalQuestions', optionalQuestions )
        // Setting Progress Bar
        commit('SET_PERCENTAGE_LOADING',{isLoading: true, percentage: 90});
        setTimeout(function () {
          commit('SET_PERCENTAGE_LOADING',{isLoading: false, percentage: 100});
        },2000)
      })
    },
    // USER AUTHENTICATION
    userSignUp({commit}, payload){

      // Converting Varialble

      let userID;
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
        commit('SET_MAIN_LOADING', true);
        const userInfo = {
          uniqueId: user.uid,
          name: payload.user.name,
          password: payload.password,
          email: payload.email,
          assignStore: payload.user.assignStore,
          address: payload.user.address,
          role: payload.user.role
        };
          return firebase.database().ref('users').push(userInfo).then(() => {
          commit('SET_MAIN_LOADING', false);
        }).catch((error) => {
          console.log(error)
        })
        }).catch(
        error => {
          commit('SET_USER_ERROR', true);
          setTimeout(() => {
            commit('SET_USER_ERROR', false);
          }, 4000)
        }
      );
    },
    userSignIn({commit}, payload){
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(firebase.auth().onAuthStateChanged(appUser => {
            commit('setUser', appUser)
        })).catch(
          error => {
            commit('SET_USER_ERROR', true);
            console.log(error);
            setTimeout(() => {
              commit('SET_USER_ERROR', false);
            }, 4000)
          })
      },
    // User Session Check
    userSession({dispatch, commit}){
      // Checking Firebase user
      firebase.auth().onAuthStateChanged(appUser => {
        if(appUser) {
          // setting Authorization
          commit('setUser', appUser);
          dispatch('subUserInfo');
        }else{
          commit('setUser', null);
        }
      });
    },
    // user information update
    subUserInfo({dispatch, commit, getters}){
      // Setting Loading
      commit('SET_MAIN_LOADING', true);
      // setting user information
      firebase.firestore().collection('app-users').where('uniqueId', '==', getters.user.uid).get().then((querySnapshot) => {
        // Setting up a local Variable for pushing to store
        let userinfo = {};
        // const obj = user.val();
        querySnapshot.forEach((user) => {
          userinfo = {
            uid: user.data().uniqueId,
            name: user.data().name,
            lastName: user.data().lastName,
            email: user.data().email,
            address: user.data().address,
            store: user.data().store,
            shift: user.data().shift,
            dateAssigned: user.data().dateAssigned,
            dateofBirth:  user.data().dateofBirth
          };
        });
        // for (let key in obj) {
        //   userinfo = {
        //     uid: obj[key].uniqueId,
        //     name: obj[key].name,
        //     lastName: obj[key].lastName,
        //     email: obj[key].email,
        //     store : obj[key].store,
        //     address: obj[key].address,
        //     shift: obj[key].shift,
        //     dateAssigned: obj[key].dateAssigned,
        //     dateofBirth: obj[key].dateofBirth
        //   };
        // }
        commit('setUserInfo', userinfo);
        dispatch('setStoreId');
        commit('SET_MAIN_LOADING', false);
      });
    },
    // user Log out
    userSignOut({commit}){
      commit('SET_MAIN_LOADING', true);
      firebase.auth().signOut().then(() =>{
        // Setting ApplicationDetails
        let storeData = {
          name: 'BAMS™',
          location: ''
        };
        // setting App Header
        commit('setAppHeader', storeData);
        commit('setUserInfo', null);
        commit('setUser', null);
        commit('SET_MAIN_LOADING', false);
      });
    },

  // ====================================
  //   GUI APP
    appHeader({commit}, payload){
      let header = {
        name: payload,
        location: ''
      };
      commit('setAppHeader', header);
    },
  // =================================
    //Checking Connection
    connectionRef({commit}){
      let connection = firebase.database().ref('/.info/connected');

      // firebase.firestore().disableNetwork()
      //   .then(function() {
      //     // Do offline actions
      //     // ...
      //   });

      connection.on('value', (snap) => {
        if(snap.val() == true){
          commit('setConnectionStat', true)
        } else {
          commit('setConnectionStat', false)
        }
      });
    },
    // Go Offline
    onNotification({commit}, payload){
      let Ntitle = payload.notification.title;
      let Nbody = payload.notification.body;
      let parse = {body: Nbody, title: Ntitle, status: true};
      commit('setNotification', parse);
    },
    // Go Online
    goOnline (){
      firebase.database().goOnline();
    },
    // Pushing DataBase

    // setting Store ID
    setStoreId({ commit, getters}){
      // Getting Assigned BA
      // dispatch('baListUPD');
      // let sel_store_id = payload.storeid;
      let sel_store_id = getters.userInfo.store;
      let storeData = {};
      // Fetching Data from Firebase
      // firebase.database().ref('store').orderByKey().equalTo(sel_store_id.toString()).once('value', (store) => {
      //   let storeData = {};
      //   const obj = store.val();
      //   for (let key in obj) {
      //     storeData = {
      //       storeName: obj[key].name,
      //       storeAddress: obj[key].address,
      //       // shift: obj[key].shift,
      //     }
      //   }
      // });
      // ===========================
      // CONVERTING TO FIRESTORE
      // ===========================
      firebase.firestore().collection('stores').where('id', '==', sel_store_id).get().then((stores) => {
        let storeData = {};
        let storeDetail = [];
        // const obj = store.data();
        stores.forEach((store) => {
          // console.log('Raw Data',store.data());
          storeData = {
            storeName: store.data().name,
            storeAddress: store.data().address,
            city: store.data().city,
            description: store.data().description
          }
          storeDetail.push({
            id: store.data().id,
            name: store.data().name,
            category: store.data().category,
            address: store.data().address,
            city: store.data().city,
            description: store.data().description
          })}
        );

        // console.log('Store ID',sel_store_id );
        // console.log('Store Info',storeData);

        // setting App Header
        commit('setAppHeader', storeData);
        commit('SET_SEL_STORE_ID', sel_store_id)
        commit('SET_STORE_DETAILS', storeDetail)
      })},
    // Uploading Data
    pushStoreData({commit, getters}, payload){
      commit('SET_MAIN_LOADING', true);
      const stockdata = {
        storename: payload.storename,
        storeid: payload.storeid,
        soyaSupremeStock: payload.soyaSupremeStock,
        date: payload.date,
        // visits: payload.visits,
        baName: payload.baName,
        interceptions: payload.interceptions,
        creatorId: getters.userInfo.uid,
        userName: getters.userInfo.name,
        // image
        storePicImg: payload.storePicImg,
        beforePictureImg: payload.beforePictureImg,
        afterPictureImg: payload.afterPictureImg,
      };
      let storePicImgUrl;
      let beforePictureImgUrl;
      let afterPictureImgUrl;
      let key;
      let date = stockdata.date;

      firebase.database().ref('stockdata').push(stockdata)
      .then((data) => {
        key = data.key;
        return key
      }).then(() => {
        // putting Date
        return firebase.database().ref('stores/' + payload.storeid + '/visits/').update(payload.visits);
      }).then(() => {


        // Image 1
        const filenameA = payload.storePicImg.name;
        const ext = filenameA.slice(filenameA.lastIndexOf('.'));
        return firebase.storage().ref('storeimages/' + date + '/' + key + 'storePic' + ext).put(payload.storePicImg)
      }).then(fileData => {
        storePicImgUrl = fileData.metadata.downloadURLs[0];
        return firebase.database().ref('stockdata').child(key).update({storePicImgUrl: storePicImgUrl})
      }).then(() => {


        // Image 2
        const filenameB = payload.beforePictureImg.name;
        const ext = filenameB.slice(filenameB.lastIndexOf('.'));
        return firebase.storage().ref('storeimages/' + date + '/' + key + 'beforePicture'  + ext).put(payload.beforePictureImg)
      }).then(fileData => {
        beforePictureImgUrl = fileData.metadata.downloadURLs[0];
        return firebase.database().ref('stockdata').child(key).update({beforePictureImgUrl: beforePictureImgUrl})
      }).then(() => {


        // Image 3
        const filenameC = payload.afterPictureImg.name;
        const ext = filenameC.slice(filenameC.lastIndexOf('.'));
        return firebase.storage().ref('storeimages/' + date + '/' + key + 'afterPicture'  + ext).put(payload.afterPictureImg)
      }).then(fileData => {
        afterPictureImgUrl = fileData.metadata.downloadURLs[0];
        return firebase.database().ref('stockdata').child(key).update({afterPictureImgUrl: afterPictureImgUrl})
      }).then(() => {
        commit('SET_MAIN_LOADING', false);
      })
        .catch((error) => {
          console.log(error)
        })
    },
    // Uploading Data
    pushStoreReport({commit, getters}, payload){
      commit('SET_MAIN_LOADING', true);
      // let purchase = payload.purchased;
      // let sorted = [];
      // for (let key in purchase){
      //   if(purchase[key] === 'NaN'){
      //   }
      //   sorted.push(purchase[key])
      // }
      const report = {
        purchased: payload.purchased,
        customerName: payload.customerName,
        customerContact: payload.customerContact,
        customerRemarks: payload.customerRemarks,
        questions: payload.shortQuestions,
        optionals: payload.optionalQuestions,
        creatorId: getters.userInfo.uid,
        userName: getters.userInfo.name + ' ' + getters.userInfo.lastName,
        store : {
          id: payload.storeid,
          name: payload.storename,
          address: payload.storeAddress
        }
      };

      firebase.firestore().collection('storedata').add(report)
        .then(() => {
        commit('SET_MAIN_LOADING', false);
          // Sending Success Message
          commit('SET_SUCCESS_MSG', 'Submission Complete');
          setTimeout(() => {
            commit('SET_SUCCESS_MSG', 'Operation Successful');
          }, 4000);
      })
        .catch((error) => {
          commit('SET_MAIN_LOADING', false);
          let errorStatus = {
            state: true,
            msg: 'Connection Error!'
          }
          // Sending Error Message
          commit('setSnickError', errorStatus);
          setTimeout(() => {
            errorStatus.state = false
            commit('setSnickError', errorStatus);
          }, 4000);
          console.log(error)
        })
      commit('SET_MAIN_LOADING', false);
    },

    // Key Message from Employees
    pushMessages({commit, getters}, payload){
      commit('SET_MAIN_LOADING', true);
      const msg = {
        msg: payload,
        creatorId: getters.userInfo.uid,
        userName: getters.userInfo.name,
      };
      // commit('SET_MAIN_LOADING', false);

      firebase.database().ref('msg/').push(msg)
        .then(() => {
          commit('SET_MAIN_LOADING', false);
          // Sending Success Message
          commit('SET_SUCCESS_MSG', 'Message Sent Successfuly');
          setTimeout(() => {
            commit('SET_SUCCESS_MSG', 'Operation Successful');
          }, 4000);
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // Fetching Data
    // Store List
    // Store Detail
    // ==========================
    // fetchStoreDetails({commit, getters}){
    //   firebase.database().ref('stores').orderByKey().equalTo(getters.selStoreId.toString()).once('value', (storedetails) => {
    //     const storeDetail = [];
    //     const obj = storedetails.val();
    //     for (let key in obj) {
    //       storeDetail.push({
    //         id: key,
    //         name: obj[key].name,
    //         address: obj[key].address
    //       })
    //     }
    //     commit('SET_STORE_DETAILS', storeDetail)
    //   });
    // }
  },
  getters: {
    appinfo (state){
      return state.app
    },
    nodeMeta (state){
      return state.nodeMeta
    },
    // Data fields getters
    basicInfoFields (state){
      return state.basicInfoFields
    },
    notification (state){
      return state.notification
    },
    offlineDB (state){
      return state.app.isConnected
    },
    connectionStat (state){
      return state.app.connection
    },
    currentTime(state){
      return state.currentTime
    },
    user (state){
      return state.user
    },
    userInfo (state) {
      return state.userinfo
    },
    optionalParameter (state){
      return state.optionalParameter
    },
    optionalQuestions (state){
      return state.optionalQuestions
    },
    skusLists (state){
      return state.skusList
    },
    stores (state) {
      return state.stores
    },
    storeDetail (state) {
      return state.storeDetails
    },
    selStoreId (state){
      return state.sel_storeid
    },
    loadingState (state){
      return state.loadingState
    },
    percentageLoading(state){
      return state.percentageLoadingState
    },
    userError (state){
      return state.userError
    },
    snickError (state){
      return state.snickError
    },
    successMsg (state){
      return state.successMsg
    },
    successFlag (state){
      return state.successFlag
    }
  }
});





