const express = require('express')
const app = express()
let Feed = require('rss-parser')
let cors = require("cors")
let parser = new Feed()
const sites = require('./sites.json')
const fetch = require('node-fetch');
//wake()

setInterval(() => {
    
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
    now.items.forEach(item =>{
        add(item.title,item.link,item.isoDate,site.name)
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
}, 10000);


function wake() {

  try {

    setInterval(() => {
      fetch('https://mersal-info.herokuapp.com/').then(res => console.log(`response-ok: ${res.ok}, status: ${res.status}`))
        .catch(err => console.error(`Error occured: ${err}`))
    }, 1500000);
    setInterval(() => {
      fetch('https://all-news-mr.herokuapp.com/').then(res => console.log(`response-ok: ${res.ok}, status: ${res.status}`))
        .catch(err => console.error(`Error occured: ${err}`))
    }, 1500000);

  } catch(err) {
      console.error('Error occured: retrying...')
      return setTimeout(() => wake(), 10000);
  };

}
const PORT = process.env.PORT || 3000 || 4050
app.listen(PORT, ()=>console.log('done...'))