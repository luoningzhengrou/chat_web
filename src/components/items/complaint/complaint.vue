<template>
  <div>
    <Navbar :title="title" :lflag="lflag"></Navbar>
    <div class="content" v-if="islist">
      <h1>反馈类型</h1>
      <van-radio-group v-model="radio">
        <van-radio name="1" checked-color="#33CC66" v-model="info1" @click="info(info1)">
          {{info1}}
          <img
            slot="icon"
            slot-scope="props"
            :src="props.checked ? activeIcon : inactiveIcon"
          />
        </van-radio>
        <van-radio name="2" checked-color="#33CC66" v-model="info2" @click="info(info2)">
          {{info2}}
          <img
            slot="icon"
            slot-scope="props"
            :src="props.checked ? activeIcon : inactiveIcon"
          />
        </van-radio>
        <van-radio name="3" checked-color="#33CC66" v-model="info3" @click="info(info3)">
          {{info3}}
          <img
            slot="icon"
            slot-scope="props"
            :src="props.checked ? activeIcon : inactiveIcon"
          />
        </van-radio>
        <van-radio
          name="4"
          checked-color="#33CC66"
          class="last"
          v-model="info4"
          @click="info(info4)"
        >
          {{info4}}
          <img
            slot="icon"
            slot-scope="props"
            :src="props.checked ? activeIcon : inactiveIcon"
          />
        </van-radio>
      </van-radio-group>
      <div class="explain">
        <p>投诉说明</p>
        <div class="section">
          <van-cell-group>
            <van-field
              v-model="message"
              rows="2"
              :border="false"
              type="textarea"
              maxlength="100"
              placeholder="请说明投诉的文字说明，方便我们人工审核。"
              show-word-limit
            />
          </van-cell-group>
        </div>
      </div>
      <div class="img">
        <p>
          添加截图：
          <span>必填3-6张图片</span>
        </p>
        <van-uploader v-model="fileList" :after-read="afterRead" :max-count="6" />

        <!-- <input type="file" @change="uploadConfig"> -->

        <div class="solution">
          <p @click="complaint">确认投诉</p>
        </div>
      </div>
      <van-popup v-model="show" round>谢谢你的投诉，我们会尽快处理！</van-popup>
    </div>
    <van-popup v-model="isenter" round>至少上传三张图片，请重新上传！！</van-popup>
    <div class="load">
        <van-loading type="spinner" color="#1989fa" v-if="isload" />
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
      info1: "",
      info2: "",
      info3: "",
      info4: "",
      show: false,
      isenter:false,
      radio: "",
      title: "投诉",
      lflag: true,
      activeIcon: "../../../../static/imgs/complain1.png",
      inactiveIcon: "../../../../static/imgs/complain2.png",
      message: "",
      fileList: [],
      p1: null,
      p2: null,
      p3: null,
      p4: null,
      p5: null,
      p6: null,
      arrImg: [],
      name: "",
      bindId: "",
      len: "",
      isload:true,
        islist:false,
      //   toUserId:
    };
  },
  methods: {
    info(val) {
      console.log(val);
      if (val == this.info1) {
        this.bindId = "1";
      } else if (val == this.info2) {
        this.bindId = "2";
      } else if (val == this.info3) {
        this.bindId = "3";
      } else if (val == this.info4) {
        this.bindId = "4";
      }
    },
    
    complaint() {
      console.log("投诉");
          if(this.len < 3){
            this.isenter= true
            setTimeout(()=>{
 this.isenter= false
            },900)
              return
          }
      var formData = new FormData();
      formData.append("user_id", this.$store.state.self.userId);
      formData.append("to_user_id", this.toUserId);
      formData.append("info", this.message);
      formData.append("ban_id", this.bindId);
      formData.append("number", this.len);
      formData.append("picture1", this.p1);
      formData.append("picture2", this.p2);
      formData.append("picture3", this.p3);
      if (this.len == 4) {
        formData.append("picture4", this.p4);
      } else if (this.len == 5) {
        formData.append("picture5", this.p5);
      } else if (this.len == 6) {
        formData.append("picture6", this.p6);
      }
      console.log(formData);
      let config = {
        headers: {
          "Content-Type":
            "multipart/form-data;boundary = " + new Date().getTime()
        }
      };
      this.$axios.post("api/complaint", formData, config).then(res => {
        console.log(res.data);
        this.$router.go("-1")
      });

      this.show = true;
      setTimeout(() => {
        this.show = false;
      }, 700);
    },

    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file.file);
      this.p1 = file.file;
      //   this.arrImg.push(this.p1)
      //   console.log(this.arrImg)
      //console.log(this.p1);
    }
  },
  created() {
    this.toUserId = this.$route.params.toUserId;
    // console.log(this.$route.params.toUserId)

    this.$axios.post('api/banType',{
        token:this.$store.state.self.token
    }).then(res=>{
        console.log(res.data.data)
        this.info1 = res.data.data[0].info
        this.info2 = res.data.data[1].info
        this.info3 = res.data.data[2].info
        this.info4 = res.data.data[3].info
          this.isload=false
        this.islist = true
    })
  },
  watch: {
    fileList(val) {
      //this.p1=val.file
      //console.log(this.p1)
      this.len = val.length;
      console.log(val);
      this.p1 = val[0].file;
      if (this.len == 3) {
        this.p2 = val[1].file;
        this.p3 = val[2].file;
      } else if (this.len == 4) {
        this.p4 = val[3].file;
      } else if (this.len == 5) {
        this.p5 = val[4].file;
      } else if (this.len == 6) {
        this.p6 = val[5].file;
      }
    },
    message(val) {
      //console.log(val)
      this.message = val;
    }
  },
  components: {
    Navbar
  }
};
</script>

<style scoped lang="less">
.load{
  margin: 3rem 3rem;
}
.p1 {
  width: 0.5rem;
  height: 0.5rem;
}
.content {
  padding-top: 0.26rem;
  margin-top: 0.96rem;
  .van-radio-group {
    display: flex;
    padding-left: 0.32rem;
    margin-top: 0.32rem;
    width: 100%;
    padding-right: 0.33rem;
    .van-radio {
      margin-right: 0.56rem;
      height: 0.48rem;
    }
    .last {
      margin-right: 0;
    }
    img {
      width: 0.44rem;
      height: 0.44rem;
    }
  }
  h1 {
    margin-left: 0.36rem;
    font-size: 0.28rem;
    color: #000000;
  }
  .explain {
    margin-top: 0.58rem;
    p {
      font-size: 0.28rem;
      color: #000000;
      padding-left: 0.35rem;
    }
    .section {
      margin-top: 0.31rem;
      margin-left: 0.3rem;
      margin-right: 0.34rem;
    }
  }
  .img {
    margin-top: 0.42rem;
    margin-left: 0.37rem;
    p {
      font-size: 0.28rem;
      color: #000000;
      span {
        color: #999999;
      }
    }
    .van-uploader {
      margin-top: 0.46rem;
    }
  }
  .solution {
    // width: 3.38rem ;
    // height: 1.1rem;
    text-align: center;
    line-height: 1.1rem;

    p {
      margin-left: 1.31rem;
      width: 3.98rem;
      height: 1.74rem;
      background: url(../../../../static/imgs/bgk.png) no-repeat;
      background-size: 3.98rem 1.74rem;
      font-size: 0.32rem;
      color: rgba(255, 255, 255, 1);
      line-height: 1.74rem;
    }

    margin: 0.75rem auto;
  }
  .van-popup--round {
    width: 4.72rem;
    height: 1.66rem;
    text-align: center;
    line-height: 1.66rem;
    font-size: 0.27rem;
    color: #000000;
  }
}
.van-popup{
    width: 5.4rem;
    height: 1.56rem;
    text-align: center;
    line-height: 1.56rem;
    color: #000000;
    font-size: .32rem;
}
</style>
