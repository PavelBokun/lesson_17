type HousesType= {}
type GovernmentBuildingsType=Array<string>
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
        governmentBuildings:[],
        citizensNumber:1000000
    }
    
})

test("test city should contains 3 houses",()=>{
    expect(city.houses.length).toBe(3)
    expect(city.houses[0].n).toBe("1")
    expect(city.houses[1]).toBe("2")
    expect(city.houses[2]).toBe("3")
})


