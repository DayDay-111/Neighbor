import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        uid: ''
      },
    mutations:{
        setUid(state){
            state.uid = val
        },
        clearUid(state){
            state.uid = ''
        }
    }
    
})