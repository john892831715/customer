import {get,post_json,post} from '../../http/axios'
import {getToken,setToken,removeToken} from '../../utils/auth'
export default{
    namespaced:true,
    state: {
      token:getToken(),
      info:{} //用户登录信息
    },
    mutations: {
      refreshToken(state,token){
        state.token = token;
      },
      refreshInfo(state,info){
        state.info = info;
      }
    },
    actions:{
      async login(context,payload){
        //1、登录
        let response = await post_json("/user/login",payload);
        let token = response.data.token;
        //0、将token设置到状态机里头
        context.commit('refreshToken',token);
        //1、token缓存到本地
        setToken(token)
        //通过token获取用户基本信息
        await context.dispatch("info",token);
      },
      //通过token获取用户基本信息
      async info(context,token){
        let response = await get("user/info",{token});
        //2、将用户信息设置到info中
        context.commit("refreshInfo",response.data);
      },
      //退出
      async logout(context){
        //1、请求后台退出
        await post("/user/logout");
        //2、移除本地缓存中的token
        removeToken();
        //3、移除状态机中的token以及info
        context.commit("refreshInfo",null);
        context.commit("refreshToken","");
      }
    } 
   
  }