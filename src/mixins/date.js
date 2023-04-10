export default{
    methods:{
        /**
         * Generates a number based on Date.getTime
         * @returns Id number
         */
        todayAsId(){
            const newId = new Date()
            return newId.getTime()
        },
        /**
         * Generates a date string for html input type date
         * @returns String 'yyyy-mm-dd'
         */
        tommorowForHTML(){
            const today = new Date()
            const tommorow =new Date ()
            tommorow.setDate(today.getDate()+1)
            return (tommorow.toISOString().split('T')[0])
        },
        /**
         * Returns num of days between today and param
         * @param {*} dateString yyyy-mm-dd
         * @returns Number of days
         */
        getTimeLeft(dateString){
            const dateObj = new Date(dateString)
            const diffInDays = (dateObj.getTime() - this.todayAsId()) / (1000 * 3600 * 24)
            return diffInDays
        }
    }
}