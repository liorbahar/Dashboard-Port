import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { Typography, createStyles, makeStyles } from '@material-ui/core';


const useStyles = makeStyles(() =>
  createStyles({
    height: {
      height: '100%',
    },
    option: {
      marginLeft:'2%'
    }
  }),
);

  export const NavBarLayout: React.FC = ({ }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const onAdminClick = () => navigate(`/admin`);

  const onDashboardClick = () => navigate(`/dashboard`);

  return (
    <div className={classes.height}>
      <AppBar position="static" style={{backgroundColor:'#222A63 '}}>
        <Toolbar>
          <IconButton edge="start" onClick={onAdminClick} color="inherit">
            <Typography>Admin</Typography>
          </IconButton>

          <IconButton className={classes.option} edge="start" onClick={onDashboardClick} color="inherit">
          <Typography>Dashboard</Typography>
          </IconButton>
        </Toolbar>
      </AppBar>
      <main>
        <div>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default NavBarLayout; 