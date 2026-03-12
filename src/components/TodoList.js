import * as React from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Todo from "./Todo";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useEffect } from 'react';
import { useMemo } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useToast } from '../Contexts/Toastcontext';
import { useTodos } from '../Contexts/Todoscontext';






export default function TodoList() {
  const [showDialoge,SetShowDialoge]=useState(false);
    const [showUpdateDialoge,SetShowUpdateDialoge]=useState(false);
  const{Todos,dispatch}=useTodos();
  const{ShowHidesnakbar}=useToast();
  const [View,setView]=useState("all");
  const[changeTodo,setChangetodo]=useState(null);
  const [titleInput,setTitleInput]=useState("");

  useEffect(()=>{
dispatch({type:"get"})
  },[])

const completed=useMemo(()=>{
return Todos.filter((t)=>{
  return t.isComplete}) ;
},[Todos])

const notCompleted=useMemo(()=>{
return Todos.filter((t)=>{
return ! t.isComplete}) ;
},[Todos])


let readyTobeRender=Todos;
if(View==="completed"){
  readyTobeRender=completed;
}
else if(View==="Not-completed"){
  readyTobeRender=notCompleted;
}
else{
  readyTobeRender=Todos;
}

  const todosjsx=readyTobeRender.map((t)=>{
  return <Todo key={t.id} todo={t} handleDelete={handleShowDelete} handleUpdate={openUpdateDialoge}/>
})
 function handleClick(){
    dispatch({type:"Added",payload:{newtitle:titleInput}})
    setTitleInput("");
    ShowHidesnakbar("تمت الاضافه بنجاح");
  }
  function handlechangeview(e){
    setView(e.target.value);
  }

 function handleCloseClick(){
    SetShowDialoge(false);
  }

    function handleShowDelete(todo){
      setChangetodo(todo);
    SetShowDialoge(true);
  }

    function handleFinalDelete(){
      dispatch({type:"deleted",payload:{changeT:changeTodo}});
      handleCloseClick();
      ShowHidesnakbar("تم الحذف بنجاح")
  }
function handleCloseUpdateClick(){
    SetShowUpdateDialoge(false);
  }
  function handleFinalEdit(){
    dispatch({type:"Edited",payload:{changeT:changeTodo}})
    SetShowUpdateDialoge(false);
      ShowHidesnakbar("تم التعديل بنجاح")
  }
  function openUpdateDialoge(todo){
    setChangetodo(todo);
    SetShowUpdateDialoge(true);
  }

  return (

    <>
   
      {/* show delete dialoge */}

       <Dialog 
       style={{direction:"rtl"}}
        open={showDialoge}
        keepMounted
        onClose={handleCloseClick}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"حذف المهمه"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          لا يمكنك التراجع عن الحذف بعد اتمامه
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseClick}>اغلاق</Button>
          <Button onClick={handleFinalDelete}>نعم قم بالحذف</Button>
        </DialogActions>
      </Dialog>


      {/* end delete dialoge */}    

      
            {/* show Update dialoge */}
      
             <Dialog 
             style={{direction:"rtl"}}
              open={showUpdateDialoge}
              keepMounted
              onClose={handleCloseUpdateClick}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>{"تعديل المهمه"}</DialogTitle>
            {/* داخل الـ Update Dialog في TodoList.js */}
<DialogContent>
  {/* هذا السطر يمنع الـ Crash: لا ترسم الحقول إلا لو الـ changeTodo فيه بيانات */}
  {changeTodo && (
    <>
      <TextField
        value={changeTodo.title}
        onChange={(e) => setChangetodo({ ...changeTodo, title: e.target.value })}
        autoFocus
        required
        margin="dense"
        label="عنوان المهمه"
        fullWidth
        variant="standard"
      />
      <TextField
        value={changeTodo.details}
        onChange={(e) => setChangetodo({ ...changeTodo, details: e.target.value })}
        margin="dense"
        label="تفاصيل المهمه"
        fullWidth
        variant="standard"
      />
    </>
  )}
</DialogContent>
              <DialogActions>
                <Button onClick={handleCloseUpdateClick}>اغلاق</Button>
                <Button onClick={handleFinalEdit} >تاكيد</Button>
              </DialogActions>
            </Dialog>
      
      
            {/* end Update dialoge */}  
      <Container maxWidth="sm">


        <Card sx={{ minWidth: 275 }} style={{maxHeight:"90vh",overflow:"scroll"}}>
      <CardContent>
        <Typography variant="h3" >
       مهامي
        </Typography>
        <Divider />

         <ToggleButtonGroup
   
      aria-label="text alignment" style={{marginTop:"20px",direction:"ltr"} } exclusive value={View} onChange={handlechangeview}
    >
      <ToggleButton value="Not-completed" >
      غير المنجز
      </ToggleButton>
      <ToggleButton value="completed" >
        المنجز
      </ToggleButton>
      <ToggleButton value="all" >
        الكل
      </ToggleButton>
     
    </ToggleButtonGroup>
         {todosjsx}
         <Grid container spacing={2} style={{marginTop:"10px"}}>
  <Grid size={8} >
<TextField id="outlined-basic" label="عنوان المهمه" variant="outlined" value={titleInput} onChange={(e)=>{setTitleInput(e.target.value)}} style={{width:"100%"}}/>
  </Grid>
  <Grid size={4}>   
        <Button disabled={titleInput.length===0} onClick={handleClick} variant="contained" style={{width:"100%",height:"100%"}}>اضافه</Button>
   </Grid>
  </Grid>
      </CardContent>
    </Card>
      </Container>
      </>
   
  );
}