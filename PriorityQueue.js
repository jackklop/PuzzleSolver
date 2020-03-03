class El{
    constructor(el, priority){
        this.el = el;
        this.priority = priority;
    }
}
// Our priority queue values the smaller element prior.
class PriorityQueue{
    constructor(){
        this.q = []
    }

    enqueue(el,priority){
        let found_place = false;
        let newEl = new El(el,priority);

        let el_found_index = this.q.findIndex(item => item.el === el);
        if(el_found_index !== -1) {
            // Case when the same element already exists in the queue
            // Then simply update the priority if its lower.
            let target = this.q[el_found_index];
            if(target.priority > priority){
                target.priority = priority;
            }
        } else {
            // If it doenst have the element, insert it.
            for(let i = 0; i<this.q.length; i++){
                if(this.q[i].priority > newEl.priority){
                    this.q.splice(i,0, newEl);
                    found_place = true;
                    break;
                }
            }

            if(!found_place){
                this.q.push(newEl);
            }
        }
    }

    dequeue(){
        if(this.isEmpty()){
            throw new Error('Queue Underflow');
        }
        return this.q.shift().el;
    }
    isEmpty(){
        return this.q.length === 0;
    }
    printQueue(){
        // this is just for debugging purpose.
        for(let i = 0; i<this.q.length;i++){
            console.log(this.q[i], this.q[i].priority);
        }
    }
}

