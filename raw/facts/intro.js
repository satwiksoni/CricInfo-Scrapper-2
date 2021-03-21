console.log("hello world");
let a;
a=10;

console.log("the value of a is ",a);

a='satwik'

console.log("I am  ",a);

let flag=false;
let num=process.argv.slice(2);
console.log(num);
num=num[0];
for(let i=2;i*i<=num;i++)
{
    if(num%i==0)
    {
        flag=true;
        break;
    }

}

if(flag==false)
console.log(num,"It is prime");
else
console.log(num,"It is not  prime");

