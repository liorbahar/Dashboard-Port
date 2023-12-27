import React from 'react';
import * as ReactDOM from "react-dom";
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import NavBarLayout from './NavBarLayout.component';
import AdminPage from '../AdminPage.component';
import DashboardPage from '../DashboardPage.component';

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route >
        <Route path="/" element={<NavBarLayout/>}>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
        </Route>
    )
  )

  return (
    <div style={{ height: '100%' }}>
      <RouterProvider router={router} />
    </div>
  );
}

export default Router;