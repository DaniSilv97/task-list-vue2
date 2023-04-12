<template>
    <div class="task-list radius-and-shadow">
        <div class="list-container radius-and-shadow">
            <div class="title-and-button">
                <input type="text" class="remove-default list-title" v-model="listData.name">
                <div class="button-holder radius-and-shadow">
                    <button class="remove-default button" @click="$emit('deleteList', thisList.id)">Delete</button>
                    <button class="remove-default button" @click="showTasks = !showTasks">{{ showTasksComputed }}</button>
                </div>
            </div>
            <collapse-transition>
                <div v-show="showTasks" class="tasks-container radius-and-shadow">
                    
                    <SearchTask></SearchTask>
                    <Sorters></Sorters>

                    <Container  group-name="dragContainers" 
                                @drag-start="dragStart(thisList.index, $event)" 
                                @drop="dragEnd(thisList, $event)"
                                :get-child-payload="getChildPayload">
                        <Draggable v-for="task in allTasksEntries" :key="task[0]">
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

    export default {
        mixins: [ date, storage ],
        props: [ 'thisList' ],
        components: { Task, AddTask, SearchTask, Sorters, CollapseTransition, Container, Draggable }, 
        name: 'TaskList',
        data(){
            return{
                listData: {},
                allTasksEntries: [],
                showTasks: true,

                //Drags
                startListId:'', 
                startTaskIndex:'', 
                endListId:'', 
                endTaskIndex:'',
            }
        },
        methods:{
            //
            newTaskEvent(data){
                this.checkTaskName(data)
            },
            checkTaskName(data){
                const taskName = data.name.replaceAll(' ', '')
                if(taskName){
                    this.createTaskObj(data)
                } else{
                    this.$emit('showTaskPopup')
                }
            },
            createTaskObj(data){
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
            addTask(taskObj){
                this.listData.tasks[taskObj.id] = taskObj
                this.updateEntries()
                this.addTaskToStorage(taskObj)
            },

            //

            deleteTask(taskObj){
                delete this.listData.tasks[taskObj.id]
                this.updateEntries()
                this.deleteTaskToStorage(taskObj)
            },

            updateEntries(){
                this.allTasksEntries = Object.entries(this.listData.tasks)
            },

            /**
             * If this is the source of the dragStart, call for event emition
             * @param {*} list thisList
             * @param {*} eventData dragStart $event
             */
            dragStart(list, eventData){
                const {payload, isSource} = eventData 
                if(isSource){
                    this.startListId = list.id
                    this.startTaskIndex = payload.index
                    this.emitStartDrag()
                }
            },
            /**
             * If this is the source of the dragEnd and task has changed place, 
             * call for event emition
             * @param {*} list thisList
             * @param {*} eventData dragEnd $event
             */
            dragEnd(list, eventData){
                const {removedIndex, addedIndex} = eventData 
                if(list.id === this.startListId && removedIndex === addedIndex){
                    return
                } else if(addedIndex !== null){
                    this.endListId = list.id
                    this.endTaskIndex = eventData.addedIndex
                    this.emitEndDrag()
                }
            },
            /**
             * Generates the index of dragged task, for drag function
             * @returns Index of dragged task
             */
            getChildPayload(index){
                return { index }
            },
            /**
             * Emit event with obg that has startListId and startTaskIndex
             */
            emitStartDrag(){
                const dragObj = {   startListId: this.startListId, 
                                    startTaskIndex :this.startTaskIndex}
                this.$emit('startDrag',dragObj)
            },
            /**
             * Emit event with obg that has endListId and endTaskIndex
             */
            emitEndDrag(){
                const dragObj = {   endListId: this.endListId, 
                                    endTaskIndex :this.endTaskIndex}
                this.$emit('endDrag',dragObj)
            },

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
        },
        created(){
            this.listData = JSON.parse(JSON.stringify(this.thisList))
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