<template>
  <div class="confirm">
    <van-nav-bar
      title="订单确认"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
     
    
    <van-panel>
      <van-row>
        <van-col :span="6"><span style="text-algin:center;"><span style="text-algin:center;">顾客信息</span></span></van-col>
        <van-col :span="17" offset="6">
          <div>顾客ID：{{info.id}}</div>
          <div>姓名：{{info.name}}</div>
        </van-col>
      </van-row>
    </van-panel>
 
    
      <van-row>
        <van-col :span="6">地址信息</van-col>
        <van-col :span="17">
          <van-dropdown-menu active-color="#ee0a24">
            <van-dropdown-item v-model="value"  :options="addresses"  @change="toSelectHandler"/>
          </van-dropdown-menu>
        </van-col>
        <!-- <van-col :span="17" offset="6" v-for="item in addresses" :key="item.a">
          <div>{{item.province+" "+item.city+" "+item.area}}</div>
          <div>{{item.address}}</div>
        </van-col> -->
      </van-row>
    
 
    <van-panel>
      <van-row >
        <van-col :span="6">订单详情</van-col>
        <van-col :span="17" offset="6" v-for="item in orderLines.values()" :key="item.c">
          
          <div>产品：{{item.productName}}</div>
          <div>
            <span>价格：{{item.price}}</span>
            <span>数量：x {{item.number}}</span>
          </div>
        </van-col>
      </van-row>
    </van-panel>
    <!-- {{info}} -->
    <!-- {{addresses}} -->

    <div class="aaa">
      <van-button type="primary" size="large" @click="onSubmit">确认订单</van-button>
    </div>
  </div>
</template>
<script>
import {mapState,mapActions,mapMutations} from 'vuex'
export default {
  data(){
    return {
      chosenAddressId: '1',
      value:2228,
      id:''
    }
  },
  created(){
    this.findAllAddresses();
  },
  computed:{
    ...mapState('user',['info','token']),
    ...mapState('address',['addresses']),
    ...mapState('shop_car',['orderLines']),
    ...mapMutations('shop_car','clearShopCar')
  },
  methods:{
    ...mapActions('address',['findAllAddresses']),
    ...mapActions('order',['saveOrder']),
    onClickLeft(){
      this.$router.go(-1)
      // this.clearShopCar();
    },
    // 确认订单
    onSubmit(){
      this.saveOrder(this.id)
      .then((response)=>{
        this.$notify({ 
          type: 'success', 
          message: response.statusText 
        });
        this.$router.push({path:'/manager/order'})
      })
    },
    
    toSelectHandler(value){
      console.log(value);
      this.id = value;
    }
  }
}
</script>
<style scoped>
  .aaa {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
  
</style>