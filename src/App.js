import './App.css';
import TodoList from './components/TodoList';
import {createTheme,ThemeProvider }from "@mui/material/styles"

import { Toastprovider } from './Contexts/Toastcontext';
import Todosprovider from './Contexts/Todoscontext';
const theme = createTheme({
typography:{
  fontFamily:[
    "Alexandria"
  ]
},
palette:{
  primary:{
    main:"#004d40"
  },
},
});

function App() {

  return (
      <ThemeProvider theme={theme}>
        <Todosprovider>
        <Toastprovider>
          <div className="App" style={{display:"flex",justifyContent:"center",alignItems:"center",minHeight:"100vh",backgroundColor:"#191b1f",direction:"rtl"}}>
    
      <TodoList/>
          </div>
    </Toastprovider>
    </Todosprovider>
    </ThemeProvider> 
  );
}

export default App;
