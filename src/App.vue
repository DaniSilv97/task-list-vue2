<template>
  <div>
    <HeaderBar></HeaderBar>
    <router-view/>
  </div>
</template>

<script>
  import HeaderBar from './components/HeaderBar.vue';
  import HomeView from './views/HomeView.vue';
  import SettingsView from './views/SettingsView.vue';
  
  export default {
    props: [  ],
    components: { HomeView, HeaderBar, SettingsView }, 
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