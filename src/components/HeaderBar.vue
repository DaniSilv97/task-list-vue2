<template>
    <div class="header-wrapper radious-and-shadow">
        <div> 
            <h3 class="welcome">Welcome,</h3>
            <input class="remove-default user-name" type="text" :placeholder="userPlaceHolder" >
        </div>
        <nav>
            <div class="button-holder radious-and-shadow">
                <router-link to="/" class="button radious-and-shadow">Home</router-link>
                <router-link to="/settings" class="button radious-and-shadow">Settings</router-link>
            </div>            
        </nav>
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
    margin: 0.5rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 4rem;
    background-color: var(--grey);
    padding: 0.4rem 1.5rem;
    border-radius: 1.2rem;
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
    max-width: 9rem;
}
</style>