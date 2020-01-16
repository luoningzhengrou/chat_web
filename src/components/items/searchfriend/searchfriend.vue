<template>
  <div>
    <div class="search">
       <!-- class="mar_L32" size="16" -->
      <van-icon name="arrow-left" @click="goback" />
      <van-search
        class="ser_friend"
        v-model="value"
        placeholder="输入学员手机号"
        show-action
        shape="round"
        @search="onSearch"
        background="#3fc4e5"
      >
        <div slot="action" @click="onSearch" class="ser_right">搜索</div>
      </van-search>
    </div>
    <ul class="addfriend mar_T12" v-if="unshow">
      <li>
        <img :src="list.headimg" alt class="left" />
        <h1>{{list.name}}</h1>
        <img :src="list.addfriend" alt class="right" @click="show = true" />
      </li>
    </ul>

    <p v-if="isexist" class="hint">该用户不存在</p>
    <van-overlay :show="show" @click="show = false" slot="default">
      <div class="wrapper" @click.stop>
        <div class="block">
          <div class="content">
            <p>
              申请好友：
              <span>{{list.name}}</span>
            </p>
            <p class="explain">申请说明：</p>
            <input type="text" v-model="applyMsg" @keyup.enter="addFriend" />
            <div class="event">
              <p @click="addFriend">确定</p>
              <p @click="back">取消</p>
            </div>
          </div>
        </div>
      </div>
    </van-overlay>

  </div>
</template>

<script>
import qs from "qs";

export default {
  props: {},
  data() {
    return {
     
      applyMsg: this.$store.state.newFriend.applyMsg,
      show: false,
      isexist: false,
      value: "",
      rightimg: "../../../../static/imgs/Search.png",
      rightflag: "true",
      lflag: true,
      unshow: false,
      list: { headimg: "", name: "", addfriend: "" },
      //测试
      objlist:[
            {id1:1,id2:2,msg:"1"},
            {id1:1,id2:2,msg:"2"},
            {id1:1,id2:4,msg:"hello3"},
            {id1:2,id2:3,msg:"hello4"},
            {id1:1,id2:2,msg:"hehe5"},
            {id1:2,id2:6,msg:"hello6"}
        ],
        id1:1,
        id2:2
    };
  
  
  },
  computed: {
    // fil(){
    //   return this.objlist.filter(function(val){
    //     return val.id1 == 1 && val.id2 == 2
    //   })
    // }
  },

  methods: {
    addFriend() {
      this.axios
        .post(
          "api/out",
          qs.stringify({
            user_id: this.$store.state.self.userId,
            to_user_id: this.$store.state.newFriend.id,
            info: this.applyMsg,
            token: this.$store.state.self.token
          })
        )
        .then(res => {
          console.log(res.data);
          console.log(this.applyMsg);
          this.$store.state.newFriend.applyMsg = this.applyMsg
          this.back();
        });
    },
    back() {
      this.$router.go(-1);
    },
    onSearch() {
      console.log(this.value);
      //this.phone = this.value
      //this.unshow = true;
      this.list.headimg = "/static/imgs/touxiang.png";
      //this.list.name="张文华"
      this.list.addfriend = "/static/imgs/addfriend.png";
      //这里有api查找用户
      //console.log(this.$store.state.objmsg.client_id)
       this.isload=true
      this.axios
        .post(
          "api/user",
          qs.stringify({
            user_id: this.$store.state.self.userId,
            phone: this.value,
            token: this.$store.state.self.token
          })
        )
        .then(res => {
          console.log(res.data.data);
          if (res.data.code == 200) {
            this.list.headimg = res.data.avatar;
            this.list.name = res.data.data.username;
            this.$store.state.newFriend.id = res.data.data.id;
            console.log("id"+ this.$store.state.newFriend.id)
            //this.to_user_id= res.data.data.id
            console.log(this.applyMsg);
            this.list.headimg =res.data.data.avatar;

     
            this.unshow = true;
            this.isexist = false;
            this.value = "";
          } else {
            this.unshow = false;
            this.isexist = true;
            this.value = "";
          }
        });
    },
    goback() {
      this.$router.go(-1);
    }
  },
  components: {}
};
</script>

<style scoped lang="less">
.search {
  width: 100%;
  height: 0.96rem;
  background-color: #3fc4e5;
  position: relative;
  .ser_friend {
    position: absolute;
  }
  .van-search--show-action {
    margin-left: 0.7rem;
    margin-top: 0.21rem;
    //width: 5.2rem;
  }
  .van-search {
    //width: 5.5rem;
    height: 0.6rem;
  }

  .ser_right {
    font-size: 0.24rem;
    color: #ffffff;
    margin-left: 0.1rem;
    display: block;
  }
  .van-search__action {
    background-color: #3fc4e5;
  }
  .van-search__content--round {
    background-color: #9fe2f2;
    border-radius: 0.3rem;
    width: 5.2rem;
  }
  .van-cell__value {
    margin-top: 0.1rem;
  }

 /*  .van-icon-arrow-left {
    margin-top: 0.12rem;
    position: absolute;
  } */

.van-icon-arrow-left {
  color: #ffffff;
   margin-top: .3rem;
 position: absolute;
 margin-left: .32rem;
}
.van-icon-arrow-left:before{
  width: .14rem;
  height: .14rem;

transform: scale(2)
}




  .mar_L32 {
    margin-top: 0.35rem;
    color: #ffffff;
  }
  .van-field {
    width: 5.2rem;
  }
  .van-cell{
    color: #ffffff;
  }
}

.addfriend {
  li {
    //display: flex;
    //align-items: center;
  position: relative;
    .left {
      position: absolute;
      width: 0.96rem;
      height: 0.96rem;
      border-radius: 50%;
      margin-left: 0.42rem;
    }
    h1 {
       position: absolute;
      margin-left: 1.55rem;
      color: #000000;
      font-size: 0.36rem;
      font-size: 400;
    }
    .right {
       position: absolute;
      width: 0.56rem;
      height: 0.56rem;
      margin-left: 6.09rem;
      margin-top: .12rem;
    }
  }
}

.hint {
  text-align: center;
  margin-top: 0.5rem;
  font-size: 0.24rem;
  color: #cccccc;
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
  // height: 5.4rem;
  padding-bottom: .51rem;
  background-color: #fff;
  .content {
    margin-top: 0.42rem;
    margin-left: 0.3rem;
    .explain {
      margin-top: 0.51rem;
      margin-bottom: .2rem;
    }
    input {
      width: 4.71rem;
      // height: 1.87rem;
      padding-top: .2rem;
      padding-bottom: 1.87rem;
      border: .01rem solid rgba(242, 242, 242, 1);
      border-radius: .10rem;
      font-size: 0.24rem;
      color: #000000;
      font-weight: 400;
      text-indent: 0.15rem;
      // line-height: 2rem;
      text-align: left;
     word-break: break-all;
    
    }
  }
  p {
    color: #999999;
    font-size: 0.24rem;
    span {
      font-size: 0.36rem;
      color: #000000;
      font-weight: 600;
    }
  }

  .event {
    
    margin-top: .76rem;
    display: flex;
    margin-left: 0.86rem;
    p:nth-child(1){
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
