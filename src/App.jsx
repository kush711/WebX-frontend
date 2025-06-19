import {useState , useEffect} from 'react';
import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ContentContainer from './ContentContainer';

function App() {
  //Taking theme from localStorage or default to dark mode
  const [darkMode, setDarkMode] = useState(()=>{
    const stored = localStorage.getItem('theme');
    return stored ? stored == 'dark': true;
  });

  //Update localStorage whenever theme change
  useEffect(()=>{
    localStorage.setItem('theme' , darkMode ? 'dark' : 'light');
  }, [darkMode]);

  //Toggles the theme
  const toggleTheme = () =>{
    setDarkMode(prev => !prev);
  };

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <button
        className={`btn btn-sm position-absolute top-0 end-0 m-3 ${
          darkMode ? 'btn-light text-dark':'btn-dark text-light'
        }`}
        
        onClick={toggleTheme}>
        Switch to {darkMode ? 'Light' : 'Dark'} Mode  
      </button>  

      <ContentContainer darkMode={darkMode}/>

      <ToastContainer position='top-center' autoClose={4000}/>
    </div>
  )
}

export default App
