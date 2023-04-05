<template>
    <div class="task radious-and-shadow">
        <div class="task-name"> {{ thisTask.name }} </div>
        <div class="button-holder actions radious-and-shadow">
            <div class="date"> {{ thisTask.date }} </div>
            <button class="remove-default button radious-and-shadow"> Delete </button>
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
                
            }
        },
        methods:{
        
        },
        computed:{
        
        },
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
    .task-name{
        padding-left: 1rem;
        
    }
    .actions{
        margin: 0.4rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0.2rem 0.2rem 0.2rem 0.7rem;
    }
    .date{
        margin-right: 0.5rem;
    }
</style>