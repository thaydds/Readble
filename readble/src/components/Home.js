import React, {Component} from 'react';
import PostCard from './PostCard'
import { connect } from 'react-redux'
import {handleInitialData, deletePost, votePost} from '../actions/posts'
import Grid from '@material-ui/core/Grid'
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { fetchCategories} from '../actions/categories'

class Home extends Component {

  state={
    listByDate : false
  }

  componentDidMount(){
    this.props.fetchPosts()
    this.props.fetchCategories()
  }
  
  ordemData = list => {
    return list.sort((a, b) => b.timestamp - a.timestamp);
  };
  

  render() {
    if( this.props.posts.lista ) {

      let listaOrdenada = this.props.posts.lista.map(l => l)
      this.ordemData(listaOrdenada)
      let listaDefault = this.props.posts.lista
      
      if(this.state.listByDate){
       listaDefault = listaOrdenada;
      }
          return(
            <div>
              <Grid style={{marginTop:'5rem'}} >
                <Button onClick={()=> this.setState({listByDate: !this.state.listByDate})} variant="contained" color="primary" >List by Date</Button>
                {Object.values(this.props.categories).map(c => {
                  return <Button component={Link} to={`/${c.name}`} key={c.name} onClick={()=> this.props.fetchPosts(c.name)} variant="contained" color="secondary" >{c.name}</Button>
                })}
               <Button component={Link} to={`/`}  onClick={()=> this.props.fetchPosts()} variant="contained" color="secondary" >ALL</Button>

              {listaDefault.map ( post => {
                return (
                  <Grid style={{margin: '8px auto'}} key={post.id} item xs={12} md={12} lg={5}>
                    <PostCard votePost={this.props.votePost} deletePost={this.props.deletePost}  post={post} />
                </Grid>
                )
              })}
              <Fab component={Link} to="/add" style={{position: 'fixed',
                            bottom: '5px',
                            right: '5px',
                            margin: '8px auto'}} color='primary'>
                            <AddIcon />
                </Fab>
              </Grid>
            </div> 
          )

      } else {
        return "Vazio"
      }
  }
}

function mapStateToProps ({ posts, categories }) {
  return {
    posts: posts,
    categories: categories
  }
}

const mapDispatchToProps = dispatch => ({
  fetchPosts: category => dispatch(handleInitialData(category)),
  deletePost: id => dispatch(deletePost(id)),  
  votePost: (id, option) => dispatch(votePost(id, option)),
  fetchCategories: () => dispatch(fetchCategories())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)((Home))
