<template>
  <div class="home">
    <div class="list-actions main-wrapper">
      <div class="button-holder radius-and-shadow first-action">
        <div class="search-list-container radius-and-shadow">
          <SearchList :allTaskLists="allTaskLists" v-on:doSelectList="doSelectList"></SearchList>
        </div>
      </div>
      <div class="button-holder radius-and-shadow second-action">
        <div class="add-list-container radius-and-shadow">
          <AddList v-on:createNewList="checkForName($event)"></AddList>
        </div>
      </div>
    </div>

    <div v-show="allTaskLists.length" class="main-wrapper">
      <slide-y-up-transition group class="lists-container">
        <div v-for="list in allTaskLists" :key="list.id">
          <div v-show="list.isShown">
            <TaskList :thisList="list" v-on="taskListEventHandlers"></TaskList>
          </div>
        </div>
      </slide-y-up-transition>
    </div>
    <fade-transition class="popup-container">
      <Popup v-show="showPopup" @clicked="hidePopup"></Popup>
    </fade-transition>
  </div>
</template>

<script>
  import { SlideYUpTransition } from 'vue2-transitions'
  import { FadeTransition  } from 'vue2-transitions'
  import AddList from '@/components/homeView/AddList.vue';
  import SearchList from '@/components/homeView/SearchList.vue';
  import TaskList from '@/components/homeView/TaskList.vue';
  import Popup from '@/components/homeView/Popup.vue'
  import date from '../mixins/date'

  export default {
    mixins: [ date ],
    props: [  ],
    components: { SearchList, TaskList, AddList, Popup, SlideYUpTransition, FadeTransition  }, 
    name: 'HomeView',
    data(){
      return{
        allTaskLists:[],
        taskListEventHandlers : {
          showHideTasks: this.showHideTasks,
          deleteList: this.deleteList,
          listNameChange: this.listNameChange,
          addNewTask: this.checkForTaskName,
          deleteTask: this.deleteTask,
          taskNameChange: this.taskNameChange,
          searchTask: this.searchTask,
          checkChanged: this.checkChanged,
          startDrag: this.saveStart,
          endDrag: this.saveEnd
        },
        dragEventData: {startListId:'', startTaskIndex:'', endListId:'', endTaskIndex:''},
        showPopup: false
      }
    },
    methods:{
      checkForName(listName){
        if(listName.replaceAll(' ', '')){
          this.createNewList(listName)
        } else{
          this.showPopup = true
        }
      },
      createNewList(listName){
        const newList = { id: this.todayAsId()+'11', 
                          name: listName, 
                          isShown: true,
                          showTasks: true, 
                          tasks:[]}
        this.allTaskLists.push(newList)
        this.saveToStorage()
      },
      showHideTasks(list){
        this.allTaskLists.forEach(element=>{
          if(element.id === list.id){
            element.showTasks = !element.showTasks
            this.saveToStorage()
          }
        })
      },
      deleteList(list){
        this.allTaskLists.forEach(element=>{
          if(element.id === list.id){
            this.allTaskLists.splice(this.allTaskLists.indexOf(element), 1)
            this.saveToStorage()
          }
        })
      },
      listNameChange(eventData){
        this.allTaskLists.forEach(element=>{
          if(element.id === eventData.listId){
            element.name = eventData.newName
            this.saveToStorage()
          }
        })
      },
      checkForTaskName(task){
        if(task.name.replaceAll(' ', '')){
          this.addNewTask(task)
        } else{
          this.showPopup = true
        }
      },
      addNewTask(eventData){
        this.allTaskLists.forEach(element=>{
          if(element.id === eventData.id){
            element.tasks.push({  id: this.todayAsId()+'22', 
                                  name: eventData.name, 
                                  date: eventData.date, 
                                  done: false, 
                                  isShown: true})
            this.saveToStorage()
          }
        })
      },
      deleteTask(eventData){
        this.allTaskLists.forEach(list=>{
          list.tasks.forEach(task=>{
            if(task.id === eventData.taskId){
              list.tasks.splice(list.tasks.indexOf(task),1)
              this.saveToStorage()
            }
          })
        })
      },
      taskNameChange(eventData){
        this.allTaskLists.forEach(list=>{
          list.tasks.forEach(task=>{
            if(task.id === eventData.taskId){
              task.name = eventData.newName
              this.saveToStorage()
            }
          })
        })
      },
      searchTask(eventData){
        console.log('Search: ',eventData)
        this.allTaskLists.forEach(element=>{
          if(element.id === eventData.listId){
            element.tasks.forEach(task=>{
              if(task.name.includes(eventData.lookFor)){
                task.isShown = true
              } else{
                task.isShown = false
              }
            })
          }
        })
      },
      checkChanged(eventData){
        this.allTaskLists.forEach(list=>{
          if(list.id === eventData.listId){
            list.tasks.forEach(task=>{
              if(task.id === eventData.taskId){
                console.log(task)
                task.done = !task.done
                this.saveToStorage()
              }
            })
          }
        })
      },
      doSelectList(listName){
        console.log(listName)
        if(!listName){
          this.allTaskLists.forEach(list=>{
            list.isShown = true
          })
        } else{
          this.allTaskLists.forEach(list=>{
            if(list.name === listName){
              list.isShown = true
            } else{
              list.isShown = false
            }
          })
        }
      },
      saveStart(eventData){
        this.dragEventData.startListId = eventData.startListId
        this.dragEventData.startTaskIndex = eventData.startTaskIndex
      },  
      saveEnd(eventData){
        this.dragEventData.endListId = eventData.endListId
        this.dragEventData.endTaskIndex = eventData.endTaskIndex
        this.doDrag()
      },
      doDrag(){
        this.allTaskLists.forEach(list=>{
          if(list.id === this.dragEventData.startListId){
            const removedTask = list.tasks.splice(this.dragEventData.startTaskIndex, 1)
            this.placeTask(this.dragEventData, removedTask)
          }
        })
      },
      placeTask(eventData, taskObj){
        this.allTaskLists.forEach(list=>{
          if(list.id === eventData.endListId){
            if(eventData.endTaskIndex === 0){
              list.tasks.unshift(taskObj[0])
              this.saveToStorage()
            } else{
              list.tasks.splice(eventData.endTaskIndex, 0, taskObj[0])
              this.saveToStorage()
            }
          }
        })
      },
      hidePopup(){
        this.showPopup = false
      },      
      saveToStorage(){
        localStorage.setItem('ListOfTaskLists', JSON.stringify(this.allTaskLists))
      }
    },
    computed:{ 
      
    },
    created(){
      if(JSON.parse(localStorage.getItem('ListOfTaskLists'))){
        this.allTaskLists = JSON.parse(localStorage.getItem('ListOfTaskLists'))
      }
    },
  }
</script>

<style scoped>
  .home{
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