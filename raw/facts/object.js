// key: value pair

// to create objects

function f1()
{
    console.log("f1 is called");
    return "Returned from F1";
}


function f2()
{
    console.log("f2 is called");
    return "Returned from F2";
}

function f3()
{
    console.log("f3 is called");
    return "Returned from F3";
}

let obj={
    name:"Satwik",
    lastName:"Soni",
    intrests:["Coding","EDM","Hard Metal","Development"],
    age:20,
    isMale:true,
    address:{
        state:"Chhatisgarh",
        Country:"India"
    },
    say:function fn()
    {
        console.log("calling say method");
    }
    ,
    "yee":"Yeee"

}
console.log(obj);
console.log(obj.name);
console.log(obj.lastName);
console.log(obj.intrests);
console.log(obj.address);

console.log(obj.say());

console.log("here is justification :",f1(),f2(),f3());
for(let key in obj)
{
    console.log("key:",key," value",obj[key]);
}

console.log("key:"," value",obj.bs);

//object->values->properties

//object->functions->methods

//  there is diff between obj.name and obj[key]
console.log("key:"," value",obj.name);
console.log("key:"," value",obj["name"]);


obj.location="here"
console.log(obj.location);

delete obj.location

console.log(obj.location);


console.log(obj.yee);

