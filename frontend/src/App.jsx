import './App.css'
import {Routes ,Route} from 'react-router-dom'

  //user
import Register from './pages/user/Register';
import Dashboard from './pages/user/Dashboard';
import Login from './pages/user/Login';
import Deposit from './pages/user/Deposit';
import Withdraw from './pages/user/Withdraw';
import History from './pages/user/History';
import Profile from './pages/user/Profile';
import Navbar from './components/Navbar';
import Home1 from './pages/user/Home1';
import EditProfile from './components/EditProfile';
import Notifications from './pages/user/Notifications';


  //bank
import BankDashboard from './pages/bank/BankDashboard';
import BankLogin from './pages/bank/BankLogin';
import Users from './pages/bank/Users';
import BankNav from './components/BankNav';
import BankView from './components/BankView';
import BankHistory from './components/BankHistory';


function App() {
  return (
    <div>
      <Routes>

          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          

          <Route element={<Navbar/>}>
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/deposit" element={<Deposit/>} />
          <Route path="/withdraw" element={<Withdraw/>} />
          <Route path="/history" element={<History/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/edit-profile" element={<EditProfile/>} />
          <Route path="/home1" element={<Home1/>}/>
          <Route path='/notifications' element={<Notifications/>}/>
          </Route>


          
          <Route path="/bank" element={<BankLogin/>} />

          <Route element={<BankNav/>}>
          <Route path="/bank/dashboard" element={<BankDashboard/>} />
          <Route path="/bank/users" element={<Users/>} />
          <Route path="/bank/users/view/:id" element={<BankView/>} />
          <Route path="/bank/users/history" element={<BankHistory/>} />
          </Route>

      </Routes>
    </div>
  );
}

export default App;

