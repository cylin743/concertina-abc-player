import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      tabs: ""
    }
  },
  actions: {
    updateTabs(context, status) {
        context.commit('TABS', status)     // mutation 中定義方法
    }
  },
  mutations: {
    TABS (state, status) {
        state.tabs = status;
    }
  }
})
export { store };