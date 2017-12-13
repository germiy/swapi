import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import PeopleList from './components/peopleList'

const Root = ({ store }) => (
    <Provider store={store}>

        <Router>

            <Switch>
                <Route exact path="/" component={PeopleList} />

                <Route path="/planet/:planetUrl" render={(props) => (
                    <PeopleList {...props.match.params} history={props.history} />
                )} />

            </Switch>

        </Router>

    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired
};

export default Root