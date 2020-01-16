import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let store = new Vuex.Store({
    state:{
        persons:[

        ],
        num:0,
        clientId:"",
        websock: null,
        message:"",
        objmsg:{},
        num:'',
        fromContent:{},
        newFriend:{
            id:"",
            applyMsg: "学习的道路上，愿与你同行！",
            leaveWord:"这道题不错分享给你！"
        },
        self:{
            token:'7259fa83c2e6de3b73fc8abbacdd2da4',//""
            userId:"46",
            client_id:"",
            question:{
            //     question:{
            //    title:''
            //     }
            }
        },
        other:{
            userId:"" 
        },
        todos:[
            {id:1,text:'...',done:true},
            {id:2,text:'...',done:false}
        ],
        totalPrice:null
    },
    getters:{
      doneTodos:state=>{
          return state.todos.filter(todo=>todo.done)
      },
      Num:state=>{
          return state.num
      }
    },
   
    mutations:{
        // changeNum(state,payload){
        //     state.totalPrice +=payload.price * payload.count
        // }
        changeNum(state){
            state.num++    
        },
        changeToken(state,token){
            state.self.token = token
        },
        changeQuestion(state,question){
            state.self.question = question
        },
        changeMsg(state,str){
        state.message = str
        }
    },
    actions:{
      changeNum({commit}){
          commit('changeNum')
      }
    }
});

export default store;
