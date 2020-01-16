<template>
  <div >
    <Navbar :title="title" @click-left="onClickLeft" :lflag="flag"></Navbar>
    <div class="share" v-if="islist">
<!-- <h1 class="title" v-html="sharetitle"></h1> -->
      <div class="one" v-if="isone">
      <ul >
        <li class="title" v-html="sharetitle"></li>
        <li v-for="(item,index) in this.option" :key="index" @click="select(item,index)" >
          <p>
            <span class="name" v-if="isname">{{item.name}}</span>
            <section v-else>
            <img src="../../../../static/imgs/right.png" alt v-if="item.is_true==1" />
            <img src="../../../../static/imgs/false.png" alt v-else />
            </section>
            <span class="topic">{{item.desc}}</span>
          </p>
        </li>
      </ul>
 <div class="solution" v-if="issolution">
        <p @click="look">查看答案和解析</p>
      </div>
<div class="analysis" v-else>
     <p class="analysis_t">
         试题解析：
     </p>
     <p class="right"> <span class="answer">正确答案是：</span> <span>{{answer}}</span><span class="answer">难以程度:</span><span >适中</span></p>
     <p class="detail" v-html="resolution"></p>
    </div>

</div>

      <!-- 多选题 -->
      <div class="multi" v-else>
 <ul>
   <li class="title" v-html="sharetitle"></li>
        <li :class="{isactive:chooseAfterValue.indexOf(item.desc)!=-1}" v-for="(item,index) in this.option" :key="index" @click="multi(index,item.desc)" >
          <p>
            <span class="name" v-if="isspan">{{item.name}}</span>
            <section v-if="issec">
            <img src="../../../../static/imgs/right.png" alt v-if="item.is_true==1" />
            <img src="../../../../static/imgs/false.png" alt v-else />
            </section>
            <span class="topic">{{item.desc}}</span>
          </p>
        </li>
      </ul>


      <div class="solution" v-if="issolution">
        <p @click="other(index)">查看答案和解析</p>
      </div>
      <div class="analysis" v-else>
     <p class="analysis_t">
         试题解析：
     </p>
     <p class="right"> <span class="answer">正确答案是：</span> <span>{{answer}}</span><span class="answer">难以程度:</span><span >适中</span></p>
     <p class="detail" v-html="resolution"></p>
    </div>
      </div>
    


    </div>
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
        i:0,
        isspan:true,
        issec:false,
        isactive:null,
        type:"",
isload:true,
        islist:false,
      title: "分享试题",
      answer:"",
      resolution:"",
      level:"",
      flag: true,
      isname: true,
      isright: false,
      isfalse: false,
      issolution:true,
      sharetitle: "",
      option: [],
      index: 1,
      isone:null,
      chooseAfterValue:[],
questionId:this.$route.params.id
    };
  },
  methods: {
      look(){
          this.issolution = false;
      },
    onClickLeft() {
      this.$router.go(-1);
    },
    other(){
        this.isspan= false
 this.issolution = false;
 this.issec = true;
    },
    multi(n,value){
// this.i = index;
 if(this.chooseAfterValue.indexOf( value )!=-1){
	                this.chooseAfterValue.splice( this.chooseAfterValue.indexOf( value ), 1 )
	            }else{
	                this.chooseAfterValue.push(value)
	            

    }
    },
    select(item, index) {
      console.log(item.is_true);
      console.log(index);
      this.index = index + 1;
      if(this.index){
          this.isname =false;
      }
   
    }
  },
  created() {
    //   760单  770单   780多选
    this.axios
      .post(
        "http://app.houhang.com/index/share/question",
        qs.stringify({
          question_id: this.questionId
        })
      )
      .then(res => {
        console.log(res.data.result);
        this.sharetitle = res.data.result.title;
        this.option = res.data.result.option;
        this.answer= res.data.result.answer;
        this.resolution = res.data.result.resolution;
          this.isload=false
        this.islist = true
        if(res.data.result.type =='单选题'){
           this.isone = true
        }else{
            this.isname = false;
            this.isone =false
        }
          this.isload=false
        this.islist = true
        if(res.data.result.level == 0){
            this.level='普通'

        }else if(res.data.result.level == 1){
            this.level ="容易"
        }else if(res.data.result.level == 2){
             this.level ="适中"
        }else{
             this.level ="较难"  
        }

      });
  },
  mounted() {
    console.log(this.$route.params.id)
  },
  components: {
    Navbar
  }
}
</script>

<style scoped lang="less">
.load{
  margin: 3rem 3rem;
}
.share {
  margin: 1.43rem 0.32rem;
 .title {
    font-size: 0.32rem;
    color: #000;
    margin-bottom: .32rem;
   
  }
  ul {
    
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 .04rem .22rem .03rem rgba(80, 202, 233, 0.2);
    border-radius: 10px;
    padding: 0.32rem;
    li {
      margin-bottom: 0.53rem;

      p {
        .name {
        display: inline-block;
         text-align: center;
          width: .48rem;
          height: .48rem;
          line-height: .48rem;
          margin-top: -.1rem;
          border-radius: 50%;
          border: .03rem solid rgba(204, 204, 204, 1);
          color: #999999;
          font-size: 0.32rem;
         
        }
        section{
            display: inline-block;
        }
        .topic{
                margin-left: 0.32rem;
        }
      }
      img {
     
        width: 0.48rem;
        height: 0.48rem;
        border-radius: 50%;
      }
    }
  }
  .solution {
    // width: 3.38rem ;
    // height: 1.1rem;
    text-align: center;
    // line-height: 1.1rem;

    p {
      margin-left: 1.31rem;
      width: 3.98rem;
      height: 1.74rem;
      line-height: 1.74rem;
      background: url(../../../../static/imgs/bgk.png) no-repeat;
      background-size: 3.98rem 1.74rem;
      font-size: 0.32rem;
      color: rgba(255, 255, 255, 1);
      line-height: 1.74rem;
     
    }

    margin: 1rem auto;
  }
  .analysis{
      padding: .64rem .31rem;
      .analysis_t{
          font-size: .32rem;
          color: #000;
      }
      .right{
          font-size: .28rem;
          color: #000;
          margin-top: .32rem;
          .answer{
              color: #999999;
          }
          span:nth-child(2){
              margin-left: .31rem;
          }
         span:nth-child(3){
              margin-left: .79rem;
          }
           span:nth-child(4){
              margin-left: .3rem;
          }
      }
      .detail{
          font-size: .28rem;
          color: #000;
          margin-top: .63rem;
      }
  }
}
.isactive{
    color:#33CC66;
}
</style>
