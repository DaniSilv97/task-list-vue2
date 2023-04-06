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
        root: document.querySelector(':root'),
      }
    },
    methods:{
      
    },
    computed:{
    
    },
    created(){
      this.root.style.setProperty('--blue', '#0087ff');
      this.root.style.setProperty('--hover', '#00e1ff');
      this.root.style.setProperty('--enoughTime', '#00d8ff');
      this.root.style.setProperty('--shortTime', '#00A4FF');
      this.root.style.setProperty('--noTime', '#006eff');
    }
  }
</script>

<style scoped>

</style>