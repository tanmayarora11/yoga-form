import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Booking from "./components/booking/Booking";
import Payment from "./components/payment/Payment";
import Register from "./components/register/Register";
import './App.css'

function App() {
  return (
    <>
        <Router>
          <Routes>
            <Route exact path='/' element={<Register/>}/>
            <Route exact path='/pay/:id' element={<Payment/>}/>
            <Route exact path='/book/:id' element={<Booking/>}/>
          </Routes>
        </Router>
        
    </>
  );
}

export default App;
