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

export default function Login() {
    const paperStyle = { padding: '20px 20px', width: 1000, margin: "20px auto" }
    const [tweets, setTweets] = useState([])
    const [error, setError] = useState('')
    const [tweet, setTweet] = useState('')
    const userId = localStorage.getItem('userId')
    console.log(userId)
    const classes = useStyles();
    const navigate = useNavigate();

    function handleShowTweet(tweetId) {

        localStorage.setItem('tweetId', tweetId);
        navigate('/tweet');

    }

    const handleAddTweet = (e) => {
        e.preventDefault()
        const t = { tweet }
        console.log(t)
        TweetService.addTweet(userId, t).then(res => {
            navigate('/home')
        }).catch(e => {
            console.log(e)
            setError('Error while posting tweet, Try again')
        })

    }
    

    useEffect(() => {

        console.log(userId)

        TweetService.getAllTweets().then(res => {
            console.log(res.data);
            setTweets(res.data);
        }).catch(e => {
            setError('Error while posting tweet, Try again')
        })
    }, [])
    return (


        <div className="home">
            {/* Add Tweet */}
            <Appbar />
            <Paper elevation={3} style={paperStyle} >
                <h1 style={{ color: "blue" }}><u>Post Tweet</u></h1>

                <form className={classes.root} noValidate autoComplete="off">

                    <TextField id="outlined-multiline-static"
                        label="Tweet Here!!"
                        variant="outlined" fullWidth
                        multiline
                        rows={2}
                        value={tweet}
                        onChange={(e) => setTweet(e.target.value)}
                    />
                    <br />
                    <Button variant="contained" color="secondary" onClick={handleAddTweet}>
                        Post Tweet
                    </Button>
                </form>
                <div className="form-group">
                    <span className="error" value={error}></span>
                </div>
            </Paper>
            {/* Display Tweet */}
            <Paper elevation={3} style={paperStyle}>
                <h1>All Tweets</h1>
                {tweets.map(tweet => (
                    <Paper elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left" }} key={tweet.id}>
                        {tweet.firstName}  {tweet.lastName}<br />
                        {tweet.tweet} <br />
                        {tweet.date}  Likes: {tweet.likes} &nsbp;
                        <Button variant="contained" color="secondary" onClick={()=>handleShowTweet(tweet.id)}>
                            Show Tweet
                        </Button>
                    </Paper>
                ))
                }


            </Paper>
        </div>
    );
}
