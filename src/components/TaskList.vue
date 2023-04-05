<template>
    <div class="task-list radius-and-shadow">
        <div class="list-container radius-and-shadow">
            <div class="title-and-button">
                <h3 class="list-title"> {{ thisList.name }}</h3>
                <div class="button-holder radius-and-shadow">
                    <button class="remove-default button" @click="deleteList">Delete</button>
                    <button class="remove-default button" @click="showHideTasks">{{ showTasks }}</button>
                </div>
            </div>
            <collapse-transition>
                <div v-show="thisList.showTasks" class="tasks-container radius-and-shadow">
                    <Task  v-for="task in thisList.tasks" :key="task.id" :thisTask="task"></Task>
                    <AddTask :thisList="thisList"></AddTask>
                </div>
            </collapse-transition>
        </div>  
    </div>
</template>

<script>
    import { CollapseTransition } from 'vue2-transitions'
    import AddTask from './AddTask.vue';
    import Task from './Task.vue';

    export default {
        props: [ 'thisList' ],
        components: { Task, AddTask, CollapseTransition }, 
        name: 'TaskList',
        data(){
            return{
                
            }
        },
        methods:{
            showHideTasks(){
                this.$emit('showHideTasks', this.thisList)
            },
            deleteList(){
                this.$emit('deleteList', this.thisList)
            }
        },
        computed:{
            showTasks: function(){
                if(this.thisList.showTasks){
                    return('Less...')
                } else{
                    return('More...')
                }
            }
        },
    }
</script>

<style scoped>
    .task-list{
        width: 26rem;
        display: flex;
        flex-direction: column;
        background-color: var(--darkGrey);
        margin: 0.8rem 0.35rem;
    }
    .list-container{
        background-color: var(--grey);
        margin: 0.5rem;
    }
    .title-and-button{
        height: 3.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0rem 0.5rem;
        border-bottom: 2px dashed var(--blue);
    }
    .list-title{
        flex: 1 1 0;
        padding-left: 1rem;
        font-weight: 700;
        font-size: 1.2rem;
    }
    .list-title:first-letter{
        text-transform: capitalize;
    }
    .tasks-container{
        padding: 0.2rem 0.5rem;
        margin: 0.5rem;
        background-color: var(--darkGrey);
    }
</style>