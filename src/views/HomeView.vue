<template>
  <div class="home">
    <!--// TODO { O }: Filter by list-->
    <div class="main-wrapper">
      <div class="button-holder radius-and-shadow first-action">
        <div class="search-list-container radius-and-shadow">
          <SearchList :allTaskLists="allTaskLists"></SearchList>
        </div>
      </div>
      <div class="button-holder radius-and-shadow">
        <div class="add-list-container radius-and-shadow">
          <AddList v-on:createNewList="checkForName($event)"></AddList>
        </div>
      </div>
    </div>

    <!--// TODO { O }: For list in all, create list-->
    
    <div v-show="allTaskLists.length" class="lists-container main-wrapper">
      <slide-y-up-transition group>
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
          deleteList: this.deleteList
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
        const newList = {id: this.todayAsId()+'11', name: listName, showTasks: true, tasks:[{id: 1, name: 'te1'},{id: 2, name: 'te2'}]}
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
  .first-action{
    margin-bottom: 0.5rem;
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