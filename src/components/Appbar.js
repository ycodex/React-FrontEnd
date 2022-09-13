import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import { NavLink } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Appbar() {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleLogout=(e)=>{
    localStorage.removeItem('userId')
    navigate('/')
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" enableColorOnDark>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Tweet App
          </Typography>
          <Typography variant="h6" className={classes.title}>
          <NavLink to='/Home' color='white'>
          <Button>
            Home
            </Button>
          </NavLink>
          </Typography>
          <Typography variant="h6" className={classes.title}>
          <NavLink to='/search' >
          <Button>
            Search
            </Button>
          </NavLink>
          </Typography>
          <Typography align="right"  className={classes.title}>
          <Button variant="contained" color="secondary" onClick={handleLogout}>
                    LOGOUT
                </Button>
          </Typography>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <NavLink to='/profile' >
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <Button>
            <PersonIcon  />
            </Button>
          </IconButton>
          </NavLink>
          
        </Toolbar>
      </AppBar>
    </div>
  );
}
