import React from 'react'
import {
    Switch,
    Route,
    useRouteMatch,
    Redirect,
    RouteComponentProps,
} from 'react-router-dom';

const Patient = React.lazy(() => import('./../patients/patients'));
const Physician = React.lazy(() => import('./../physician/physician'));

function Dashboard(props: any) {
    let { path } = useRouteMatch();
    return (
        <>
            <Switch>
                <Route
                    exact
                    path={path + '/patient'}
                    render={(props: any) => <Patient {...props} />}
                    component={Patient}
                />
                <Route
                    exact
                    path={path + '/physician'}
                    render={(props: any) => <Physician {...props} />}
                    component={Physician}
                />
                <Redirect to={path + '/patient'} />
            </Switch>
        </>
    );
}

export default Dashboard