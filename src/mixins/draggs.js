export default{
    data(){
        return{
            dragStartEventData: {startListId:'', startTaskIndex:''},
            dragEndEventData: {endListId:'', endTaskIndex:''},
        }
    },
    methods:{

        saveStart(startListId, startTaskIndex){
            this.dragStartEventData.startListId = startListId
            this.dragStartEventData.startTaskIndex = startTaskIndex
            this.saveDragStartToLocal()
        },
        saveDragStartToLocal(){
            localStorage.setItem('DragStart', JSON.stringify(this.dragStartEventData))
        },
        loadDragStart(){
            const loadedStart = JSON.parse(localStorage.getItem('DragStart'))
            return loadedStart
        },
 
        saveEnd(endListId, endTaskIndex){
            this.dragEndEventData.endListId = endListId
            this.dragEndEventData.endTaskIndex = endTaskIndex
            this.saveDragEndToLocal()
        },
        saveDragEndToLocal(){
            localStorage.setItem('DragEnd', JSON.stringify(this.dragEndEventData))
        },
        loadDragEnd(){
            const loadedEnd = JSON.parse(localStorage.getItem('DragEnd'))
            return loadedEnd
        },

        saveRemovedTask(task){
            localStorage.setItem('removedTask', JSON.stringify(task))
        },
        loadRemovedTask(){
            const loadedTask = JSON.parse(localStorage.getItem('removedTask'))
            return loadedTask
        },

        removeDragFromStorage(tempTaskObj){
            const tempAllTaskLists = this.loadLocalStorage()
            delete tempAllTaskLists[tempTaskObj.listId].tasks[tempTaskObj.id]
            this.saveAllTaskListsToStorage(tempAllTaskLists)
        },

        cleanLocalStorage(){
            localStorage.removeItem("DragStart")
            localStorage.removeItem("DragEnd")
            localStorage.removeItem("removedTask")
        }
    }
}