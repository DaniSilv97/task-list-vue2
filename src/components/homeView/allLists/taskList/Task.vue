<template>
    <div  v-show="isShown">
        <div class="task radius-and-shadow">
            <div class="check-and-name">
                <input type="checkbox" class="checkbox remove-default" @click="checkboxChanged" v-model="taskData.done">
                <input type="text" class="remove-default task-name" v-model="taskName" @change="taskNameChange">
            </div>
            <div class="button-holder actions radius-and-shadow">
                <div class="date" :style="colorTime"> {{ thisTask.date }} </div>
                <button class="remove-default button" @click="deleteTask"> Delete </button>
            </div>
        </div>
    </div>    
</template>

<script>
    import date from '../../../../mixins/date'
    import storage from '../../../../mixins/storage'

    export default {
        mixins: [ date, storage ] ,
        props: [ 'thisTask' ],
        components: {  }, 
        name: 'Task',
        data(){
            return{
                taskData: {},
                taskName: '',
                timeLeft: 0,
                isShown: true,
            }
        },
        methods:{
            deleteTask(){
                this.$emit('deleteTask', this.thisTask)
            },
            taskNameChange(){
                this.taskData.name = this.taskName
                this.saveChange()
            },
            checkboxChanged(){
                this.taskData.done = !this.taskData.done
                this.saveChange()
            },
            saveChange(){
                this.saveTaskToStorage(this.taskData)
            },  
        },
        computed:{
            /**
             * Returns a color value based on how many days 'till due date
             * @returns String:'color: var(--x)'
             */
            colorTime: function(){
                if(this.timeLeft < 0){
                    return('color: var(--noTime)')
                } else if(this.timeLeft < 2){
                    return('color: var(--shortTime)')
                } else if(this.timeLeft < 10){
                    return('color: var(--enoughTime)')
                } else{
                    return('color: var(--longTime)')                    
                }
            },
        },
        created(){
            this.taskData = JSON.parse(JSON.stringify(this.thisTask))
            this.taskName = this.taskData.name

            // Gets the num of days between today and dueDate
            this.timeLeft = this.getTimeLeft(this.thisTask.date)
        }
    }
</script>

<style scoped>
    .task{
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: var(--grey);
        margin: 0.4rem 0rem;
    }
    .check-and-name{
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .checkbox{
        margin: 0.5rem;
        padding: 0.6rem;
        border-radius: 50%;
        background-color: var(--darkGrey);
        border: 0.05rem solid var(--blue)
    }
    .checkbox:hover{
        background-color: var(--grey);
        border-color: var(--hover);
    }
    .checkbox:checked{
        background-color: var(--grey);
        border-color: var(--darkestGrey);
    }
    .task-name{
        background-color: var(--grey);
        padding-left: 0.2rem;
        font-size: 1.1rem;
        max-width: 9rem;
    }
    .date{
        margin-right: 0.5rem;
    }
    .task-name, .date{
        font-weight: 500;
    }
    .task:has(.checkbox:checked){
        opacity: 0.5;
        text-decoration: line-through;
    }
    .actions{
        margin: 0.4rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0.2rem 0.2rem 0.2rem 0.7rem;
    }
</style>