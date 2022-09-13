import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container, Paper, Button } from '@material-ui/core';
import TweetService from '../services/TweetService';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),

    },
  },
}));

export default function Login() {
  const paperStyle = { padding: '50px 20px', width: 600, margin: "20px auto" }
  const [username, setUserName] = useState('')
  const [passwd, setPasswd] = useState('')
  const [error,setError] = useState('')
  const classes = useStyles();
  const navigate=useNavigate();

  const handleReg=(e)=>{
    e.preventDefault()
    navigate('/register')
  }
  const handleClick = (e) => {
    e.preventDefault()
    const user = { username, passwd }
    console.log(user)
    TweetService.login(user).then(res=>{
      console.log(res)
      localStorage.setItem('userId',res.data.loginID)
      console.log(res.data)
      navigate('/home')
     
    }).catch(err=>{
      console.log(err)
      setError('Worng Credientials, Try Again')
    })
  }

  // useEffect(() => {
  //   fetch("http://localhost:8080/student/getAll")
  //     .then(res => res.json())
  //     .then((result) => {
  //       setStudents(result);
  //     }
  //     )
  // }, [])
  return (

    <Container>
     
      <Paper elevation={3} style={paperStyle}>
        <h1 style={{ color: "blue" }}><u>Login</u></h1>

        <form className={classes.root} noValidate autoComplete="off">

          <TextField id="outlined-basic" label="UserName" variant="outlined" fullWidth
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth
            value={passwd}
            onChange={(e) => setPasswd(e.target.value)}
          />
          <Button variant="contained" color="secondary" onClick={handleClick}>
            Submit
          </Button>
          
          <Button variant="contained" color="secondary" onClick={handleReg}>
            Register
          </Button>
          <div>{error}</div>
        </form>

      </Paper>
      {/* <h1>Students</h1> */}

      {/* <Paper elevation={3} style={paperStyle}>

        {students.map(student => (
          <Paper elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left" }} key={student.id}>
            Id:{student.id}<br />
            Name:{student.name}<br />
            Address:{student.address}

          </Paper>
        ))
        }


      </Paper> */}



    </Container>
  );
}
