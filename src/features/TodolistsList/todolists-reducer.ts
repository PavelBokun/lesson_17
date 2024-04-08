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
    changeTodolistFilter: (
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



// actions





// thunks
export const fetchTodolistsTC = (): AppThunk => {
  return (dispatch) => {
    dispatch(appAction.setAppStatus({ status: "loading" }));
    todolistsAPI
      .getTodolists()
      .then((res) => {
        dispatch(todolistsActions.setTodolists({todolists:res.data}));
        dispatch(appAction.setAppStatus({ status: "succeeded" }));
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };
};
export const removeTodolistTC = (todolistId: string):AppThunk => {
  return (dispatch) => {
    dispatch(appAction.setAppStatus({ status: "loading" }));
    dispatch(todolistsActions.changeTodolistEntityStatus({id:todolistId,status: "loading"}));
    todolistsAPI.deleteTodolist(todolistId).then((res) => {
      dispatch(todolistsActions.removeTodolist({id:todolistId}));
      dispatch(appAction.setAppStatus({ status: "succeeded" }));
    });
  };
};
export const addTodolistTC = (title: string):AppThunk => {
  return (dispatch) => {
    dispatch(appAction.setAppStatus({ status: "loading" }));
    todolistsAPI.createTodolist(title).then((res) => {
      dispatch(todolistsActions.addTodolist({todolist:res.data.data.item}));
      dispatch(appAction.setAppStatus({ status: "succeeded" }));
    });
  };
};
export const changeTodolistTitleTC = (id: string, title: string):AppThunk => {
  return (dispatch) => {
    todolistsAPI.updateTodolist(id, title).then((res) => {
      dispatch(todolistsActions.changeTodolistTitle({id, title}));
    });
  };
};

// types

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};
