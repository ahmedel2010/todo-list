import { v4 as uuidv4 } from 'uuid';
export default function Reducer(currentState,action){

    switch(action.type){
        case "Added":{
              const newMession={
                  id:uuidv4(),
                  title:action.payload.newtitle,
                  details:"",
                  isComplete:false,
                }
                const updated=[...currentState,newMession];
                localStorage.setItem("todo",JSON.stringify(updated));
                return(updated);
                
            }
            case "deleted":
            {
    const updated=currentState.filter((t)=>{
      return t.id !==action.payload.changeT.id;
    });
      localStorage.setItem("todo",JSON.stringify(updated));
    return (updated);
            }
        case "Edited":
            {
             const editValue=currentState.map((t)=>{
      if(t.id===action.payload.changeT.id){
        return {...t,title:action.payload.changeT.title,details:action.payload.changeT.details}
      }
      else{
        return(t);
      }
    })
     localStorage.setItem("todo",JSON.stringify(editValue));
    return(editValue);


         }
         case "get":
            {
 const recievedData=localStorage.getItem("todo");
  const Data=recievedData?JSON.parse(recievedData):[];
          return(Data);
}
case"toggle":
{
      const updatedval=currentState.map((t)=>{
    if(t.id===action.payload.id){
      const update={...t,isComplete:!t.isComplete}
    return update
    }
    return t;
  });
   localStorage.setItem("todo",JSON.stringify(updatedval));
  return updatedval;
}


        default:
            throw Error("Unknow Action"+action.type);
    }

}