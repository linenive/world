export class Person {
    name: string;
    
    constructor() {
        this.name = 'John Doe'
    }

    update(){
        console.log(this.name +' update');
    }
}