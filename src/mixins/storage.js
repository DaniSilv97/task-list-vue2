export default{
    data(){
        return{
            storageLists: {}
        }
    },
    methods:{
        // Local Storage --------------------------------------
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
        //

        // Task lists --------------------------------------
        saveListToStorage(listObj){
            this.loadLocalStorage()
            this.storageLists[listObj.id] = listObj
            this.saveToLocalStorage()
        },
        deleteListToStorage(listId){
            this.loadLocalStorage()
            delete this.storageLists[listId]
            this.saveToLocalStorage()
        },
        loadListData(listId){
            this.loadLocalStorage()
            return (this.storageLists[listId])
        },
        //

        // Tasks --------------------------------------
        saveTaskToStorage(taskObj){
            this.loadLocalStorage()
            this.storageLists[taskObj.listId].tasks[taskObj.id] = taskObj
            this.saveToLocalStorage()
        },
        deleteTaskToStorage(taskObj){
            this.loadLocalStorage()
            delete this.storageLists[taskObj.listId].tasks[taskObj.id]
            this.saveToLocalStorage()
        },
        //
    },
}