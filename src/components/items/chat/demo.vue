<template>
  <div>
    <button @click="btnClick">点击</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      websock: null
    };
  },
  destroyed() {
    //页面销毁时关闭ws连接
    if (this.websock) {
      this.websock.close(); // 关闭websocket
    }
  },
  methods: {
    //初始化weosocket
    initWebSocket() {
      if (typeof WebSocket === "undefined") {
        alert("您的浏览器不支持WebSocket");
        return false;
      }
      const wsuri = "ws://localhost:2333"; // websocket地址
      this.websock = new WebSocket(wsuri);
      this.websock.onopen = this.websocketonopen;
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    //连接成功
    websocketonopen() {
      console.log("WebSocket连接成功");
    },
    //接收后端返回的数据
    websocketonmessage(e) {
      let dataJson = JSON.parse(e.data);
      console.log(dataJson);
      // 在这里使用后端返回的数据，对数据进行处理渲染
    },
    //连接建立失败重连
    websocketonerror(e) {
      console.log(`连接失败的信息：`, e);
      this.initWebSocket(); // 连接失败后尝试重新连接
    },
    //关闭连接
    websocketclose(e) {
      console.log("断开连接", e);
    },
    // 点击按钮
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
            client_id: "2",
            user_id: "3",
            to_user_id: "4",
            content: "heh",
            status: "1"
          };
          //发给后端的数据需要字符串化
          this.websock.send(JSON.stringify(obj));
          console.log(obj)
        }
      }, 500),
      this.axios.post('im.test/api/websocket/chat',{
            client_id: "2",
            user_id: "3",
            to_user_id: "4",
            content: "heh",
            status: "1"
      }).then((res)=>{
          console.log(res)
      })
    }
  }
};
</script>

<style scoped lang="less">
</style>
