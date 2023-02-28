import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/ButtonCmp/Button";
import ErrorCmp from "../../components/ErrorCmp/Error";
import StaticTextDisplay from "../../components/StaticTextDisplay";
import TextBox from "../../components/TextBoxCmp/TextBox";
import { alertActions } from "../../actions/Alert.action";

const ProjectDetails=()=>{
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const location=useLocation();
    const [hours,setHours]=useState(0);
    const [minutes,setMinutes]=useState(0);
    const [task,setTask]=useState("");
    const [error,setError]=useState({
        hours:"",
        minutes:"",
        task:""
    });
    const [projectTaskArray,setProjectTaskArray]=useState([]);
    const [taskid,setTaskId]=useState(0);
    var projectid=location?.state?.id;
//come back on button click
    const sendBack=()=>{
            navigate("/");
    }
    //set task details array and display error message
    const sendAddedTask=()=>{
          if(task==""){
            dispatch(alertActions.error("Task is required"))
          }else if(minutes=="" &&hours==""){
               dispatch(alertActions.error("Time details are required"))
          }else{
               setProjectTaskArray([...projectTaskArray,{taskid,projectid,hours,minutes,task}])
               setHours(0);
               setMinutes(0);
               setTask("");
               setTaskId(taskid+1);
          }
    }

    //get info of project from localstorage and passing dependency to ensure the updated state
    useEffect(()=>{
        if(projectTaskArray.length>0){
        localStorage.setItem("taskArr",JSON.stringify(projectTaskArray))
        }

        if(projectTaskArray.length<=0&&localStorage.getItem("taskArr")!==null){
            setProjectTaskArray(JSON.parse(localStorage.getItem("taskArr")))
        }
   },[projectTaskArray])
   
    return(
        <div className="project-details">
                <div className="createinfo">
          <div className="addbook">
          <h1>{location?.state?.name}</h1>
              <TextBox title="Hours" hours={hours} setHours={setHours} value={hours} type={"number"}/> 
              <ErrorCmp error={error.hours}/>
              <TextBox title="Minutes" minutes={minutes} setMinutes={setMinutes} value={minutes} error={error} setError={setError} type={"number"}/> 
              <ErrorCmp error={error.minutes}/>
              <TextBox title="Task" task={task} setTask={setTask} value={task} error={error} setError={setError}/> 
              <ErrorCmp error={error.description}/>
              <Button title="Add" sendFormData={sendAddedTask}/>
              <p>&nbsp;</p>
             <Button title="Back" sendFormData={sendBack}/>
           </div>
           {projectTaskArray?.length>0?
           <div> 
           <h1>Project Details</h1>
           <StaticTextDisplay projectTaskArray={projectTaskArray} setProjectArr={setProjectTaskArray} projectid={projectid}
           />
          
           </div>:""}
         </div>
        </div>
    )
}
export default ProjectDetails;