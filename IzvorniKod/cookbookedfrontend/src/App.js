import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Categories from './Categories';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Blog from './Blog';
function App() {
  return (
    <div className="App">
      <h1 style={{
        backgroundImage: `url("https://burst.shopifycdn.com/photos/kitchen-ready-for-cooking.jpg?width=1000&format=pjpg&exif=0&iptc=0")`
      }}>
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Button href='/'>Home</Button>
        <Button href="/Login">Sign In</Button>
        <Button href="/Registration">Sign Up</Button>
        <Button href="/Categories">Categories </Button>
      </ButtonGroup>
        
      </h1>
      <header className="App-header">
      
  
        
      <BrowserRouter>
      
        <Routes>
          <Route path='/' exact ><Blog/></Route>
          <Route path='/Login' exact component={SignIn}/>
          <Route path='/Registration' exact component={SignUp}/>
          <Route path='/Categories' exact component={Categories}/>
        </Routes>
      </BrowserRouter>
      </header>
      
       
      
    </div>
  );
}

export default App;
