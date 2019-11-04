<template>
  <div class="addaddress">
    <van-nav-bar
      v-model="chosenAddressId"
      title="我的地址"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- list:{{list}} -->
    <van-address-list
      :list="list"
      @add="onAdd"
      @edit="onEdit"
    />
  </div>
</template>
<script>
import {mapState,mapActions,mapMutations} from 'vuex'
    export default {
      data(){
        return{
          chosenAddressId:0
        }
      },
      created(){
        this.findAllAddresses();
        // this.createList();
      },
      computed:{
        ...mapState('address',['addresses','list']),
      },
      methods:{
        ...mapActions('address',['findAllAddresses']),
        ...mapMutations('address','refreshList'),
        onClickLeft(){
          this.$router.push({path:'/manager/User'})
        },
        onAdd() {
          this.$router.push({path:'/UpdateAddress'})
        },

        onEdit(item,key) {
          // console.log(item);
          this.$router.push({
            path:'/UpdateAddress',
            query:{item,key}
          })
        },
        
      }
    }
</script>
<style >

</style>