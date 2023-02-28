
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alertActions } from './actions/Alert.action';
import './App.css';
import "./styles/module.scss";
import {BrowserRouter,Routes,Route } from "react-router-dom";
import CreateInfo from './sections/CreateProject/CreateInfo';
import ProjectDetails from './sections/ProjectDetails/ProjectDetails';

function App() {
  const dispatch=useDispatch();
  const alert = useSelector((state) => state?.alert);
  useEffect(() => {
    setTimeout(() => dispatch(alertActions.clear()), 3000);
  }, [alert?.message]);

  return (
    <div className="main_box flt">
       {alert?.message && (
        <div className={`alert ${alert?.type}`}>{alert?.message}</div>
      )}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CreateInfo/>}/>
          <Route path="/ProjectDetails" element={<ProjectDetails/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
