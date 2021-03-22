//This file is for seeing the code in LinkedList, in action
const LinkedList = require('./LinkedList')
//manual testing duplications of automated tests
const ll = LinkedList.fromValues(10, 20, 30, 40)
ll.print()
// console.log(ll.getByIndex(2).value)
// console.log(ll.getByIndex(0).value)
ll.insertAtIndex(2, 60)
ll.print()
