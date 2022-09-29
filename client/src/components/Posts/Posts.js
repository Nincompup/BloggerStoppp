import React, { useState } from 'react';
import { Grid, CircularProgress, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useHistory, useLocation, Link } from 'react-router-dom';
import './togglebtn.css'



import Post from './Post/Post';
import useStyles from './styles';
import shadows from '@material-ui/core/styles/shadows';

const Posts = ({ setCurrentId }) => {
  const [temp, setTemp] = useState(false);
  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();


  if (!posts.length && !isLoading) return 'No posts';

  const toggleSorting = () => {
    if (temp === true) {
      setTemp(false);
    }
    else {
      setTemp(true);
    }
  }

  return (
    <>

    <div style={{ display:'flex', marginBottom:'50px', backgroundColor:"rgba(185, 175, 175, 0.9)", padding:"10px" , width:"170px", boxShadow:"0px 0px 5px #000000", borderRadius: "50px", marginLeft: "-30px"}}>
      <label className="heart-switch" style={{marginBottom:'10px', marginRight:'10px'}}>
        <input type="checkbox" onClick={toggleSorting} />
        <svg viewBox="0 0 33 23" fill="b">
          <path d="M23.5,0.5 C28.4705627,0.5 32.5,4.52943725 32.5,9.5 C32.5,16.9484448 21.46672,22.5 16.5,22.5 C11.53328,22.5 0.5,16.9484448 0.5,9.5 C0.5,4.52952206 4.52943725,0.5 9.5,0.5 C12.3277083,0.5 14.8508336,1.80407476 16.5007741,3.84362242 C18.1491664,1.80407476 20.6722917,0.5 23.5,0.5 Z"></path>
        </svg>
      </label>
       <b>Sort by likes</b>
      </div>
      

      {isLoading ? <CircularProgress /> :
        (temp ?
          (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
              {posts?.sort((a, b) => a.likes.length > b.likes.length ? -1 : 1).map((post) => (
                <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                  <Post post={post} setCurrentId={setCurrentId} />
                </Grid>
              ))}
            </Grid>
          ) :
          (<Grid className={classes.container} container alignItems="stretch" spacing={3}>
            {posts?.sort((a, b) =>
              new Date(b.createdAt) - new Date(a.createdAt)).map((post) => (
                <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                  <Post post={post} setCurrentId={setCurrentId} />
                </Grid>
              ))}
          </Grid>)
        )}
    </>
  );

};

export default Posts;
