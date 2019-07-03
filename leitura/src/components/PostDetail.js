import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import Divider from '@material-ui/core/Divider'
import {withRouter} from 'react-router-dom'
import {  fetchPost, deletePost,votePostDetail} from '../actions/posts'
import { connect } from 'react-redux'
import FavoriteIcon from '@material-ui/icons/Favorite'
import Edit from '@material-ui/icons/Edit'
import Delete from '@material-ui/icons/Delete'
import Fab from '@material-ui/core/Fab'
import ArrowBack from '@material-ui/icons/ArrowBack'
import Up from '@material-ui/icons/ThumbUpAlt'
import Down from '@material-ui/icons/ThumbDownAlt'
import CardDetails from './CardDetails'
import Comments from './Comment'
import {Link} from 'react-router-dom'


const styles = theme => ({
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
    marginTop: 100
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
  },
  addUser: {
    marginRight: theme.spacing(1),
  },
  contentWrapper: {
    margin: '40px 16px',
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
});

class PostDetail extends Component {

  componentWillMount(){
    const pathArray = window.location.pathname.split('/');
    const param = pathArray[pathArray.length - 1];
    
      this.props.fetchPost(param)
    
  }

  render(){
    const { classes } = this.props;
    
      console.log(' Post', this.props.posts.post)

      return (
        <div>
          {this.props.posts.post ? 
          
          <Paper className={classes.paper}>
          <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
            <Toolbar>
              <Grid container spacing={2} alignItems="center">
                  <Grid item>
                  <Typography color="textSecondary" align="center">
                  {this.props.posts.post.category}
                </Typography>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <div className={classes.contentWrapper}>
            <Typography color="primary" align="center">
           { this.props.posts.post.title}
            </Typography>
            <Typography  align="center">
             {`by: ${this.props.posts.post.author}`}
            </Typography>
            <div>
              <IconButton onClick={()=>{this.props.votePost(this.props.posts.post.id, "upVote")}} style={{color:'green'}} className={classes.button} aria-label="Delete">
                <Up />
              </IconButton>
              <span>{this.props.posts.post.voteScore}</span>
              <IconButton onClick={()=>{this.props.votePost(this.props.posts.post.id, "downVote")}} style={{color:'red'}} className={classes.button} aria-label="Delete"  color="primary">
                <Down />
              </IconButton>
              <IconButton component={Link} to={`/edit/${this.props.posts.post.id}`} color="primary" aria-label="edit">
                <Edit /> 
              </IconButton>
              <IconButton component={Link} to={`/`} onClick={()=>this.props.deletePost(this.props.posts.post)} style={{color:'red'}}>
                <Delete  />
              </IconButton>
            </div>
            <Divider></Divider>
            <Typography variant='body2' align="center">
              {this.props.posts.post.body}
            </Typography>
          </div>
        </Paper> : ''}
        <Fab component={Link} to='/' style={{position: 'fixed',
        bottom: '5px',
        left: '5px',
        margin: '8px auto'}} color='primary'>
        <ArrowBack />
        </Fab>
        <Grid>
          <Comments />
        </Grid>
        </div>
        
      );
  }
}

function mapStateToProps ({ posts }) {
  return {
    posts: posts,
  }
}

const mapDispatchToProps = dispatch => ({
  fetchPost: id => dispatch(fetchPost(id)),
  deletePost: id => dispatch(deletePost(id)),  
  votePost: (id, option) => dispatch(votePostDetail(id, option)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter( withStyles(styles)(PostDetail)))

