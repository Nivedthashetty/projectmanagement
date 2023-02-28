import {SUCCESS,ERROR,CLEAR} from "./type";

 function success(message){
    return {type:SUCCESS,message:message}
 }

 function error(message){
    return {type:ERROR,message:message}
 }

 function clear() {
   return { type:CLEAR };
}


 export const alertActions={
    success,
    error,
    clear
 }