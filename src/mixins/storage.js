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
        addListToStorage(listObj){
            this.loadLocalStorage()
            this.storageLists[listObj.id] = listObj
            this.saveToLocalStorage()
        },
        deleteListToStorage(listId){
            this.loadLocalStorage()
            delete this.storageLists[listId]
            this.saveToLocalStorage()
        }
    },
}