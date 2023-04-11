<template>
    <div class="task-list radius-and-shadow">
        <div class="list-container radius-and-shadow">
            <div class="title-and-button">
                <input type="text" class="remove-default list-title" v-model="listName">
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
                        <Draggable v-for="task in thisList.tasks" :key="task.id">
                            <Task :thisTask="task"></Task>
                        </Draggable>
                    </Container>
                    <AddTask :thisList="thisList" @addNewTask="newTaskEvent"></AddTask>
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

    export default {
        props: [ 'thisList' ],
        components: { Task, AddTask, SearchTask, Sorters, CollapseTransition, Container, Draggable }, 
        name: 'TaskList',
        data(){
            return{
                // // Event handler for AddTask
                // // Event handler for Task
                // taskHandlers: {
                //     deleteTask: this.deleteTask,
                //     taskNameChange: this.taskNameChange,
                //     checkboxChanged: this.checkboxChanged
                // },
                // // Event handler for Sorters
                // sortersHandlers: {
                //     showAll: this.showAll,
                //     showDone: this.showDone,
                //     showNotDone: this.showNotDone,
                // },
                showTasks: true,
                listName: '',
                startListId:'', 
                startTaskIndex:'', 
                endListId:'', 
                endTaskIndex:''
            }
        },
        methods:{
            newTaskEvent(data){
                this.checkTaskName(data)
            },
            checkTaskName(data){
                const taskName = data.name.replaceAll(' ', '')
                if(taskName){
                    this.createNewTaskObj(data)
                } else{
                    //this.$emit('showPopup')
                }
            },
            createNewTaskObj(data){
                const newTask = {
                    id: this.todayAsId(),
                    name: newListName,
                    type: 'list',
                    tasks: [],
                }
                this.addList(newList)
            },
            addList(listObj){
                this.storageLists.push(listObj)
                this.saveToStorage()
            },
            // /**
            //  * Passes event up the chain
            //  */
            // addNewTask(eventData){
            //     this.$emit('addNewTask', eventData)
            // },
            // /**
            //  * Passes event up the chain with an obj with listId and taskID
            //  * @param {*} dateString task Id
            //  */
            // deleteTask(eventTaskId){
            //     this.$emit('deleteTask', {listId: this.thisList.id, taskId: eventTaskId})
            // },
            // /**
            //  * Passes event up the chain with added list id in obj
            //  * @param {*} eventData obj with listID, taskId and newName
            //  */
            // taskNameChange(eventData){
            //     eventData.listId = this.thisList.id
            //     this.$emit('taskNameChange', eventData)
            // },
            // /**
            //  * Passes event up the chain with an obj that has listId and searchContent(param)
            //  * @param {*} searchContent String value from search form
            //  */
            // searchTask(searchContent){
            //     const newData = { listId: this.thisList.id, lookFor: searchContent }
            //     this.$emit('searchTask', newData)
            // },
            // /**
            //  * Passes event up the chain with an obj that has listId and taskId(param)
            //  * @param {*} taskId Id from task that checkbox changed 
            //  */
            // checkboxChanged(taskId){
            //    const newData = { listId: this.thisList.id, taskId: taskId }
            //    this.$emit('checkboxChanged', newData)
            // },
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
            // /**
            //  * Passes event up the chain with id of this list
            //  */
            // showAll(){
            //     this.$emit('showAll', (this.thisList.id))
            // },
            // /**
            //  * Passes event up the chain with id of this list
            //  */
            // showDone(){
            //     this.$emit('showDone', (this.thisList.id))
            // },
            // /**
            //  * Passes event up the chain with id of this list
            //  */
            // showNotDone(){
            //     this.$emit('showNotDone', (this.thisList.id))
            // }
        },
        computed:{
            //computed name for show more or less button
            showTasksComputed: function(){
                if(this.showTasks){
                    return('Less...')
                } else{
                    return('More...')
                }
            }
        },
        created(){
            // gives listName data a value based on thisList prop name
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