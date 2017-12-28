Vue.component('searchBox',{// @focus="focus" v-model="value"
    props:['value'],
    template:`
        <div class="search-box">
            <input type="text" v-model="value" @focus="focus">
        </div>
    `,
    methods:{
        focus(){
            this.$emit('customevent');//接受调用组件的区域传过来的事件
        }
    }
})

Vue.component('searchUl',{
    props:['data','state'],
    template:`
        <div>
            <ul v-show="state==true">
                <li v-for="item in data" @click="click(item.value)">{{item.value}}</li>
            </ul>
        </div>
    `,
    methods:{
        click(value){
            this.$emit('customevent',value);
        }
    }
})