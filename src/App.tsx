import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignComponent from './Sign';
import Register from './Register';
import RegisterCode from './RegisterCode';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignComponent />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/register/code" element={<RegisterCode />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
