<template>
    <div>
         <Navbar :title="title" :lflag="lflag" ></Navbar>
         <ul class="mar_L32" v-if="islist">
             <li v-for="(item,index) in list" :key="index" class="newF">
               <img :src="item.avatar" alt="">
               <div class="content">
               <p>{{item.username}}</p>
               <span :class="{isactive:item.status == 1}" v-if="item.status == 1" @click.prevent="isact(index)" ref="aggred">已同意</span>
               <span :class="{isactive:item.status == 3}" v-else-if="item.status == 3" @click.prevent="isact(index)" ref="aggred">已过期</span>
               <span :class="{active:flag}" v-else @click.prevent="isact(index)" ref="aggred"  @click="showPopup">同意</span>
               <!-- <span :class="{active:index !=nowIndex}" @click.prevent="isact(index)" ref="aggred">同意</span> -->
            
               </div>
             </li>
         </ul>
<van-popup v-model="show" round>已同意马上去聊天吧！！</van-popup>
       <div class="load">
        <van-loading type="spinner" color="#3FC4E5" v-if="isload" />
    </div>
    </div>
</template>

<script>
import qs from "qs";
import Navbar from "../public/navbar";
export default {
    props: {

    },
    data() {
        return {
            isload:true,
        islist:false,
            show: false,
             nowIndex:30,
      title: "新的好友",
      flag:true,
      lflag:true,
      //isAgree:"同意",
      //isactive:true,
      to_user_id:"",
      status:"",
      info:"",
      list:[
        //   {avatar: "/static/imgs/touxiang.png",username: "张文华",isactive:true, user_id:"1",info:"哈哈",status:"1"},
        //    {avatar: "/static/imgs/touxiang.png",username: "王雯雯",isactive:true,user_id:"2",info:"哈",status:"3"},
        //     {avatar: "/static/imgs/touxiang.png",username: "王雯雯",isactive:true,user_id:"3",info:"哈哈哈"}
      ]
        };
    },
    methods: {
        showPopup() {
      this.show = true;
      setTimeout(()=>{
          this.show= false
      },500)
    },
    isact(index){
    if(this.$refs.aggred[index].innerText==="已同意" || this.$refs.aggred[index].innerText==="已过期"){
        return;
    }
    this.nowIndex=index;
     console.log(index)
     //this.list[index]
    //this.isAgree="已同意"innerText
    //这里样式还需要改
    //this.isactive= !index;
     this.to_user_id= this.list[index].user_id
     console.log(this.$refs.aggred)
     this.info = this.list[index].info
    this.flag =false
     this.$refs.aggred[index].innerText ="已同意"
     this.to_user_id = this.list[index].user_id
     console.log(this.list[index].user_id)
    console.log(`id:${this.to_user_id}---${this.info}`)
    this.axios.post('api/inc',qs.stringify({
       user_id:this.$store.state.self.userId,
       to_user_id: this.to_user_id,
       status:"1",
       message:"已同意",//this.info
       token:this.$store.state.self.token
   })).then(res=>{
       console.log(res)
       
   })
    
}
    },
    created() {
        // this.isactive = false
        // this.isAgree="已同意"
        this.axios.post('api/addInfo',qs.stringify({
            user_id:this.$store.state.self.userId,
            token:this.$store.state.self.token
        })).then(res=>{
            //console.log(res.data.data)
            //this.to_user_id=res.data.data.user_id
            //this.info = res.data.data.info
            console.log(`id:${this.to_user_id}---${this.info}`)
            this.list = res.data.data
              this.isload=false
        this.islist = true
            //这个复制方法有问题
            //    res.data.data.map((item,index)=>{
            //        this.list.push(Object.assign({},item,{agree:"同意"}))
            //    }) 
               //console.log(this.list)
             console.log(res.data.data)
        })
    },
    mounted() {
        
    },
    components: {
       Navbar
    },
};
</script>

<style scoped lang="less">
.load{
  margin: 3rem 3rem;
}
ul{
    margin-top: 1.08rem;

    .newF{
        font-size: 0;
       
        height: 1.2rem;
        display: flex;
          margin-bottom: .24rem;
          .content{
              //display: flex
              position: relative;
              width: 5.92rem;
              border-bottom: .01rem solid rgba(242,242,242,1);
          }
          img{
            width: .96rem;
            height: .96rem;
           border-radius: 50%;
        }
        p{
            color: #000000;
            font-size: .36rem;
            margin-left: .25rem;
            margin-top: .31rem;
        }
        .active{
          color: #33CC66;
            border:1px solid rgba(51,204,102,1);
        }
        .isactive{
            color: #CCCCCC;
            border: none;
        }
        span{
            position: absolute;
            right: .47rem;
            top:.45rem;
            display: inline-block;
            width: .96rem;
            height: .48rem;
            line-height: .48rem;
            font-size: .28rem;
            text-align: center;
            //margin-left: 3rem;
            //margin-top: .3rem;
          color: #CCCCCC;
          border-radius:10px;
           
        }
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
