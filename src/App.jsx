import { BrowserRouter,Routes,Route,NavLink } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import User from "./pages/User";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import './App.css';

function App(){ 

  const navAction = ({isActive}) =>
    `font-medium transition-all duration-300 ${isActive ? 'text-orange-600 scale-110' : 'text-gray-500 hover:text-orange-400'}`;
  

  return(
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-rose-50">
        <nav className="bg-white/60 backdrop-blur-md shadow-sm sticky top-0 z-50">
          <div className="max-w-2xl mx-auto px-4 py-3 flex justify-center gap-8">
            <NavLink to="/" className={navAction}>🏠 首页番茄钟</NavLink>
            <NavLink to="/about" className={navAction}>👋 关于项目�</NavLink>
            <NavLink to="/user/前端架构师" className={navAction}>👊🏻 我的主页</NavLink>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/user/:name" element={<User />}>
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;