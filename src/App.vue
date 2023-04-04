<template>
  <div>
    <HeaderBar></HeaderBar>
    <HomeView></HomeView>
  </div>
</template>

<script>
  import HeaderBar from './components/HeaderBar.vue';
  import HomeView from './views/HomeView.vue';
  
  export default {
    props: [  ],
    components: { HomeView, HeaderBar }, 
    name: 'App',
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