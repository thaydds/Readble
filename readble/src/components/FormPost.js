import React, {Component} from 'react';
import { connect } from 'react-redux'
import { addPost, fetchPost, editPost} from '../actions/posts'
import Grid from '@material-ui/core/Grid'
import AddIcon from '@material-ui/icons/Add';
import Edit from '@material-ui/icons/Edit';
import ArrowBack from '@material-ui/icons/ArrowBack';
import {fetchCategories} from '../actions/categories'
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import uuid from "uuid";
import {withRouter, Link} from 'react-router-dom'


class FormPost extends Component {
  state = {
    author: '',
    title: '',
    body: '',
    category: 'react',
    id: uuid.v4()
  }

  handleChange = (e, input) => {
    this.setState({
      [input]: e.target ? e.target.value : e
    });
  }

  handleSubmit = () => {
    this.props.addPost(this.state)
  }

  handleSubmitEdit = () => {
    this.props.editPost(this.state)
  }

  componentWillMount(){
    this.props.fetchCategories()
    const pathArray = window.location.pathname.split('/');
    const param = pathArray[pathArray.length - 1];
    if(param !== 'add'){
      this.props.fetchPost(param).then(()=> {
          this.updateForm()
      })
    }
  }

  updateForm(){
    this.setState({
      author:this.props.posts.post.author ?this.props.posts.post.author : '',
      title:this.props.posts.post.title ?this.props.posts.post.title : '',
      body:this.props.posts.post.body ?this.props.posts.post.body : '',
      category:this.props.posts.post.category ?this.props.posts.post.category : '',
      id: this.props.posts.post.id
    })
  }

  render() {
    const { title, author, body, category} = this.state
    const pathArray = window.location.pathname.split('/');
    const param = pathArray[pathArray.length - 1]; 
    return(
      <div>
        <Grid >
        <Grid  style={{margin: '8px auto',  marginTop: 100}} item sm={12} lg={7}>
        <TextField
          id="outlined-name"
          label="Author"
          //className={classes.textField}
          value={author}
          //onChange={handleChange('name')}
          onChange={e => this.handleChange(e, "author")}
          margin="normal"
          variant="outlined"
          fullWidth
          
        />
    </Grid>
    <Grid  style={{margin: '8px auto'}} item sm={12} lg={7}>
        <TextField
          id="outlined-name"
          label="Title"
          onChange={e => this.handleChange(e, "title")}
          //className={classes.textField}
          value={title}
          //onChange={handleChange('name')}
          margin="normal"
          variant="outlined"
          fullWidth
         
        />
    </Grid>
    <Grid  style={{margin: '8px auto'}} item sm={12} lg={7}>
    <TextField
        id="outlined-multiline-static"
        label="Body"
        multiline
        fullWidth
        onChange={e => this.handleChange(e, "body")}
        rows="4"
        value={body}
        //defaultValue="Default Value"
        //className={classes.textField}
        margin="normal"
        variant="outlined"
      />
    </Grid>    
    <Grid style={{margin: '8px auto'}} item sm={12} lg={7}>
    <TextField
        id="outlined-select-currency-native"
        select
        onChange={e => this.handleChange(e, "category")}
       // className={classes.textField}
       // value={values.currency}
        //onChange={handleChange('currency')}
        SelectProps={{
          native: true,

        }}
        value={category}
        margin="normal"
        variant="outlined"
      >
        {Object.values(this.props.categories).map(option => (
          <option key={option.name} value={option.name}>
            {option.name}
          </option>
        ))}
    </TextField>
    
    </Grid>
        </Grid>
        {
          param !== 'add'? 
          <Fab style={{position: 'absolute',
          bottom: '5px',
          right: '5px',
          margin: '8px auto'}} color='primary' onClick={this.handleSubmitEdit}>
          <Edit />
</Fab> :
<Fab style={{position: 'absolute',
 bottom: '5px',
 right: '5px',
 margin: '8px auto'}} color='primary' onClick={this.handleSubmit}>
 <AddIcon />
</Fab>
        }
       
       <Fab component={Link} to='/' style={{position: 'absolute',
        bottom: '5px',
        left: '5px',
        margin: '8px auto'}} color='primary'>
        <ArrowBack />
        </Fab>
      </div> 
    )
  }
}

function mapStateToProps ({ posts, categories }) {
  return {
    posts: posts,
    categories: categories
  }
}

const mapDispatchToProps = dispatch => ({
  addPost: post => dispatch(addPost(post)),
  fetchPost: id => dispatch(fetchPost(id)),
  editPost: id => dispatch(editPost(id)),
  fetchCategories: () => dispatch(fetchCategories())
  
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(FormPost))