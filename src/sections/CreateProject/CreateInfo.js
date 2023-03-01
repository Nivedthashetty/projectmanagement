import React,{ useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { alertActions } from "../../actions/Alert.action";
import Button from "../../components/ButtonCmp/Button";
import ErrorCmp from "../../components/ErrorCmp/Error";
import StaticTextDisplay from "../../components/StaticTextDisplay";
import TextBox from "../../components/TextBoxCmp/TextBox";

const CreateInfo=()=>{
     const dispatch=useDispatch();
     const [projectId,setProjectId]=useState(0)
    const [projectname,setProjectname]=useState("");
    const [description,setDescription]=useState("");
    const [error,setError]=useState({
     projectname:"",
     description:""
 });

 const [ProjectArr,setProjectArr]=useState([]);

//set array of projects ,dispatch error message for empty information
const sendProjectData=()=>{
     if(projectname==""){
       dispatch(alertActions.error("Project  Name is required"))
     }else if(description==""){
          dispatch(alertActions.error("Desciption is required"))
     }else{
          setProjectArr([...ProjectArr,{projectId,projectname,description}])
          setProjectname("");
          setDescription("")
          setProjectId(projectId+1);
     }
}
// fetch data from localstorage on page load or api call 
useEffect(()=>{
     if(ProjectArr.length>0){
     localStorage.setItem("projectArr",JSON.stringify(ProjectArr))
     }
     if(ProjectArr.length<=0 &&localStorage.getItem("projectArr")!==null){
          setProjectArr(JSON.parse(localStorage.getItem("projectArr")))
      }
},[ProjectArr])


    return(
         <div className="createinfo">
          <div className="addbook">
          <h1>Add Project</h1>
              <TextBox title="projectname" projectname={projectname} setProjectname={setProjectname} value={projectname}/> 
              <ErrorCmp error={error.projectname}/>
              <TextBox title="description" description={description} setDescription={setDescription} value={description} error={error} setError={setError}/> 
              <ErrorCmp error={error.description}/>
              <Button title="Add" sendFormData={sendProjectData}/>
           </div>
           {ProjectArr?.length>0?
           <div> 
           <h1>Project Details</h1>
           <StaticTextDisplay data={ProjectArr} setProjectArr={setProjectArr}
           />
           </div>:""}
         </div>
    )
}
export default CreateInfo;