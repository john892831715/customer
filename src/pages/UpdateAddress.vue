<template>
  <div class="updateaddress">
    <van-nav-bar
      title="地址列表"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- {{info}} -->
    <van-address-edit
      :address-info="item"
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      show-search-result
      :columns-num="3"
      area-columns=""
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>
<script>
import {mapState,mapActions,mapMutations} from 'vuex'
export default {
  data() {
    return {
      item:{},
      areaList:{
        province_list: {
          110000: '北京市',
          120000: '天津市',
          360000: '江西省',
          370000: '山东省',
          410000: '河南省',

        },
        city_list: {
          110100: '北京市',
          110200: '县',
          120100: '天津市',
          120200: '县',
          360100: '南昌市',
          360200: '景德镇市',
          370100: '济南市',
          370200: '青岛市',
          410100: '郑州市',
          410200: '开封市',
        },
        county_list: {
          110101: '东城区',
          110102: '西城区',
          110105: '朝阳区',
          110106: '丰台区',
          120101: '和平区',
          120102: '河东区',
          120103: '河西区',
          120104: '南开区',
          120105: '河北区',
          360102: '东湖区',
          360103: '西湖区',
          360202: '昌江区',
          360203: '珠山区',
          370102: '历下区',
          370103: '市中区',
          370202: '市南区',
          370203: '市北区',
          410102: '中原区',
          410103: '二七区',
          410202: '龙亭区',
          410203: '顺河回族区',
          410204: '鼓楼区',
          410205: '禹王台区',
          // ....
        }
      }
    }
  },
  created(){
    this.item = this.$route.query.item;
  },
  computed:{
    ...mapState('user',['info','token']),
  },
  methods: {
    ...mapActions('address',['saveOrUpdateAddress','deleteAddressById']),
    onClickLeft(){
      this.$router.go(-1)
    },
    onSave(form) {
      // console.log(form);
      //自定义数组
      let obj = {};
      if(this.item){
        
        obj = {
          id : this.item.id,
          province : form.province,
          city : form.city,
          area : form.county,
          address : form.addressDetail,
          telephone : form.tel,
          customerId : this.info.id
        };
      } else {
        obj = {
          province : form.province,
          city : form.city,
          area : form.county,
          address : form.addressDetail,
          telephone : form.tel,
          customerId : this.info.id
        };
      }
      console.log(obj);
      this.saveOrUpdateAddress(obj)
      .then((response)=>{
        this.$notify({ 
          type: 'success', 
          message: response.statusText 
        });
        this.$router.push({path:'/AddAddress'})
      })
      
    },
    onDelete(addresss) {
      // 获取当前地址ID
      // alert(addresss.id);
      this.deleteAddressById(addresss.id)
      .then((response)=>{
        this.$notify({ 
          type: 'success', 
          message: response.statusText 
        });
        this.$router.push({path:'/AddAddress'})
      })
      
    },
    
    
  }
}
</script>
<style >
  
</style>