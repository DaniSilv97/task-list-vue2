<template>
    <div class="search-list">
        <select class="list-search" v-model="selectedList">
            <option value=''> Show all </option>
            <template v-for="list in allTaskLists">
                <option :value="list[1].id" :key="list[0]">{{ list[1].name }}</option>
            </template>
        </select>
        <button class="remove-default button" @click="$emit('selectList', selectedList)" >Select List</button>
    </div>
</template>

<script>
    export default {
        props: [ 'allTaskListsProp' ],
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
            allTaskLists: function(){
                return (Object.entries(this.allTaskListsProp))
            }
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