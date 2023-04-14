<template>
    <div class="task-list radius-and-shadow">
        <div class="list-container radius-and-shadow">
            <div class="title-and-button">
                <input type="text" class="remove-default list-title" v-model="listName" @change="changeName">
                <div class="button-holder radius-and-shadow">
                    <button class="remove-default button" @click="$emit('deleteList', thisList.id)">Delete</button>
                    <button class="remove-default button" @click="showTasks = !showTasks">{{ showTasksComputed }}</button>
                </div>
            </div>
            <collapse-transition>
                <div v-show="showTasks" class="tasks-container radius-and-shadow">
                    
                    <SearchTask @searchTask="searchTask"></SearchTask>
                    <Sorters v-on="filtersEventHandler"></Sorters>

                    <Container  group-name="dragContainers" 
                                @drag-start="dragStart(listData, $event)" 
                                @drop="dragEnd(thisList, $event)"
                                :get-child-payload="getChildPayload">
                        <Draggable v-for="task in filterTasks" :key="task[0]">
                            <Task :thisTask="task[1]" @deleteTask="deleteTask"></Task>
                        </Draggable>
                    </Container>
                    <AddTask :thisList="thisList" @newTask="newTaskEvent"></AddTask>
                </div>
            </collapse-transition>
        </div>  
    </div>
</template>

<script>
    import { Container, Draggable } from "vue-smooth-dnd";
    import { CollapseTransition } from 'vue2-transitions'
    import AddTask from './taskList/AddTask.vue';
    import Task from './taskList/Task.vue';
    import SearchTask from './taskList/SearchTask.vue';
    import Sorters from './taskList/Sorters.vue';
    import date from '../../../mixins/date'
    import storage from '../../../mixins/storage'
    import draggs from '../../../mixins/draggs'

    export default {
        mixins: [ date, storage, draggs ],
        props: [ 'thisList' ],
        components: { Task, AddTask, SearchTask, Sorters, CollapseTransition, Container, Draggable }, 
        name: 'TaskList',
        data(){
            return{
                listData: {},
                listName: '',
                showTasks: true,

                // Filters -----
                filtersEventHandler: {
                    showAll: this.showAllTasksEvent,
                    showDone: this.showDoneTasksEvent,
                    showNotDone: this.showNotDoneTasksEvent
                },
                whatToShow: 'all', // use: all || done || notDone

                // Search
                search: false,

                // Drags -----
                startListId:'', 
                startTaskIndex:'', 
                endListId:'', 
                endTaskIndex:'',
            }
        },
        methods:{
            // Create task --------------------------------------
            /**
             * Gets an object from event and calls for 'checkTaskName()'
             * @param {Obj} data {Obj} listId, name, date
             */
            newTaskEvent(data) {
                this.checkTaskName(data)
            },
            /**
             * Gets an object and if object.name true, call for 'createTaskObj()' / If false, emit 'showTaskPopup'
             * @param {Obj} data {Obj} listId, name, date
             */    
            checkTaskName(data) {
                const taskName = data.name.replaceAll(' ', '')
                if(taskName){
                    this.createTaskObj(data)
                } else{
                    this.$emit('showTaskPopup')
                }
            },
            /**
             * Create an object with default id, type, done and name, date, listId from data, call for 'addTask()'
             * @param {Obj} data {Obj} listId, name, date
             */
            createTaskObj(data) {
                const newTask = {
                    id: this.todayAsId(),
                    name: data.name,
                    type: 'task',
                    date: data.date,
                    done: false,
                    listId: data.listId,
                }
                this.addTask(newTask)
            },
            /**
             * Takes an object and adds it to the list call for 'saveTaskToStorage()'
             * @param { Obj } taskObj { Obj }
             */
            addTask(taskObj) {
                this.listData.tasks[taskObj.id] = taskObj
                this.updateEntries()
                this.saveTaskToStorage(taskObj)
            },
            //

            // Delete Task --------------------------------------
            /**
             * Delete object based on param
             * @param { Obj } taskObj { Obj }
             */
            deleteTask(taskObj) {
                delete this.listData.tasks[taskObj.id]
                this.updateEntries()
                this.deleteTaskToStorage(taskObj)
            },
            //

            // Change Task Name --------------------------------------
            /**
             * Change list name based on dataBound 'listName'
             */
            changeName() {
                this.listData.name = this.listName
                this.saveListToStorage(this.listData)
            },
            //

            // Update --------------------------------------
            /**
             * Reloads computed that is shown on Dom 
             */
            updateEntries() {
                const temp = this.whatToShow
                this.whatToShow = ''
                this.whatToShow = temp
            },
            //
            

            // Sorters --------------------------------------
            /**
             * Changes 'whatToShow' to all based on event
             */
            showAllTasksEvent() {
                this.listData = this.loadListData(this.listData.id)
                this.whatToShow = 'all'
            },
/**
             * Changes 'whatToShow' to donebased on event
             */
            showDoneTasksEvent() {
                this.listData = this.loadListData(this.listData.id)
                this.whatToShow = 'done'
            },
            /**
             * Changes 'whatToShow' to notDone based on event
             */
            showNotDoneTasksEvent() {
                this.listData = this.loadListData(this.listData.id)
                this.whatToShow = 'notDone'
            },
            /**
             * Filter array showing only task with done = true
             * @param { Array } allTasks { Array }
             * @return { Array } filtered { Array }
             */
            filterDone(allTasks){
                const filtered = allTasks.filter(element => element[1].done)
                return (filtered)
            },
            /**
             * Filter array showing only task with done = false
             * @param { Array } allTasks { Array }
             * @return { Array } filtered { Array }
             */
            filterNotDone(allTasks){
                const filtered = allTasks.filter(element => !element[1].done)
                return (filtered)
            },
            //

            // Search --------------------------------------
            /**
             * Takes a value and changes search <-Data
             * @param { StringOrNumber } text { String || Number }
             */
            searchTask(text) {
                if(!text) {
                    this.$emit('showTaskPopup')
                } else {
                    this.search = text
                }
            },
            /**
             * returns filtered version of all tasks, acording to search
             * @return { Array } filtered { Array }
             */
            filterBySearch(){
                const allTasks = Object.entries(this.listData.tasks)
                const filtered = allTasks.filter(element => element[1].name.includes(this.search))
                return filtered
            },


            // Drags --------------------------------------
            resetDragValues(){
                this.startListId = ''
                this.startTaskIndex = ''
                this.endListId = ''
                this.endTaskIndex = ''
            },
            dragStart(list, eventData){
                this.resetDragValues()
                const {payload, isSource} = eventData 
                if(isSource){
                    this.startListId = list.id
                    this.startTaskIndex = payload.index
                    this.saveStart(this.startListId, this.startTaskIndex)
                }
            },
            dragEnd(list, eventData){
                this.removeDraggedTask()
                const {removedIndex, addedIndex} = eventData 
                if(list.id === this.startListId && removedIndex === addedIndex){
                    return
                } else if(addedIndex !== null){
                    this.endListId = list.id
                    this.endTaskIndex = eventData.addedIndex
                    this.saveEnd(this.endListId, this.endTaskIndex)
                    this.setDraggedTask()
                }
            },
            getChildPayload(index){
                return { index }
            },
            removeDraggedTask(){
                const startInfo = this.loadDragStart()
                if(startInfo.startListId === this.listData.id){
                    const tempTaskObj = Object.values(this.listData.tasks)[startInfo.startTaskIndex]
                    this.saveRemovedTask(tempTaskObj)
                    delete this.listData.tasks[tempTaskObj.id]
                    this.removeDragFromStorage(tempTaskObj)
                    
                }
                this.updateEntries()
            },
            setDraggedTask(){
                const endInfo = this.loadDragEnd()
                if(endInfo.endListId === this.listData.id){
                    const removedTask = this.loadRemovedTask()
                    console.log(removedTask)
                    removedTask.listId = endInfo.endListId
                    const temp = [removedTask.id, removedTask]
                    const tasks = Object.entries(this.listData.tasks)
                    tasks.splice(endInfo.endTaskIndex, 0, temp)
                    this.tasksArrayToObj(tasks)
                    console.log('5');
                }
            },
            tasksArrayToObj(tasks){
                const tempObj = {}
                tasks.forEach(task => {
                    tempObj[task[0]] = task[1]
                })
                this.updateDragToData(tempObj)
            },
            updateDragToData(tasksObj){
                this.listData.tasks = tasksObj
                this.saveListToStorage(this.listData)
                this.cleanLocalStorage()
                this.updateEntries()
            },
            //
            

        },
        computed:{
            //computed name for show more or less button
            showTasksComputed: function(){
                if(this.showTasks){
                    return('Less...')
                } else{
                    return('More...')
                }
            },

            // Tasks that are being shown in DOM
            filterTasks: function(){
                let allTasks = Object.entries(this.listData.tasks)
                if(this.search){
                    allTasks = this.filterBySearch()
                }
                if(this.whatToShow === 'all'){
                    this.search = false
                    return  allTasks
                } else if(this.whatToShow === 'done'){
                    this.search = false
                    return  this.filterDone(allTasks)
                } else if(this.whatToShow === 'notDone'){
                    this.search = false
                    return  this.filterNotDone(allTasks)
                }
            }
        },
        created(){
            this.listData = JSON.parse(JSON.stringify(this.thisList))
            this.listName = this.listData.name
            this.updateEntries()
        }
    }
</script>

<style scoped>
    .task-list{
        width: 26rem;
        display: flex;
        flex-direction: column;
        background-color: var(--darkGrey);
        margin: 0.8rem 0.35rem;
    }
    .list-container{
        background-color: var(--grey);
        margin: 0.5rem;
    }
    .title-and-button{
        height: 3.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0rem 0.5rem;
        border-bottom: 2px dashed var(--blue);
    }
    .list-title{
        background-color: var(--grey);
        flex: 1 1 0;
        padding-left: 1rem;
        font-weight: 700;
        font-size: 1.2rem;
        max-width: 13rem;
    }
    .list-title:first-letter{
        text-transform: capitalize;
    }
    .tasks-container{
        padding: 0.2rem 0.5rem;
        margin: 0.5rem;
        background-color: var(--darkGrey);
    }
</style>