import _ from 'lodash'
export default {
  namespaced:true,
  state:{
    // [{productId,productName,price,number}]
    orderLines:new Map()
  },
  getters:{
    // 计算总价,当orderLines发生变化时触发
    total(state){
      let result = 0;
      for(let orderLine of state.orderLines.values()){
        result +=  orderLine.price * orderLine.number;
      }
      return result;
    }
  },
  mutations:{
    // 添加购物测
    addShopCar(state,orderLine){
      // 如何订单项存在，修改number
      // if(state.orderLines.has(orderLine.productId)){
      //   state.orderLines.get(orderLine.productId).number = orderLine.number;
      // } else {
      //   // 如果订单项不存在，添加
      //   state.orderLines.set(orderLine.productId,orderLine)
      // }

      // id存在，则覆盖，number自动改变，id不存在，则添加
      state.orderLines.set(orderLine.productId,orderLine)
      // 克隆对象，改变引用地址，目的是为了让监听机制监听到orderLines的改变
      state.orderLines = _.clone(state.orderLines);
    },

    // 清空购物车
    clearShopCar(state){
      // alert("调用了clearShopCar方法");
      state.orderLines.clear();
      state.orderLines = _.clone(state.orderLines);
    },
  }

}