import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import handleGetInitialData from '../actions/shared';
import LoadingBar from 'react-redux-loading';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import QDetail from './QDetail';
import NewQuestion from './NewQuestion';
import Leaderboard from './Leaderboard';
import NewUser from './NewUser';
import UserProfile from './UserProfile';
import NotFound from './NotFound';
import ItemNotFound from './ItemNotFound';
import CssBaseline from '@material-ui/core/CssBaseline';

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleGetInitialData());
    }
    render() {
        const {loading} = this.props;

        return (
            <BrowserRouter>
                <Fragment>
                    <CssBaseline />
                    <LoadingBar/>
                    <div className="container" >
                      {
                          loading===true ?
                              null :
                              <Switch>
                                  <Route exact path='/' component={Login}/>
                                  <Route path='/home' component={Home}/>
                                  <Route path='/questions/:id' component={QDetail}/>
                                  <Route path='/add' component={NewQuestion}/>
                                  <Route path='/leaderboard' component={Leaderboard}/>
                                  <Route path='/register' component={NewUser}/>
                                  <Route path='/users/:id' component={UserProfile}/>
                                  <Route path='/404' component={ItemNotFound} />
                                  <Route path="*" component={NotFound} />
                              </Switch>
                      }
                    </div>
                </Fragment>
            </BrowserRouter>
        );
    }
}

function mapStateToProps({users}) {
    return {
        loading: users===null
    }
}

export default connect(mapStateToProps)(App);
