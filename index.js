const express = require('express')
const app = express()
let Feed = require('rss-parser')
let parser = new Feed()
async function p(){
 
    const now = await parser.parseURL("https://www.saharamedias.net/feed");
    now.items.forEach(item =>{
        console.log("title: "+item.title);
        
    })
    
}
p()


