import React, {Suspense, useEffect} from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.scss';
import Login from './components/login/login';
import Layout from './hoc/layout'
import { useSelector, useDispatch } from 'react-redux'
import { authCheckState } from './store/action';
import Loader from './shared/loader/loader';

const Dashboard = React.lazy(() => import('./components/dashboard/dashboard'));

function App() {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: any) => state.auth.token);

  useEffect(() => {
  //   const userInfo = {
  //     fName: 'Mukesh',
  //     lname: 'kumar',
  //     userId: 'id',
  //     mail: 'kumarmukesh4@gmail.com'
  // };
  // localStorage.setItem('AUTH_TOKEN', 'ababbabababj');
  //   localStorage.setItem('USER_INFO', JSON.stringify(userInfo));

    dispatch(authCheckState());
  }, [dispatch])

  let routes = (
		<>
			<Switch>
				<Route exact path={['/', '/login']} component={Login} />
        <Redirect to="/login" />
			</Switch>
		</>
  );
  
  if(isAuthenticated) {
    routes = (
			<Layout>
				<Switch>
					<Route path="/dashboard" component={Dashboard} />
					<Redirect to="/dashboard" />
				</Switch>
			</Layout>
		);
  }

  return (
    <div className="App">
			<Suspense fallback={<Loader />}>{routes}</Suspense>
    </div>
  );
}

export default App;
