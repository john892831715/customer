<template>
   <div class="order">
      <van-tabs v-model="active">
          <van-tab title="全部订单">
            <van-panel v-for="item in orders" :key="item.a">
              <van-row>
                <van-col :span="3" style="text-align:center;font-size:16px;"><van-icon name="send-gift-o" /></van-col>
                <van-col :span="17">订单号： {{item.id}}</van-col>
                <van-col :span="4"><span style="color:red">{{item.status}}</span></van-col>
              </van-row>
              <van-row>
                <van-col :span="3" style="text-align:center;font-size:16px;"><van-icon name="clock-o" /></van-col>
                <van-col :span="20">下单时间： {{item.time}}</van-col>
              </van-row>
              <van-row>
                <van-col :span="3" style="text-align:center;font-size:16px;"><van-icon name="gold-coin-o" /></van-col>
                <van-col :span="20">金额： <span style="color:red">{{item.total}}</span></van-col>
              </van-row>
              <van-row>
                <van-col :span="3" style="text-align:center;font-size:16px;"><van-icon name="logistics" /></van-col>
                <van-col :span="20">地址： {{item.address.province+" "+item.address.city+" "+item.address.area}}</van-col>
              </van-row>
              <div v-show="item.status == '待确认'" style="text-align:right;margin-right:16px;">
                <van-button size="small" type="danger"  @click="confirmHandler(item.id)">确认完成</van-button>&nbsp; 
              </div>
            </van-panel>
          </van-tab>
          <van-tab title="待派单">
            <van-panel v-for="item in orderStatusFilter('待派单')" :key="item.a">
              <van-row>
                <van-col :span="3" style="text-align:center;font-size:16px;"><van-icon name="send-gift-o" /></van-col>
                <van-col :span="17">订单号： {{item.id}}</van-col>
                <van-col :span="4"><span style="color:red">{{item.status}}</span></van-col>
              </van-row>
              <van-row>
                <van-col :span="3" style="text-align:center;font-size:16px;"><van-icon name="clock-o" /></van-col>
                <van-col :span="20">下单时间： {{item.time}}</van-col>
              </van-row>
              <van-row>
                <van-col :span="3" style="text-align:center;font-size:16px;"><van-icon name="gold-coin-o" /></van-col>
                <van-col :span="20">金额： <span style="color:red">{{item.total}}</span></van-col>
              </van-row>
              <van-row>
                <van-col :span="3" style="text-align:center;font-size:16px;"><van-icon name="logistics" /></van-col>
                <van-col :span="20">地址： {{item.address.province+" "+item.address.city+" "+item.address.area}}</van-col>
              </van-row>
              <div v-show="item.status == '待确认'" style="text-align:right;margin-right:16px;">
                <van-button size="small" type="danger" @click="confirmHandler(item.id)">确认完成</van-button>&nbsp; 
              </div>
            </van-panel>
          </van-tab>
          <van-tab title="待服务">
            <van-panel v-for="item in orderStatusFilter('待服务')" :key="item.a">
              <van-row>
                <van-col :span="3" style="text-align:center;font-size:16px;"><van-icon name="send-gift-o" /></van-col>
                <van-col :span="17">订单号： {{item.id}}</van-col>
                <van-col :span="4"><span style="color:red">{{item.status}}</span></van-col>
              </van-row>
              <van-row>
                <van-col :span="3" style="text-align:center;font-size:16px;"><van-icon name="clock-o" /></van-col>
                <van-col :span="20">下单时间： {{item.time}}</van-col>
              </van-row>
              <van-row>
                <van-col :span="3" style="text-align:center;font-size:16px;"><van-icon name="gold-coin-o" /></van-col>
                <van-col :span="20">金额： <span style="color:red">{{item.total}}</span></van-col>
              </van-row>
              <van-row>
                <van-col :span="3" style="text-align:center;font-size:16px;"><van-icon name="logistics" /></van-col>
                <van-col :span="20">地址： {{item.address.province+" "+item.address.city+" "+item.address.area}}</van-col>
              </van-row>
              <div v-show="item.status == '待确认'" style="text-align:right;margin-right:16px;">
                <van-button size="small" type="danger" @click="confirmHandler(item.id)">确认完成</van-button>&nbsp; 
              </div>
            </van-panel>
          </van-tab>
          <van-tab title="待确认">
            <van-panel v-for="item in orderStatusFilter('待确认')" :key="item.a">
              <van-row>
                <van-col :span="3" style="text-align:center;font-size:16px;"><van-icon name="send-gift-o" /></van-col>
                <van-col :span="17">订单号： {{item.id}}</van-col>
                <van-col :span="4"><span style="color:red">{{item.status}}</span></van-col>
              </van-row>
              <van-row>
                <van-col :span="3" style="text-align:center;font-size:16px;"><van-icon name="clock-o" /></van-col>
                <van-col :span="20">下单时间： {{item.time}}</van-col>
              </van-row>
              <van-row>
                <van-col :span="3" style="text-align:center;font-size:16px;"><van-icon name="gold-coin-o" /></van-col>
                <van-col :span="20">金额： <span style="color:red">{{item.total}}</span></van-col>
              </van-row>
              <van-row>
                <van-col :span="3" style="text-align:center;font-size:16px;"><van-icon name="logistics" /></van-col>
                <van-col :span="20">地址： {{item.address.province+" "+item.address.city+" "+item.address.area}}</van-col>
              </van-row>
              <div v-show="item.status == '待确认'" style="text-align:right;margin-right:16px;">
                <van-button size="small" type="danger" @click="confirmHandler(item.id)">确认完成</van-button>&nbsp; 
              </div>
            </van-panel>
          </van-tab>
          <van-tab title="已完成">
            <van-panel v-for="item in orderStatusFilter('已完成')" :key="item.a">
              <van-row>
                <van-col :span="3" style="text-align:center;font-size:16px;"><van-icon name="send-gift-o" /></van-col>
                <van-col :span="17">订单号： {{item.id}}</van-col>
                <van-col :span="4"><span style="color:red">{{item.status}}</span></van-col>
              </van-row>
              <van-row>
                <van-col :span="3" style="text-align:center;font-size:16px;"><van-icon name="clock-o" /></van-col>
                <van-col :span="20">下单时间： {{item.time}}</van-col>
              </van-row>
              <van-row>
                <van-col :span="3" style="text-align:center;font-size:16px;"><van-icon name="gold-coin-o" /></van-col>
                <van-col :span="20">金额： <span style="color:red">{{item.total}}</span></van-col>
              </van-row>
              <van-row>
                <van-col :span="3" style="text-align:center;font-size:16px;"><van-icon name="logistics" /></van-col>
                <van-col :span="20">地址： {{item.address.province+" "+item.address.city+" "+item.address.area}}</van-col>
              </van-row>
              <div v-show="item.status == '待确认'" style="text-align:right;margin-right:16px;">
                <van-button size="small" type="danger" @click="confirmHandler(item.id)">确认完成</van-button>&nbsp; 
              </div>
            </van-panel>
          </van-tab>
      </van-tabs>
      <!-- {{orders}} -->
    </div> 
</template>
<script>
import { mapActions, mapState ,mapGetters} from 'vuex'
export default {
  data(){
    return {
      active:0
    }
  },
  computed:{
    ...mapState('order',['orders']),
    ...mapGetters('order',['orderStatusFilter'])
  },
  created(){
    this.findAllOrders();
  },
  methods:{
    ...mapActions('order',['findAllOrders','confirmOrder']),
    confirmHandler(id){
      //console.log(id);
    this.confirmOrder(id);
      
    }
  }
}
</script>
