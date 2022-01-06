export default function play() {

    
}


///////////////////////////////////////////////////////
// ----------------------- NOTES ------------------- //
///////////////////////////////////////////////////////

// ----------------- Array Declaration ----------- //
    // const names: string[] = ['Ann', 'Angela'] // Array of string
    // const numbers: Array<number> = [1, 2, 3] // Array of number


// --- Interfaces are ideal for objects ------ //
    // interface PersonLoggerFn {
    //     (name: string, age: number):string
    // }


// --------------- CLASS ---------------- //
    // class Person {
    //     name: string
    //     age: number

    //     constructor(name: string, age: number) {
    //         this.name = name
    //         this.age = age
    //     }
    // }

    // const logPersonObject = (person: Person):string => {
    //     const info = 'Name: ' + person.name + ', Age: ' + person.age
    //     console.log(info)
    //     return info
    // }

    // logPersonObject(new Person('Edward', 25))


// --- Type aliases are generally used with functions and primitives --//
    // type PersonLoggerFn = (name: string, age?: number) => string;

    // const logPersonInfo:PersonLoggerFn = (personName: string, personAge: number = 0):string => {
    //     const info = 'Name: ' + personName + ', Age: ' + personAge
    //     console.log(info)
    //     return info
    // }


// --------------- NARROWING ------------- //
    // const random = Math.random() > 0.5 ? 'hello' : [1,2,3,4,5]

    // if (typeof random === 'string') {
    //     console.log(random.toUpperCase())
    // } else {
    //     console.log(random)
    // }


// ------------- EXTEND INTERFACE ----------- //
    // interface Person {
    //     name: string
    //     age: number
    // }    

    // interface BusinessPerson extends Person {
    //     salary: number,
    //     industry: string
    // }


// ------------- EXTEND TYPES --------------- //

    // type Car = {
    //     name: string
    // }

    // interface ElectricCar {
    //     batteryType: string
    // }

    // type ElectricRaceCar = {
    //     speed: number
    // } & Car & ElectricCar


// ------------ UNION --------------------- //
    // type ElectricCar = {
    //     name: string
    //     batteryType: string
    // }

    // type RaceCar = {
    //     name: string,
    //     maxSpeed: number
    // }

    // type Car = RaceCar | ElectricCar


// ----------- UNION NARROWING --------------- //
    // type RaceCar = {
    //     name: string,
    //     maxSpeed: 300,
    //     team: string
    // }

    // type NormalCar = {
    //     name: string,
    //     maxSpeed: 200,
    //     seats: number
    // }

    // type Car = RaceCar | NormalCar

    // const logCarInfo = (car: Car) => {
    //     console.log(car.name)

    //     switch(car.maxSpeed) {
    //         case 300:
    //             console.log(car.team)
    //             break
    //         case 200: 
    //             console.log(car.seats)
    //             break
    //         default:
    //             console.log(car) // Never type
    //     }
    // }

// ------------ TYPE CASTING ------------ //
    // console.log((car as RaceCar).team)
    // console.log((<NormalCar>car).seats)


// ------------ INTERFACE NARROWING ------------ //
    // interface Person {
    //     age: number
    //     name: string
    //     type: 'business' | 'academic' | 'other'
    // }

    // interface BusinessPerson extends Person {
    //     name: string
    //     salary: number
    //     type: 'business'
    // }

    // interface AcademicPerson {
    //     type: 'academic'
    //     name: string
    //     age: number
    //     publications: string[]
    // }

    // type Employee = BusinessPerson | AcademicPerson

    // const logPersonInfo = (employee: Employee) => {
    //     if (employee.type === 'academic') {
    //         console.log(employee.publications) // AcademicPerson 
    //     } else if (employee.type === 'business') {
    //         console.log(employee.salary) // BusinessPerson 
    //     } else {
    //         console.log(employee) // Never type
    //     }
    // }