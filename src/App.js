import React from 'react';
import './App.css';
import Authentication from './components/Authentication/Authentication';

import { Fragment, Suspense, useContext } from 'react';
import AuthContext from './components/Authentication/auth-context';
import WelcomeScreen from './components/Pages/WelcomeScreen';
import { Route, Routes } from 'react-router-dom';
// import CompleteProfile from './components/Pages/CompleteProfile/CompleteProfile';
import ForgotPassword from './components/Pages/forgotPassword/ForgotPassword';
import ExpenseItems from './components/Pages/Expense/ExpenseItems';
import Store from './components/storeOfData/Store';
import { useSelector } from 'react-redux';

function App() {

  // const ctx =useContext(AuthContext)
  // Redux
  const isAuth=useSelector(state=>state.auth.isAthenticated);
  const theme=useSelector(state=>state.theme.theme);

  const CompleteProfile=React.lazy(()=>import('./components/Pages/CompleteProfile/CompleteProfile'))

  return (
    
    <Fragment>
        <Suspense fallback={<div style={{"position":"fixed" , "top":"50%"}} className='text-center'>Loading...</div>}>
      <div className={theme ? 'dark' : ''}>
    
       {/* <Store> */}
      
      <Routes>
        <Route path='/' element= {!isAuth ? <Authentication /> : <WelcomeScreen />} />
        

        <Route path='/completeprofile' element={!isAuth ? <Authentication /> : <CompleteProfile />} />

        <Route path='/forgotPassword' element={<ForgotPassword />} />


      </Routes>
      {/* </Store> */}
      </div>

      </Suspense>
      </Fragment>
  );
}

export default App;


