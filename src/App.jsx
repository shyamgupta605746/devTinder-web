import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Body from './components/Body';
import Login from './components/Login';
import Profile from './components/Profile';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import Feed from './components/Feed';
function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
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
