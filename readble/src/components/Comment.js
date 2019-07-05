import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom'
import { fetchComments, addComment, deleteComment, voteComment, editComment} from '../actions/comments'
import { addCountComment, subCountComment} from '../actions/posts'
import { connect } from 'react-redux'
import CommnetBody from './ComentBody'





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

class Comment extends Component {

  state={
    author: 'Anonimous',
    body: '',
    parentId: ''
  }

  componentWillMount(){
    const pathArray = window.location.pathname.split('/');
    const param = pathArray[pathArray.length - 1];
    this.setState({
      parentId: param
    })
    this.props.fetchComments(param)
  }

  render(){
    const { classes } = this.props;

    const commentList = Object.values(this.props.comments).map(c => {
      let aux =  Object.assign({isEdit: false}, c)
     
      return aux
    })
      return (
        <Paper className={classes.paper}>
          <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
            <Toolbar>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                  <TextField
                    fullWidth
                    onChange={(e)=> this.setState({
                      body: e.target.value
                    })}
                    value={this.state.body}
                    placeholder="Adicione um comentario"
                    style={{backgroundColor: 'white'}}
                    InputProps={{
                      disableUnderline: true,
                      className: classes.searchInput,
                    }}
                  />
                </Grid>
                <Grid item>
                  <Button onClick={() => {
                    if(this.state.body !== '') {
                      this.props.addComment(this.state)
                      this.props.addCountComment(this.props.post)
                    }
                  }} variant="contained" color="primary" className={classes.addUser}>
                    Add Comment
                  </Button>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar> 
          {
            Object.keys(this.props.comments).length > 0 ?
            commentList.map( c => {
              return  <div  key={c.id} className={classes.contentWrapper}>
                  <CommnetBody 
                  subCountComment={this.props.subCountComment}
                  voteComment={this.props.voteComment} 
                  deleteComment={this.props.deleteComment}
                  editComment={this.props.editComment}
                  c = {c}
                  post = {this.props.post}
                  />
              </div>
            })
             :
           <Typography  color="textSecondary">
            NO COMMENTS
         </Typography>
          }     
         
        </Paper>     
      );
  }
}

function mapStateToProps ({ comments }) {
  return {
    comments: comments,
  }
}

const mapDispatchToProps = dispatch => ({
  fetchComments: id => dispatch(fetchComments(id)),
  addCountComment: id => dispatch(addCountComment(id)),
  subCountComment: id => dispatch(subCountComment(id)),
  addComment: comment => dispatch(addComment(comment)),
  deleteComment: comment => dispatch(deleteComment(comment)),
  voteComment: (id, option) => dispatch(voteComment(id, option)),
  editComment: comment => dispatch(editComment(comment)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter( withStyles(styles)(Comment)))

