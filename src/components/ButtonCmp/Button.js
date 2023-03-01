
//button component
const Button=(props)=>{
    return(
         <div className="button_cmp flt">
             <button onClick={props.sendFormData}>{props.title}</button>
         </div>
    )
}
export default Button;