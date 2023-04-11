<template>
    <div class="all-lists">
        <div class="list-actions main-wrapper">
            <div class="button-holder radius-and-shadow first-action">
                <div class="search-list-container radius-and-shadow">
                    <SearchList :allTaskLists="allTaskLists"></SearchList>
                </div>
            </div>
            <div class="button-holder radius-and-shadow second-action">
                <div class="add-list-container radius-and-shadow">
                    <AddList></AddList>
                </div>
            </div>
        </div>

        <div v-show="allTaskLists.length" class="main-wrapper">
            <slide-y-up-transition group class="lists-container">
                <div v-for="list in allTaskLists" :key="list.id">
                    <div v-show="list.isShown">
                        <TaskList :thisList="list"></TaskList>
                    </div>
                </div>
            </slide-y-up-transition>
        </div>
    </div>
</template>

<script>
    import { SlideYUpTransition } from 'vue2-transitions'
    import AddList from '@/components/homeView/allLists/AddList.vue';
    import SearchList from '@/components/homeView/allLists/SearchList.vue';
    import TaskList from '@/components/homeView/allLists/TaskList.vue';

    export default {
        props: [ 'allTaskLists' ],
        components: { SearchList, TaskList, AddList, SlideYUpTransition }, 
        name: 'allLists',
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
    .list-actions{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        padding: 0.25rem;
    }
    .first-action,
    .second-action{
        margin: 0.25rem;
        min-width: 26.7rem;
    }
    .search-list-container, 
    .add-list-container{
        padding: 0.3rem;
        background-color: var(--grey);
    }
    .lists-container{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
    }
</style>