<template>
    <div class="sorters radius-and-shadow">
        <button class="button">Show All</button>
        <button class="button">Show Done</button>
        <button class="button">Show Not Done</button>
    </div>
</template>

<script>
    export default {
        props: [  ],
        components: {  }, 
        name: 'Sorters',
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
    .sorters{
        display: flex;
        flex: row;
        justify-content: space-around;
        align-items: center;
        padding: 0.3rem;
        background-color: var(--grey);
        margin-bottom: 1rem;
    }
</style>