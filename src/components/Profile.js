import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container, Paper, Button, AppBar, Avatar } from '@material-ui/core';
import TweetService from '../services/TweetService';
import Appbar from './Appbar';
import { useNavigate } from 'react-router';
import { Password } from '@mui/icons-material';
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),

        },
    },
}));
function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}
export default function Profile() {
    const paperStyle = { padding: '20px 20px', width: 1000, margin: "20px auto" }
    const [tweets, setTweets] = useState([])
    const [error, setError] = useState('')
    const [user, setUser] = useState('')
    const [passwd,setPasswd] = useState('')
    const userId = localStorage.getItem('userId')
    const classes = useStyles();
    const navigate = useNavigate();

    const handlePassword=(e)=>{
        e.preventDefault()
        console.log(userId)
        console.log(passwd)
        TweetService.forgotPassword(userId, passwd).then(res => {
            navigate('/profile')
        }).catch(e => {
            console.log(e)
            setError('Error while posting tweet, Try again')
        })

    }

    useEffect(() => {

        console.log(userId)

        TweetService.getUserDetails(userId).then(res => {
            console.log(res.data);
            setUser(res.data);
        }).catch(e => {
            setError('Error fetching details')
        })

        TweetService.getUserTweets(userId).then(res => {
            console.log(res.data);
            setTweets(res.data)
        }).catch(e => {
            setError('Error fetching details')
        })
    }, [])
    const fullname = user.firstName + " " + user.lastName
    return (


        <div className="home">
            {/* Add Tweet */}
            <Appbar />
            <Paper elevation={3} style={paperStyle} >
                <Avatar {...stringAvatar(fullname)} />
                <h1 style={{ color: "blue" }}><u>{user.firstName} {user.lastName}</u></h1>
                <div className="form-group">
                    <span className="error">{ }</span>
                </div>
                Forgot Password? Enter a new one here
                <TextField id="outlined-multiline-static"
                    label="password"
                    variant="outlined" fullWidth
                    multiline
                    rows={1}
                    value={passwd}
                    onChange={(e) => setPasswd(e.target.value)}
                />

                <br />
                <Button variant="contained" color="secondary" onClick={handlePassword}>
                    Change Password
                </Button>
            </Paper>
            {/* Display Tweet */}
            <Paper elevation={3} style={paperStyle}>
                <h1>All Tweets</h1>
                {tweets.map(tweet => (
                    <Paper elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left" }} key={tweet.id}>
                        Id:{tweet.id}<br />
                        Name:{tweet.tweet}<br />
                        Address:{tweet.date}

                    </Paper>
                ))
                }


            </Paper>
        </div>
    );
}
