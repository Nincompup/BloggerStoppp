import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';


export default makeStyles((theme) => ({
 
  heading: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    fontSize: '2em',
    fontWeight: 300,
  },
  image: {
    marginLeft: '10px',
    marginTop: '5px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },
  },
  profile: {
    display: 'contents',
    justifyContent: 'space-between',
    width: '400px',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      width: 'auto',
      marginTop: 20,
      justifyContent: 'center',
    },
  },
  logout: {
    // marginLeft: '20px',
    // marginRight:'-120px'
  },
  createpost: {
    // width:'200px',
    // marginRight:'15px',
    // marginLeft:'-50px'
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    marginLeft:'-6px',
    marginRight:'10px'
    // height:'40px',
    // width:'40px'

  },
  text:{
    fontSize: '18px',
    color:'#000',
    fontWeight:'50px',
    marginLeft:'10px'

  },

  appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'inline',
    padding: '16px',
  },
 
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },

  showedprofile:{
    display:'flex',
  [theme.breakpoints.down('xs')]: {
     display:'flex',
     flexDirection: 'column',
     alignItems: 'center',
  },
},
}));
