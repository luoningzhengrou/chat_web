<template>
  <div id="app">
    <router-view />
    <!-- <h1>{{msg}}</h1> -->
    <!-- <h1>安卓传的数据是：{{msg}}</h1> -->

     <!-- <h1>ios传过来的数据是：{{iosmsg}} </h1> -->
    <!-- <h1>安卓给的数据{{msg}}</h1>
    <h1>{{msg1}}</h1> -->
    <!-- <Mymessage></Mymessage> -->
    <!-- <h1>ios传过来的数据是：{{iosmsg}} </h1> -->
  </div>
</template>

<script>
//import Mymessage from "@/components/items/mymessage/mymessage";
export default {
  name: "App",
  data() {
    return {
      obj: {},
      msg: "hello ios",
      iosmsg: "",
      msg1:"默认"
    };
  },
  beforeRouteEnter (to, from, next) {
    // ...
  },
  methods: {
    //ios交互
    callIosFunction(ios) {
      // this.msg = "哈哈"+ JSON.stringify(str)
      // return "ios 调用is成功"
      //this.iosmsg=JSON.parse(ios).token
      this.$store.commit('changeQuestion',JSON.parse(ios))
      //this.$store.state.self.question = JSON.parse(JSON.stringify(ios))
   this.iosmsg=this.$store.state.self.question.token
     // this.obj = this.$store.state.self.question;
      //  this.iosmsg =this.obj.type;
      // if (this.iosmsg  == '2') {
      //   this.msg1 ="改变了"
        
      //   this.$router.push("SelectFriend");
      // } else if (this.iosmsg  == '1') {
      //   this.msg1 ="改变了"
      //   this.$router.push("Mymessage");
      // }
    },
    //h5和安卓交互
    callJsFunction(android) {
      //this.msg = str;
      //this.msg1 ="改变了"
      this.$store.commit('changeQuestion',JSON.parse(JSON.stringify(android)))
      //this.$store.state.self.question = JSON.parse(JSON.stringify(str))
      //this.obj =  this.$store.state.self.question;
      //this.msg = this.obj.type
    //  判断先注释
      // if (this.msg == '2') {
      //   this.msg1 = "改变了"
       
      //   this.$router.push("SelectFriend");
       
      // }else if(this.msg == '1') {
        
      //    this.msg1 ="改变了"
      //    this.$router.push("Mymessage");
       
      // }

      //console.log(this.obj)
      //console.log(JSON.stringify(str))

      //return "js调用成功"
    }
    // initWebSocket() {
    //   if (typeof WebSocket === "undefined") {
    //     alert("您的浏览器不支持WebSocket");
    //     return false;
    //   }
    //   const wsuri = "ws://cechat.houhang.com:2346"; // websocket地址  原
    //   this.$store.state.websock = new WebSocket(wsuri);

    // },
  },
  created() {
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload",()=>{
        sessionStorage.setItem("store",JSON.stringify(this.$store.state))
    })
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store") ) {
        this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))

        console.log(this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store")))))
    } 

  },
components: {
  //  Mymessage
  },
  mounted() {
    //ios
    window.callIosFunction = this.callIosFunction;
    //安卓
    //window.callJsFunction = this.callJsFunction;
    
    /*     this.initWebSocket();
    this.$store.state.websock.onopen = res => {
      console.log("已连接")
      setInterval(() => {
        //console.log(this.$store.state.websock)
        this.$store.state.websock.send(
          JSON.stringify({
           "type": "ping"
          })
        );
      }, 5000);
     console.log("定时器")
    }; */
  }
};
</script>
<style>
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
