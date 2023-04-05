<template>
    <div class="task radius-and-shadow">
        <div class="check-and-name">
            <input type="checkbox" class="checkbox remove-default">
            <input type="text" class="remove-default task-name" v-model="taskName" @change="taskNameChange">
        </div>
        <div class="button-holder actions radius-and-shadow">
            <div class="date"> {{ thisTask.date }} </div>
            <button class="remove-default button" @click="deleteTask"> Delete </button>
        </div>
    </div>
</template>

<script>
    export default {
        props: [ 'thisTask' ],
        components: {  }, 
        name: 'Task',
        data(){
            return{
                taskName: ''
            }
        },
        methods:{
            deleteTask(){
                this.$emit('deleteTask', this.thisTask.id)
            },
            taskNameChange(){
                this.$emit('taskNameChange', {listId: '', taskId: this.thisTask.id, newName: this.taskName})
            }
        },
        computed:{
        
        },
        mounted(){
            this.taskName = this.thisTask.name
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