<template>
    <div class="all-lists">
        <div class="list-actions main-wrapper">
            <div class="button-holder radius-and-shadow first-action">
                <div class="search-list-container radius-and-shadow">
                    <SearchList :allTaskListsProp="allTaskLists" v-on:selectList="selectList"></SearchList>
                </div>
            </div>
            <div class="button-holder radius-and-shadow second-action">
                <div class="add-list-container radius-and-shadow">
                    <AddList @newList="newListEvent"></AddList>
                </div>
            </div>
        </div>

        <div class="main-wrapper" v-show="searchList.length">
            <slide-y-up-transition group class="lists-container">
                <div v-for="list in searchList" :key="list[0]">
                    <TaskList :thisList="list[1]" v-on="taskListEventHandler"></TaskList>
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
                taskListEventHandler: {
                    deleteList: this.deleteListEvent,
                    showTaskPopup: this.showPopup
                },
                search: {
                    state: false, 
                    value: ''
                },
                reload: false,
            }
        },
        methods:{
            // Create List -------------------------------------- 
            /**
             * Gets a name from event and calls for 'checkListName()'
             * @param {StringOrNumber} newListName {String || Number}
             */
            newListEvent(newListName){                          
                this.checkListName(newListName)                 
            },          
            /**
             * Gets a name and if true, call for 'createListObj()' / If false, call for 'showPopup()'
             * @param {StringOrNumber} newListName {String || Number}
             */                                        
            checkListName(newListName){                         
                const listName = newListName.replaceAll(' ', '')
                if(listName){                                   
                    this.createListObj(newListName)             
                } else{                                         
                    this.showPopup()                            
                }                                               
            },
            /**
             * Create an object with default: id, type, tasks and a name = param, call for 'addList()'
             * @param {StringOrNumber} newListName {String || Number}
             */                                                 
            createListObj(newListName){                         
                const newList = {                               
                    id: this.todayAsId(),                       
                    name: newListName,                          
                    type: 'list',                               
                    tasks: {},                                  
                }                                               
                this.addList(newList)                           
            },
            /**
             * Takes an object and adds it to allTaskLists, calls for 'saveListToStorage()'
             * @param {Obj} listObj {Obj} id, name, type, tasks
             */                                                           
            addList(listObj){                                   
                this.allTaskLists[listObj.id] = listObj         
                this.saveListToStorage(listObj)                 
                this.updateEntries()                            
            },                                                  
            //          

            /**
             * Gets and Id from event, deletes task 
             * @param {Number} listId {Number}
             */         
            deleteListEvent(listId){                           
                delete this.allTaskLists[listId]                
                this.deleteListToStorage(listId)                
                this.updateEntries()                            
            },                                                  

            /**
             * Loads localstorage and update allTaskLists
             */         
            updateEntries(){
                this.allTaskLists = this.loadLocalStorage()
            },

            /**
             * Emit event 'showPopup'
             */         
            showPopup(){
                this.$emit('showPopup')
            },
            /**
             * Get id from event, changes search <-localDataObj
             * @param {Number} listId {Number}
             */         
            selectList(listId){
                this.search.state = true
                this.search.value = listId
            },
            /**
             * Gets and array of objects and returns based on search <-localDataObj
             * @param { Array } allLists { Array }
             * @return { Array } filtered { Array }
             */         
            searchedList(allLists){
                const filtered = allLists.filter(element => element[1].id === this.search.value)
                return filtered
            },
        },
        computed:{
            //List that is showing in DOM
            searchList: function(){
                const allLists = Object.entries(this.allTaskLists)
                if(this.search.state && this.search.value !== ''){
                    return this.searchedList(allLists)
                } else {
                    return allLists
                }
            }
        },
        created(){
            // Load allTaskLists from storage
            this.allTaskLists = this.loadLocalStorage()
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