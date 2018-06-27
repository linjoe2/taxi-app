import React from 'react';
import { Link, browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
// import { Roles } from ''

export default class Signup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: ''
		};
	}
	onSubmit(e){
		e.preventDefault();

		let email = this.refs.email.value.trim();
		let password = this.refs.password.value.trim();
		let username = this.refs.name.value.trim();
		let profile = {role: this.refs.role.value.trim()};
		let user = {username: username,email: email,password: password,profile: profile};

		Accounts.createUser(user, (err) => {
			console.log('signupcallback', err);
			
			if(err){
				this.setState({
					error: err.reason
			})} else {
					this.setState({
						error: ''
					})
				}
	
		});
		browserHistory.push('/settings')

	}
	



  render() {
    return (
    	<div>
    		<h1>Voeg nieuwe gebruiker toe:</h1>
    		{this.state.error ? <p>{this.state.error}</p> : undefined}
    		<form onSubmit={this.onSubmit.bind(this)} noValidate>
    			<input className="form-control" type="string" ref='name' name='name' placeholder="Gebruikersnaam"></input>
    			<input className="form-control" type="email" ref='email' name='email' placeholder='Email'></input>
    			<input className="form-control" type='password' ref='password' name='password' placeholder='wachtwoord'></input>
    			<button className="btn btn-default"> Aanmelden</button>
    		</form>
    	</div>
    	);
  }
}
