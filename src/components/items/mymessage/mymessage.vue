<template>
  <div>
   
    <Navbar
      :title="title"
      :rightimg="rightimg"
      @ClickRight="onClickRight"
      :rightflag="rightflag"
      :lflag="flag"
      right-text="删除"
    >
    </Navbar>
    <div class="myfriend" v-if="islist">
      <ul v-for="(item,index) in list" :key="index">
          <li>
            <van-swipe-cell :border=false>
           <router-link :to='"/Chat/"+type+ "/" +index'>
              <van-cell :border=false>
                <template slot="title" :border=false>
                  <img :src="item.avatar" alt class="left" />
                  <div class="center">
                    <div class="content">
                      <h1>{{item.username}}</h1>
                      <div class="right">{{item.messages[item.messages.length-1].send_time |timefilter}}</div>
                    </div>                     
                    <p>{{item.messages[item.messages.length-1].content}}</p>
                  </div>
                </template>
              </van-cell>
             </router-link>
              <template slot="right" :border=false>
                <van-button square color="#FF8282" class="del" text="删除" @click="remove" />
                <van-button square color="#F2F2F2" text="置顶" @click="top(index)" />
              </template>
            </van-swipe-cell>

              <!-- <h1>{{item.messages[item.messages.length-1].send_time }}</h1> -->
          </li>
      </ul>
    </div>
    <div class="load">
        <van-loading type="spinner" color="#3FC4E5" v-if="isload" />
    </div>
       <!-- <h1>消息</h1> -->
     <!-- <button @click="test1">跳转好友</button> -->
     <!-- <button @click="change">改变状态</button> -->
   
  </div>
</template>

<script>
import qs from "qs";
import Navbar from "../public/navbar";
export default {
  props: {},
  data() {
    return {
       isload:true,
        islist:false,
      type:"news",
      id: null,
      title: "我的消息",
      rightimg: "../../../../static/imgs/friend.png",
      rightflag: "true",
      flag: false,
      websock: null,
      //name:'haha',
      obj: {},
      // userId: "46",
      // messages:[],
      up_user_id:"",
      friendMsg: (localStorage.locMsg && JSON.parse(locMsg)) || [],
      //如果List为空跳转到选择好友聊天，如果好友列表为空再跳转到添加好友
      list: [
        {
        //   username: "王文华",
          avatar: "../../../../static/imgs/touxiang.png",
        //   newmsg: "分享试题-【这是题干15个字内展】",
        //   time: "14:53",
        //  user_id:"1",
         messages:[
           {send_time:"",content:""}
         ]
        },
        {
          // username: "张雯雯",
          avatar: "../../../../static/imgs/touxiang.png",
          // newmsg: "好的，我这边看完给你说",
          // time: "12-8",
          // user_id:"2",
           messages:[{send_time:"",content:""}]
        }
      ]
    };
  },
  filters:{
    timefilter(val){
      //console.log(this.$moment(val).format('YYYY-DD-MM'))
       console.log(val.slice(-8,-3))
       return val.slice(-8,-3)
    }
  },
  watch: {
    friendMsg(val) {
      localStorage.locMsg = JSON.stringify(val);
    }
  },
  //好友消息列表渲染
  methods: {
    change(){
  this.$store.commit('changeMsg',"119")
    },
    //置顶
    top(index){
      this.up_user_id= this.list[index].user_id
       console.log("当前人的id:" +this.up_user_id)
      this.axios.post('api/up',qs.stringify({
      user_id:this.$store.state.self.userId,
      up_user_id: this.up_user_id,
      token:this.$store.state.self.token 
    })).then(res=>{
      console.log(res.data.data)
    })
    },
    remove(){
    console.log('删除')
    },
    test1(){
      this.$router.push("SelectFriend")
      // this.axios
      //   .post(
      //     "http://app.houhang.com/index/share/question",
      //     qs.stringify({
      //      question_id: 770,
      //     })).then(res=>{
      //     console.log(res.data)
      //   })
    },
    //滑动
    // beforeClose({ position, instance }) {
    //   switch (position) {
    //     case "left":
    //     case "cell":
    //     case "outside":
    //       instance.close();
    //       break;
    //     case "right":
    //       Dialog.confirm({
    //         message: "确定删除吗？"
    //       }).then(() => {
    //         instance.close();
    //         console.log('置顶')
    //       });
    //       break;
    //   }
    // },
    onClickRight() {
      //alert('跳转我的好友')
      this.$router.push("/Myfriend");
    },
    // test() {
    //   console.log("test");
    //   localStorage.setItem("name", "小智");
    //   this.name = localStorage.getItem("name");

    //   this.$store.commit("changeName", this.name);
    //   localStorage.name = this.name;
    // },
    // remove() {
    //   localStorage.removeItem("name");
    // }
  },
  //  destroyed() {
  //   //页面销毁时关闭ws连接
  //   if (this.websock) {
  //     this.websock.close(); // 关闭websocket
  //   }
  // },
  created() {
     this.axios.post("api/all",qs.stringify({
      user_id:this.$store.state.self.userId,
      token:this.$store.state.self.token
      })).then(res=>{
        console.log(res.data.data)
        //给list渲染
        //this.$store.state.other.userId = res.data
          this.list =res.data.data
          this.isload=false
        this.islist = true
      })
      //这里需要加
      this.axios.post('api/ban',{
         user_id:this.$store.state.self.userId,
      token:this.$store.state.self.token
      }).then(res=>{
        console.log(res.data)
      })
  },
  mounted() {
     
  },
  computed: {
    
  },
  components: {
    Navbar
  }
};
</script>

<style scoped lang='less' >
.load{
  margin: 3rem 3rem;
}
.myfriend {
  margin-top: 1.28rem;
  padding-left: 0.32rem;
  ul {
    li {
      display: flex;
      margin-bottom: 0.33rem;
      .van-cell--borderless{
        border: none;
      }
      .left {
        width: 0.96rem;
        height: 0.96rem;
        border-radius: 50%;
      }
      .center {
        border-bottom: .01rem transparent rgba(204, 204, 204, 1);
        // padding-bottom: .34rem;
        margin-left: .25rem;
        display: flex;
        flex-wrap: wrap;
        // font-size: 0;
        //width: 100%;
        .content {
          width: 5.82rem;
          height: .34rem;
          //display: flex;
          position: relative;
         display:inline-block;
          h1 {
            position: absolute;
            color: #000000;
            font-size: .33rem;
            font-weight: 400;
            display: inline-block;
          }
           .right {
         position: absolute;
         right: .62rem;
        color: #cccccc;
        font-size: 0.2rem;
        //margin-left: 3.6rem;
        font-weight: 400;
      }
         
        }
        p {
            color: rgba(204, 204, 204, 1);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: .24rem;
            font-family:"Source Han Sans CN";
            width: 4.42rem;
            margin-top: .36rem;
            //padding-bottom: .34rem;
            //margin-bottom: .34rem;
          }
      }
       
     
    }
  }
}
.van-cell__title {
  display: flex;
}

/* .van-cell{
  border: none;
} */
.van-button--normal{
  height: 1.89rem;
}
.del{
  color: #cccccc !important;
}
.van-swipe-cell__right {
.van-button:nth-child(1){
  .van-button__text:nth-child(1){
    color: #FFFFFF;
}
} 
}
.van-button__text{
  color: #000000;
  font-size: .24rem;
}
</style>
