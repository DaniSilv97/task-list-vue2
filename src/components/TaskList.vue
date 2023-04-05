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
                <div v-for="task in thisList.tasks" :key="task.id">
                    <p> {{ task.name }} </p>
                </div>
            </div>
        </div>  
    </div>
</template>

<script>
    export default {
        props: [ 'thisList' ],
        components: {  }, 
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
    display: flex;
    flex-direction: column;
    background-color: var(--darkGrey);
    margin-bottom: 1rem;
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
    padding: 0.5rem;
    margin: 0.5rem;
    background-color: var(--darkGrey);
}

</style>