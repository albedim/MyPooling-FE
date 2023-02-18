import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SignIn } from './components/SignIn';
import { TopMenu } from './components/TopMenu';
import { SearchSchool } from './components/SearchSchool';
import { SearchHome } from './components/SearchHome';
import { Home } from './components/Home';
import { Signup } from './components/Signup';

function App() {
  return (
    <BrowserRouter basename='/MyPooling-FE'>
      <Routes>
        <Route path="/go_to_school" element={<><TopMenu/><SearchSchool/></>}/>
        <Route path="/signup" element={<><Signup/></>}/>
        <Route path="/" element={<><TopMenu/><Home/></>}/>
        <Route path="/go_home" element={<><TopMenu/><SearchHome/></>}/>
        <Route path="/signIn" element={<><SignIn/></>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
