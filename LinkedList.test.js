const LinkedList = require('./LinkedList')
//this is a describe block meant to describe the thing I want to test.  I want to test insertAtHead().  The pound sign  is a convention that indicates this
// is a test of a class method.  The syntax for what is passed into the
//testing function comes from jest docs.  The test method takes in a description
//of what the method to be tested is supposed to accomplish and a function with
//all the test code inside of it
describe('#insertAtHead', () => {
	test('it adds the element to the beginning of the list', () => {
		//create a new LinkedList and then pass it the data it needs to create
		//a new node at the beginning of the list
		const ll = new LinkedList()
		ll.insertAtHead(10)
		//before inserting a new node to the head, get a reference to the previous head to see the progression better
		const oldHead = ll.head
		ll.insertAtHead(20)

		//now tell the testing function the expected result
		//When the test is finished I expect the value of the head to be 20
		expect(ll.head.value).toBe(20)
		//and I expect the value of next, for the new head, to be the value of
		//the previous head
		expect(ll.head.next).toBe(oldHead)
		//and I expect the length of ll to be 2
		expect(ll.length).toBe(2)
	})
})
//trying out TDD, this is now a describe and test block to test a method I haven't written yet.  I want to make a method that will get an item from ll by its index
describe('#getByIndex', () => {
	//first testing what happens if I pass in an index less than 0
	describe('with index less than 0', () => {
		//if I pass in an index less than zero, then I want the method to return null since there won't ever be an element with an index less than 0
		test('null is returned', () => {
			//always avoid using other class methods in testing a class method.  It gets convoluted and interdependent and is not clean testing.  Instead create helper function and use that to create ll from an array of values.  This will return an ll with 10 as the head and 20 as the 2nd element.
			const ll = LinkedList.fromValues(10, 20)
			//tell the test what I expect as the result (null in this case)
			expect(ll.getByIndex(-1)).toBeNull()
		})
	})
	//this test is just like the one above, except instead of returning null for a non-existant index on the low end, it should return null for an index that is greater than than what is included on the high end of the list, per the limitation of the list's length
	describe('with index greater than list length', () => {
		test('it returns null', () => {
			const ll = LinkedList.fromValues(10, 20)

			expect(ll.getByIndex(5)).toBeNull()
		})
	})
	//this test is for the edge case of what happens if I try to get the head element by index
	describe('with index 0', () => {
		test('it returns the head', () => {
			const ll = LinkedList.fromValues(10, 20)

			expect(ll.getByIndex(0).value).toBe(10)
		})
	})
	//this test is for getting an element by a particular index somewhere in the middle of the list
	describe('with index in the middle', () => {
		test('it returns the element at that index', () => {
			const ll = LinkedList.fromValues(10, 20, 30, 40)

			expect(ll.getByIndex(2).value).toBe(30)
		})
	})
})
//using TDD approach, tests for inserting element into linked list to occupy a position other than the head
describe('#insertAtIndex', () => {
	//I don't want to be able to insert something at an index of less than 0 or beyond the next position after the last element in the linked list so first tests will be for those scenarios
	describe('with index less than 0', () => {
		//in this case I don't want anything to be inserted
		test('it does not insert anything', () => {
			const ll = LinkedList.fromValues(10, 20)
			ll.insertAtIndex(-1, 30)
			//expecting the length to stay 2 since nothing will be inserted
			expect(ll.length).toBe(2)
		})
	})
	describe('with index greater than list length', () => {
		test('it does not insert anything', () => {
			const ll = LinkedList.fromValues(10, 20)
			ll.insertAtIndex(5, 30)
			//expecting the length to stay 2 since nothing will be inserted
			expect(ll.length).toBe(2)
		})
	})
	//next test is for inserting at 0, or replacing the head value
	describe('with index of 0', () => {
		test('insert at the head', () => {
			const ll = LinkedList.fromValues(10, 20)
			ll.insertAtIndex(0, 30)

			//expect the value of ll.head to be 30
			expect(ll.head.value).toBe(30)
			//expect the head.next value to be 10, since that is was the previous head that got pushed into second position
			expect(ll.head.next.value).toBe(10)
			//expect the new length to be 3
			expect(ll.length).toBe(3)
		})
	})
	//this will test for inserting anywhere else in the linked list
	describe('with index in the middle', () => {
		test('insert at the given index', () => {
			const ll = LinkedList.fromValues(10, 20, 30, 40)
			ll.insertAtIndex(2, 50)
			//get the node at the index that was passed in
			const node = ll.getByIndex(2)

			//expect the value of node to be 50
			expect(node.value).toBe(50)
			//expect the node.next value to be 30, since that is the element getting pushed forward by the insertion
			expect(node.next.value).toBe(30)
			//expect the new length to be 5
			expect(ll.length).toBe(5)
		})
	})
})
//Using TDD approach, writing tests for removing elements from linked list
describe('#removeAtHead', () => {
	test('removes the head', () => {
		const ll = LinkedList.fromValues(10, 20, 30)
		ll.removeHead()

		//expect the new head value to be 20 and length of list to be 2
		expect(ll.head.value).toBe(20)
		expect(ll.length).toBe(2)
	})
})
//using TDD approach, write test for removing an element at a particular index
describe('#removeAtIndex', () => {
	//I don't want to be able to remove something at an index of less than 0 or beyond the next position after the last element in the linked list so first tests will be for those scenarios
	describe('with index less than 0', () => {
		//in this case I don't want anything to be removed
		test('it does not remove anything', () => {
			const ll = LinkedList.fromValues(10, 20)
			ll.removeAtIndex(-1)
			//expecting the length to stay 2 since nothing will be removed
			expect(ll.length).toBe(2)
		})
	})
	describe('with index greater than list length', () => {
		test('it does not remove anything', () => {
			const ll = LinkedList.fromValues(10, 20)
			ll.removeAtIndex(5)
			//expecting the length to stay 2 since nothing will be removed
			expect(ll.length).toBe(2)
		})
	})
	//next test is for removing at 0, or removing head value
	describe('with index of 0', () => {
		test('remove the head', () => {
			const ll = LinkedList.fromValues(10, 20, 30)
			ll.removeAtIndex(0)

			//expect the value of ll.head to be 30
			expect(ll.head.value).toBe(20)
			//expect the head.next value to be 10, since that is was the previous head that got pushed into second position
			expect(ll.head.next.value).toBe(30)
			//expect the new length to be 3
			expect(ll.length).toBe(2)
		})
	})
	//this will test for removing from anywhere else in the linked list
	describe('with index in the middle', () => {
		test('remove at the given index', () => {
			const ll = LinkedList.fromValues(10, 20, 30, 40)
			ll.removeAtIndex(2)
			//get the node at the index that was passed in
			const node = ll.getByIndex(1)

			//expect the value of node to be 20
			expect(node.value).toBe(20)
			//expect the node.next value to be 40, since that is the element getting pushed forward by the insertion
			expect(node.next.value).toBe(40)
			//expect the new length to be 3
			expect(ll.length).toBe(3)
		})
	})
})
