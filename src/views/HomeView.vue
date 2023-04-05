<template>
  <div class="home">

    <!--// TODO { O }: Filter by list-->
    <div class="main-wrapper">
      <SearchList></SearchList>
    </div>

    <!--// TODO { O }: For list in all, create list-->
    <div class="main-wrapper">
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
        testTask: { id: 11, 
                    name: `I'm a list List`, 
                    isSelected: false, 
                    tasks:[{  id: 33, 
                              name: `I'm a task`,
                              date: '2022-04-05'},
                           {  id: 44, 
                              name: `I'm a task`,
                              date: '2022-04-05'}]},
        testTask2: { id: 22, 
                    name: `I'm a list List`, 
                    isSelected: false, 
                    tasks:[{  id: 55, 
                              name: `I'm a task`,
                              date: '2022-04-05'}]},
      }
    },
    methods:{
    
    },
    computed:{
    
    },
    mounted(){
      this.allTaskLists.push(this.testTask)
      this.allTaskLists.push(this.testTask2)
    }
  }
</script>

<style scoped>

</style>