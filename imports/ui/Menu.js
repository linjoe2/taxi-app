import React from 'react';
import { Link } from 'react-router';
import MetaTags from 'react-meta-tags'
import { Accounts } from 'meteor/accounts-base';
import { createContainer } from 'meteor/react-meteor-data';


export default class Menu extends React.Component {
    onLogout() {
        Accounts.logout();
        browserHistory.push('/');
    };

    render() {
        return (
        <div>
            <nav className='navbar navbar-inverse'>
              <div className="container-fluid">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                    </button>
                    <a className="navbar-brand" href="/ritten">T.E.C.S.</a>
                </div>
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav  navbar-right">
                        <li><Link to="/ritten"> Ritten Administratie</Link></li>
                        <li><Link to="/bedrijven"> Bedrijven</Link></li>
                        <li><Link to="/admin"> Admin</Link></li>
                        <li><button className='btn btn-default navbar-btn' onClick={this.onLogout.bind(this)}>Uitloggen</button></li>
                    </ul>
                </div>
              </div>
            </nav>
          </div>
    	);
  }
}

