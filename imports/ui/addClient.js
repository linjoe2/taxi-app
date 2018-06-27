import React from 'react';
import { Meteor } from 'meteor/meteor'
import { Clients } from './../api/clients'
import { Link, browserHistory } from 'react-router';


export default class AddClient extends React.Component {
	constructor (props) {
	super(props)
	this.state = {
	  error: ''
	};
	}

	onSubmit(e){
		e.preventDefault();

		let bedrijf =  this.refs.bedrijf.value.trim();
		let bedrijfList= {bedrijf: bedrijf}
		console.log(bedrijfList)
		Meteor.call('Clients.insert', bedrijfList)
		// browserHistory.push('/ritten')
	}
	



  render() {
    return (
    	<div>
    		{this.state.error ? <p>{this.state.error}</p> : undefined}
    		<form onSubmit={this.onSubmit.bind(this)} noValidate>
	    		<label>Bedrijfs naam</label>
	    		<div className="form-group">
		    		<input className="form-control" type="string" ref="bedrijf"></input>
				</div>
    			<div className="form-group">
    				<button className="btn btn-default"> Invoeren</button>
    			</div>
    		</form>
    	</div>
    	);
  }
}