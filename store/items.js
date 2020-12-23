import nuxtStorage from 'nuxt-storage';

export const state = () => ({
  items: [],
  cartItems: nuxtStorage.localStorage.getData('cartItems') || []
})

export const mutations = {
  setItems(state, items) {
    state.cartItems = items
  },
  createCartItem(state,item) {
    state.cartItems.push(item)
    nuxtStorage.localStorage.setData('cartItems', JSON.stringify(state.cartItems))
  },
  deleteCartItem(state, id){
    const idx = state.cartItems.findIndex(t => t.id === id)
    state.cartItems.splice(idx, 1)
    localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
  },
}

export const actions = {
  setItems({commit}, items){
    commit('setItems', items)
  },
  createCartItem({commit}, item) {
    commit('createCartItem', item)
  },
  deleteCartItem({commit}, id){
    commit('deleteCartItem', id)
  }
}
export const getters = {
  items: s => s.items,
  cartItems: s => s.cartItems,
  itemById: s => id => s.cartItems.find(t => t.id === id)
}
