<template>
    <div class="header-wrapper radius-and-shadow">
        <div class="header-content">
            <div> 
                <h3 class="welcome">Welcome,</h3>
                <input class="remove-default user-name" type="text" :placeholder="userPlaceHolder" >
            </div>
            <nav>
                <div class="button-holder radius-and-shadow">
                    <router-link to="/" class="button">Home</router-link>
                    <router-link to="/settings" class="button">Settings</router-link>
                </div>            
            </nav>
        </div>
    </div>
</template>

<script>
    export default {
        props: [  ],
        components: {  }, 
        name: 'HeaderBar',
        data(){
            return{
                userPlaceHolder: ' Name Here'
            }
        },
        methods:{
        
        },
        computed:{
        
        },
    }
</script>

<style scoped>
.header-wrapper{
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 0.5rem 1rem;
    height: 4rem;
    background-color: var(--grey);
    padding: 0.4rem 3rem;
    border-radius: 1.2rem;
}
.header-content{
    flex: 1 1 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.header-wrapper div, 
.header-wrapper nav div{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.welcome, .user-name{
    font-size: 1.4rem;
    font-weight: 700;
}
.user-name{
    background-color: var(--grey);
    max-width: 10rem;
}
nav{
    padding: 0;
}
</style>