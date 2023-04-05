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
        }
    }
}