//class for linked list:
class LinkedList {
	//constructor that doesn't take any params so that it just
	//defaults to an empty linked list
	constructor() {
		//the linked list will have two references: the head, to reference
		//first element in the linked list, and the length, to reference the
		//length of the linked list. This will allow for tracking the length
		//as items are added or removed without having to iterate through
		//the whole list to find the length.  Since it will begin as an empty
		//list, the value for head will be null and the length will be 0
		this.head = null
		this.length = 0
	}
	//method for inserting elements to the beginning of the list. It will take in the value of the node to be inserted. This method needs to take the current head of the list and replace it with a new LinkedListNode which will then reference the old head
	insertAtHead(data) {
		//new node will take in the value of the new node, which is passed into the insertAtHead as 'data' as well as a reference to the next item in the list, which will always be the current head node that we want to replace with this newNode
		const newNode = new LinkedListNode(data, this.head)
		//change the value of this.head to be newNode
		this.head = newNode
		//add one to length to track the addition of a newNode
		this.length++
	}
	//this is the function for getting an element by index.  All tests have already been written and all failed which is appropriate for the TDD approach
	getByIndex(index) {
		//this is the condition that corresponds with the first two tests already written for this method.  This one line alone witll get two of the failed tests to now pass
		if (index < 0 || index >= this.length) return null
		//to make the other two tests pass, I need to loop through all of the elements in the.  First need to get the current element which will default to the head and then iterate forward from there. (index is the value I ultimately want to get to)
		let current = this.head
		for (let i = 0; i < index; i++) {
			//on each iteration, take the current value and update it to the next value. This steps me through the list
			current = current.next
		}
		//the loop will stop once the target index is reached.  The element at that index is the 'current' element so that is what should be returned
		return current
	}
	//this is the method that I just wrote 4 failing tests for.  It takes the index at which I want to insert an element and the value of the element
	insertAtIndex(index, value) {
		//to get the 'insert at 0' test to pass, if the destination index is 0, I just need to call the insertAtHead method because that will do what is needed and it already passes testing
		if (index === 0) return this.insertAtHead(value)
		//to insert at a particular index, I first need to get the element directly before that index, then set the 'next' value for that element to be the element I want to insert.  Then I need to take the inserted element and set its 'next' value to whatever was the next value for element that was previously occupying that position
		//get previous element:
		const prev = this.getByIndex(index - 1)
		//first make sure there is a previous element, and return null if there isn't
		if (prev === null) return null

		//take the previous.next and set it to a new node.  LinkedListNode takes the value of the element but also the a value for 'next'.  in this case, next is going to be whatever is the current next value for the previous node, prior to insertion
		prev.next = new LinkedListNode(value, prev.next)
		//add one to length to track the insertion
		this.length++
	}
	//method for removing the head element.  Test already written and failed
	removeHead() {
		//the new head will be the value of whatever the previous head was pointing to with 'next' property
		this.head = this.head.next
		//length will be one less than what it was
		this.length--
	}
	//method for removing at index.  Will be almost identical to insertAtIndex. All tests written and failed
	removeAtIndex(index) {
		//to get the 'remove at 0' test to pass, if the destination index is 0, I just need to call the removeAtHead method because that will do what is needed and it already passes testing
		if (index === 0) return this.removeHead()
		//to remove at a particular index, I first need to get the element directly before that index, then set the 'next' value for that element to be the element I want to remove.  Then I need to take the remaining element and set its 'next' value to whatever was the next value for element that was removed
		//get previous element:
		const prev = this.getByIndex(index - 1)
		//first make sure there is a previous element, and return null if there isn't
		if (prev === null) return null

		//leap frog over the element to be removed and set the previous element to the next, next value
		prev.next = prev.next.next
		//subtract one to length to track the removal
		this.length--
	}
	//this is a helper function for printing the ll to the terminal. This will loop through all of the values in the ll and turn them into a string to print to the terminal
	print() {
		let output = ''
		let current = this.head
		while (current) {
			output = `${output}${current.value} ->`
			current = current.next
		}
		console.log(`${output}null`)
	}
}

//separate class for the nodes of the LinkedList. Each node is an element in the linked list and each will have a value and a reference to the next node
class LinkedListNode {
	//The constructor will take params for the value of the node and reference to the next node
	constructor(value, next) {
		this.value = value
		this.next = next
	}
}
//This is a helper function that will be used to create a LinkedList, from an array of values, for testing purposes
LinkedList.fromValues = function(...values) {
	const ll = new LinkedList()
	//need to loop over the values in reverse order because every time a new element is inserted into the ll, it will be inserted at the beginning
	for (let i = values.length - 1; i >= 0; i--) {
		ll.insertAtHead(values[i])
	}
	return ll
}

//export so that LinkedList can be accessed from the testing file
module.exports = LinkedList
