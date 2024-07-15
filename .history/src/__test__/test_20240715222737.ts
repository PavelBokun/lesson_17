

  import { mulpile, sum } from "";


test("sum",()=>{
   const a=1;
   const b=2;   
   const c=3; 
   const result=sum(a,b);
   expect(result).toBe(3)
})
test("mulpile",()=>{
   const a=1;
   const b=2;   
   const c=3; 
   const result=mulpile(a,b);
   expect(result).toBe(3)
})

