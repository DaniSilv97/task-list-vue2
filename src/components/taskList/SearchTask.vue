<template>
    <div class="search-task radius-and-shadow">
        <input  type="text" 
                class="search-name remove-default input-text"
                placeholder="Insert text in task name"
                v-model="searchTaskText">
        <button class="button search-submit" @click="searchTask">Search task</button>
    </div>
</template>

<script>
    export default {
        props: [  ],
        components: {  }, 
        name: 'SearchTask',
        data(){
            return{
                searchTaskText: ''
            }
        },
        methods:{
            searchTask(){
                this.$emit('searchTask', this.searchTaskText)
            }
        },
        computed:{
        
        },
    }
</script>

<style scoped>
    .search-task{
        margin: 0.2rem 0rem 0.5rem 0rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background-color: var(--grey);
        padding: 0.4rem;
    }

    .input-text{
        flex: 1 1 0;
        padding: 0.4rem;
        margin-right: 0.5rem;
        min-width: 14.2rem;
    }
</style>