const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10; // ストレッチングの回数

app.use(bodyParser.json());

const mockUserData=[
    {name:'Mark'},
    {name:'Jill'}
]
app.get('/users', function(req,res) {
    res.json({
        success: true,
        message: 'successfully got users. Nice!',
        users: mockUserData
    })
})
app.get('/users/:id',function(req,res){
    console.log(req.params.id)
    res.json({
        success: true,
        message: 'got one user',
        user: req.params.id
    })
})

app.post('/login',function(req,res){
    const username=req.body.username;
    const hashedPassword=bcrypt.hash(req.body.password, saltRounds);

    const mockUsername="billyTheKid";
    const mockPassword="superSecret";

    if (username===mockUsername && bcrypt.compareSync(mockPassword, hashedPassword)) {
        res.json({
            success: true,
            message: 'password and username match!',
            token: 'encrypted token goes here'
        })
    } else {
        res.jeson({
            success: false,
            message: 'password and username do not match'
        })
    }
})

app.listen(8000,function(){
    console.log("server is runnning")
})