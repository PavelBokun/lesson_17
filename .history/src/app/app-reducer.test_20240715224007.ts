import { appAction, appReducer, InitialStateType} from './app-reducer'
import { mulpile, sum } from "../data";


  


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


let startState: InitialStateType;

beforeEach(() => {
	startState = {
		error: null,
		status: 'idle',
		isInitialized: false
	}
})

test('correct error message should be set', () => {
	const endState = appReducer(startState, appAction.setAppError({error:'some error'}))
	expect(endState.error).toBe('some error');
})

test('correct status should be set', () => {
	const endState = appReducer(startState, appAction.setAppStatus({status:'loading'}))
	expect(endState.status).toBe('loading');
})

