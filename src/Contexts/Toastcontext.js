import { createContext } from "react"
import { useState } from "react";
import MysnakBar from '../components/MysnankBar';
import { useContext } from "react";


const Toastcontext=createContext({});


export const Toastprovider=({children})=>{
      const [open, setOpen] = useState(false);
      const [message,setmessage]=useState("");
      function ShowHidesnakbar(message){
  setmessage(message);
  setOpen(true);
  setTimeout(()=>{
    setOpen(false);
  },2000)
}
    return(
          <Toastcontext.Provider value={{ShowHidesnakbar}}>
                  <MysnakBar open={open} message={message}/>
                   {children}
          </Toastcontext.Provider>
    );
}

 export const useToast=()=>{
   return useContext(Toastcontext)
};
