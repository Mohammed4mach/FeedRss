const express = require('express')
const app = express()
let Feed = require('rss-parser')
let cors = require("cors")
let parser = new Feed()
const sites = require('./sites.json')
const cron = require("node-cron")
const shell = require("shelljs")
const Domain = require('url-domain-name');
const titleFromUrl = require('get-title-at-url');
var all = []
app.use(cors())
function add(title, link, date, name){
    var post = {
        title: title,
        link: link,
        isoDate: date,
        name: name
    } 
    all.push(post)
}
 async function push(){
for(const site of sites){
    try{
    const now = await parser.parseURL(site.url);
        var nameSite = now.title;

    now.items.forEach(item =>{
        const domain = ""+Domain.from(item.link);
        
        titleFromUrl("http://google.com/", function(title){
               // nameSite = title
        })
        console.log(nameSite);
        
        add(item.title,item.link,item.isoDate,nameSite)
        //all.push(item)
        }
    )
    }catch(e){
       console.log("I has problem " + e);
       
    }
    
 }
}


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
const PORT = process.env.PORT || 3000 || 4050
app.listen(PORT, ()=>console.log("done..."))
