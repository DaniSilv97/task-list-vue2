<template>
    <div class="popup">
        <div class="popup-content" :key="1">
            <div class="message radius-and-shadow">
                <h3>Please fill the form</h3>
            </div>
            <div class="button-container radius-and-shadow">
                <div class="button-holder radius-and-shadow">
                    <button class="button" @click="$emit('clicked')"> Will do ! </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: [  ],
        components: {  }, 
        name: 'Popup',
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
    .popup{
        display: flex;
        position: fixed;
        height: 120%;
        width: 100%;
        min-height: 100vh;
        z-index: 2;
        background-color: #1e1d1f80;
    }
    .popup-content{
        position: fixed;
        z-index: 3;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(1);
        padding: 2rem;
        height: 10rem;
        width: 26rem;
        background-color: var(--darkGrey);
        border-radius: 1rem;
    }
    .message{
        background-color: var(--grey);
        font-size: 1.5rem;
        border: 0.02rem solid var(--hover);
        padding: 0rem 3rem;
    }
    .button-container{
        display: flex;
        justify-content: center;
        background-color: var(--grey);
        padding: 0.5rem;
        margin-top: 2rem;
    }
</style>