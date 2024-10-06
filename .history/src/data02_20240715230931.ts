
type texnologiesType={
    
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

console.log(student.name);
console.log(student.texnologies[1].title)
