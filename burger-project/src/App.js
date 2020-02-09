import React, { useEffect, Suspense } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Logout from '../src/containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import { connect } from 'react-redux';

const AsyncCheckout = React.lazy(() => import('./containers/Checkout/Checkout'));
const AsyncOrders = React.lazy(() => import('./containers/Orders/Orders'));
const AsyncAuth = React.lazy(() => import('./containers/Auth/Auth'));

function App(props) {
  const { onTryAutoSignUp } = props;

  useEffect(() => {
      onTryAutoSignUp();
  }, [props]);

  let routes = (
      <Switch>
          <Route path="/auth" render={(props) => <AsyncAuth {...props}/>}/>
          <Route path="/" exact component={BurgerBuilder}/>
          <Redirect to="/"/>
      </Switch>
  );

  if (props.isAuthenticated) {
      routes = (
          <Switch>
              <Route path="/checkout" render={(props) => <AsyncCheckout {...props}/>}/>
              <Route path="/orders" render={(props) =>  <AsyncOrders {...props}/> }/>
              <Route path="/logout" component={Logout}/>
              <Route path="/" exact render={(props) => <AsyncAuth {...props}/>}/>
              <Redirect to="/"/>
          </Switch>
      )
  }

  return (
      <div>
          <Layout>
              <Suspense fallback={<p>Loading...</p>}>
                {routes}
              </Suspense>
          </Layout>
      </div>
  );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignUp: () => dispatch(actions.authCheckState())
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(App)
);
