import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SignIn } from './components/SignIn';
import { TopMenu } from './components/TopMenu';
import { Search } from './components/Search';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<><TopMenu/><Search/></>}/>
        <Route path="/signIn" element={<><SignIn/></>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
