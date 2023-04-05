<template>
    <div class="add-task radius-and-shadow">
        <input  type="text" 
                class="name remove-default input-text"
                placeholder="e.g. Do the dishes">
        <input  type="date" 
                class="date remove-default input-text">
        <button class="submit remove-default button">Add</button>        
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
        justify-content: space-between;
        align-items: center;
        background-color: var(--grey);
        padding: 0.3rem;
        margin: 1.3rem 0rem 0.5rem 0rem;
    }
    .name{
        width: 11.5rem;
        padding: 0.5rem 0rem 0.5rem 0.4rem
    }
    .date{
        width: 6rem;
        padding: 0.5rem 0.2rem 0.5rem 0.5rem;
    }
    .name, .date{
        margin-right: 0.5rem;
    }
    .submit{
        margin-left: 0rem;
    }
</style>