const mongoose = require('mongoose');
const employeeSchema = require('./employee.model')

// mongoose.connect('mongodb://localhost:27017/EmployeeDB', {useNewUrlParser: true , useUnifiedTopology: true}, (err) => {
//     if(!err){
//         console.log('mongoDB Connection Succeeded. 연결성공!!!!')
//     }else{
//         console.log('Error in DB Connection' + err);
//     }
// });

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL , {
            useNewUrlParser : true,
            useUnifiedTopology : true,
            useFindAndModify : false
        })

        
        console.log(`MongoDB Connected : ${conn.connection.host}`);
    }catch(err){
        console.error(err);
        //error 나면 그순간 프로세스 끝내기
        process.exit(1)
    }
}

module.exports = connectDB;