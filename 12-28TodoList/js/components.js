Vue.component("todo",{
    template:`
        <div>
    <header>
        <div class="formdate">
            <p>ToDoList</p>
            <input type="text" placeholder="" v-model="con"  @keyup.13="add" v-focus>
        </div>
    </header>
    <section >
        <ul class="state">
            <li>
                <span @click="checkStatus('all')" :class="{check:status=='all'}">全部</span>
                <!--通过绑定的class来改变字的颜色-->
            </li>
            <li>
                <span @click="checkStatus('1')" :class="{check:status=='1'}">已完成</span>
            </li>
            <li>
                <span @click="checkStatus('0')" :class="{check:status=='0'}">未完成</span>
            </li>
        </ul>
        <ul class="list-box" >
            <li v-for="item in datas">
                <div v-if="item.edit" @dblclick="update(item)">
                    <span  @click="checkState(item)" :class="{red:item.state=='1'}"></span>
                    <p >{{item.title}}</p>
                    <div @click="del(item.id)" class="del">删除</div>
                </div>
                <div class="update" v-else>
                    <input type="text" v-model="item.title" @blur="blur(item)">
                </div>
            </li>
        </ul>
        <div v-show="all.length==0">没有数据</div><!--只有all额度长度为0（真）时，才会显示没有数据-->

    </section>
</div>
    `,
    data(){
        return {
            all:localStorage.todo?JSON.parse(localStorage.todo):[],
            con:'',
            status:'all',//全部的状态为all，未完成的状态为0，完成的状态为1
        }
    },
    methods:{
        add(){
            if(!this.con){
                alert('内容不能为空');
                return;
            }
            var obj={};
            obj.title=this.con;
            obj.id=Math.random()+new Date().getDate();
            obj.state=0;//未完成的状态为0，完成的状态为1
            obj.edit=true;
            this.all.push(obj);
            this.con='';//添加后清空
            localStorage.todo=JSON.stringify(this.all);
        },
        del(id){
            this.all=this.all.filter((val)=>{
                return val.id!=id;
            });
            localStorage.todo=JSON.stringify(this.all);
        },
        checkStatus(state){
            /*this.all=this.all.filter((val)=> val.state==state)*/
            this.status=state;
            localStorage.todo=JSON.stringify(this.all);
        },
        checkState(obj){
            ///换状态
            if(obj.state=="0"){
                obj.state="1";
            }else{
                obj.state="0";
            }
            localStorage.todo=JSON.stringify(this.all);
        },
        update(obj){
            obj.edit=false;
            localStorage.todo=JSON.stringify(this.all);
        },
        blur(obj){
            obj.edit=true;
            localStorage.todo=JSON.stringify(this.all);
        }
    },
    computed:{
        ///根据条件（状态）对数据进行筛选
        datas(){
            var data=this.all.filter((val)=>{
                if(this.status=="all"){
                    return this.all;
                }else if(val.state==this.status){//点击全部、已完成、未完成时，this.status变化
                    return val;
                }
            });
            return data;
        }
    }
});

///////添加自定义指令，调用：v-指令名
Vue.directive('focus',{
    inserted:function(dom,val){
        dom.focus();//在刚打开页面时，就聚焦
    }
})