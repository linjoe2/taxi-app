import { Meteor } from 'meteor/meteor'
import React from 'react';
import { Link, BrowserHistory } from 'react-router';
import MetaTags from 'react-meta-tags'

export default class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: ''
		}
	}
	onSubmit(e) {
		e.preventDefault();

		let user = this.refs.username.value.trim();
		let password = this.refs.password.value.trim();

		Meteor.loginWithPassword(user, password, (err) => {
			if(err){
				this.setState({
					error: err.reason
				})} else {
					this.setState({
						error: ''
					})
				}
		})
	}

  render() {
    return (
    	<div className='container'>
    	<MetaTags>
            <meta name="viewport" content="width=device-width, user-scalable=no"></meta>
        </MetaTags>
    		<div className='row'>
    		<div className='col-md-4 col-md-offset-4  login'>
		    		<img ref='logo' id='logo' className="img-responsive" src='./img/logo.png'></img>
		    		{this.state.error ? <p>{this.state.error}</p> : undefined}
		    		<form onSubmit={this.onSubmit.bind(this)} noValidate>
		    			<input className='form-control' type="string" ref='username' name='username' placeholder='Email/G ebruikersnaam'></input>
		    			<input className='form-control' type='password' ref='password' name='password' placeholder='wachtwoord'></input>
		    			<button className='btn btn-default'> Aanmelden</button>
		    		</form>
		    	</div>
    		</div>
    	</div>
    	);
  }
}
