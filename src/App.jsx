import { useState, createContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';

import HootList from './components/HootList/HootList';
import HootDetails from './components/HootDetails/HootDetails';
import HootForm from './components/HootForm/HootForm';

import * as hootService from '../src/services/hootService'
import * as authService from '../src/services/authService'; // import the authservice

export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser()); // using the method from authservice
  const [hoots, setHoots] = useState([])


  // SETUP navigate function
  const navigate = useNavigate()

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };
  //hootFormData, is going to come from the form!
  // we have to lift state!
  async function handleAddHoot(hootFormData){
    console.log(hootFormData, " <- hootFormData")
      const newHoot = await hootService.create(hootFormData)
      // update the state with our newHoot
      setHoots([newHoot, ...hoots])
      //navigate to the index page after we create
      navigate('/hoots'); // go to the <Route path='/hoots'>etc... 
  }

  useEffect(() => {

    async function fetchAllHoot(){
      const hootData = await hootService.index()
      setHoots(hootData)
    }

    // check if we are logged in before we fetch!
    if(user){
      fetchAllHoot()
    }


  }, [user]) // run the useEffect on page load, or whenever the user variable changes


  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
          {user ? (
            // protected routes!
            <>
            <Route path="/" element={<Dashboard user={user} />} />
            <Route path='/hoots' element={<HootList hoots={hoots} />} /> 
            <Route path='/hoots/new' element={<HootForm handleAddHoot={handleAddHoot}/>} />
            <Route path='/hoots/:hootId' element={<HootDetails />} />
            </>
          ) : (
            // not logged in!
            <Route path="/" element={<Landing />} />
          )}
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path="/signin" element={<SigninForm setUser={setUser} />} />
        </Routes>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;
