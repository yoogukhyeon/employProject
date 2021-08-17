//env 개발환경 설정 개발로그 환경 구축
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
    console.log('Production Mode')
}else if(process.env.NODE_ENV === "production"){   
    console.log('Development Mode')
}

// dotenv 파일 연결 
const dotenv = require('dotenv');
dotenv.config({path: './.env'})

const express = require('express');
const db = require('./config/db');
const employeeController = require('./controllers/employeeController');
const bodyParser = require('body-parser');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

const app = express();
//path 추가 
const path = require('path');
//connect DB
const connectDB = require('./config/db');
connectDB()
//exHandle 상수에 미들웨어 등록
const exphbs = require('express-handlebars');

//public connected
app.use(express.static(`${__dirname}/public`))


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/employee' , employeeController)
app.set('views' , path.join(__dirname, '/views'));

//view engine
app.engine('hbs', exphbs({extname: 'hbs' , defaultLayout: 'mainLayout' ,  layoutsDir: __dirname + '/views/layouts', runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
}}))
app.set('view engine', 'hbs')


const port = process.env.PORT || 5000;
app.listen(port , () => {
    console.log(`${port}포트 포트로 이동중.....`)
})