const express = require('express')
const app = express()
let Feed = require('rss-parser')
let cors = require("cors")
let parser = new Feed()
const sites = require('./sites.json')
const cron = require("node-cron")
const shell = require("shelljs")
var all = []
app.use(cors())
function add(title, link, date){
    var post = {
        title: title,
        link: link,
        date: date
    } 
    all.push(post)
}
 async function push(){
for(const site of sites){
    try{
    const now = await parser.parseURL(site.url);
    now.items.forEach(item =>{
        all.push(item)
        }
    )
    }catch(e){
       console.log("I has problem " + e);
       
    }
    
 }
}
 /*
 async function update(){

for(const sit of sites){
    try{
     const now = await parser.parseURL(sit.url);
    now.items.forEach(ite =>{
        var a = all.find(i=> i == ite.title)
        if (a != ite.title) {
            all.push(ite)
            console.log("done " + ite);
        }
   })
    }catch(e){
        console.log("I has problem in update(): "+e);
        
    }
 }

}
*/


async function run(){

   await push()
}
    run()
app.get("/", (req,res)=>{
    all.sort(function(a,b){
        return new Date(b.isoDate) - new Date(a.isoDate);
    })
    
    res.send(JSON.stringify(all,null, 3))
})
const PORT = process.env.PORT || 3000
app.listen(PORT, ()=> cron.schedule('* * * * *', function(){
     if (shell.exec("node index.js").code !== 0) {
        console.log("somthing")
     }
}))