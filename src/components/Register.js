import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container, Paper, Button, FormHelperText } from '@material-ui/core';
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

export default function Register() {
  const paperStyle = { padding: '50px 20px', width: 600, margin: "20px auto" }
  const [firstName, setfirstName] = useState('')
  const [lastName, setlastName] = useState('')
  const [email, setemail] = useState('')
  const [passwd, setPasswd] = useState('')
  const [contactNo, setContact] = useState('')
  const [error, setError] = useState('')
  const classes = useStyles();
  const navigate=useNavigate();
  const handleClick = (e) => {
    e.preventDefault()
    const loginID=email
    const user = { firstName,lastName,email,loginID,passwd,contactNo }
    console.log(user)
    TweetService.registerUser(user).then(res=>{
        console.log(res.status)
       if(res.status!=200){
           console.log("error")
           setError('Email id already present')
       } else{
        console.log(res.data)
        navigate('/')
       }
    }).catch(err=>{
      console.log(err)
      console.log("error")
        setError('Email id already present')
    })
  }

  return (

    <Container>
     
      <Paper elevation={3} style={paperStyle}>
        <h1 style={{ color: "blue" }}><u>Register User</u></h1>

        <form className={classes.root} noValidate autoComplete="off">

          <TextField id="outlined-basic" label="First Name" variant="outlined" 
            value={firstName}
            onChange={(e) => setfirstName(e.target.value)}
          />
          <TextField id="outlined-basic" label="Last Name" variant="outlined" 
            value={lastName}
            onChange={(e) => setlastName(e.target.value)}
          />
          <TextField id="outlined-basic" label="email" variant="outlined" 
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <TextField id="outlined-basic" label="password" variant="outlined" 
            value={passwd}
            onChange={(e) => setPasswd(e.target.value)}
          />
            <TextField id="outlined-basic" label="contact Number" variant="outlined" 
            value={contactNo}
            onChange={(e) => setContact(e.target.value)}
          />
          <br/>
          <FormHelperText>{error}</FormHelperText>
          <Button variant="contained" color="secondary" onClick={handleClick}>
            Submit
          </Button>
          
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
