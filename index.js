const express = require('express')
const app = express()
let Feed = require('rss-parser')
let parser = new Feed()
const sites = require('./sites.json')
const cron = require("node-cron")
var all = []
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
 
 async function update(){
 cron.schedule('* * * * * *', async () => {

for(const sit of sites){
    try{
     const now = await parser.parseURL(sit.url);
    now.items.forEach(ite =>{
        var a = all.find(i=> i == ite.item)
        if (a == ite.item) {
        }else{
            all.push(ite.item)

            console.log("done " + ite.item);

        }
   })
    }catch(e){
        console.log(e);
        
    }
 }
  })

}


async function run(){
   await push()
      await update()
}
run()

app.get("/", (req,res)=>{
    res.send(JSON.stringify(all,null, 3))
})
const PORT = process.env.PORT || 3000
app.listen(PORT, ()=> console.log("in port "+PORT))