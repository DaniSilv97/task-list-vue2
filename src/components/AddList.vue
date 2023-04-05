<template>
    <div class="add-list">
        <input  type="text" 
                class="list-name input-text remove-default"
                placeholder="e.g. Chores">
        <button class="remove-default button">Add List</button>
    </div>
</template>

<script>
    export default {
        props: [  ],
        components: {  }, 
        name: 'AddList',
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
    .add-list{
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .list-name{
        flex: 1 1 0;
        padding: 0.4rem 0.5rem;
    }
</style>