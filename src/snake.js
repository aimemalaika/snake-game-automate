class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    grow(data) {
        let node = new Node(data);
        if (this.head === null) {
            this.head = node;
        }else{
            let current = this.head;
            while (current.next) {
              current = current.next;
            }
            current.next = node;
        }
        this.size++;
    }

    printList() {
        let current = this.head;
        let str = "";
        while (current) {
            str += `${current.data}  ->`
            console.log(current.next.data);
            current = current.next;
        }
        console.log(str);
    }
}

export default LinkedList;