import React, { useState, useEffect } from 'react';
import navbar from './navbar.css'
import { AppBar, Typography, Toolbar, Avatar, Button, TextField, colors } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { getPostsBySearch } from '../../actions/posts';
import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';
import ChipInput from 'material-ui-chip-input';
import bloggerstop from '../../images/blooger.gif'




const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const classes = useStyles();

  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const history = useHistory();


  function useQuery() {
    return new URLSearchParams(useLocation().search);
  };

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
      history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      history.push('/');
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    history.push('/auth');

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));



  return (
    <nav className="navbar navbar-expand-lg bg-light bg-opacity-75 border border-dark" style={{ marginBottom: "30px", borderRadius: "10px", marginTop:"5px" }} >
      <div className="container-fluid" >
        <Link className="navbar-brand" to="/"><img style={{height:'80px', width:'150px', marginTop:"-10px",marginBottom:'-10px', marginLeft:'-10px',marginRight:'-5px' , borderRadius:'50px' }} src={bloggerstop} /></Link>
        {user?.result ? (
          <div className={classes.showedprofile}>
            <div className={classes.profile} >
              <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
              <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
            </div>
          </div>
        ) : ""}
        <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon " style={{ width: "15px", height: "15px" }} ></span>
        </button>

        <span className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">

            </li>
          </ul>

          
          {!(user?.result) ?
            (<Link to="/auth"> <button className='btn btn-outline-dark ' style={{ marginRight: '10px', marginBottom:'10px', marginTop:'10px' , backgroundColor:"#FFC0CB"}}>Sign In</button></Link>)
            : (<button className='btn btn-outline-danger  ' onClick={logout} style={{ marginRight: '10px', marginBottom:'10px', marginTop:'10px' }} >Logout</button>)
          }
          <div style={{width:'250px', marginRight:'10px', height:'47px',border:'1px solid' , borderRadius:'5px', marginBottom:'10px',marginTop:'10px', backgroundColor:'#B8B8B8'}}>
           <TextField className={classes.textField}
            style={{width:'95%',marginLeft:'10px', marginTop:'-2px'}}
            onKeyDown={handleKeyPress}
            name="search"
            label="Search Post"
            onChange={(e) => setSearch(e.target.value)} />
            </div>
  
          <div style={{border:'1px solid', width:'250px' ,marginRight:'10px',marginBottom:'10px',marginTop:'10px', borderRadius:'5px', height:'47px',backgroundColor:'#B8B8B8'}}>
           <ChipInput
            style={{width:'95%',marginLeft:'10px',marginTop:'-10px', height:'-1px'}}
            value={tags}
            onAdd={(chip) => handleAddChip(chip)}
            onDelete={(chip) => handleDeleteChip(chip)}
            label="Search Tags"
            />
            </div>
            <div style={{marginTop:'-2px'}}>
          <button className='btn btn-outline-dark bg-info' onClick={searchPost} >Search</button>
          </div>
        </span>
        </div>
    </nav >
  );
};

export default Navbar;
