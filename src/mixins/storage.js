export default{
    data(){
        return{
            
        }
    },
    methods:{
        loadStorage() {
            if(JSON.parse(localStorage.getItem('ListOfTaskLists'))) {
                const storageLists = JSON.parse(localStorage.getItem('ListOfTaskLists'))
                return (storageLists)
            } else {
                const storageLists = {}
                return (storageLists)
            }
        },
        saveToStorage() {
            localStorage.setItem('ListOfTaskLists', JSON.stringify(this.storageLists))
        },
    },
}