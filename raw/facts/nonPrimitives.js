//Functions arrays and objects
function sayHi(param)
{
console.log("parameter is ",param);
let valueToBeReturned=Math.random()>0.5?"yess hell yeah":false;
return valueToBeReturned;
}

console.log(sayHi("satwik"));

console.log(sayHi(33));

///Arrays are collection of variables havaing same datatype
// In javascript .. array is collection of anything
 let array=[1,22,1.1,1.111, "Satwik" , null , true, [12,13,14],
 function sayHiiiiiiii()
 {
 console.log("Hii from here");
 return "satwik";
 }
 ,{name:"satwik"}
];
 console.log(array);

 console.log(array[array.length-1].name);
 console.log(array[array.length-2]());
 console.log(array[array.length-3][2]);

 //push-> add Last in array
 //pop->remove last ex array.push("satwik"); or array.pop(array.pop());

 //unshift shift shift for removing first value from first;
// slice to return subarray
 let slice=array.slice(2,5);
 console.log(slice);

 // splice is for remove elements from array which reflects back too

 console.log("before",array);

 let removedValue=array.splice(2,2);
console.log(removedValue);

console.log(array);


