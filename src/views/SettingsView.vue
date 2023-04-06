<template>
    <div class="settings main-wrapper">
        <div class="swatch-container">
            <div v-for="swatch in swatches" :key="swatch.id" >
                <Swatches :thisSwatch="swatch" v-on:setTheme="setTheme"></Swatches>
            </div>
        </div>
    </div>
</template>

<script>
    import Swatches from '@/components/Swatches.vue'
    
    export default {
        props: [  ],
        components: { Swatches }, 
        name: 'SettingsView',
        data(){
            return{
                swatches:[  {   id: 1, 
                                mainColor: '#0087ff', 
                                secColor: '#00e1ff', 
                                enoughTime: '#00d8ff', 
                                shortTime: '#0097ff', 
                                noTime: '#006eff'},
                            {   id: 2, 
                                mainColor: '#ff8c00', 
                                secColor: '#fed766', 
                                enoughTime: '#fcc000', 
                                shortTime: '#f68608', 
                                noTime: '#dd242a'},
                            {   id: 3, 
                                mainColor: '#268d17', 
                                secColor: '#5bc328', 
                                enoughTime: '#77FF94', 
                                shortTime: '#A1E44D', 
                                noTime: '#60993E'}]
            }
        },
        methods:{
            setTheme(swatch){
                const root = document.querySelector(':root');
                root.style.setProperty('--blue', swatch.mainColor);
                root.style.setProperty('--hover', swatch.secColor);
                root.style.setProperty('--enoughTime', swatch.enoughTime);
                root.style.setProperty('--shortTime', swatch.shortTime);
                root.style.setProperty('--noTime', swatch.noTime);
            },
        },
        computed:{
        
        },
    }
</script>

<style scoped>
    .settings{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .swatch-container{
        width: 28rem;
    }
</style>