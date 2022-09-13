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

export default function Tweet() {
    const paperStyle = { padding: '20px 20px', width: 1000, margin: "20px auto" }
    const [error, setError] = useState('')
    const [tweet, setTweet] = useState('')
    const [replies, setReplies] = useState([])
    const [reply, setReply] = useState('')
    const userId = localStorage.getItem('userId')
    const tweetId = localStorage.getItem('tweetId')
    const classes = useStyles();
    const navigate = useNavigate();

    const handleReply = (e) => {
        e.preventDefault()
        const r = { reply }
        console.log(r)
        TweetService.postReply(userId, tweetId,r).then(res => {
            navigate('/tweet')
        }).catch(e => {
            console.log(e)
            setError('Error while posting tweet, Try again')
        })

    }
    const handleDelete = (e) => {
        e.preventDefault()
        
        TweetService.deleteTweet(userId, tweetId).then(res => {
            navigate('/home')
        }).catch(e => {
            console.log(e)
            setError('Error while posting tweet, Try again')
        })

    }
    const handleUpdate = (e) => {
        e.preventDefault()
        const t={tweet}
        console.log(t);
        TweetService.updateTweet(userId, tweetId,t).then(res => {
            navigate('/tweet')
        }).catch(e => {
            console.log(e)
            setError('Error while posting tweet, Try again')
        })

    }

    const handleLike = (e) => {
        e.preventDefault()
        TweetService.likeTweet(userId, tweetId).then(res => {
            navigate('/tweet')
        }).catch(e => {
            console.log(e)
            setError('Error while posting tweet, Try again')
        })

    }
    const handleBack = (e) => {
        localStorage.removeItem('tweetId')
        navigate('/home')
    }
    useEffect(() => {

        console.log(tweetId)

        TweetService.getTweetById(tweetId).then(res => {
            console.log(res.data);
            setTweet(res.data);
            console.log(res.data.reply);
            if (res.data.reply != null) {
                setReplies(res.data.reply);
            }
            console.log(tweet)
            //localStorage.removeItem('tweetId')
        }).catch(e => {
            console.log(e);
            setError('Error while posting tweet, Try again')
        })
    }, [])
    return (


        <div className="tweet">
            <Appbar />

            {/* Display Tweet */}
            <Paper elevation={3} style={paperStyle}>


                <Paper elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left" }} key={tweet.id}>
                    <h4>{tweet.firstName}  {tweet.lastName}</h4><br />
                    <TextField id="outlined-multiline-static"
                        variant="outlined" fullWidth
                        multiline
                        rows={2}
                        value={tweet.tweet}
                        onChange={(e) => setTweet(e.target.value)}
                    />
                    <br />
                    <h5>{tweet.date}        Likes: {tweet.likes} </h5>
                    <Button variant="contained" color="secondary" onClick={handleUpdate}>
                            Update
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleLike}>
                            Like
                    </Button>
                    {replies.map(r => (
                        <Paper elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left" }} >
                            <h4>{r.reply} </h4><br />
                            <h3>{r.hashtag}</h3> <br />
                            <h5>{r.date}   </h5>

                            
                        </Paper>
                    ))}
                    <form className={classes.root} noValidate autoComplete="off">

                        <TextField id="outlined-multiline-static"
                            label="Reply Here!!"
                            variant="outlined" fullWidth
                            multiline
                            rows={1}
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
                        />
                        <br />
                        <Button variant="contained" color="secondary" onClick={handleReply}>
                            Reply
                        </Button>
                    </form>
                    

                    <Button variant="contained" color="secondary" onClick={handleDelete}>
                        Delete Tweet
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleBack}>
                        Go Back
                    </Button>

                </Paper>




            </Paper>
        </div>
    );
}
