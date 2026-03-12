import { createContext,useReducer,useContext } from "react";
import Reducer from '../Reducers/TodosReducer';
export const Todoscontext=createContext([]);


const Todosprovider=({children})=>{
    const [todos,dispatch]=useReducer(Reducer,[]);
    return(
      <Todoscontext.Provider value={{Todos:todos,dispatch:dispatch}}>
       {children}
      </Todoscontext.Provider>
    )
}

 export default Todosprovider;
  export const useTodos=()=>{
    return useContext(Todoscontext)
 };

