const cat = {
    eats : 'true',
    sleep : 'true',
    walk : 'true',
}
const dog = {
    eats : 'true',
    sleep : 'true',
}
dog.__proto__ = cat;
console.log(dog.walk);

console.log(Array.prototype);
console.log(String.prototype);