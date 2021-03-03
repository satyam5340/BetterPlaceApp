const express = require('express');
const port = 7000
const https = require('https')
const db = require('./config/mongoose')
const app = express();
const cors = require('cors')
const User = require('./models/details')
app.use(cors())
app.get('/getData',(req,res) => {
    https.get('https://randomuser.me/api?page=1&results=5000',(got) => {
        console.log('hello')
        let data = ''
        function resolveHandler(data){
            console.log('resolved')
        }
        function rejectHandler(err){
            console.log(err)
        }

        got.on('data',(chunk) => {
            
            data += chunk
            
        })

        got.on('end',() => {
            let details = JSON.parse(data)
            details = details.results
            
            User.find({}).then((res) => {
                if (res.length === 0){
                    
                }
            })
            let allPromise = []
            // Thumbnail
            // ●Name of the person
            // ●Gender
            // ●Nationality
            // ●Email
            // ●Phone
            
            for (let i = 0; i < details.length ; i++){
                allPromise.push(new Promise(function(resolve,reject){
                    
                    
                    User.create({
                        thumbnail:details[i].picture.thumbnail,
                        name: details[i].name.title+' '+details[i].name.first+' '+details[i].name.last,
                        gender:details[i].gender,
                        country:details[i].location.country,
                        email:details[i].email,
                        phone:details[i].phone,
                        nat:details[i].nat,
                        bigger:details[i].picture.large

                    },(err,data) => {
                        if (err){
                            reject(err)
                            return
                        }
                        resolve(data)
                    })
                }).then(resolveHandler,rejectHandler))
            }
            Promise.all(allPromise).then(res.send('<div>Youre ready to fetch data</div>'))
            

            
        })
    }).on('error',(err)=>{
        console.log(err)
    })
});
app.use('/api',require('./routes/index.js'))

app.listen(port,(err) => {
    if (err){
        console.log('err')
        return
    }
    console.log('Server is Up and running on port',port)
})