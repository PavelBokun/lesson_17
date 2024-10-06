import { predicate } from "./data02"

type HousesType= {
    name:string
}
type AddressType={

    streetTitle:string
    city:string
    country:string
}
type GovernmentBuildingsType={
    type: "HOSPITAL"|"POLIS"
    budget:number
    staffCount:number
    address:AddressType
}

type CityType={

    title:string
    houses:Array<HousesType>
    governmentBuildings:Array<GovernmentBuildingsType>
    citizensNumber:number
}


let city:CityType;

beforeEach(()=>{
    city={
        title:"New York",
        houses:[{name:"1"},{name:"2"},{name:"3"}],
        governmentBuildings:[{
            type: "HOSPITAL",
            budget: 0,
            staffCount: 0,
            address: {
                streetTitle: "1",
                city: "Boston",
                country: "2"
            }
        }],
        citizensNumber:1000000
    }
    
})

test("test city should contains 3 houses",()=>{
    expect(city.houses.length).toBe(3)
    expect(city.houses[0].name).toBe("1")
    expect(city.houses[1].name).toBe("2")
    expect(city.houses[2].name).toBe("3")
})

test("test adress",()=>{
    expect(city.governmentBuildings[0].address.city).toBe("Boston" )  
})

test ("oldnumber", ()=>{
    const age=[5,18,85,99,54,78,18,17,16];
    const old=age.filter(predicate);


    expect(old.length).toBe(9)
    expect(old{}).toBe(9)
})
