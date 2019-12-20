import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        profile: {}
      },
    mutations:{
        setprofile(state,payload){
            state.profile = payload.profile
        },
        clearprofile(state){
            state.profile = ''
        }
    }
    
})