const User = require('../models/details')
module.exports.getData = function(req,res){
    console.log('hello')
    console.log(req.query)
    User.find({
        gender:req.query.gender,
        nat:req.query.nat
    }).then((data) => {
        console.log(data,req.query)
        res.status(200).json({
            data:data
        })
    })
    // User.find({country:'CA'},(err,data) => {
    //     console.log(data)
    // })

    
}