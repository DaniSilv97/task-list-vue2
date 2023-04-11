<template>
    <div class="search-list">
        <select class="list-search" v-model="selectedList">
            <option value=""> Show all </option>
            <template v-for="list in allTaskLists">
                <option :value="list.name" :key="list.id">{{ list.name }}</option>
            </template>
        </select>
        <button class="remove-default button" @click="$emit('doSelectList', selectedList)" >Select List</button>
    </div>
</template>

<script>
    export default {
        props: [ 'allTaskLists' ],
        components: {  }, 
        name: 'SearchList',
        data(){
            return{
                selectedList: ''
            }
        },
        methods:{

        },
        computed:{
        
        },
    }
</script>

<style scoped>
    .search-list{
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 26rem;
    }
    .list-search {
        flex: 1 1 0;
        margin-right: 10px;
        border-radius: 15px;
        height: 30px;
        padding-left: 5px;
        background-color: var(--darkGrey);
        color: var(--lightestGrey)
    }
</style>