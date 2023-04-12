export default{
    data(){
        return{
            storageLists: {}
        }
    },
    methods:{
        loadLocalStorage() {
            if(JSON.parse(localStorage.getItem('ListOfTaskLists'))) {
                this.storageLists = JSON.parse(localStorage.getItem('ListOfTaskLists'))
                return (this.storageLists)
            } else {
                return (this.storageLists)
            }
        },
        saveToLocalStorage() {
            localStorage.setItem('ListOfTaskLists', JSON.stringify(this.storageLists))
        },

        // Task lists
        addListToStorage(listObj){
            this.loadLocalStorage()
            this.storageLists[listObj.id] = listObj
            this.saveToLocalStorage()
        },
        deleteListToStorage(listId){
            this.loadLocalStorage()
            delete this.storageLists[listId]
            this.saveToLocalStorage()
        },
        //

        // Tasks
        addTaskToStorage(taskObj){
            this.loadLocalStorage()
            this.storageLists[taskObj.listId].tasks[taskObj.id] = taskObj
            this.saveToLocalStorage()
        },
        deleteTaskToStorage(taskObj){
            this.loadLocalStorage()
            delete this.storageLists[taskObj.listId].tasks[taskObj.id]
            this.saveToLocalStorage()
        },
        changeTaskNameToStorage(taskObj){
            this.loadLocalStorage()
            this.storageLists[taskObj.listId].tasks[taskObj.id] = taskObj
            this.saveToLocalStorage()
        }
    },
}