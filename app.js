//require mongoose
const mongoose = require ('mongoose')
const Person = require ('./models/Person')

//require dotenv
require ('dotenv').config;
//mongoose connection 
mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('connected to db'))
.catch(err => console.error('could not connect ',err));
connectionToDB();

//Create and Save a Record of a Model
const person = new Person({
    name: "Lamar",
    age: 18,
    favoriteFoods: ["Pizza", "Makloub"]
})
person.save()
.then(()=>{console.log('person saved')})
.catch(err=>{console.error(err)});

//Create Many Records with model.create()
let arrayOfPeople=[{
    name: "Lina",
    age: 19,
    favoriteFoods: ['Apple','hamburger'],
    },{
    name: "Linda",
    age: 20,
    favoriteFoods: ['Apple','meat'],
    },{
    name: "Lamiss",
    age: 21,
    favoriteFoods: ['Couscous', 'Banana'],
    },{
    name: "Laith",
    age: 22,
    favoriteFoods: ['Orange','milk'],
    }]
    arrayOfPeople.forEach((person)=>{
        person.save((err)=>{
            if (err){
        console.log("Failed")
    }
    })
    })                                                 
    Person.create(arrayOfPeople).save(function(err, persons) {
        if(err){
    console.log("Failed");
        } else {
        console.log("Saved Successful");
        }
    });

//Use model.find() to Search Your Database
const findPerson = Person.find({
    name: "Lamar"
});

//Use model.findOne() to Return a Single Matching Document from Your Database
const findOnePerson = Person.findOne({
    favoriteFoods: {
        $in: ["Couscous"]
    }
});

//Use model.findById() to Search Your Database By _id
Person.findById({_id: "60cf106bc87d382c186b0c88"})
.then(doc=>console.log("byid",doc))
.catch(err=>console.log(err))

//Perform Classic Updates by Running Find, Edit, then Save
async function findEditThenSave(){
    const person = await Person.findById({
        _id: '60ce1f58465a651f5818c9ec'
        })

    person.set({
        favoriteFoods: "hamburger"
    })
}

//Perform New Updates on a Document Using model.findOneAndUpdate()
Person.findOneAndUpdate({
    name: "Lamar"
}, {
    $set: {
        age: 20
    }
}, {
    new: true
}).save(function(err, persons) {
    if(err){
console.log("Failed");
    } else {
    console.log("Saved Successful");
    console.log(persons);
    }
})

//Delete One Document Using model.findByIdAndRemove
async function removeById(_id){
    const person = await Person.findByIdAndRemove({_id})
    console.log(person);
}

// Delete Many Documents with model.remove()
Person.remove({
    name: "Lina"
})

//Chain Search Query Helpers to Narrow Search Results
Person.find({
    favoriteFoods: {
        $in: ["burritos"]
    }                        //find people who like burritos
}).sort({
    name: 1                  //sort them by name
}).limit(2).select({         //limit the results to two documents, 
    age: false               //hide their age
}).exec((err) => {
    if(err){
    console.log("Failed");
        } else {
        console.log("with Successful");
        console.log(persons);
        }
    })