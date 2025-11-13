// create an array of numbers (ages)
let ages: number[] = [22, 33, 11, 27, 45, 65, 71];
console.log(ages);
console.log('how many elements: ' + ages.length);

//get access an element by index
// first element
console.log(ages[0])
console.log(ages[6]) // directly the 7th element
console.log(ages[7]) // undefined (non existing)
console.log(ages[ages.length - 1]) // calculate the last element

// loop over all elements
for (let i = 0; i < ages.length; i++) {
    console.log('element at index ' + i + ' is ' + ages[i]);
}

// Create an array of numbers (userIds)
let userId: number[] = [11, 25, 37, 49, 55];
console.log(userId);
console.log('how many Ids: ' + userId.length);

// loop over all elements
for (let i = 0; i < userId.length; i++) {
// console.log('element at index ' + i + ' is ' + userId[i]); // prints out all elements

    console.log('current iteration number ' + i)
    console.log('current array value ' + userId[i]);
    if (userId[i] > 20) {console.log(userId[i])}// prints out elements bigger than 20

}

