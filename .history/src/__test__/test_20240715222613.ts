export function sum(a: number, b: number): number {
    return a + b;
  }
  
  export function mulpile(a: number, b: number): number {
    return a * b;
  }
  
  export function splite(sentence: string): string[] {
    return sentence.split(" ");
  }

  import { mulpile, sum } from "./data";


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

