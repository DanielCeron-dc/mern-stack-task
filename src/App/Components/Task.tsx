import React from "react";

export interface ITask {
    title: string,
    description: string,
    _id: string
}

interface IProps {
    task:ITask, 
    fetchTasks: () => void, 
    selectTaskId: (id:string) => void
}

const Task:React.FC<IProps> = (props) => {

    const {task} = props;
    
    const deleteTask =async() => {
        if(!confirm('are you sure you want to delete it?')) return; 
        try {
            const res = await  fetch(`/api/tasks/${task._id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }); 
            props.fetchTasks(); 
        } catch (error) {
            console.log(error);
        }
    }

    const editTask = () => {
        props.selectTaskId(task._id); 
    }
    
    return <tr key={task._id}>
    <td>{task.title}</td>
    <td>{task.description}</td>
    <td>
        <button onClick={deleteTask} className="btn green accent-2">
        <i className="material-icons">delete</i>
        </button>
        <button onClick={editTask} className="btn green accent-2" style={{margin: '4px'}}>
        <i className="material-icons">edit</i>
        </button>
    </td>
  </tr>

}


export default Task; 