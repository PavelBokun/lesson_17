typ
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
        houses:[],
        governmentBuildings:[],
        citizensNumber:1000000
    }
    
})

