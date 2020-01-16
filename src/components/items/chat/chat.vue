<template>
  <div class="chat">
    <Navbar
      :title="title"
      @click-left="onClickLeft"
      :lflag="flag"
      :rightimg="rightimg"
      @ClickRight="onClickRight"
      :rightflag="rightflag"
    ></Navbar>
    <div class="complaint" v-if="iscomplaint" @click="complaint">投诉</div>
    <!-- <div class="answer" v-for="(item,index) in this.su" :key="index" ref="answer">
   <p>{{item.name}}:{{item.desc}}</p>
  
    </div>
    <h1 v-html="this.$refs.answer"></h1>-->
    <div class="chatcontent">
      <div class="bodychat chatting-content" ref="chattingContent" id="chattingContent">
        <h1 class="time">{{times}}</h1>
        <div class="content">
          <!-- 有个内容循环 -->
          <div v-for="(item,index) in filterContent()" :key="index">
            <div v-if="item.self" class="chatting-item self">
              <div
                class="msg-content"
                @click="question(item,index)"
                v-html="item.content"
                ref="share1"
              ></div>
            </div>

            <div v-else class="chatting-item other">
              <!-- <div class="msg-date">{{ item.date }}</div> -->
              <div class="msg-from">
                <!-- <img :src="item.avatarUrl" alt /> -->
                <img :src="headImg" alt />
                <!-- <span class="msg-author">{{ item.from }}</span> -->
              </div>
              <div
                class="msg-content"
                @click="question(item,index)"
                ref="share1"
                v-html="item.content"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="chatting-input">
      <input @keyup.enter="sendmsg" v-model.trim="inputContent" placeholder="请输入聊天内容" />
      <img src="../../../../static/imgs/add.png" alt="" @click="addimg"> <p @click="sendmsg">发送</p>
    </div>

     <div class="sendImg" v-if="issendimg">
     <van-uploader  :after-read="afterRead" >
  <img src="../../../../static/imgs/picture.png" alt="" icon="photo"> 
 
</van-uploader>
     </div>
   
  </div>
</template>
<script>
import qs from "qs";
import Navbar from "../public/navbar";

export default {
  props: {},
  data() {
    return {
      issendimg:false,
      iscomplaint: false,
      rightimg: "../../../../static/imgs/more.png",
      rightflag: "true",
      title: "",
      // rightimg: "/static/imgs/haoyou.png",
      // ricon: "true",右边删除先不要
      // rtext: "删除",
      flag: true,
      //user: "张文华",
      content: "测试内容",
      inputContent: "",
      oContent:null,
      websock: null,
      clientId: "",
      userId: this.$store.state.self.userId,
      toUserId: "",
      obj: {},
      message: "",
      headImg: "../../../../static/imgs/touxiang.png",
      fromContent: {},
      fromName: "",

      type: this.$route.params.type,
      nowIndex: this.$route.params.index,
      questionId: null,
      filterbefore: null,
      filterlist: [],
      list: [
        {
          name: "",
          headimg: "../../../../static/imgs/touxiang.png"
          //newmsg: "分享试题-【这是题干15个字内展】",
          //time: "14:53",
        },
        {
          name: "",
          headimg: "../../../../static/imgs/touxiang.png"
          //newmsg: "好的，我这边看完给你说",
          //time: "12-8",
        }
      ],
      msgs:
        (localStorage.msgs_chat && JSON.parse(localStorage.msgs_chat)) || [],
      times: "2019-12 -09",
      subject: {},
      src:""
      //user_id: this.$route.params.user_id,
      // isload: true
    };
  },
  watch: {
    msgs(val) {
      // this.filterlist =val.filter(function(item){
      //   return item.userid == this.$store.state.self.userId && item.from_user_id == this.toUserId
      // })
      localStorage.msgs_chat = JSON.stringify(val);
      // this.msgs = JSON.parse(localStorage.msgs_chat).filter( (va)=>{
      //     //console.log(val)
      //     return va.userid == this.userId && va.from_user_id == this.toUserId
      //   })
      //console.log(val)
    }
  },
  filters: {},
  computed: {
    // filterChat(){
    //      return JSON.parse(localStorage.msgs_chat).filter( (val)=>{
    //     //console.log(val)
    //     return val.userid == this.userId && val.from_user_id == this.toUserId
    //   })
    // }
    // message() {
    //   return this.$store.state.message;
    // }
    // fromContent() {
    //   return this.$state.store.fromContent;
    // }
  },
  methods: {
    addimg(){
   this.issendimg = true
    },
     afterRead(file) {
  // <a :href="item.msg" style="color: white;" v-if="item.type === 'file' ">
      console.log(file.file);
      let reader = new FileReader();
        reader.readAsDataURL(file.file)
      //this.src = file.file
      // let img = new Image()
      // img.src = file.content
      // this.inputContent =  `${img}`
       let img = document.createElement('img')
  //     console.log(img)
   img.setAttribute('src',reader.result)
      this.inputContent =img
      console.log( this.inputContent)
      this.sendmsg() 
     

    },
    question(item, index) {
      console.log(item.self);
      console.log(index);
      if (item.self) {
        console.log(this.$refs.share1[index].innerText);
        let length =  this.$refs.share1[index].innerText.split("|").length
     
        this.questionId = this.$refs.share1[index].innerText.split("|")[1];
       console.log(this.questionId)
        let isnum = /^[0-9]+$/.test(this.questionId);
        if (isnum && length>=2) {
          this.$router.push({ path: `/ShareTest/${this.questionId}` });
        }
      } else {
        this.questionId = this.$refs.share1[index].innerText.split("|")[0];
          console.log(this.questionId)
        let isnum = /^[0-9]+$/.test(this.questionId);
        if (isnum) {
          this.$router.push({ path: `/ShareTest/${this.questionId}` });
        }
      }
      //this.$router.push('/SelectFriend')
    },
    complaint() {   
      // this.$router.push({name:'Chat',params:{type:"friend",index:this.id}})
      this.$router.push({path:`/Complaint/${this.toUserId}`});
    },
    // 建立连接放在main
    initWebSocket() {
      if (typeof WebSocket === "undefined") {
        alert("您的浏览器不支持WebSocket");
        return false;
      }
      const wsuri = "ws://im.test:2346"; // websocket地址  ws://cechat.houhang.com:2346
      this.websock = new WebSocket(wsuri);
    },

    onClickRight() {
      console.log("右边事件");
      this.iscomplaint = true;
    },
    onClickLeft() {
      this.$router.go(-1);
    },
   
    sendmsg() {
      this.oContent.scrollTop = this.oContent.scrollHeight;
      console.log(this.oContent.scrollTop)
      this.axios
        .post(
          "/api/chat",
          qs.stringify({
            user_id: this.$store.state.self.userId,
            to_user_id: this.toUserId,
            content: this.inputContent,
            token: this.$store.state.self.token
          })
        )
        .then(res => {
          console.log(res.data);
          //console.log(this.inputContent)
        });

      console.log("发送消息");

      if (this.inputContent === "") {
        return;
      } else {
        this.msgs.push({
          userid: this.$store.state.self.userId,
          from_user_id: this.toUserId,
          //date: "2019-12-24",
          //loc: localStorage.addr,
          //from: this.fromName,
          content: this.inputContent,
          self: true
          //avatarUrl: this.avatarUrl
        });
        //聊天内容

        setTimeout(() => {
          this.$refs.chattingContent.scrollTop = this.$refs.chattingContent.scrollHeight;
        }, 0);

        this.inputContent = "";
        // setTimeout(
        //   () => (this.oContent.scrollTop = this.oContent.scrollHeight),
        //   0
        // );
      }
    },
    //过滤聊天内容
    filterContent(val) {
      return this.msgs.filter(val => {
        //console.log(val)
        return val.userid == this.userId && val.from_user_id == this.toUserId;
      });
    }
  },
  created() {
    //this.subject=this.$store.state.self.question.question.option

 window.addEventListener('scroll',()=>{
        // console.log('滚动条距离顶部'+document.documentElement.scrollTop||document.body.scrollTop);
        // console.log('可视区域'+document.documentElement.clientHeight ||document.body.clientHeight);
        // console.log('滚动条内容的总高度'+document.documentElement.scrollHeight||document.body.scrollHeight);
        let scrollTop = document.documentElement.scrollTop||document.body.scrollTop ;
        let clientHeight = document.documentElement.clientHeight || document.body.clientHeight ;
        let scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight ;
        if(scrollTop+clientHeight == scrollHeight){
            console.log("到底部了")
           
        }	
    })












    this.initWebSocket();
    this.websock.onopen = res => {
      console.log("已连接");
      setInterval(() => {
        //console.log(this.websock)
        this.websock.send(
          JSON.stringify({
            type: "ping"
          })
        );
      }, 19000);
    };

    this.websock.onmessage = res => {
      //接受对方传来的消息
      console.log(res.data);
      this.$store.state.objmsg = JSON.parse(res.data);
      if (this.$store.state.objmsg.type == "init") {
        console.log(this.$store.state.objmsg);
        this.clientId = this.$store.state.objmsg.client_id;
        this.$store.state.self.client_id = this.$store.state.objmsg.client_id;
        this.axios
          .post(
            "api/bind",
            qs.stringify({
              user_id: this.$store.state.self.userId,
              client_id: this.$store.state.self.client_id,
              token: this.$store.state.self.token
            })
          )
          .then(res => {
            console.log(res.data);
          });
      } else {
        this.fromContent = this.$store.state.objmsg;
        //console.log(this.fromContent);
        //this.fromName = this.fromContent;
        //console.log(this.fromContent);
        let chatContent = {
          userid: this.$store.state.self.userId,
          from_user_id: this.toUserId,
          content: this.fromContent.content,
          data: this.fromContent.send_time,
          headImg: this.headImg
        };
        //this.msgs.push(this.fromContent,userid);
        this.msgs.push(chatContent);
        //来自对方聊天内容
        //console.log(this.fromContent);
        setTimeout(() => {
          this.oContent.scrollTop = this.oContent.scrollHeight;
        }, 0);
      }
    };
    //console.log(this.$store.state.self.client_id);
    if (this.type === "news") {
      this.axios
        .post(
          "api/all",
          qs.stringify({
            user_id: this.$store.state.self.userId,
            token: this.$store.state.self.token
          })
        )
        .then(res => {
          console.log(res.data.data);
          this.list = res.data.data;
          this.title = this.list[this.nowIndex].username;
          this.toUserId = this.list[this.nowIndex].user_id;
          this.headImg = this.list[this.nowIndex].avatar;
          // this.isload = false;
        });
    } else if (this.type === "friend") {
      this.axios
        .post(
          "api/entry",
          qs.stringify({
            user_id: this.$store.state.self.userId,
            token: this.$store.state.self.token
            //to_user_id:this.to_user_id
          })
        )
        .then(res => {
          console.log(res.data.data);
          this.list = res.data.data;
          this.title = this.list[this.nowIndex].username;
          this.toUserId = this.list[this.nowIndex].user_id;
          this.headImg = this.list[this.nowIndex].avatar;
          // this.isload = false;
          //console.log(this.$route.params);
        });
    } else {
      this.axios
        .post(
          "api/entry",
          qs.stringify({
            user_id: this.$store.state.self.userId,
            token: this.$store.state.self.token
            //to_user_id:this.to_user_id
          })
        )
        .then(res => {
          this.list = res.data.data;
          this.title = this.list[this.nowIndex].username;
          this.toUserId = this.list[this.nowIndex].user_id;
          this.headImg = this.list[this.nowIndex].avatar;
          this.inputContent =
           
          
            "【点击答题】" +
            this.$store.state.self.question.question.title +
            "<br/>" +
            // `<li v-for="(item,index) in subject" :key="index">{{item.name}}:{{item.desc}}</li>`
            //JSON.stringify(this.$store.state.self.question)

            "A:" +
            this.$store.state.self.question.question.option[0].desc +
            "<br/>" +
            "B:" +
            this.$store.state.self.question.question.option[1].desc +
            "<br/>" +
            "C:" +
            this.$store.state.self.question.question.option[2].desc +
            "<br/>" +
            "D:" +
            this.$store.state.self.question.question.option[3].desc +
          "<span style='color:transparent;'>|"+ this.$store.state.self.question.question_id +"</span>"
          this.sendmsg();
        })
        .then(res => {
          //  this.title = this.list[this.nowIndex].username;
          //     this.toUserId = this.list[this.nowIndex].user_id;
          //     this.headImg = this.list[this.nowIndex].avatar;
          this.inputContent = this.$store.state.newFriend.leaveWord;
          this.sendmsg();
        });
    }
  },

  mounted() {
    //console.log(this.$refs.answer)
    console.log(this.$route.params);
   
      this.oContent =document.getElementById("chattingContent");
    // this.oContent = document.querySelector(".chatting-content");
    //   this.oContent.scrollTop = this.oContent.scrollHeight;

   
     setTimeout(() => {
      this.$refs.chattingContent.scrollTop = this.$refs.chattingContent.scrollHeight;
      
    }, 0);
   
  

    
   
   
 
  },
  components: {
    Navbar
  }
};
</script>

<style scoped lang='less'>
.sendImg{
  width: 7.2rem;
  height: 1.6rem;
  .van-uploader{
    margin-left: 3rem;
    margin-top: .39rem;
    img{
      width: .96rem;
      height: .85rem;
    }
  }
}

.chat {
  position: relative;
  .complaint {
    position: fixed;
    top: 0.9rem;
    right: 0.6rem;
    font-size: 0.32rem;
    color: black;
    padding: 0.2rem;
    border: 0.01rem #cccccc solid;
    background-color: #FFFFFF;
  }
}
.chatcontent {
  width: 7.2rem;
  //margin-bottom: 1rem;
  // overflow-x:auto;

  // overflow-y:hidden;
}
.chatting-content {
  height: 10.68rem;
  overflow: auto;
}
.van-icon {
  color: black;
}
.van-nav-bar__text {
  color: black;
}
/* #chattingContent {
  margin-bottom: 0.96rem;
} */
.bodychat {
  margin-top: 1.28rem;
  .time {
    font-size: 0.2rem;
    color: #999999;
    text-align: center;
    margin-top: 0.2rem;
    height: 0.6rem;
  }
}
.msg-content {
  border-radius: 0.25rem 0rem 0.3rem 0.25rem;
  max-width: 5.6rem;
  padding: 0.24rem 0.13rem 0.24rem 0.24rem;
}

.self {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 0.35rem;
  .msg-content {
    font-size: 0.28rem;
    color: #ffffffff;
    background-color: rgba(82, 229, 238, 1);
    margin-right: 0.32rem;
  }
}
.other {
  margin-top: 0.32rem;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 0.32rem;
  img {
    width: 0.81rem;
    height: 0.81rem;
    border-radius: 50%;
  }
  .msg-content {
    font-size: 0.28rem;
    color: #000000;
    //display: flex;
    background: rgba(242, 242, 242, 1);
    border-radius: 0.25rem 0rem 0.3rem 0.25rem;
    margin-left: 0.16rem;
    // padding: 0.24rem;
    // padding-right: 0;
    //  max-width: 5.6rem;
  }
}
/* .chatting-item{
  width: 4.8rem;
} */
.chatting-input {
  width: 7.2rem;
  // position: fixed;
  // bottom: 0;
  // left: 0;

  background: rgba(250, 250, 250, 1);
  padding-bottom: 0.12rem;
  input {
    width: 5.04rem;
    height: .7rem;
    border-radius: 0.2rem;
    outline: none;
    border: none;
    margin-left: 0.32rem;
  }
  p {
    margin-top: 0.3rem;
    color: #51e6ef;
    font-size: 0.36rem;
    display: inline-block;
    margin-left: 0.1rem;
    
  }
  img{
    width: .48rem;
    height: .48rem;
  }
}
</style>
