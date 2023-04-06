<template>
    <div class="header-wrapper radius-and-shadow">
        <div class="welcome-user"> 
            <h3 class="welcome">
                Welcome, <input class="remove-default user-name" type="text" placeholder="Name Here" v-model="userName" @change="changedUser">
            </h3>
        </div>
        <div class="nav-container button-holder radius-and-shadow">
            <nav>                
                <router-link to="/" class="button">Home</router-link>
                <router-link to="/settings" class="button">Settings</router-link>
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
                userName: ''
            }
        },
        methods:{
            changedUser(){
                localStorage.setItem('userName', JSON.stringify(this.userName))
            }
        },
        computed:{
        
        },
        created(){
            if(JSON.parse(localStorage.getItem('userName'))){
                this.userName = JSON.parse(localStorage.getItem('userName')
            )}
        }
    }
</script>

<style scoped>
.header-wrapper{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0.5rem 1rem;
    height: 4rem;
    background-color: var(--grey);
    padding: 0.4rem 1rem;
    border-radius: 1.2rem;
}.welcome, .user-name{
    font-size: 1.4rem;
    font-weight: 700;
}
.user-name{
    color: var(--lightestGrey);
    background-color: var(--grey);
    max-width: 10rem;
}
.user-name:focus{
    color: var(--blue);
    opacity: 0.7;
}
.nav-container{
    padding: 0.3rem;
}
nav{
    padding: 0.6rem 0rem;
}
</style>