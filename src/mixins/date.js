export default{
    methods:{
        todayAsId(){
            const newId = new Date()
            return newId.getTime()
        }
    }
}