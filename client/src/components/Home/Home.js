import React, { useState } from 'react';
import { Container, Grow, Grid, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation, Link } from 'react-router-dom';


import { getPostsBySearch } from '../../actions/posts';
import Posts from '../Posts/Posts';

import Pagination from '../Pagination';
import useStyles from './styles';

import './composeimage.css'

import compose from './compose.png';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Home = () => {

  const classes = useStyles();
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');

  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const history = useHistory();

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
      history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      history.push('/');
    }
  };


  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} sm={6} md={12}>
            <Posts setCurrentId={setCurrentId} />
            <div className="image-container">
              <Link to="/createpost" ><img src={compose} className="compose-img" style={{borderRadius:'50px' ,width:'150px', right:'30px' ,bottom:'10px', boxShadow:"0px 0px 10px #964B00"}} />
              </Link>
              
            </div>
            {(!searchQuery && !tags.length) && (
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>

      </Container>
    </Grow>
  );
};

export default Home;
