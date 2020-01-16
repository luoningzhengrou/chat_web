<template>
  <div>
    <Navbar
      :title="title"
      :rightimg="rightimg"
      @ClickRight="onClickRight"
      :rightflag="rightflag"
      :lflag="flag"
    ></Navbar>
    <div class="introduce">
      <div class="top">
        <img :src="list[id].avatar" alt class="top-left mar_L32" />
        <div class="top-right">
          <div class="peoInfo">
            <span>{{list[id].username}}</span>
            <img v-if="list[id].sex ==='男'" src="../../../../static/imgs/man.png" alt />
            <img v-if="list[id].sex ==='女'" src="../../../../static/imgs/woman.png" alt />
          </div>
          <!-- <p class="phone">{{list[id].phone}}</p> -->
        </div>
      </div>
      <div class="line"></div>
      <div class="center">
        <p>
          报考地区
          <span>{{list[id].area}}</span>
        </p>
        <van-cell title="设置好友权限" is-link :to='"/FPermissions/"+ to_user_id' />
      </div>
        <div class="line"></div>
      <div class="bottom">
        <p @click="chat">发送消息</p>
      </div>
    </div>
    <!--  <van-overlay :show="show" @click="show = false" slot="default">
      <div class="wrapper" @click.stop>
        <div class="block">
          <div class="content">
            <p class="isure">
              确定删除该好友么？
            </p>
            <div class="event">
              <p @click="remove">确定</p>
              <p @click="back">取消</p>
            </div>
          </div>
        </div>
      </div>
    </van-overlay>-->
    <van-action-sheet v-model="show" :actions="actions" @select="onSelect"  />
  </div>
</template>

<script>
import qs from "qs";
import Navbar from "../public/navbar";
export default {
  props: {},
  data() {
    return {
      type:"friend",
      dialog: false,
      show: false,
      id: this.$route.params.id,
      to_user_id: this.$route.params.userId,
      flag: true,
      title: "好友介绍",
      rightimg: "../../../../static/imgs/more.png",
      rightflag: "true",
      // avatar:"",
      // username:"",
      actions: [{ name: "删除" }, { name: "拉黑" }],
      list: [
        {
          avatar:"",///static/imgs/touxiang.png
          username: "",
          phone: "",//13339970322
          area: ""
          //issex: true
        }, {
          avatar:"",///static/imgs/touxiang.png
          username: "",
          phone: "",//13339970322
          area: ""
          //issex: true
        },
        {
          avatar:"",///static/imgs/touxiang.png
          username: "",
          phone: "",//13339970322
          area: ""
          //issex: true
        }
      ]
    };
  },
  methods: {
    onClickRight() {
      //console.log("删除好友");
      this.show = true;
    },
    chat(){
      //this.$router.push({path:`/FIntroduce/${index}`})
      ///Chat/:type/:index
     this.$router.push({name:'Chat',params:{type:"friend",index:this.id}})
    },
    back() {
      this.$router.go(-1);
    },
    onSelect(item) {
      this.show = false;
      //console.log(item.name);
      if (item.name == "删除") {
        this.$dialog
          .confirm({
            message: "确定要删除吗?",
            confirmButtonText: "确认", //改变确认按钮上显示的文字
            cancelButtonText: "取消" //改变取消按钮上显示的文字
          })
          .then(() => {
            //console.log("点击了确认按钮噢");
            this.axios
              .post(
                "api/cutout",
                qs.stringify({
                  user_id: this.$store.state.self.userId,
                  del_user_id: this.$route.params.userId,
                  token: this.$store.state.self.token
                })
              )
              .then(res => {
                //console.log(res.data);
                this.back();
              });
          })
          .catch(() => {
            console.log("点击了取消按钮噢");
            this.back();
          });
      } else {
        this.$dialog
          .confirm({
            message: "确定要拉黑吗?",
            confirmButtonText: "确认", //改变确认按钮上显示的文字
            cancelButtonText: "取消" //改变取消按钮上显示的文字
          })
          .then(() => {
            //console.log("点击了确认按钮噢");
            this.axios
              .post(
                "api/black",
                qs.stringify({
                  user_id: this.$store.state.self.userId,
                  to_user_id: this.$route.params.userId,
                  token: this.$store.state.self.token
                })
              )
              .then(res => {
                console.log(res.data);
              });
          })
          .catch(() => {
            console.log("点击了取消按钮噢");
            this.back();
          });
      }
    },
  },
created() {
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
        console.log(this.list);
        console.log(this.$route.params);
      });
},
  mounted() {
    
  },
  components: {
    Navbar
  }
};
</script>

<style scoped lang="less">
.introduce {
  margin-top: 0.96rem;
  padding-top: 0.6rem;
  //padding-left: .32rem;
  .top {
    display: flex;
    .top-left {
      width: 1.8rem;
      height: 1.8rem;
      border-radius: 50%;
    }
    .top-right {
      margin-top: 0.26rem;
      margin-left: 0.3rem;
      .peoInfo {
        span {
          font-size: 0.36rem;
          color: #000000;
        }
        img {
          width: 0.33rem;
          height: 0.32rem;
          margin-left: 0.12rem;
        }
      }
      .phone {
        margin-top: 0.61rem;
        color: #999999;
        font-size: 0.28rem;
      }
    }
  }
  .line {
    width: 100%;
    height: 0.24rem;
    background: rgba(242, 242, 242, 1);
    margin-top: 0.6rem;
  }
  .center {
    padding-top: 0.43rem;
    padding-left: 0.3rem;
    p {
      color: #000000;
      font-size: 0.36rem;
      position: relative;
      span {
        color: #cccccc;
        position: absolute;
        right: 0.32rem;
        font-size: 0.36rem;
      }
    }
    .van-cell__title {
      span {
        color: #000000;
        font-size: 0.36rem;
      }
    }
    .van-cell {
      padding-left: 0;
    }
    .van-cell--clickable {
      margin-top: 0.76rem;
    }
  }
  .bottom{
    p{
      margin-top: .43rem;
      font-weight:400;
      color: #000000;
      font-size: .36rem;
      text-align: center;
    }
  }
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 5.4rem;
  height: 2.94rem;
  background-color: #fff;
  .content {
    // margin-top: 0.42rem;
    // margin-left: 0.3rem;
    p {
      margin-top: 0.76rem;
      margin-left: 1.27rem;
      color: #000000;
      font-size: 0.32rem;
    }
    .isure:after {
      content: "";
      display: block;
      width: 4.35rem;
      height: 0.01rem;
      background: red;
    }
  }

  .event {
    //margin-top: .76rem;
    display: flex;
    //margin-left: 0.86rem;
    p:nth-child(1) {
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
</style>
