//require mongoose
const mongoose=require('mongoose')
//create Schema
const personSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    age:{
        type:Number,
        required: true
    },
    favoriteFoods:{
        type:[String],  
  
}})

let Person=mongoose.model('Person',personSchema,'persons')

module.exports = Person