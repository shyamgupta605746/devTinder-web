import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

import appStore from "./utils/appStore";
import Body from "./components/Body";
import Feed from "./components/Feed";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Connections from "./components/Connections";
import Requests from "./components/Requests";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>

        {/* 🔥 Toast container */}
        <Toaster position="top-right" reverseOrder={false} />

        <Routes>
          <Route path="/" element={<Body />}>
            <Route index element={<Feed />} /> 
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<Profile />} />
            <Route path="connections" element={<Connections />} />
            <Route path="requests" element={<Requests />} />
          </Route>
        </Routes>

      </BrowserRouter>
    </Provider>
  );
}

export default App;
