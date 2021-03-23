const express = require('express')
const app = express()
let Feed = require('rss-parser')
let parser = new Feed()
var all = []
 async function p(){
 
    const now = await parser.parseURL("https://www.saharamedias.net/feed");
    now.items.forEach(item =>{
        all.push(item)
        var a = ""+all.find(i=> i == item)
        if (a.includes("undefined")) {
            console.log("done");
           all.push(item)
        }else{
            console.log("good");
            
        }
    })
    
}

p()


