const sum = (a,b)=>{
    return a+b;
}
const difference= (a,b)=>{
    return a-b;
}

//console.log(sum(2,8));
//console.log(difference(8,2));

// This is not the correct way to write js code in backend when we have large files and functions so the concept of import and exort came in the filed just like reactjs to make scalable websites.
 //export in nodejs
module.exports = {sum, difference}
