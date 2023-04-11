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
        },
        saveToStorage() {
            localStorage.setItem('ListOfTaskLists', JSON.stringify(this.storageLists))
        },
    },
    created(){
        this.loadStorage()
    }
}