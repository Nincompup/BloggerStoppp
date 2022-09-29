import React, { useState} from 'react';
import { Container,Grid } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';


import PostDetails from './components/PostDetails/PostDetails';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import CreatorOrTag from './components/CreatorOrTag/CreatorOrTag';
import Form from './components/Form/Form';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [currentId, setCurrentId] = useState(0);

  

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/posts" />} />
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/search" exact component={Home} />
          <Route path="/posts/:id" exact component={PostDetails} />
          <Route path={['/creators/:name', '/tags/:name']} component={CreatorOrTag} />
          <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />
          <Route path="/createpost">
          <Grid item xs={12} sm={6} md={3} style={{ maxWidth:'400px' ,margin:'auto'}}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
          </Route>
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
