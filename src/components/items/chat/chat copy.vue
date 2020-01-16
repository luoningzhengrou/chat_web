<template>
  <div>
    <van-nav-bar title="我的好友" left-arrow right-text="删除" @click-left="onClickLeft" />
    <p>
      <input type="text" ref="message" @blur="add" />
      <button @click="btnClick">点击发送</button>

      <button @click="test">测试点击</button>
    </p>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  props: {},
  data() {
    return {
      user: "张文华",
      // 用户Id
      client_id: "1",
      user_id: "2",
      to_user_id: "3",
      content: "hello",
      status: "1",
      websock:null
      //token:"hehe",
      // 事件类型
      //   type: "",
      //   msg: "",
      //   wsUrl: ""
    };
  },
  methods: {
    test(){
      console.log('test')
       this.axios.post('/api/api/im/bind',qs.stringify({
            client_id: "2",
            user_id: "3",
      })).then((res)=>{
          console.log(res.data)
      })
    },
    add() {
      console.log(this.$refs.message.value);
      this.axios.post('/api/api/im/bind',qs.stringify({
            client_id: "2",
            user_id: "3",
      })).then((res)=>{
          console.log(res.data)
      })
    },
    btnClick() {
      // 因为需求是每次点击都是发起不同ws连接，拿到的数据也不一致，所以连接前要先断开上次的连接
      if (this.websock) {
        this.websock.close(); // 关闭websocket连接
      }
      this.initWebSocket(); // 初始化weosocket，发起连接
      // 这里使用定时器是为了等待连接后才发送数据，避免错误
      setTimeout(() => {
        //添加状态判断，当为OPEN时，前端发送消息给后端
        if (this.websock.readyState === 1) {
          // 把后台需要的参数数据传过去
          let obj = {
           
            user_id: "3",
            to_user_id: "4",
            content: "hehe",
      
          };
          //发给后端的数据需要字符串化
          this.websock.send(JSON.stringify(obj));
        }
      }, 500);
       this.axios.post('api/api/im/chat',qs.stringify({
            user_id: "3",
            to_user_id: "4",
            content: "heh",
            
      })).then((res)=>{
          console.log(res)
      })
    },
    onClickLeft() {
      // this.$router.go(-1);
      // this.axios
      //   .post("https://api.apiopen.top/getJoke", {
      //     page: "1",
      //     count: "2",
      //     type: "video"
      //   })
      //   .then(res => {
      //     console.log(res.data);
      //   });
    },
    //初始化weosocket
    initWebSocket() {
      if (typeof WebSocket === "undefined") {
        alert("您的浏览器不支持WebSocket");
        return false;
      }
      const wsuri = "ws://im.test:2346"; // websocket地址
      //'ws://im.test:2346/websocket/' + this.client_id + '/' + this.user_id+'/'+this.to_user_id +'/'+this.content +'/'+this.status;
      this.websock = new WebSocket(wsuri);
      this.websock.onopen = this.websocketonopen;
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    //连接成功
    websocketonopen() {
      console.log("WebSocket连接成功");
      // 添加心跳检测，每30秒发一次数据，防止连接断开（这跟服务器的设置有关，如果服务器没有设置每隔多长时间不发消息断开，可以不进行心跳设置）
      let self = this;
      this.timer = setInterval(() => {
        try {
          let obj = {
            client_id: "2",
            user_id: "3",
            to_user_id: "4",
            content: "heh",
            status: "1"
          };
          //self.websock.send(JSON.stringify(obj));
          self.websocket.send('haha')
          console.log("发送消息");
        } catch (err) {
          console.log("断开了：" + err);
          //self.connection();
        }
      }, 30000);

       this.axios.post('/api/api/im/bind',qs.stringify({
            client_id: "2",
            user_id: "3",
      })).then((res)=>{
          console.log(res)
      })
    },
    //接收后端返回的数据，可以根据需要进行处理
    websocketonmessage(e) {
      var vm = this;
      let data1Json = JSON.parse(e.data);
      console.log(data1Json);
    },
    //连接建立失败重连
    websocketonerror(e) {
      console.log(`连接失败的信息：`, e);
      this.initWebSocket(); // 连接失败后尝试重新连接
    },
    //关闭连接
    websocketclose(e) {
      console.log("断开连接", e);
    }
  },
  created() {
    if (this.websock) {
      this.websock.close(); // 关闭websocket连接
    }
    this.initWebSocket();
  },
  destroyed() {
    //页面销毁时关闭ws连接
    if (this.websock) {
      this.websock.close(); // 关闭websocket
    }
  },

  components: {}
};
</script>

<style scoped >
.van-icon {
  color: black;
}
.van-nav-bar__text {
  color: black;
}
</style>
