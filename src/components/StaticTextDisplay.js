import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./ButtonCmp/Button";
import TextBox from "./TextBoxCmp/TextBox";

const StaticTextDisplay=(props)=>{

const navigate=useNavigate();
const [grandTotal,setGrandTotal]=useState(0);
const [minutesgrandTotal,setminutesGrandTotal]=useState(0);
const [choosedate,setChooseDate]=useState("");
const [overallHour,setOverAllHour]=useState("");
const [overallMinutes,setOverAllMinutes]=useState("");
//redirect from page
const sendViewData=(data)=>{;
    navigate("/ProjectDetails",{state:{id:data?.projectId,name:data?.projectname}})
}


useEffect(()=>{
    //set the total time spent on project
    const total=[];
    const minTotal=[];
    const overAllhr=[];
    const overAllmin=[];
    {props?.projectTaskArray?.map((data)=>{
        if(data?.projectid==props?.projectid&&data?.date==choosedate){
        {total.push(data?.hours)}
        {minTotal.push(data?.minutes)}
        }
    })}
    {props?.projectTaskArray?.map((data)=>{
        if(data?.projectid==props?.projectid){
        {overAllhr.push(data?.hours)}
        {overAllmin.push(data?.minutes)}
        }
    })}
     setGrandTotal(total.length>0&&total.reduce((acc,cur)=>{return Number(acc)+Number(cur)}));
     setminutesGrandTotal(minTotal.length>0&&minTotal.reduce((acc,cur)=>{return Number(acc)+Number(cur)}))
     setOverAllHour(overAllhr.length>0&&overAllhr.reduce((acc,cur)=>{return Number(acc)+Number(cur)}));
     setOverAllMinutes(overAllmin.length>0&&overAllmin.reduce((acc,cur)=>{return Number(acc)+Number(cur)}))
},[props?.projectTaskArray,choosedate] )
useEffect(()=>{

},[minutesgrandTotal])
//render based on component data
    return(
        <>{props?.data?
        <div className="loopingData">
            <div className="data_info">
            <div>Project name</div>
            <div>description</div>
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
            <TextBox title="Choose Date To Sort" choosedate={choosedate} setChooseDate={setChooseDate} value={choosedate} type={"date"}/>
        <div className="data_info">
        <div>Date</div>
        <div>Hours</div>
        <div>Minutes</div>
        <div>Task</div>
       </div>
       {choosedate?props?.projectTaskArray&&props?.projectTaskArray?.map((data)=>
       data?.projectid==props?.projectid&&data?.date==choosedate&&
       <div className="data_info">
        <div>{data?.date}</div>
        <div>{data?.hours}</div>
        <div>{data?.minutes}</div>
        <div>{data?.task}</div>
       
       </div>
       ):
       props?.projectTaskArray&&props?.projectTaskArray?.map((data)=>
       data?.projectid==props?.projectid&&
       <div className="data_info">
        <div>{data?.date}</div>
        <div>{data?.hours}</div>
        <div>{data?.minutes}</div>
        <div>{data?.task}</div>
       
       </div>
       )
       }
    
        <div className="data_info">
        {choosedate&&<div>Total Time for {choosedate}</div>}
        {choosedate&&<div>{Number(Number(grandTotal)+Number(Math.floor(minutesgrandTotal/60)))+":"+Number(minutesgrandTotal-(Math.floor(minutesgrandTotal/60)*60))}</div>}
        <div>Grand Total</div>
        <div>{Number(Number(overallHour)+Number(Math.floor(overallMinutes/60)))+":"+Number(overallMinutes-(Math.floor(overallMinutes/60)*60))}</div>
       </div>
       
    </div>
}
        </>
    )
}
export default StaticTextDisplay;