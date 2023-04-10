<template>
    <div class="task-list radius-and-shadow">
        <div class="list-container radius-and-shadow">
            <div class="title-and-button">
                <input type="text" class="remove-default list-title" v-model="listName" @change="listNameChange">
                <div class="button-holder radius-and-shadow">
                    <button class="remove-default button" @click="deleteList">Delete</button>
                    <button class="remove-default button" @click="showHideTasks">{{ showTasks }}</button>
                </div>
            </div>
            <collapse-transition>
                <div v-show="thisList.showTasks" class="tasks-container radius-and-shadow">
                    <SearchTask v-on="searchTaskHandlers"></SearchTask>
                    <Container  group-name="dragContainers" 
                                @drag-start="dragStart(thisList, $event)" 
                                @drop="dragEnd(thisList, $event)"
                                :get-child-payload="getChildPayload">
                        <Draggable v-for="task in thisList.tasks" :key="task.id">
                            <Task :thisTask="task" v-on="taskHandlers"></Task>
                        </Draggable>
                    </Container>
                    <AddTask :thisList="thisList" v-on="addTaskHandlers"></AddTask>
                </div>
            </collapse-transition>
        </div>  
    </div>
</template>

<script>
    import { Container, Draggable } from "vue-smooth-dnd";
    import { CollapseTransition } from 'vue2-transitions'
    import AddTask from '../taskList/AddTask.vue';
    import Task from '../taskList/Task.vue';
    import SearchTask from '../taskList/SearchTask.vue';

    export default {
        props: [ 'thisList' ],
        components: { Task, AddTask, SearchTask, CollapseTransition, Container, Draggable }, 
        name: 'TaskList',
        data(){
            return{
                addTaskHandlers: {
                    addNewTask: this.addNewTask
                },
                taskHandlers: {
                    deleteTask: this.deleteTask,
                    taskNameChange: this.taskNameChange,
                    checkChanged: this.checkChanged
                },
                searchTaskHandlers: {
                    searchTask: this.searchTask
                },
                listName: '',
                startListId:'', 
                startTaskIndex:'', 
                endListId:'', 
                endTaskIndex:''
            }
        },
        methods:{
            showHideTasks(){
                this.$emit('showHideTasks', this.thisList)
            },
            deleteList(){
                this.$emit('deleteList', this.thisList)
            },
            addNewTask(eventData){
                this.$emit('addNewTask', eventData)
            },
            deleteTask(eventTaskId){
                this.$emit('deleteTask', {listId: this.thisList.id, taskId: eventTaskId})
            },
            listNameChange(){
                this.$emit('listNameChange', {listId: this.thisList.id, newName: this.listName})
            },
            taskNameChange(eventData){
                eventData.listId = this.thisList.id
                this.$emit('taskNameChange', eventData)
            },
            searchTask(searchContent){
                const newData = { listId: this.thisList.id, lookFor: searchContent }
                this.$emit('searchTask', newData)
            },
            checkChanged(taskId){
               const newData = { listId: this.thisList.id, taskId: taskId }
               this.$emit('checkChanged', newData)
            },
            dragStart(list, eventData){
                const {payload, isSource} = eventData 
                if(isSource){
                    this.startListId = list.id
                    this.startTaskIndex = payload.index
                    this.emitStartDrag()
                }
            },
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
            getChildPayload(index){
                return { index }
            },
            emitStartDrag(){
                const dragObj = {   startListId: this.startListId, 
                                    startTaskIndex :this.startTaskIndex}
                this.$emit('startDrag',dragObj)
            },
            emitEndDrag(){
                const dragObj = {   endListId: this.endListId, 
                                    endTaskIndex :this.endTaskIndex}
                this.$emit('endDrag',dragObj)
            }
        },
        computed:{
            showTasks: function(){
                if(this.thisList.showTasks){
                    return('Less...')
                } else{
                    return('More...')
                }
            }
        },
        created(){
            this.listName = this.thisList.name
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