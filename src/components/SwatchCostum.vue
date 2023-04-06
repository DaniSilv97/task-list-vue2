<template>
    <div class="swatch-costum button-holder radius-and-shadow" >
        <div class="colors-container">
            <div class="accent-colors">
                <input type="color" v-model="mainColor">
                <input type="color" v-model="secColor">
            </div>
            <div class="time-colors">
                <input type="color" v-model="enoughTime">
                <input type="color" v-model="shortTime">
                <input type="color" v-model="noTime">
            </div>
        </div>
        <button class="button" @click="setTheme"> Costum </button>
    </div>
</template>

<script>
    export default {
        props: [  ],
        components: {  }, 
        name: 'SwatchCostum',
        data(){
            return{
                root: document.querySelector(':root'),
                mainColor: '',
                secColor: '',
                enoughTime: '',
                shortTime: '',
                noTime: '',
            }
        },
        methods:{
            setTheme(){
                this.root.style.setProperty('--blue', this.mainColor);
                this.root.style.setProperty('--hover', this.secColor);
                this.root.style.setProperty('--enoughTime', this.enoughTime);
                this.root.style.setProperty('--shortTime', this.shortTime);
                this.root.style.setProperty('--noTime', this.noTime);
            },
        },
        computed:{
        
        },
        created(){
            let computedStyle = window.getComputedStyle(this.root)
            this.mainColor = String(computedStyle.getPropertyValue('--blue'))
            this.secColor = String(computedStyle.getPropertyValue('--hover'))
            this.enoughTime = String(computedStyle.getPropertyValue('--enoughTime'))
            this.shortTime = String(computedStyle.getPropertyValue('--shortTime'))
            this.noTime = String(computedStyle.getPropertyValue('--noTime'))
        }
    }
</script>

<style scoped>
    .swatch-costum{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 2rem 0.2rem 0.5rem 0.2rem;
    }
    .colors-container{
        background-color: var(--grey);
        padding: 0.3rem;
        flex: 1 1 0;
        display: flex;
        justify-content: space-between;
        margin-right: 1rem;
    }
    input[type="color"]{
        height: 3rem;
        width: 3rem;
        background-color: transparent;
        border: none;
        cursor: pointer;
    }
    input[type="color"]::-webkit-color-swatch {
        border: 0.2rem solid var(--darkGrey);
        border-radius: 50%;
    }
    button{
        padding-left: 0.8rem;
        padding-right: 0.8rem;
    }
</style>