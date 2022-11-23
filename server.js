// import express  from 'express'
let express = require('express')
let projectData = {}
let myapp = express();
let port = 8010

myapp.use(express.json())
myapp.use(express.urlencoded({extended:false}))
myapp.use(express.static("website"))

let lorin = require('cors')
myapp.use(lorin());
myapp.post("/add",async function(requst,respons)
{
    let alldata = await requst.body
    projectData = alldata
    console.log(projectData);
    respons.status(200).send(projectData)
})


myapp.get("/all" ,async (respon ,requst)=>
{
    if(projectData)
    {
        requst.send(projectData)
    }

})




myapp.listen(port , ()=>
{
    console.log(port);
})

