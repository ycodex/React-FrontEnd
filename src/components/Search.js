import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container, Paper, Button, AppBar } from '@material-ui/core';
import TweetService from '../services/TweetService';
import Appbar from './Appbar';
import { useNavigate } from 'react-router';
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),

        },
    },
}));

export default function Search() {
    const paperStyle = { padding: '20px 20px', width: 1000, margin: "20px auto" }
    const [user, setUser] = useState('')
    const [error, setError] = useState('')
    const [users, setUsers] = useState('')
    const userId = localStorage.getItem('userId')
    const classes = useStyles();
    const navigate = useNavigate();

    

    const handleSearch = (e) => {
        e.preventDefault()
        
        TweetService.searchUsers(userId).then(res => {
            setUser(res.data)
            console.log(res.data)
            navigate('/search')
        }).catch(e => {
            console.log(e)
            setError('Error while posting tweet, Try again')
        })

    }
    

    
    return (


        <div className="home">
            {/* Add Tweet */}
            <Appbar />
            <Paper elevation={3} style={paperStyle} >
                <h1 style={{ color: "blue" }}><u>Search Users</u></h1>

                <form className={classes.root} noValidate autoComplete="off">

                    <TextField id="outlined-multiline-static"
                        variant="outlined" fullWidth
                        multiline
                        rows={1}
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                    />
                    <br />
                    <Button variant="contained" color="secondary" onClick={handleSearch}>
                        Search Users
                    </Button>
                </form>
                <div className="form-group">
                    <span className="error" value={error}></span>
                </div>
            </Paper>
            {/* Display Tweet */}
            <Paper elevation={3} style={paperStyle}>
                <h1>Search Results</h1>
               
                    <Paper elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left" }} key={user.id}>
                        {user.firstName}  {user.lastName}<br />
                        {user.email} <br />
                    </Paper>
                


            </Paper>
        </div>
    );
}
