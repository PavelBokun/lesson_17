
type texnologiesType={
    id:number,
    title:string
}

type Stydent={
    id:number,
    name:string,
    age:number,
    isActive:boolean,
    adress:{
        sity:string,
        country:string
    },
    texnologies:Array<texnologiesType>
}



const student: Stydent = {
    id:0,
    name: "Dimych",
    age: 12,
    isActive: false,
    adress: {
        sity: "Minsk",
        country: "Belarus",
    },
    texnologies: [
        { id: 1, title: "HTML" },
        { id: 2, title: "JS" },
        { id: 3, title: "React" },
    ],
    
};

const age=[5,18,85,99,54,78,18,17,16];
const predicate=(a:num)

console.log(student.name);
console.log(student.texnologies[1].title)
