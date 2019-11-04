import {get,post_obj_array} from '../../http/axios'
import moment from 'moment'

export default {
  namespaced:true,
  state:{
    orders:[]
  },
  getters:{
    orderStatusFilter(state){
      return (status)=>{
        return state.orders.filter(item=>item.status === status)
      }
    }
  },
  mutations:{
    refreshOrders(state, orders){
      state.orders = orders;
      // console.log(orders);
    }
  },
  actions:{
    // 查询当前用户的所有订单
    async findAllOrders({commit,rootState}){
      let customerId = rootState.user.info.id
      let response = await get('/order/query',{customerId});
      response.data.forEach((item,index)=>{
        // 时间转换
        response.data[index].time = moment(item.orderTime).format('YYYY-MM-DD HH:mm:ss')
        // console.log(item.time);
      })
      commit('refreshOrders',response.data)
    },
     // 保存订单信息
     async saveOrder({commit,rootState},id){
      //  alert(id);
      // 1. 组合数据
      let data = {
        customerId : rootState.user.info.id,
        addressId : id,
        orderLines : Array.from(rootState.shop_car.orderLines.values())
      }
      console.log(data);
      // 2. 调用后台接口完成保存
      let response = await post_obj_array('/order/save',data)
      // 3. 清空购物车(order ---> shop_car)
      commit('shop_car/clearShopCar',null,{root:true})//参考 Vuex官方文档中的Module中的全局命名空间
      return response;
    },
    //确认订单
    async confirmOrder({dispatch},orderId){
      let response = await get("/order/confirmOrder",{orderId});
      // 刷新
      dispatch("findAllOrders");
      return response;
    }
  }
}