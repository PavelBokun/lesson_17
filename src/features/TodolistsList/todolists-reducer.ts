import { todolistsAPI, TodolistType } from "../../api/todolists-api";
import { Dispatch } from "redux";
import { appAction, RequestStatusType } from "../../app/app-reducer";
import { handleServerNetworkError } from "../../utils/error-utils";
import { AppThunk } from "../../app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Splitscreen } from "@mui/icons-material";

const slice = createSlice({
  name: "todolists",
  initialState: [] as TodolistDomainType[],
  reducers: {
    removeTodolist: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.findIndex((tl) => tl.id === action.payload.id);
      if (index !== -1) state.splice(index, 1);
    },
    addTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
      state.unshift({
        ...action.payload.todolist,
        filter: "all",
        entityStatus: "idle",
      });
    },
    changeTodolistTitle: (
      state,
      action: PayloadAction<{ id: string; title: string }>
    ) => {
      // перевый вариант
      //       const index = state.findIndex(tl => tl.id === action.payload.id)
      //       if(index!==-1){
      // state[index].title=action.payload.title
      //
      // второй вариант

      const todolist = state.find((tl) => tl.id === action.payload.id);
      if (todolist) {
        todolist.title = action.payload.title;
      }
    },
    changeTodolistFiletr: (
      state,
      action: PayloadAction<{ id: string; filter: FilterValuesType }>
    ) => {
      const todolist = state.find((tl) => tl.id === action.payload.id);
      if (todolist) {
        todolist.filter= action.payload.filter;
      }
    },
    changeTodolistEntityStatus: (
      state,
      action: PayloadAction<{  id: string,
        status: RequestStatusType }>
    ) => {
      const todolist = state.find((tl) => tl.id === action.payload.id);
      if (todolist) {
        todolist.entityStatus= action.payload.status;
      }
    },
    setTodolists:(state,
      action: PayloadAction<{ todolists: Array<TodolistType> }>)=>{
      action.payload.todolists.forEach((tl)=>{state.push({...tl,filter:'all',entityStatus:'idle'})})
    }
  },
});

export const todolistsReducer = slice.reducer;
export const todolistsActions = slice.actions;

export const _todolistsReducer = (
  state: Array<TodolistDomainType> = initialState,
  action: ActionsType
): Array<TodolistDomainType> => {
  switch (action.type) {
    
    
    case "SET-TODOLISTS":
      return action.todolists.map((tl) => ({
        ...tl,
        filter: "all",
        entityStatus: "idle",
      }));
    default:
      return state;
  }
};

// actions



export const setTodolistsAC = (todolists: Array<TodolistType>) =>
  ({ type: "SET-TODOLISTS", todolists } as const);

// thunks
export const fetchTodolistsTC = (): AppThunk => {
  return (dispatch) => {
    dispatch(appAction.setAppStatus({ status: "loading" }));
    todolistsAPI
      .getTodolists()
      .then((res) => {
        dispatch(setTodolistsAC(res.data));
        dispatch(appAction.setAppStatus({ status: "succeeded" }));
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };
};
export const removeTodolistTC = (todolistId: string) => {
  return (dispatch: ThunkDispatch) => {
    //изменим глобальный статус приложения, чтобы вверху полоса побежала
    dispatch(appAction.setAppStatus({ status: "loading" }));

    //изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
    dispatch(changeTodolistEntityStatusAC(todolistId, "loading"));
    todolistsAPI.deleteTodolist(todolistId).then((res) => {
      dispatch(removeTodolistAC(todolistId));
      //скажем глобально приложению, что асинхронная операция завершена
      dispatch(appAction.setAppStatus({ status: "succeeded" }));
    });
  };
};
export const addTodolistTC = (title: string) => {
  return (dispatch: ThunkDispatch) => {
    dispatch(appAction.setAppStatus({ status: "loading" }));

    todolistsAPI.createTodolist(title).then((res) => {
      dispatch(addTodolistAC(res.data.data.item));
      dispatch(appAction.setAppStatus({ status: "succeeded" }));
    });
  };
};
export const changeTodolistTitleTC = (id: string, title: string) => {
  return (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.updateTodolist(id, title).then((res) => {
      dispatch(changeTodolistTitleAC(id, title));
    });
  };
};

// types
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;
type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof changeTodolistFilterAC>
  | SetTodolistsActionType
  | ReturnType<typeof changeTodolistEntityStatusAC>;
export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};
type ThunkDispatch = Dispatch<ActionsType | any>;
