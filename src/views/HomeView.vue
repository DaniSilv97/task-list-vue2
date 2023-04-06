<template>
  <div class="home">
    <!--// TODO: Filter by list-->
    <div class="list-actions main-wrapper">
      <div class="button-holder radius-and-shadow first-action">
        <div class="search-list-container radius-and-shadow">
          <SearchList :allTaskLists="allTaskLists"></SearchList>
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
          <TaskList :thisList="list" v-on="taskListEventHandlers"></TaskList>
        </div>
      </slide-y-up-transition>
    </div>
    
  </div>
</template>

<script>
  import { SlideYUpTransition } from 'vue2-transitions'
  import AddList from '@/components/AddList.vue';
  import SearchList from '@/components/SearchList.vue';
  import TaskList from '@/components/TaskList.vue';
  import date from '../mixins/date'

  export default {
    mixins: [ date ],
    props: [  ],
    components: { SearchList, TaskList, AddList, SlideYUpTransition }, 
    name: 'HomeView',
    data(){
      return{
        allTaskLists:[],
        taskListEventHandlers : {
          showHideTasks: this.showHideTasks,
          deleteList: this.deleteList,
          listNameChange: this.listNameChange,
          addNewTask: this.addNewTask,
          deleteTask: this.deleteTask,
          taskNameChange: this.taskNameChange,
          searchTask: this.searchTask
        }
      }
    },
    methods:{
      checkForName(listName){
        if(listName.replaceAll(' ', '')){
          this.createNewList(listName)
        } else{
          alert('Fill the name')
        }
      },
      createNewList(listName){
        const newList = {id: this.todayAsId()+'11', name: listName, showTasks: true, tasks:[]}
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
      addNewTask(eventData){
        this.allTaskLists.forEach(element=>{
          if(element.id === eventData.id){
            element.tasks.push({id: this.todayAsId()+'22', name: eventData.name, date: eventData.date, done: false, isShown: true})
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
    justify-content: center;
    align-items: space-between;
  }
</style>