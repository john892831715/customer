import {post} from '../../http/axios'
export default {
  namespaced:true,
  state: {
    products:[]
  },
  getters:{
    productCustomerFilter(state){
      return (categoryId)=>{
        return state.products.filter(item=>item.categoryId === categoryId)
      }
    }
  },
  mutations: {
    refreshProducts(state,products){
      state.products = products;
    }
  },
  actions: {
    async queryProduct({commit}){
      let response = await post('/product/query',{page:0,pageSize:200})
      // 为每个产品添加一个number属性
      response.data.list.forEach(item=>{
        item.number = 0;
      })
      commit('refreshProducts',response.data.list);
    }
  }
}