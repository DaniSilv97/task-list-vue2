export default{
    methods:{
        todayAsId(){
            const newId = new Date()
            return newId.getTime()
        },
        tommorowForHTML(){
            const today = new Date()
            const tommorow =new Date ()
            tommorow.setDate(today.getDate()+1)
            return (tommorow.toISOString().split('T')[0])
        },
        getTimeLeft(dateString){
            const dateObj = new Date(dateString)
            const diffInDays = (dateObj.getTime() - this.todayAsId()) / (1000 * 3600 * 24)
            return diffInDays
        }
    }
}