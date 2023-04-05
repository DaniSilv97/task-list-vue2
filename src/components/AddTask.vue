<template>
    <div class="add-task radious-and-shadow">
        <input  type="text" 
                class="name remove-default"
                placeholder="e.g. Do the dishes">
        <input type="date" class="date remove-default">
        <button class="submit remove-default button radious-and-shadow">Add</button>        
    </div>
</template>

<script>
    export default {
        props: [ 'thisList' ],
        components: {  }, 
        name: 'AddTask',
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
    .add-task{
        display: flex;
        flex-direction: row;
        align-items: center;
        background-color: var(--grey);
        padding: 0.3rem;
        margin: 1.3rem 0rem 0.5rem 0rem;
    }
    .name{
        padding: 0.5rem 0rem 0.5rem 0.4rem
    }
    .date{
        padding: 0.5rem 0.2rem;
    }
    .name, .date{
        border-radius: 0.5rem;
        background-color: var(--darkGrey);
        color: var(--lightestGrey);
        margin-right: 0.5rem;
    }
    .submit{
        margin-left: 0rem;
        padding-right: 0.7rem;
    }
</style>