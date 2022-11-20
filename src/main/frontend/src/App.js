import logo from './logo.svg';
import './App.css';
import {Route,Routes} from "react-router-dom";
import Join from "./component/join/Join";
import Main from "./component/Main/Main";
import Login from "./component/login/Login";
import SelectLogin from "./component/login/SelectLogin";
import Game from "./component/play/Game";
import CreateCard from "./component/card/CreateCard";
import Server from "./Server";
import Hello from "./component/Hello/Hello";
import Poker from "./component/play/Poker";
import 'bootstrap/dist/css/bootstrap.min.css';
import Free from './component/play/twoPlayer/Free.js';
import Three from './component/play/Three.js';
import Four from './component/play/Four.js';
import Five from './component/play/Five.js';
import Six from './component/play/Six.js';
import StartTwo from "./component/play/twoPlayer/StartTwo";
import WaitTwo from "./component/play/twoPlayer/WaitTwo";
import {CookiesProvider} from 'react-cookie';

function App() {

      return (
          <CookiesProvider>
                <Routes>
                      <Route path ="/" exact={true} element={<Hello/>}/>
                      <Route path ="/main" exact = {true} element={<Main/>} />
                      <Route path ="/login" exact = {true} element={<Login/>}/>
                      <Route path ="/join" exact = {true} element={<Join/>}/>
                      <Route path ="loginselect" exact={true} element={<SelectLogin/>}/>
                      <Route path ="/game" exact={true} element={<Game/>}/>
                      <Route path ="/server" exact={true} element={<Server/>}/>
                      <Route path ="/poker" exact={true} element={<Poker/>}/>
                      <Route path = "/free" exact = {true} element ={<StartTwo/>}/>
                      <Route path = "/three" exact={true} element ={<Three/>}/>
                      <Route path = "/four" exact ={true} element ={<Four/>}/>
                      <Route path = "/five" exact = {true} element = {<Five/>}/>
                      <Route path = "/six" exact ={true} element = {<Six/>}/>
                      <Route path = "/wait2" exact={true} element = {<WaitTwo/>}/>
                </Routes>
          </CookiesProvider>

      );
}

export default App;