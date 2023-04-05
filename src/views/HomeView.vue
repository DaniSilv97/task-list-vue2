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
      <div v-for="list in allTaskLists" :key="list.id">
        <TaskList :thisList="list"></TaskList>
      </div>
    </div>
  </div>
</template>

<script>
  import AddList from '@/components/AddList.vue';
  import SearchList from '@/components/SearchList.vue';
  import TaskList from '@/components/TaskList.vue';
  import date from '../mixins/date'

  export default {
    mixins: [ date ],
    props: [  ],
    components: { SearchList, TaskList, AddList }, 
    name: 'HomeView',
    data(){
      return{
        allTaskLists:[],
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
        const newList = {id: this.todayAsId()+'11', name: listName, isSelected: false, tasks:[]}
        this.allTaskLists.push(newList)
      },
    },
    computed:{
    
    },
    mounted(){

    }
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