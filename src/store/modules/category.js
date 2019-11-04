// import {get,post,post_array,post_json} from '../http/axios'
import {get, post_array,post} from '@/http/axios'
export default {
    namespaced:true,
    state:{
      categories:[],
      },
      //同步
      mutations:{
        // 需要接收一个参数，这个参数就是category
        refreshcategory(state,categories){
          // console.log("state ->" ,state); 
          // console.log("category",category);
          state.categories = categories;
        }
      },
      //异步
      actions:{
        //查询所有栏目信息
        async findAllcategory(context){
          let response = await get("/category/findAll");
          // console.log("response",response.data);
          //把信息设置到state.category中
          context.commit('refreshcategory',response.data)
        },
      }
}