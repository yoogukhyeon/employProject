//상수 바뀌지는 않는것 
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('employee');


router.get('/', async (req , res) => {
   try{
    await res.render('employee/addOrEdit',{
        viewTitle : "직원 명단"
    })
   }catch(err){
    conosle.error(err)
   }
})

router.post('/' , async (req, res) => {
    try{
        if(req.body._id == ''){
            await  insertRecord(req, res);
          }else{
            await  updataRecord(req, res);
          }
    }catch(err){
        console.error(err)
    }
})



async function insertRecord(req, res){
    var employee = new Employee();

    employee.fullName = req.body.fullName;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.city = req.body.city;

    console.log(`fullName : ${employee.fullName} , email : ${ employee.email} , mobile : ${employee.mobile} , city : ${employee.city}`)
    await employee.save((err, doc) => {
        if(!err){
            res.redirect('employee/index')
        }else{
            if(err.name == 'ValidationError'){
                validationError(err , req.body)   
                res.render('employee/addOrEdit',{
                    viewTitle : "직원 명단",
                    employee : req.body
                })    
            }else{
                console.log('Error during record insertion :' + err);
            }
        }
    });

}


async function updataRecord(req, res){
    await Employee.findOneAndUpdate({_id: req.body._id} , req.body , {new: true} , (err, doc) => {
        if(!err){
            res.redirect('employee/index')
        }else{
            if(err.name == 'ValidationError'){
                validationError(err, req.body);
                res.render('employee/addOrEdit',{
                    viewTitle : "새로운 직원 추가",
                    employee: req.body
                })
            }else{
                console.log('Error during record update :' + err);
            }
        }

    })
}




router.get('/index' , async (req, res) => {
    try{
        await Employee.find((err, docs) => {
            if(!err){
                res.render('employee/index' , {
                    list: docs
                });
            }else{
                conosle.log('Error in retrieving employee list :' + err);
            }
        });
    }catch(err){
        console.error(err)
    }
})


function validationError(err , body){
    for(field in err.errors)
    {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}



router.get('/:id' , async (req, res) => {
    try{
        await Employee.findById(req.params.id, (err, doc) => {
            if(!err){
                res.render('employee/addOrEdit',{
                    viewTitle : "직원 정보 수정",
                    employee: doc
                })
            }
        });
    }catch(err){
        console.error(err);
    }

})

router.get('/delete/:id' , async (req , res) => {
     try{
        await Employee.findByIdAndDelete(req.params.id , (err , doc) => {
            if(!err){
                res.redirect('/employee/index')
            }else{
                console.log('Error in employee delete' + err);
            }
        });
    }catch(err){
        console.error(err)
    }
})

    
module.exports = router;
