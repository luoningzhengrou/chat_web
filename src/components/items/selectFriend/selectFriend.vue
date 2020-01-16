<template>
  <div>
    <Navbar :title="title" :lflag="lflag"></Navbar>
    <div class="select" v-if="islist">
      <div class="list mar_L32" v-for="(item,index) in list" :key="index" @click="select(index)">
        <!-- 传两个参数一个小标，一个对方ID -->
        <!-- <router-link :to='"/FIntroduce/"+index + "/"+item.user_id'> -->
        <a>
          <img :src="item.avatar" alt />
          <p class="name">{{item.username}}</p>
        </a>
        <!-- </router-link> -->
      </div>
      <!-- 弹窗 -->
      <van-overlay :show="show" @click="show = false" slot="default">
        <div class="wrapper" @click.stop>
          <div class="block">
            <div class="content">
              <p class="share">
                分享给：
                <span>{{nowName}}</span>
              </p>
              <!-- | filtersTopic   过滤 --> 
              <!-- {{this.$store.state.self.question.question.title}} -->
              <p class="explain">{{this.$store.state.self.question.question.title}}</p>
              <input type="text" v-model="leaveWord" @keyup.enter="sendChat" />
              <div class="event">
                <p @click="sendChat" >确定</p>
                <p @click="back">取消</p>
              </div>
            </div>
          </div>
        </div>
      </van-overlay>
    </div>
    <div class="load">
        <van-loading type="spinner" color="#3FC4E5" v-if="isload" />
    </div>

    <h1>{{this.$store.state.message}}</h1>
 
    <!-- <h1>topic:{{this.$store.state.self.question}}</h1> -->
       <h1>msg:{{msg}}</h1>

  </div>
</template>
<script>
import qs from "qs";
import Navbar from "../public/navbar";
// import Load from "../public/load";
export default {
  props: {},
  data() {
    return {
       
        isload:true,
        islist:false,
      nowindex: null,
      leaveWord: this.$store.state.newFriend.leaveWord,
      topic:'',
      show: false,
      nowName: "",
      title: "我的好友",
      lflag: true,
      question: this.$store.state.self.question,
      list: [{ username: "", avatar: "" }],  ///static/imgs/touxiang.png
      msg: "哈哈",
      //obj: '',
      // questionId:this.$router.params
    };
  },
  methods: {
    select(index) {
      console.log(index);
      this.nowindex = index
      this.nowName = this.list[index].username;
      this.show = true;
    },
    sendChat() {
        this.$router.push({name:'Chat',params:{type:"selectfriend",index:this.nowindex}})
      console.log("确定测试");
      //this.back();
    },
    back() {
      this.$router.push('Mymessage');
      console.log("返回测试");
    },
    //ios交互

    // callIosFunction(ios) {
    //   // this.msg = "哈哈"+ JSON.stringify(str)
    //   // return "ios 调用is成功"
    //   this.msg = JSON.parse(ios)
    //   this.$store.commit('changeQuestion',JSON.parse(ios))
    //    this.topic =this.$store.state.self.question.token 

    //   //this.$store.state.self.question = JSON.parse(JSON.stringify(ios))

    // },

     //h5和安卓交互
    callJsFunction(android) {
      //this.msg = str;
      //this.msg1 ="改变了"
      this.msg = android
      this.$store.commit('changeQuestion',JSON.parse(JSON.stringify(android)))
        this.topic = this.$store.state.self.question.question.title
      //this.$store.state.self.question = JSON.parse(JSON.stringify(str))
   
     }
    
  },
  watch: {
    obj(val) {
      this.obj = val;
      console.log(this.obj);
    }
  },
  created() {
      


      
    this.axios
      .post(
        "api/entry",
        qs.stringify({
          user_id: this.$store.state.self.userId,
          token: this.$store.state.self.token
        })
      )
      .then(res => {
        console.log(res.data.data);
        this.list = res.data.data;
        this.isload=false
        this.islist = true
      });
  },
  filters:{
    filtersTopic(val){
        return val.substring(1,val.length-1)
    }
  },
  mounted() {
console.log(this.$route.params)
    // console.log(this.msg);
    //将要给原生调用的方法挂载到 window 上面
    //window.callJsFunction = this.callJsFunction
 //ios
    //window.callIosFunction = this.callIosFunction;

    //安卓
    window.callJsFunction = this.callJsFunction;
     //console.log(window.callJsFunction)
  },
  components: {
    Navbar,
    // Load
  }
};
</script>

<style scoped lang="less">
.select {
  margin-top: 1.08rem;
  .name {
    margin-left: 0.36rem;
    padding-top: 0.28rem;
    padding-bottom: 0.28rem;
    color: #000000;
    font-size: 0.36rem;
    font-weight: 400;
  }
  .list {
    a {
      display: flex;
      margin-bottom: 0.24rem;
    }
    img {
      width: 0.96rem;
      height: 0.96rem;
      border-radius: 50%;
    }
  }

  //遮罩层样式
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    width: 5.4rem;
    //height: 4.38rem;
    background-color: #fff;
    .content {
      margin-top: .32rem;
      margin-left:.27rem;
      margin-right: .18rem;
      .share{
          font-size: .32rem;
          color: #999999;
          span{
              color: #000000;
          }
      }
      .explain {
          padding: .28rem .31rem .34rem .17rem;
          margin-top: .42rem;
          margin-left:0;
          margin-right: .18rem;
      
        font-size: .28rem;
        color: #000000;
        background-color: #F2F2F2;
        width: 4.95rem;
        //height: 1.23rem;
        //line-height: 1.23rem;
        //text-align: center;
      }
      input {
          margin-top: .48rem;
        //width: 4.71rem;
        height: .29rem;
        border: 1px solid rgba(242, 242, 242, 1);
        //border-radius: 10px;
        font-size: .24rem;
        color: #999999;
        font-weight: 400;
        text-indent: 0.15rem;
        line-height: .23rem;
        border: none;
        outline: transparent;
      }
    }
   /*  p {
      color: #999999;
      font-size: 0.24rem;
      span {
        font-size: 0.36rem;
        color: #000000;
        font-weight: 600;
      }
    } */

    .event {
      margin-top: .62rem;
      margin-bottom: .48rem;
     margin-left: .94rem;
      display: flex;
      //margin-left: 0.86rem;
     /*  p:nth-child(1) {
        color: #3fc4e5;
      } */
      .active{
          color: #3fc4e5;
      } 
      p:nth-child(2) {
        margin-left: 1.88rem;
      }
      p {
        font-size: 0.32rem;
        color: #999999;
      }
      p:hover {
        color: #3fc4e5;
      }
    }
  }
}
.load{
    margin: 3rem 3rem;
}
</style>
