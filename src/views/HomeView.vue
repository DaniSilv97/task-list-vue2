<template>
  <div class="home">
    <AllLists @showPopup="showPopup = true"></AllLists>
    <fade-transition class="popup-container">
      <Popup v-show="showPopup" @clicked="hidePopup"></Popup>
    </fade-transition>
  </div>
</template>

<script>
  import { FadeTransition  } from 'vue2-transitions'
  import AllLists from '../components/homeView/AllLists.vue'
  import Popup from '../components/homeView/Popup.vue'
  import date from '../mixins/date'
  import storage from '../mixins/storage'

  export default {
    mixins: [ date, storage ],
    components: { AllLists, Popup, FadeTransition  }, 
    name: 'HomeView',
    data(){
      return{
        // // Event handler for TaskList
        // taskListEventHandlers : {
        //   // TaskList
        //   showHideTasks: this.showHideTasks,
        //   deleteList: this.deleteList,
        //   listNameChange: this.listNameChange,
        //   startDrag: this.saveStart,
        //   endDrag: this.saveEnd,

        //   // AddTask
        //   addNewTask: this.checkForTaskName,
        //   // Task
        //   deleteTask: this.deleteTask,
        //   taskNameChange: this.taskNameChange,
        //   checkboxChanged: this.checkboxChanged,
        //   // SearchTask
        //   searchTask: this.searchTask,
        //   // Sorters
        //   showAll: this.showAll,
        //   showDone: this.showDone,
        //   showNotDone: this.showNotDone,
        // },
        // dragEventData: {startListId:'', startTaskIndex:'', endListId:'', endTaskIndex:''},
        showPopup: false
      }
    },
    methods:{
      // /**
      //  *This function checks for a nonEmpty name for a list and calls for creation 
      //  *@param listName The name of the list to check. 
      //  */
      // checkForName(listName){
      //   const newListName = listName.replaceAll(' ', '')
      //   if(newListName){
      //     this.createNewList(listName)
      //   } else{
      //     this.showPopup = true
      //   }
      // },
      
      // /** 
      //  *This function creates a new list with an id(from mixin), a name(param), and default values for isShown, showTasks, and tasks. 
      //  *Then, it pushes the new list to the allTaskLists array and calls for save to storage. 
      //  *@param listName {String} The name to give the new list.
      //  */
      // createNewList(listName){
      //   const newList = { id: this.todayAsId()+'11', 
      //                     type: 'list', //TODO enum
      //                     name: listName, 
      //                     isShown: true,
      //                     showTasks: true, 
      //                     tasks:[]}
      //   this.allTaskLists.push(newList)
      //   this.saveToStorage()
      // },
      // /**
      //  *If list in allTaskLists match list(param) swap between hide and show, call for save
      //  *@param list List obj
      //  */
      // showHideTasks(list){
      //   this.allTaskLists.forEach(element=>{
      //     if(element.id === list.id){
      //       element.showTasks = !element.showTasks
      //       this.saveToStorage()
      //     }
      //   })
      // },

      // /**
      //  * Deletes list from allTaskLists based on list.id(param.id), call for save
      //  * @param list List obj
      //  */
      // deleteList(list){
      //   this.allTaskLists.forEach(element=>{
      //     if(element.id === list.id){
      //       this.allTaskLists.splice(this.allTaskLists.indexOf(element), 1)
      //       this.saveToStorage()
      //     }
      //   })
      // },
      // /**
      //  * Based on eventData change the name of a list, call for save
      //  * @param eventData object with litId and newName
      //  */
      // listNameChange(eventData){
      //   this.allTaskLists.forEach(element=>{
      //     if(element.id === eventData.listId){
      //       element.name = eventData.newName
      //       this.saveToStorage()
      //     }
      //   })
      // },
      // /**
      //  *Checks for a nonEmpty name for a task and calls for creation 
      //  *@param task task obj
      //  */
      // checkForTaskName(task){
      //   if(task.name.replaceAll(' ', '')){
      //     this.addNewTask(task)
      //   } else{
      //     this.showPopup = true
      //   }
      // },
      // /**
      //  * Creates a task obj with id, name, date, done, isShown, based on eventData, add to array, call for save
      //  * @param eventData obj with id name and date
      //  */
      // addNewTask(eventData){
      //   this.allTaskLists.forEach(element=>{
      //     if(element.id === eventData.id){
      //       element.tasks.push({  id: this.todayAsId()+'22', 
      //                             name: eventData.name, 
      //                             date: eventData.date, 
      //                             done: false, 
      //                             isShown: true})
      //       this.saveToStorage()
      //     }
      //   })
      // },
      // /**
      //  * Deletes task from list based on event data, call for save
      //  * @param eventData obj with taskId 
      //  */
      // deleteTask(eventData){
      //   this.allTaskLists.forEach(list=>{
      //     list.tasks.forEach(task=>{
      //       if(task.id === eventData.taskId){
      //         list.tasks.splice(list.tasks.indexOf(task),1)
      //         this.saveToStorage()
      //       }
      //     })
      //   })
      // },
      // /**
      //  * Change the same of a task based on evnetData, call for save
      //  * @param eventData obj with taskId and newName
      //  */
      // taskNameChange(eventData){
      //   this.allTaskLists.forEach(list=>{
      //     list.tasks.forEach(task=>{
      //       if(task.id === eventData.taskId){
      //         task.name = eventData.newName
      //         this.saveToStorage()
      //       }
      //     })
      //   })
      // },
      // /**
      //  * Shows task based on event data, hides the rest
      //  * @param eventData obj with listId and lookFor
      //  */
      // searchTask(eventData){
      //   this.allTaskLists.forEach(element=>{
      //     if(element.id === eventData.listId){
      //       element.tasks.forEach(task=>{
      //         task.isShown = task.name.includes(eventData.lookFor)
      //         /* if(task.name.includes(eventData.lookFor)){
      //           task.isShown = true
      //         } else{
      //           task.isShown = false
      //         } */
      //       })
      //     }
      //   })
      // },
      // /**
      //  * If checkbox on eventData is changed, swap task isDone between true/false, call for save
      //  * @param eventData obj with listId and taskId
      //  */
      // checkboxChanged(eventData){
      //   this.allTaskLists.forEach(list=>{
      //     if(list.id === eventData.listId){
      //       list.tasks.forEach(task=>{
      //         if(task.id === eventData.taskId){
      //           task.done = !task.done
      //           this.saveToStorage()
      //         }
      //       })
      //     }
      //   })
      // },
      // /**
      //  * Based on param, show all lists or show a list, hide others
      //  * @param listName name of list, if empty show all
      //  */
      // doSelectList(listName){
      //   if(!listName){
      //     this.allTaskLists.forEach(list=>{
      //       list.isShown = true
      //     })
      //   } else{
      //     this.allTaskLists.forEach(list=>{
      //       // TODO use ID
      //       if(list.name === listName){
      //         list.isShown = true
      //       } else{
      //         list.isShown = false
      //       }
      //     })
      //   }
      // },
      // //TODO mixin dnd
      // /**
      //  * Alters data to save drag start info
      //  * @param eventData obj with startListId and startTaskIndex
      //  */
      // saveStart(eventData){
      //   this.dragEventData.startListId = eventData.startListId
      //   this.dragEventData.startTaskIndex = eventData.startTaskIndex
      // },
      // /**
      //  * Alters data to save drag end info
      //  * @param eventData obj with endListId and endTaskIndex
      //  */       
      // saveEnd(eventData){
      //   this.dragEventData.endListId = eventData.endListId
      //   this.dragEventData.endTaskIndex = eventData.endTaskIndex
      //   this.doDrag()
      // },
      // /**
      //  * based on saved drag info, remove task from list, call for place
      //  */
      // doDrag(){
      //   this.allTaskLists.forEach(list=>{
      //     if(list.id === this.dragEventData.startListId){
      //       const removedTask = list.tasks.splice(this.dragEventData.startTaskIndex, 1)
      //       this.placeTask(this.dragEventData, removedTask)
      //     }
      //   })
      // },
      // /**
      //  * Places task into the desired task list based on the eventData. call for save
      //  * @param {*} eventData this saved dragEventData
      //  * @param {*} taskObj remove task obj in doDrag
      //  */
      // placeTask(eventData, taskObj){
      //   this.allTaskLists.forEach(list=>{
      //     if(list.id === eventData.endListId){
      //       list.tasks.splice(eventData.endTaskIndex, 0, taskObj[0])       
      //       this.saveToStorage()
      //     }
      //   })
      // },
      // /**
      //  * hide alert popup
      //  */
      hidePopup(){
        this.showPopup = false
      },
      // /**
      //  * Make all tasks visible
      //  * @param listId Id of list to sort
      //  */
      // showAll(listId){
      //   this.allTaskLists.forEach(list=>{
      //     if(list.id === listId){
      //       list.tasks.forEach(task=>{
      //         task.isShown = true
      //       })
      //     }
      //   })
      // },
      // /**
      //  * Make only done tasks visible
      //  * @param listId Id of list to sort
      //  */
      // showDone(listId){
      //   this.allTaskLists.forEach(list=>{
      //     if(list.id === listId){
      //       list.tasks.forEach(task=>{
      //         task.isShown = task.done
      //       })
      //     }
      //   })
      // },
      // /**
      //  * Make only not done tasks visible
      //  * @param listId Id of list to sort
      //  */
      // showNotDone(listId){
      //   this.allTaskLists.forEach(list=>{
      //     if(list.id === listId){
      //       list.tasks.forEach(task=>{
      //         task.isShown = !task.done
      //       })
      //     }
      //   })
      // },
      // /**
      //  * save allTaskLists to local storage
      //  */
      // saveToStorage(){
      //   localStorage.setItem('ListOfTaskLists', JSON.stringify(this.allTaskLists))
      // }
    },
    created(){
/*       // if exists, load local storage
      if(JSON.parse(localStorage.getItem('ListOfTaskLists'))){
        this.allTaskLists = JSON.parse(localStorage.getItem('ListOfTaskLists'))
      }
      // makes sure all tasks are visible on load
      this.allTaskLists.forEach(list=>{
        list.tasks.forEach(task=>{
          task.isShown = true
        })
      }) */
    },
  }
</script>

<style scoped>
  .home{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>