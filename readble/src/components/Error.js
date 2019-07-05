import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom'

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

class Error extends Component {


  render(){
    const { classes } = this.props;
    
      return (
        <div>
          <Paper className={classes.paper}>
          <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
            <Toolbar>
              <Grid container spacing={2} alignItems="center">
                  <Grid item>
                  <Typography color="textSecondary" align="center">
                  ERROR 404
                </Typography>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <div className={classes.contentWrapper}>
            <Typography color="primary" align="center">
           PAGINA NAO ENCONTRADA
            </Typography>
          </div>
        </Paper>
        </div>
        
      );
  }
}


export default (withRouter( withStyles(styles)(Error)))

