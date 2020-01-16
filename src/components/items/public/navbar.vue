<template>
  
    <van-nav-bar
      :title="title"
      @click-right="onClickRight"
      :left-arrow="lflag"
      @click-left="onClickLeft"
       :right-text="rtext"
       :fixed=true
    >
      <img class="friend" :src="rightimg" alt slot="right" v-if="rightflag" />

     <van-icon name="cross"  slot="right" v-if="ricon" />
    </van-nav-bar>

</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    rightimg: {
      type: String
    },
    rightflag: {
      type: String
    },
    lflag: {
      type: Boolean
    },
    ricon:{
      dafault:false,
    },
    rtext:{
      type:String
    }
  },
  data() {
    return {
      fixed:""
    };
  },
  methods: {
    onClickRight() {
      this.$emit("ClickRight");
    },
    onClickLeft() {
      this.$router.go(-1);
      // var flag =  getTheFlagString("flag");
    //   if(flag == "h5"){
    //     history.go(-1);
    // }else if(android){
    //     window.androidDelegate.getCall();
    // }else if(ios){
    //     window.iosDelegate.getCall();
    // }
     // alert('hello')

    }
  },
  components: {}
};
</script>

<style scoped lang="less">
/* .nav{
  width: 100%;
  position:fixed;
  top: 0;
  left: 0;
} */
.van-nav-bar {
  background-color: #3fc4e5;
  height: 0.96rem;
  line-height: 0.96rem;
}
.van-nav-bar__title {
  font-size: 0.36rem;
  color: #ffffff;
  font-family: "SourceHanSansCN-Normal";
}
.friend {
  width: 0.48rem;
  height: 0.48rem;
  margin-right: 0.12rem;
  border: transparent;
}
.van-icon-arrow-left {
  color: #ffffff;
   margin-top: -.2rem;
margin-left: .16rem;
}
.van-icon-arrow-left:before{
  width: .14rem;
  height: .14rem;

transform: scale(1.7)
}
</style>
