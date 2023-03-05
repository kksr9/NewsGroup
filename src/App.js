import './App.css';
import Navbar from './Components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
// import React, { Component } from 'react'
import React from 'react'
import { useState } from 'react';
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar';

// export default class App extends Component {
  const App=(props)=>{
  const pageSize=9;
  // apiKey = process.env.REACT_APP_NEWS_API ;
    const [progress, setProgress]= useState(0)
  // state = {
  //   progress:0
  // }
  // setProgress = (progress)=>{
  //   setState({progress: progress})
  // }
  // render() {
    return (
      <div>
        <Router>
        <Navbar/>
        <LoadingBar
        height={3}
        color='#f11946'
        progress={progress} 
        />
      <Routes>
        <Route path="/" element={<News pageSize={pageSize} setProgress={setProgress} key="gen" country="in" category="general"/> } />
        <Route path="/business"  element={<News pageSize={pageSize} setProgress={setProgress} key="business" country="in" category="business"/> } />
        <Route path="/entertainment"  element={<News pageSize={pageSize} setProgress={setProgress} key="entertainment" country="in" category="entertainment"/> } />
        <Route path="/general"  element={<News pageSize={pageSize}  setProgress={setProgress} key="general" country="in" category="general"/> } />
        <Route path="/health"  element={<News pageSize={pageSize} setProgress={setProgress} key="health" country="in" category="health"/> } />
        <Route path="/science" element={<News pageSize={pageSize} setProgress={setProgress} key="science"  country="in" category="science"/> } />
        <Route path="/sports" element={<News pageSize={pageSize} setProgress={setProgress} key="sports" country="in" category="sports"/> } />
        <Route path="/technology" element={<News pageSize={pageSize} setProgress={setProgress} key="technology" country="in" category="technology"/> } />
      </Routes>
      </Router>
      </div>
    )
  // }
}

export default App;
