//text box component
const TextBox=(props)=>{
   
    const getValueOfField=(e)=>{
        //set the value and validation
        if(props.title=="projectname"){
            props.setProjectname(e.target.value);
        }
        if(props.title=="description"){
            props.setDescription(e.target.value);
         }
         if(props.title=="Hours"){
            if(e.target.value>=0){
            props.setHours(e.target.value);
            }
        }
        if(props.title=="Minutes"){
            if(e.target.value>=0  &&e.target.value<=59){
            props.setMinutes(e.target.value);
            }
         }
         if(props.title=="Task"){
            props.setTask(e.target.value);
         }
         if(props.title=="Date"){
            props.setDate(e.target.value);
         }
         if(props.title=="Choose Date To Sort"){
            props.setChooseDate(e.target.value);
         }
        
      }



    return(
        <div className="text_box flt">
             <label htmlFor={props.title}>{props.title}</label>
             <input type={props?.type?props?.type:"text"} id={props.title} name={props.title} onChange={getValueOfField} value={props.value}/>
        </div>
    )
}

export default TextBox;