<template>
  <div class="home">
    <!--// TODO { O }: Filter by list-->
    <div class="main-wrapper">
      <SearchList :allTaskLists="allTaskLists"></SearchList>
    </div>

    <!--// TODO { O }: For list in all, create list-->
    <div class="lists-container main-wrapper">
      <div v-for="list in allTaskLists" :key="list.id">
        <TaskList :thisList="list"></TaskList>
      </div>
    </div>
  </div>
</template>

<script>
import SearchList from '@/components/SearchList.vue';
import TaskList from '@/components/TaskList.vue';

  export default {
    props: [  ],
    components: { SearchList, TaskList }, 
    name: 'HomeView',
    data(){
      return{
        allTaskLists:[],
        testTask1: { id: 11, name: `I'm a task List`, isSelected: false, tasks:[{  id: 21, name: `I'm a task`,date: '2022-04-05'},{  id: 22, name: `I'm a task`,date: '2022-04-05'}]},
        testTask2: { id: 12, name: `I'm a task List`, isSelected: false, tasks:[{  id: 21, name: `I'm a task`,date: '2022-04-05'},{  id: 22, name: `I'm a task`,date: '2022-04-05'}]},
        testTask3: { id: 13, name: `I'm a task List`, isSelected: false, tasks:[{  id: 21, name: `I'm a task`,date: '2022-04-05'},{  id: 22, name: `I'm a task`,date: '2022-04-05'}]},
        testTask4: { id: 14, name: `I'm a task List`, isSelected: false, tasks:[{  id: 21, name: `I'm a task`,date: '2022-04-05'},{  id: 22, name: `I'm a task`,date: '2022-04-05'}]},
      }
    },
    methods:{
    
    },
    computed:{
    
    },
    mounted(){
      this.allTaskLists.push(this.testTask1)
      this.allTaskLists.push(this.testTask2)
      this.allTaskLists.push(this.testTask3)
      this.allTaskLists.push(this.testTask4)
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
  .lists-container{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: space-between;
  }
</style>