import {get,post} from '../../http/axios'
export default {
  namespaced:true,
  state: {
    addresses:[],
    list:[]
  },
  getters:{
    
  },
  mutations: {
    refreshAddresses(state,addresses){
      state.addresses = addresses;
    },
    refreshList(state,list){
      state.list = list;
    }
    
  },
  actions: {
    // 查询当前用户的所有地址
    async findAllAddresses({commit,rootState}){
      let id = rootState.user.info.id
      let response = await get('/address/findByCustomerId',{id});
      // console.log(response.data);
      // 为每个地址添加一个顾客name属性
      response.data.forEach(item=>{
        item.name = rootState.user.info.name;
        item.text = item.province+" "+item.city+" "+item.area+" "+item.address;
        item.value = item.id;
      })
      //自定义数组
      let list = [];
      response.data.forEach((item)=>{
        let obj = {
          id : item.id,
          customerId : item.customerId,
          name : item.name,
          tel : item.telephone,
          address : item.province+" "+item.city+" "+item.area+" "+item.address
        };
        list.push(obj)
      })
      //自定义数组
      // let selectList = [];
      // response.data.forEach((item)=>{
      //   let obj = {
      //     id : item.id,
      //     customerId : item.customerId,
      //     name : item.name,
      //     tel : item.telephone,
      //     address : item.province+" "+item.city+" "+item.area+" "+item.address,
      //     // text : item.province+" "+item.city+" "+item.area+" "+item.address,
      //     // value : item.id,
      //   };
      //   list.push(obj)
      // })
      // console.log(list);
      commit('refreshAddresses',response.data)
      commit('refreshList',list)

    },
    // 添加地址信息
    async saveOrUpdateAddress({dispatch,commit},obj){
      // 1. 提交请求
      let response = await post("/address/saveOrUpdate",obj)
      // 3. 刷新页面
      dispatch("findAllAddresses");
      // 4. 提示成功 react
      return response;
      // 成功通知
    },
    // 通过所选地址ID删除当前地址
    async deleteAddressById({dispatch},id){
      // alert(id);
      // 1. 删除地址信息
      let response = await get("address/deleteById?id="+id);
      // 2. 刷新
      dispatch("findAllAddresses")
      // 3. 提示成功
      return response;
    },
    
  }
}