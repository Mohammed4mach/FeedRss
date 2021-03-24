const express = require('express')
const app = express()
let Feed = require('rss-parser')
let parser = new Feed()
const sites = require('./sites.json')
const cron = require("node-cron")
var all = []
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
 
 async function update(){

for(const site of sites){
     const now = await parser.parseURL(site.url);
    now.items.forEach(ite =>{
        var a = all.find(i=> i == ite.item)
        if (a != ite.item) {
            console.log("done");
            all.push(ite.item)
        }
   })
 }
}


async function run(){
   await push()
   cron.schedule('* * * * * *', async () => {
      await update()
   })
}
run()

app.get("/", (req,res)=>{
    res.send(all)
})
const PORT = process.env.PORT || 3000
app.listen(PORT, ()=> console.log("in port "+PORT))