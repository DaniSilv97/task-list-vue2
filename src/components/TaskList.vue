<template>
    <div class="task-list radious-and-shadow">
        <div class="list-container radious-and-shadow">
            <div class="title-and-button">
                <h3 class="list-title"> {{ thisList.name }}</h3>
                <div class="button-holder radious-and-shadow">
                    <button class="remove-default button radious-and-shadow">Delete</button>
                    <button class="remove-default button radious-and-shadow">More...</button>
                </div>
            </div>
            <div class="tasks-container radious-and-shadow">
                <Task  v-for="task in thisList.tasks" :key="task.id" :thisTask="task"></Task>
            </div>
        </div>  
    </div>
</template>

<script>
    import Task from './Task.vue';
    export default {
        props: [ 'thisList' ],
        components: { Task }, 
        name: 'TaskList',
        data(){
            return{
                
            }
        },
        methods:{
        
        },
        computed:{
        
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
        border-bottom: 2px dashed var(--darkestGrey);
    }
    .list-title{
        flex: 1 1 0;
        padding-left: 1rem;
        font-weight: 700;
        font-size: 1.2rem;
    }
    .tasks-container{
        padding: 0.2rem 0.5rem;
        margin: 0.5rem;
        background-color: var(--darkGrey);
    }
</style>