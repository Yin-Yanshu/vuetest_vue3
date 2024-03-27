import { createStore } from 'vuex';

export default createStore({
  state: {
    user_id: null,
    user_name: null,
    token: null,
  },
  getters: {
  },
  mutations: {
    Update_user_id(state, value) {
      state.user_id = value;
    },
    Update_user_name(state, value) {
      state.user_name = value;
    },
    Update_token(state, value) {
      state.token = value;
    },
  },
  actions: {
    updateUser({ commit }, payload) {
      commit('Update_user_id', payload.user_id);
      commit('Update_token', payload.token);
    },

    updateAdmin({ commit }, payload) {
      commit('Update_user_id', payload.user_id);
    }
  },
  modules: {
  }
});
