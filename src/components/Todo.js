import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { useToast } from '../Contexts/Toastcontext';
import { useTodos } from '../Contexts/Todoscontext';




export default function Todo({todo,handleDelete,handleUpdate}){
  const {dispatch}=useTodos();
  const {ShowHidesnakbar}=useToast();

  function fhandleClick(){
    dispatch({type:"toggle",payload:todo})
    ShowHidesnakbar("تم التغير بنجاح")
  }
  function handleDeleteClick(){
      handleDelete(todo);
  }


  function showUpdatedialgoe(){
   handleUpdate(todo);
  }
  
    return(
      <>


       <Card className='todoCard' sx={{ backgroundColor:"#283593",color:"white" ,marginTop:"10px"}}>
      <CardContent>
        <Grid container spacing={2}>
  <Grid size={8}>
  <Typography variant="h5" sx={{textAlign:"right"} } style={{textDecoration:todo.isComplete?"line-through":"none"}} >
   {todo.title}
        </Typography>
        <Typography variant="h5" sx={{textAlign:"right"}} >
   {todo.details}
        </Typography>
  </Grid>
  <Grid size={4} display="flex" justifyContent="space-around" alignItems="center">
  <IconButton onClick={()=>{fhandleClick();}} className='iconButton' aria-label="delete" style={{color:todo.isComplete?"white":"#8bc34a",backgroundColor:todo.isComplete?"#8bc34a":"white",border:"solid #8bc34a 3px"}}>
  <CheckIcon />
</IconButton>

<IconButton onClick={showUpdatedialgoe} className='iconButton' aria-label="delete"style={{color:"#1769aa",backgroundColor:"white",border:"solid #1769aa 3px"}} >
  <ModeEditOutlineOutlinedIcon/>
</IconButton>
<IconButton onClick={handleDeleteClick} className='iconButton' aria-label="delete" style={{color:"red",backgroundColor:"white",border:"solid red 3px"}}>
  <DeleteIcon />
</IconButton>
  </Grid>

</Grid>
      </CardContent>
     
       
    </Card>
    </>
    )
};