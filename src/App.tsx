import React, {useState, Suspense, useEffect} from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.scss';
import Header from './shared/header/header';
import Login from './components/login/login';
import Patients from './components/patients/patients';
import Layout from './hoc/layout'
import { localStore } from './common/services';
import { useSelector, useDispatch } from 'react-redux'

const Dashboard = React.lazy(() => import('./components/dashboard/dashboard'));

function App() {

 // const [isAuthenticated, setisAuthenticated ] = useState(false);
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);
  //localStore.get('isValidUser')
  useEffect(() => {
   
  }, [])

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
			<Suspense fallback='Loading'>{routes}</Suspense>
    </div>
  );
}

export default App;
