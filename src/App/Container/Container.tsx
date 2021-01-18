import React, {FormEvent, useState, useEffect, useCallback} from "react";
import Task, {ITask} from "../Components/Task";


const Container:React.FC = () => {
    const [title, setTitle] = useState<string>("");
    const [description, setdescription] = useState<string>("");
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [selectedTaskId, setSelectedTaskId] = useState<string|null>(null);

    useEffect(() => {
        fetchTasks();
    }, [])

    useEffect(() => {
       if(selectedTaskId){
        fetch('api/tasks/' + selectedTaskId)
        .then(res => handleEditTask(res));
       }
    }, [selectedTaskId])

    const fetchTasks = useCallback(async()=> {
        setSelectedTaskId(null); 
        const res = await fetch('api/tasks'); 
        const resJson:ITask[] = await res.json(); 
        setTasks(resJson);
    },[])

    const onFormSubmit = (e:FormEvent) =>{
        e.preventDefault();
        if(selectedTaskId){
            fetch('api/tasks/' +selectedTaskId, {
                method: "PUT",
                body: JSON.stringify({title, description}),
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(res => handleResponse(res))
        }else{
            fetch('api/tasks', {
                method: "POST",
                body: JSON.stringify({title, description}),
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(res => handleResponse(res))
        }
        fetchTasks(); 
    }

    const handleEditTask = async(res:Response) => {
        try {
            let data:ITask = await res.json();
            setTitle(data.title);
            setdescription(data.description); 
        } catch (error) {
            console.log(error);
        }
    } 

    const handleResponse = async (res: Response) => {
        try {
            let resJson = await res.json();
            console.log(resJson);
        } catch (error) {
            console.log(error);
        }
    }

    return <div className="container">
    <div className="row">
        <div className="col s5">
            <div className="card">
                <div className="card-content">
                    <form onSubmit={onFormSubmit}>
                        <div className="row">
                            <div className="input-field col s12">
                                <input  value = {title} onChange = {(e) => setTitle(e.target.value)} type="text" placeholder="Task Title" autoFocus />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <textarea
                                    value = {description}
                                    onChange={(e) => setdescription(e.target.value)}
                                    cols={30}
                                    rows={10}
                                    placeholder="Task Description"
                                    className="materialize-textarea"
                                ></textarea>
                            </div>
                        </div>

                        <button type="submit" className="btn green accent-2">
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
        <div className="col s7">
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task, index) => <Task fetchTasks={fetchTasks} selectTaskId={setSelectedTaskId} key={index}  task = {task}/>)}
                </tbody>
            </table>
        </div>
    </div>
</div>
}

export default Container; 