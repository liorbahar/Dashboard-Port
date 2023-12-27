import React from 'react'
import './App.css';
import Router from './components/Layout/Router.component';
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <div>
      <SnackbarProvider maxSnack={3} autoHideDuration={2000}>
        <Router/>
      </SnackbarProvider>
    </div>
  );
}

export default App;
