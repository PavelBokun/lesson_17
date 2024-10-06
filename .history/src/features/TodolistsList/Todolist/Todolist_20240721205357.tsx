import React, { useCallback, useEffect } from 'react'
import { AddItemForm } from '../../../components/AddItemForm/AddItemForm'
import { EditableSpan } from '../../../components/EditableSpan/EditableSpan'
import { Task } from './Task/Task'
import { TaskStatuses, TaskType } from '../../../api/todolists-api'
import { FilterValuesType, TodolistDomainType } from '../todolists-reducer'
import { fetchTasksTC } from '../tasks-reducer'
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { Button, IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { newage } from '../../../data02'

type PropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    demo?: boolean
}

export const Todolist = React.memo(function ({demo = false, ...props}: PropsType) {

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (demo) {
            return
        }
        const thunk = fetchTasksTC(props.todolist.id)
        dispatch(thunk)
    }, [])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolist.id)
    }, [props.addTask, props.todolist.id])

    const removeTodolist = () => {
        props.removeTodolist(props.todolist.id)
    }
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.todolist.id, title)
    }, [props.todolist.id, props.changeTodolistTitle])

    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.todolist.id), [props.todolist.id, props.changeFilter])
    const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.todolist.id), [props.todolist.id, props.changeFilter])
    const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.todolist.id), [props.todolist.id, props.changeFilter])


    let tasksForTodolist = props.tasks

    if (props.todolist.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.todolist.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return <div>
        <h3><EditableSpan value={props.todolist.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist} disabled={props.todolist.entityStatus === 'loading'}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'}/>
        <div>
            {
                tasksForTodolist?.map(t => <Task key={t.id} task={t} todolistId={props.todolist.id}
                                                removeTask={props.removeTask}
                                                changeTaskTitle={props.changeTaskTitle}
                                                changeTaskStatus={props.changeTaskStatus}
                />)
            }
        </div>
        <div style={{paddingTop: '10px'}}>
            <Button variant={props.todolist.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'inherit'}
            >All
            </Button>
            <Button variant={props.todolist.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={props.todolist.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
            
            <div><img className="rotate-image" src="data:image/jpeg;base64,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" alt="Вращающаяся картинка"/></div>
        </div>
    </div>
})


