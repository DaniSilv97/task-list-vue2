export default{
    data(){
        return{
            storageLists: []
        }
    },
    methods:{
        loadStorage() {
            if(JSON.parse(localStorage.getItem('ListOfTaskLists'))) {
                this.storageLists = JSON.parse(localStorage.getItem('ListOfTaskLists'))
            }
            return (this.storageLists)
        },
        saveToStorage() {
            localStorage.setItem('ListOfTaskLists', JSON.stringify(this.storageLists))
        },
        addList(listObj) {
            this.storageLists.push(listObj)
            this.saveToStorage()
        }
    },
    created(){
        this.loadStorage()
    }
}