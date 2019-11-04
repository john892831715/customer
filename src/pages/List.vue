<template>
   <div class="list">
      <van-nav-bar
        title="商品详情"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
      <van-row>
          <van-col :span="6">
            <van-sidebar  v-model="activeKey" :offset-top="50">
              <van-sidebar-item 
                v-for="item in categories" 
                :key="item.id"  
                :title="item.name" 
                :value="item.id"
                @click="SidebarChangeHandler(item.id)" 
              />
            </van-sidebar>
          </van-col>
          <van-col :span="17"  style="text-algin:center;">
            <van-card 
              v-for="item in productCustomerFilter(categoryId)" :key="item.b"
              :num="item.number"
              :price="item.price"
              :desc="item.description"  
              :title="item.name"
              :thumb="item.photo" 
            >
            <div slot="footer">
              <van-stepper v-model="item.number" :min="0" @change="numberChangeHandler(item)" />
            </div>
          </van-card>
          </van-col>
        </van-row>
      <!-- {{info}} -->
      <van-submit-bar
        :price="total*100"
        button-text="提交订单"
        @submit="onSubmit"
      />
    </div> 
</template>
<script>
import {mapState,mapActions,mapGetters,mapMutations} from 'vuex'
export default {
  data(){
    return {
      activeKey:0,
      categoryId:''
    }
  },
  created(){
    this.categoryId = this.$route.query.categoryId;
    this.activeKey = this.$route.query.activeKey;
    this.queryProduct();
    this.findAllcategory();
  },
  computed:{
    ...mapState("category",["categories"]),
    ...mapState("product",["products"]),
    // ...mapState('user',['info','token']),
    ...mapGetters("product",["productCustomerFilter"]),
    ...mapGetters("shop_car",["total"])
  },
  methods:{
    ...mapActions("category",["findAllcategory"]),
    ...mapActions("product",["queryProduct"]),
    ...mapMutations("shop_car",["addShopCar"]),
    SidebarChangeHandler(categoryId){
      // console.log("List",categoryId);
      this.categoryId = categoryId;
    },
    onClickLeft(){
      this.$router.go(-1)
    },
    onSubmit(){
      this.$router.push({
        path:'/Confirm'
      })
    },
    numberChangeHandler(shops){
      // console.log(shops);
      let orderLine = {
        productId:shops.id,
        productName:shops.name,
        price:shops.price,
        number:shops.number
      }
      // console.log(orderLine);
      this.addShopCar(orderLine);
      // console.log(orderLine);
    }
  }
}
</script>
<style> 
  .list {
    height: 100%;
  }
  
</style>