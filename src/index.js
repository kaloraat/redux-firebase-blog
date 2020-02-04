import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import LoadingComponent from './containers/LoadingComponent';
import PostDetail from './containers/PostDetail';
import Admin from './containers/Admin';
import PostEdit from './containers/PostEdit';
import PostCreate from './containers/PostCreate';
import Login from './containers/Login';
import Header from './routes/header';

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

export const Whoops404 = () => (
    <div>
        <h1>Whoops, resource not found</h1>
        <p>Could not find {window.location.pathname}</p>
    </div>
);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                {/*<ul>
                    <li>
                        <Link to="/">Home</Link>
                        <Link to="/admin">Admin</Link>
                        <Link to="/login">Login</Link>
                    </li>
                </ul>*/}
                <Header />
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/create" component={PostCreate} />
                    <Route exact path="/edit/:id" component={PostEdit} />
                    <Route exact path="/admin" component={Admin} />
                    <LoadingComponent>
                        <Route exact path="/:id" component={PostDetail} />
                        <Route exact path="/" component={App} />
                    </LoadingComponent>
                    <Route component={Whoops404} />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
