<template>
    <div class="add-task radius-and-shadow">
        <input  type="text" 
                class="name remove-default input-text"
                placeholder="e.g. Do the dishes"
                v-model="newTaskName">
        <input  type="date" 
                class="date remove-default input-text"
                v-model="newTaskDate">
        <button class="submit remove-default button" @click="addNewTask">Add</button>        
    </div>
</template>

<script>
    import date from '../mixins/date'

    export default {
        mixins: [ date ],
        props: [ 'thisList' ],
        components: {  }, 
        name: 'AddTask',
        data(){
            return{
                newTaskName: '',
                newTaskDate: '',
            }
        },
        methods:{
            addNewTask(){
                this.$emit('addNewTask', {id: this.thisList.id, name: this.newTaskName, date: this.newTaskDate})
            },
        },
        computed:{
        
        },
        created(){
            this.newTaskDate = this.tommorowForHTML()

        }
    }
</script>

<style scoped>
    .add-task{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background-color: var(--grey);
        padding: 0.3rem;
        margin: 1.3rem 0rem 0.5rem 0rem;
    }
    .name{
        width: 11.5rem;
        padding: 0.5rem 0rem 0.5rem 0.4rem
    }
    .date{
        width: 6rem;
        padding: 0.5rem 0.2rem 0.5rem 0.5rem;
    }
    .name, .date{
        margin-right: 0.5rem;
    }
    .submit{
        margin-left: 0rem;
    }
</style>