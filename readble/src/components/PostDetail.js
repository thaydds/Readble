import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider'
import {withRouter} from 'react-router-dom'
import {  fetchPost, deletePost,votePostDetail, handleInitialData} from '../actions/posts'
import { connect } from 'react-redux'
import Edit from '@material-ui/icons/Edit'
import Delete from '@material-ui/icons/Delete'
import Fab from '@material-ui/core/Fab'
import ArrowBack from '@material-ui/icons/ArrowBack'
import Up from '@material-ui/icons/ThumbUpAlt'
import Down from '@material-ui/icons/ThumbDownAlt'
import Comments from './Comment'
import {Link} from 'react-router-dom'
import Comment from '@material-ui/icons/Comment'
import { Redirect } from 'react-router'





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
      this.props.fetchPosts()
    
  }

  render(){
    const { classes } = this.props;

   
    
  if(this.props.posts.post){
    console.log('KEYS', Object.keys(this.props.posts.post).length)
  }
    
      return (
        <div>
          {this.props.posts.post &&( Object.keys(this.props.posts.post).length > 0) ? 
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
              <IconButton color='primary'>
                <Comment  />
              </IconButton>
              <span>{this.props.posts.post.commentCount? this.props.posts.post.commentCount: 0}</span>
            </div>
            <Divider></Divider>
            <Typography variant='body2' align="center">
              {this.props.posts.post.body}
            </Typography>
          </div>
          <Fab component={Link} to='/' style={{position: 'fixed',
        bottom: '5px',
        left: '5px',
        margin: '8px auto'}} color='primary'>
        <ArrowBack />
        </Fab>
        <Grid>
          <Comments post={this.props.posts.post} />
        </Grid>
        </Paper> : this.props.posts.post &&( Object.keys(this.props.posts.post).length === 0) ? <Redirect to='/error' />: '' }
        
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
  fetchPosts: category => dispatch(handleInitialData(category)),
  deletePost: id => dispatch(deletePost(id)),  
  votePost: (id, option) => dispatch(votePostDetail(id, option)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter( withStyles(styles)(PostDetail)))

