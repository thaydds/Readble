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
import { fetchComments, addComment, deleteComment, voteComment, editComment} from '../actions/comments'
import { connect } from 'react-redux'
import FavoriteIcon from '@material-ui/icons/Favorite'
import Edit from '@material-ui/icons/Edit'
import Up from '@material-ui/icons/ThumbUpAlt'
import Down from '@material-ui/icons/ThumbDownAlt'
import CardDetails from './CardDetails'
import {Link} from 'react-router-dom'
import Delete from '@material-ui/icons/Delete'
import PageView from '@material-ui/icons/Pageview'
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
    console.log('state', this.state)
    const { classes } = this.props;

    const commentList = Object.values(this.props.comments).map(c => {
      let aux =  Object.assign({isEdit: false}, c)
     
      return aux
    })
    console.log('dasd', commentList)
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
                    InputProps={{
                      disableUnderline: true,
                      className: classes.searchInput,
                    }}
                  />
                </Grid>
                <Grid item>
                  <Button onClick={() => this.props.addComment(this.state)} variant="contained" color="primary" className={classes.addUser}>
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
                  voteComment={this.props.voteComment} 
                  deleteComment={this.props.deleteComment}
                  editComment={this.props.editComment}
                  c = {c}
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
  addComment: comment => dispatch(addComment(comment)),
  deleteComment: comment => dispatch(deleteComment(comment)),
  voteComment: (id, option) => dispatch(voteComment(id, option)),
  editComment: comment => dispatch(editComment(comment)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter( withStyles(styles)(Comment)))

