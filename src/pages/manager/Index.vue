<template>
   <div class="manager">
       <!-- (后台管理总页面)主要用于接收管理页面，首页，订单页，我的页面-->
       <router-view></router-view>
       <!-- 标签导航栏 -->
        <div>    
            <!-- <router-link to="/manager/home">首页</router-link>
            <router-link to="/manager/order">订单</router-link>
            <router-link to="/manager/user">我的</router-link> -->
            <van-tabbar v-model="active" @change="tobChangeHandler">
                <van-tabbar-item name="/manager/home" icon="star-o">首页</van-tabbar-item>
                <van-tabbar-item name="/manager/order" icon="orders-o">订单</van-tabbar-item>
                <van-tabbar-item name="/manager/user" icon="user-o">我的</van-tabbar-item>
            </van-tabbar>
        </div>
        <!-- 标签栏结束 -->
    </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
import {getToken} from '../../utils/auth'
export default {
    created(){
        let token = getToken();
        if(token){
            this.info(token)
        } else{
            this.$toast("token失效")
            this.$router.push('/')
        }
    },
    //底部标题栏
    data(){
        return {
            active:0
        }
    },
    computed:{
      ...mapState('user',['token'])
    },
    methods: {
        ...mapActions('user',['info']),
        tobChangeHandler(path){
            this.$router.push({path})
        },
    }
}
</script> 