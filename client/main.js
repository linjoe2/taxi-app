import {Meteor} from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import Tracker from 'tracker-component';
import { Router, Route, browserHistory } from 'react-router';
import {RidesDB} from '../imports/api/rides'
import {Clients} from '../imports/api/clients'
import Signup from '../imports/ui/users/Signup'
import Login from '../imports/ui/users/Login';
import Input from '../imports/ui/Input';
import Import from '../imports/ui/Import';
import Rides from '../imports/ui/Rides';
import Factuur from '../imports/ui/Factuur';
import Admin from '../imports/ui/users/Admin';
import NotFound from '../imports/ui/NotFound';
import Bedrijven from '../imports/ui/Bedrijven';
import Settings from '../imports/ui/settings';
import Passagier from '../imports/ui/passagier';

import 'bootstrap-sass';


const unauthenticatedPages = ['/'];
const AuthenticatedPages = ['settings','/signup','/invoer','/import','/ritten','/bewerk','/factuur','/admin' ];
const onEnterPublicPage = () => {
	if(!!Meteor.userId()) {
		browserHistory.replace('/ritten')
	}
}
const onEnterPrivatePage = () => {
	if(!Meteor.userId()) {
		browserHistory.replace('/')
	}
}



const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login} onEnter={onEnterPublicPage}/>
    <Route path='/settings' component={Settings} onEnter={onEnterPrivatePage}/>
    <Route path='/passagier' component={Passagier} onEnter={onEnterPrivatePage}/>
    <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
    <Route path="/invoer" component={Input} onEnter={onEnterPrivatePage}/>
    <Route path="/import:rideId" component={Import} onEnter={onEnterPrivatePage}/>
    <Route path="/ritten" component={Rides} onEnter={onEnterPrivatePage}/>
    <Route path="/bedrijven" component={Bedrijven} onEnter={onEnterPrivatePage}/>
    <Route path="/factuur" component={Factuur} onEnter={onEnterPrivatePage}/>
    <Route path="/admin" component={Admin} onEnter={onEnterPrivatePage}/>
    <Route path="*" component={NotFound}/>
  </Router>
);

Tracker.autorun(() => {
	Meteor.subscribe('Clients')
	const isAuthenticated = !!Meteor.userId();
	const pathname = browserHistory.getCurrentLocation().pathname;
	const isUnauthenticatedPage = unauthenticatedPages.includes(pathname)
	const isAuthenticatedPage = AuthenticatedPages.includes
	if (isUnauthenticatedPage && isAuthenticated) {
		browserHistory.replace('/ritten');
	} else if (isAuthenticatedPage && !isAuthenticated){
		browserHistory.replace('/')
	}
		
})



Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});
