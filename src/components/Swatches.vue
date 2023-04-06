<template>
    <div class="swatches button-holder radius-and-shadow" >
        <div class="colors-container">
            <div class="accent-colors">
                <input type="color" disabled :value="thisSwatch.mainColor">
                <input type="color" disabled :value="thisSwatch.secColor">
            </div>
            <div class="time-colors">
                <input type="color" disabled :value="thisSwatch.enoughTime">
                <input type="color" disabled :value="thisSwatch.shortTime">
                <input type="color" disabled :value="thisSwatch.noTime">
            </div>
        </div>
        <button class="button" @click="setTheme"> Swatch {{ thisSwatch.id }}</button>
    </div>
</template>

<script>
    export default {
        props: [ 'thisSwatch' ],
        components: {  }, 
        name: 'Swatches',
        data(){
            return{
                
            }
        },
        methods:{
            setTheme(){
                    this.$emit('setTheme', this.thisSwatch)
                }
        },
        computed:{
        
        },
    }
</script>

<style scoped>
    .swatches{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0.5rem 0.2rem;
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
    }
    input[type="color"]::-webkit-color-swatch {
        border: 0.2rem solid var(--darkGrey);
        border-radius: 50%;
    }
</style>