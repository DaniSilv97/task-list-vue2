<template>
  <div class="home">

    <!--// TODO { O }: Filter by list-->
    <div class="main-wrapper">
      <SearchList></SearchList>
    </div>

    <!--// TODO { O }: For list in all, create list-->
    <div class="main-wrapper">
      <TaskList></TaskList>
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
                
      }
    },
    methods:{
    
    },
    computed:{
    
    },
  }
</script>

<style scoped>

</style>