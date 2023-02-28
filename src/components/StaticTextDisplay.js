import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./ButtonCmp/Button";

const StaticTextDisplay=(props)=>{

const navigate=useNavigate();
const [grandTotal,setGrandTotal]=useState(0);
//redirect from page
const sendViewData=(data)=>{;
    navigate("/ProjectDetails",{state:{id:data?.projectId,name:data?.projectname}})
}


useEffect(()=>{
    //set the total time spent on project
    const total=[];
    {props?.projectTaskArray?.map((data)=>{
        if(data?.projectid==props?.projectid){
        {total.push(data?.hours)}
        {total.push(data?.minutes)}
        }
    })}
     setGrandTotal(total.length>0&&total.reduce((acc,cur)=>{return Number(acc)+Number(cur)}));
},[props?.projectTaskArray] )
//render based on component data
    return(
        <>{props?.data?
        <div className="loopingData">
            <div className="data_info">
            <div>Book name</div>
            <div>Price</div>
            <div>View</div>
           </div>
           {props?.data && props?.data?.map((data)=>
           <div className="data_info">
            <div>{data?.projectname}</div>
            <div>{data?.description}</div>
            <Button title="View" sendFormData={()=>sendViewData(data)}/>
           </div>
           )}
        </div>:
        <div className="loopingData">
        <div className="data_info">
        <div>Hours</div>
        <div>Time</div>
        <div>Task</div>
       </div>
       {props?.projectTaskArray&&props?.projectTaskArray?.map((data)=>
       data?.projectid==props?.projectid&&
       <div className="data_info">
        <div>{data?.hours}</div>
        <div>{data?.minutes}</div>
        <div>{data?.task}</div>
       
       </div>
       )}
        <div className="data_info">
        <div>Total Time</div>
        <div></div>
        <div>{grandTotal}</div>
       </div>
    </div>
}
        </>
    )
}
export default StaticTextDisplay;