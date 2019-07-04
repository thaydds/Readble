import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { IconButton} from '@material-ui/core'
import PageView from '@material-ui/icons/Pageview'
import Up from '@material-ui/icons/ThumbUpAlt'
import Down from '@material-ui/icons/ThumbDownAlt'
import Delete from '@material-ui/icons/Delete'
import Comment from '@material-ui/icons/Comment'
import Edit from '@material-ui/icons/Edit'
import {Link} from 'react-router-dom'

const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function PostCard(props) {
  const classes = useStyles();
  const { post } = props
  
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {post.category}
        </Typography>
        <Typography variant="h5" component="h2">
          {post.title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {post.author}
        </Typography>
        <Typography variant="body2" component="p">
         {post.body}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton onClick={()=>{props.votePost(post.id, "upVote")}} style={{color:'green'}}>
          <Up />
        </IconButton>
        <Typography variant="body2" component="p">
         {post.voteScore}
        </Typography>
        <IconButton onClick={()=>{props.votePost(post.id, "downVote")}} style={{color:'red'}}>
          <Down />
        </IconButton>
        <IconButton component={Link} to={`/edit/${post.id}`} color="primary" aria-label="edit">
          <Edit /> 
        </IconButton>
        <IconButton component={Link} to={`/${post.category}/${post.id}`} color="primary" aria-label="edit">
          <PageView /> 
        </IconButton>
        <IconButton onClick={()=>props.deletePost(post)} style={{color:'red'}}>
          <Delete  />
        </IconButton>
        <IconButton color='primary'>
          <Comment  />
        </IconButton>
        <span>{post.commentCount ? post.commentCount : 0}</span>
      </CardActions>
    </Card>
  );
}

export default PostCard;
