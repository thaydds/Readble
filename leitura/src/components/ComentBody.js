import React, {Component} from 'react'
import Delete from '@material-ui/icons/Delete'
import Edit from '@material-ui/icons/Edit'
import Up from '@material-ui/icons/ThumbUpAlt'
import Down from '@material-ui/icons/ThumbDownAlt'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button';

class ComentBody extends Component {
  state = {
    isEdit: false,
    newBody: ''
  }
  render() {
    let c = this.props.c
    console.log('isEdit', this.state)
    
    return(
      <div>
      <Typography >
        {c.author ? `${c.author} says:` : `Anonymous says:` }
      </Typography>
      {this.state.isEdit ? <Grid  style={{margin: '8px auto'}} item sm={12} lg={7}>
      <TextField
          id="outlined-multiline-static"
          label="Body"
          multiline
          fullWidth
          onChange={(e)=> this.setState({
            newBody: e.target.value
          })}
          rows="4"
          value={this.state.newBody}
          //defaultValue="Default Value"
          //className={classes.textField}
          margin="normal"
          variant="outlined"
        />
        <Button onClick={()=> this.setState({isEdit: false})} variant="contained" color="primary">
        Edit
      </Button>
      <Button onClick={()=>{
        c.body = this.state.newBody
        this.props.editComment(c).then( ()=> this.setState({isEdit: false}) )
        
      } } variant="contained" color="secondary">
        Cancel
      </Button>
       
      </Grid>     :
      <div>
        <Typography  color="textSecondary">
      {c.body}
    </Typography>
    <IconButton onClick={()=>{this.props.voteComment(c.id, "upVote")}}  style={{color:'green'}} aria-label="Add to favorites">
      <Up />
    </IconButton>
    <span>{c.voteScore}</span>
    <IconButton onClick={()=>{this.props.voteComment(c.id, "downVote")}}  style={{color:'red'}} aria-label="Add to favorites">
      <Down />
    </IconButton>
    <IconButton onClick={()=> this.setState({isEdit: true})} color="primary" aria-label="edit">
      <Edit /> 
    </IconButton>
    <IconButton onClick={()=>{
      delete c.isEdit
      this.props.deleteComment(c)}}   style={{color:'red'}} aria-label="Add to favorites">
      <Delete  />
    </IconButton>
      </div>
      }
      <Divider></Divider>       
</div>
    )
  }
}

export default ComentBody