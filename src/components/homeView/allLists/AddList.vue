<template>
    <div class="add-list">
        <input  type="text" 
                class="list-name input-text remove-default"
                placeholder="e.g. Chores"
                v-model="newTaskName">
        <button class="remove-default button" @click="emitCreateList">Add List</button>
    </div>
</template>

<script>
    export default {
        props: [  ],
        components: {  }, 
        name: 'AddList',
        data(){
            return{
                newTaskName:''
            }
        },
        methods:{
            /**
             * emits event with a name for a new list, resets field
             */
            emitCreateList(){
                this.$emit('createNewList', this.newTaskName)
                this.newTaskName = ''
            }
        },
        computed:{
        
        },
    }
</script>

<style scoped>
    .add-list{
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .list-name{
        flex: 1 1 0;
        padding: 0.4rem 0.5rem;
        margin-right: 0.7rem;
    }
</style>