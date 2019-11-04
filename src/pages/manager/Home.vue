<template>
    <div class="home">
      <van-row>
          <img style="width:100%;" src="../../assets/images/shoutu.png" alt="">
      </van-row>
      <van-row>
        <!-- {{categories}} -->
        <van-grid :column-num="4">
          <van-grid-item
            v-for="(item,index) in categories"
            :key="item.id"
            :icon="item.icon"
            :text="item.name"
            @click="GridChangeHandler(item.id,index)"
          />
        </van-grid>
      </van-row>
    </div> 
</template>
<script>
 import {mapState,mapActions} from 'vuex'
export default {
  created(){
    this.findAllcategory();
  },
  computed:{
    // ...mapState("user",["info"]),
    ...mapState("category",["categories"])
  },
  methods:{
    ...mapActions("category",["findAllcategory"]),
    GridChangeHandler(categoryId,activeKey){
      // console.log("categoryId",categoryId);
      
      this.$router.push({
        path:"/List",
        query:{categoryId,activeKey}
      })
    }
  }
}
</script> 