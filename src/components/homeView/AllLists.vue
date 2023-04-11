<template>
    <div class="all-lists">
        <div class="list-actions main-wrapper">
            <div class="button-holder radius-and-shadow first-action">
                <div class="search-list-container radius-and-shadow">
                    <SearchList :storageLists="storageLists"></SearchList>
                </div>
            </div>
            <div class="button-holder radius-and-shadow second-action">
                <div class="add-list-container radius-and-shadow">
                    <AddList @newList="newListEvent"></AddList>
                </div>
            </div>
        </div>

        <div v-show="storageLists.length" class="main-wrapper">
            <slide-y-up-transition group class="lists-container">
                <div v-for="list in storageLists" :key="list.id">
                    <div v-show="list.isShown">
                        <TaskList :thisList="list" @deleteList="deleteListEvent"></TaskList>
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
    import storage from '../../mixins/storage'
    import date from '../../mixins/date'

    export default {
        mixins: [ storage, date ],
        props: [  ],
        components: { SearchList, TaskList, AddList, SlideYUpTransition }, 
        name: 'allLists',
        data(){
            return{

            }
        },
        methods:{
            newListEvent(newListName){
                this.checkListName(newListName)
            },
            checkListName(newListName){
                const listName = newListName.replaceAll(' ', '')
                if(listName){
                    this.createNewListObj(newListName)
                } else{
                    this.$emit('showPopup')
                }
            },
            createNewListObj(newListName){
                const newList = {
                    id: this.todayAsId(),
                    name: newListName,
                    type: 'list',
                    tasks: [],
                    isShown: true,
                    showTasks: true,
                }
                this.addList(newList)
            },
            addList(listObj){
                this.storageLists.push(listObj)
                this.saveToStorage()
            },
            //
            deleteListEvent(listId){
                this.storageLists = this.storageLists.filter(element => element.id !== listId)
                this.saveToStorage()
            }
        },
        computed:{
        
        },
    }
</script>

<style scoped>
    .all-lists{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
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