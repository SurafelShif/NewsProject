import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./components/User/SignIn"
import SignUp from "./components/User/SignUp"
import Home from "./components/HomeComponents/Home";
import Profile from "./components/Profile/Profile";
import Category from "./components/Category/Category";
import ErrorPage from "./components/404page/ErrorPage";
function App() {
  return (
    <BrowserRouter>
        <Routes >  
          <Route path="/" index element={<Home/>}/>
          <Route path="/SignIn"  element={<SignIn/>}/>
          <Route path="/SignUp"  element={<SignUp/>}/>
          <Route path="/Profile"  element={<Profile/>}/>
          <Route path="/Category/:category"  element={<Category/>}/>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
    </BrowserRouter>
  );
}
export default App;
