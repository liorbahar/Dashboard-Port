import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { Typography, createStyles, makeStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';


const useStyles = makeStyles(() =>
  createStyles({
    height: {
      height: '100%',
    }
  }),
);

  export const NavBarLayout: React.FC = ({ }) => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const navigate = useNavigate();


  const onAdminClick = () => {
    navigate(`/admin`);
  }

  const onDashboardClick = () => {
    navigate(`/dashboard`);
  }

  return (
    <div className={classes.height}>
      <AppBar position="static" style={{backgroundColor:'#222A63 '}}>
        <Toolbar>
          <IconButton style={{marginRight:'-15px'}} edge="start" onClick={onAdminClick} color="inherit">
            <Typography>Admin Page</Typography>
          </IconButton>

          <IconButton style={{marginLeft:'2%'}} edge="start" onClick={onDashboardClick} color="inherit">
          <Typography>Dashboard Page</Typography>
          </IconButton>
        </Toolbar>
      </AppBar>
      <main>
        <div className={classes.height}>
          <Outlet />
        </div>
      </main>
      {/* <SideBarDrawer open={open} setOpen={setOpen} user={user}/> */}
    </div>
  );
}

export default NavBarLayout; 