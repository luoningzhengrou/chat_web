<template>
  <div>
    <Navbar :title="title" :lflag="lflag" ></Navbar>
    <ul class="mar_L32 mar_T12">
        <!-- 到搜索好友界面 -->
      <li @click="addFriend">
        <img src="../../../../static/imgs/addfriend.png" alt />
        <p>添加好友</p>
      </li>
      <!-- 到新的好友界面，点进去加载考虑 -->
      <li>
        <img src="../../../../static/imgs/newfriend.png" alt />
        <p @click="jump">新的好友</p>
      </li>
    </ul>
    <div class="friendlist" v-if="islist">
        <!-- 我的所有好友放x? 需要再mounted里面-->
        <p>好友列表</p>
        <!-- 路由跳转到好友介绍 -->
        <div class="list mar_L32" v-for="(item,index) in list" :key="index" >
           <router-link :to='"/FIntroduce/"+index +"/"+ item.user_id'>
            <img :src="item.avatar" alt="">
            <p>{{item.username}}</p>
            </router-link>
        </div>
    </div>
   <div class="load">
      <van-loading type="spinner" color="#3FC4E5" v-if="isload" />
   </div>
 
  </div>
</template>

<script>
import qs from "qs";
import Navbar from "../public/navbar";
import { mapState } from 'vuex'
import { mapMutations } from 'vuex'
export default {
  props: {},
  data() {
    return {
      isload:true,
      islist:false,
      msg:"",
      question:"前输入文字",
      title: "我的好友",
      lflag:true,
      list:[
           {username:"",avatar:""}   ///static/imgs/touxiang.png
         
      ]
    };
  },
  watch: {
    msg(){
      this.question ="正在输入"
    }
  },
  created() {
    console.log(this.$store.state)
      this.axios.post('api/entry',qs.stringify({
       user_id:this.$store.state.self.userId,
       token:this.$store.state.self.token
      })).then(res=>{
        console.log(res.data.data)
        this.list = res.data.data
         this.isload=false
        this.islist = true
      })
  },
  mounted() {
    
  },
  computed:mapState([
    // num(){
    //   return this.$store.state.totalPrice
    // }
     'totalPrice',
     'num'
  ]),
  methods: {
    // test(index){
    //  this.$router.push({path:`/FIntroduce/${index}`})
    // },
      test1(){
  this.axios
        .post(
          "api//blackList",
          qs.stringify({
            user_id: this.$store.state.self.userId,
            //del_user_id: this.$route.params.userId,
            token: this.$store.state.self.token
          })
        )
        .then(res => {
          console.log(res.data);
     
        });
    },
       test2(){
  this.axios
        .post(
          "api/black",
          qs.stringify({
            user_id: this.$store.state.self.userId,
            //del_user_id: this.$route.params.userId,
            to_user_id:"238",
            token: this.$store.state.self.token
          })
        )
        .then(res => {
          console.log(res.data);
     
        });
    },
    ...mapMutations([
       "changeNum"
    ]),
    ...mapMutations({
   add:'changeNum'
    }),
    btn(){
    //  this.$store.commit({
    //    type:"changeNum",
    //    price:10,
    //    count:2
    //  })
    this.$store.dispatch('changeNum')
     console.log(this.$store.getters.doneTodos)
    },
      test(){
       this.$router.push("SelectFriend")
      },
      addFriend(){
          this.$router.push('/Searchfriend')
      },
      jump(){
        this.$router.push('/NewFriend')
      }
  },

  

  components: {
    Navbar
  }
};
</script>

<style scoped lang="less">
.load{
   margin: 3rem 3rem
}
ul{
   margin-top: 1.28rem;
    li{
        display: flex;
        margin-bottom: .24rem;
        
        img{
            width: .96rem;
            height: .96rem;
           
        }
        p{
            color: #000000;
            font-size: .36rem;
            margin-left: .25rem;
            margin-top: .31rem;
        }
    }
}
.friendlist{
    margin-top: .28rem;
    p{
        margin-left: .36rem;
        padding-top:.28rem;
        padding-bottom: .28rem;
        color: #000000;
        font-size: .36rem;
        font-weight: 400;
    }
    .list{
        
        a{
        display: flex;
        margin-bottom: .24rem;
        }
        img{
            width: .96rem;
            height: .96rem;
            border-radius: 50%;
        }
    }
}
</style>
