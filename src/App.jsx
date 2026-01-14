import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Body from './Body';
import Login from './Login';
import Profile from './profile';
function App() {
  return (
    <>
 <BrowserRouter>
  <Routes>
  <Route path="/" element={<Body/>}>
  <Route path="/login" element={<Login/>} />
  <Route path="/profile" element={<Profile/>} />
  </Route>
  </Routes>
 </BrowserRouter>
 
{/* <Navbar/>

    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <h1 className="text-4xl font-bold text-pink-500">
        Hello World 👋
      </h1>
    </div> */}
    </>
  );
}

export default App;
