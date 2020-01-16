<template>
  <div>
    <Navbar :title="title" :lflag="lflag"></Navbar>
    <div class="permisson">
      <!-- :class="{isactive:item.status == 1}" -->
      <van-cell-group v-bind:class="[{active: checkedph } ,{nactive:!checkedph}]">
        <van-switch-cell
         v-model="checkedph"
          active-color="#fff"
          title="显示手机号"
          @change="permission"
        />
      </van-cell-group>
      <van-cell-group v-bind:class="[{active: checkedsex } ,{nactive:!checkedsex}]">
        <van-switch-cell v-model="checkedsex" active-color="#fff" title="显示性别" />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
//[{active: checkedsex } ,{nactive:!checkedsex}]
import qs from "qs";
import Navbar from "../public/navbar";
export default {
  props: {},
  data() {
    return {
      title: "好友权限",
      lflag: true,
      checkedph:true,
      checkedsex: true,
      toUserId: this.$route.params.toUserId,
      status:null
    };
  },
  methods: {
    permission() {
      this.axios
        .post(
          "api/shield",
          qs.stringify({
            user_id: this.$store.state.self.userId,
            to_user_id: this.toUserId,
            token: this.$store.state.self.token
          })
        )
        .then(res => {
          console.log(res.data.data);
         
          if(this.checkedph==false){
          
          //this.status = "0"
           this.status =0
        }else if(this.checkedph==true){
        //this.checkedph=true
        this.status =1
            //this.status = "1"
        }else{
          return
        }
        });
    }
  },
  mounted() {
    console.log(this.$route.params.toUserId);
    this.axios
        .post(
          "api/pStatus",
          qs.stringify({
            user_id: this.$store.state.self.userId,
            to_user_id: this.toUserId,
            token: this.$store.state.self.token
          })
        )
        .then(res => {
          //console.log(res.data.data);
        //this.status =res.data.data.status
        //console.log(this.status)
        console.log(res.data.data)
          this.status = res.data.data.status
          console.log(typeof this.status)

            if(this.status==0){
          this.checkedph= false
          //this.status = "0"
           //this.status =0
        }else if(this.status==1){
        this.checkedph=true
        //this.status =1
            //this.status = "1"
        }else{
          return
        }
        });
    

//    if(this.status ==="0"){
// this.checkedph=false
//    }else{
// this.checkedph= true
//    }



},
  components: {
    Navbar
  }
};
</script>

<style scoped lang="less">
.permisson {
  margin-top: 0.96rem;

  .active {
    .van-switch__node {
      background-color: #33cc66;
    }
    .van-switch {
      border: 0.01rem solid #33cc66;
    }
  }
  .nactive {
    .van-switch__node {
      background-color: #cccccc;
    }
    .van-switch {
      border: 0.01rem solid #cccccc;
    }
  }
}
</style>
