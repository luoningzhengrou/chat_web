<template>
    <div class="login">
      请输入你的token: <input type="text" v-focus="true" v-model="token" >

      <button @click.prevent="login">登录</button>
    </div>
</template>

<script>
export default {
    props: {

    },
    data() {
        return {
        token:''
        };
    },
    directives:{
     focus:{
         inserted(el){
             if(el){
              el.focus()
             }
            
         }
     }
    },
    methods: {
     login(){
         console.log(this.token)
         this.$store.commit('changeToken',this.token)
         this.$router.push('/Mymessage')
     }
    },
    components: {

    },
};
</script>

<style scoped lang="less">
.login{
    margin: 1rem auto;
    font-size: .3rem;
}
input{
    width: 3rem;
    height: 1rem;
    border: .01rem black solid;
}
</style>
