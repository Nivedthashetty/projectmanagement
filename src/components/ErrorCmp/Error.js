//error component
const ErrorCmp=(props)=>{
    return(
        <div className="error">
           {props.error}
        </div>
    )
}
export default ErrorCmp;