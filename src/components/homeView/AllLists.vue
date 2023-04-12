<template>
    <div class="all-lists">
        <div class="list-actions main-wrapper">
            <div class="button-holder radius-and-shadow first-action">
                <div class="search-list-container radius-and-shadow">
                    <SearchList :storageLists="allTaskLists"></SearchList>
                </div>
            </div>
            <div class="button-holder radius-and-shadow second-action">
                <div class="add-list-container radius-and-shadow">
                    <AddList @newList="newListEvent"></AddList>
                </div>
            </div>
        </div>

        <div class="main-wrapper" v-show="allTaskListsEntries.length">
            <slide-y-up-transition group class="lists-container">
                <div v-for="list in allTaskListsEntries" :key="list[0]">
                    <TaskList :thisList="list[1]" @deleteList="deleteListEvent"></TaskList>
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
                allTaskLists: {},
                allTaskListsEntries: []
            }
        },
        methods:{
            // Add new List ------------------------------------- ////
            newListEvent(newListName){                              //
                this.checkListName(newListName)                     //
            },                                                      //
            checkListName(newListName){                             //
                const listName = newListName.replaceAll(' ', '')    //
                if(listName){                                       //
                    this.createListObj(newListName)                 //
                } else{                                             //
                    this.$emit('showPopup')                         //
                }                                                   //
            },                                                      //
            createListObj(newListName){                             //
                const newList = {                                   //
                    id: this.todayAsId(),                           //
                    name: newListName,                              //
                    type: 'list',                                   //
                    tasks: {},                                      //
                }                                                   //
                this.addList(newList)                               //
            },                                                      //
            addList(listObj){                                       //
                this.allTaskLists[listObj.id] = listObj             //
                this.updateEntries()                                //
                this.addListToStorage(listObj)                      //
            },                                                      //
            // -------------------------------------------------- ////        
            
            // Delete list ------------------------------------------------------------------ ////
            deleteListEvent(listId){                                                            //
                delete this.allTaskLists[listId]                                                //
                this.updateEntries()                                                            //
                this.deleteListToStorage(listId)                                                //
            },                                                                                  //
            // ------------------------------------------------------------------------------ ////

            updateEntries(){
                this.allTaskListsEntries = Object.entries(this.allTaskLists)
            }
        },
        created(){
            this.allTaskLists = this.loadLocalStorage()
            this.updateEntries()
        }
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