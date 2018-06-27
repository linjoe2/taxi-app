import React from 'react';
import { Meteor } from 'meteor/meteor'
import { Link, browserHistory } from 'react-router';
import Menu from './Menu'
import { Tracker } from 'meteor/tracker';

export default class Passagier extends React.Component {
	constructor (props) {
	super(props)
	this.state = {
		bedrijfnaam: '',
		naam: '',
		tel: '',
		email: '',
		address: '',
		woonplaats: '',
		IBAN: '',
		BIC: '',
		BTW: '',
		KVK: '',
		error: '',
		agendapunt: ''
	};
	// this.handleChange = this.handleChange.bind(this);
	this.handleChangeInput = this.handleChangeInput.bind(this);


    // this.autorun(() => {
    //   this.subscribe('RidesDB');
    // });
    // this.autorun(() => {
    //   this.setState({
    //     RideItem: RidesDB.find(this.props.location.query.id).fetch()[0]
    //   });
    // });

	}

	componentDidMount() {
	    this.linksTracker = Tracker.autorun(() => {
	      // Meteor.subscribe('RidesDB');
	      // const RideItem = RidesDB.find(this.props.location.query.id).fetch()[0]
	      // this.setState( RideItem );
	    });
  	}

	// handleChange(date) {
	// this.setState({
	//   startDate: date,
	//   id: this.props.location.query.id
	// });
	// }

	handleChangeInput = (input) => (event) => {
		console.log(input)
		console.log(event.target.value)

		if(input === 'roadshow') {
		    this.setState({
	        ...this.state,
	        [input]: event.target.checked
	    });			
		} else {
		    this.setState({
		        ...this.state,
		        [input]: event.target.value
		    });
		}
	}



	// handleChange(event) {
 //    this.setState({value: event.target});
 //    console.log({value: event.target})
 //  }

	// handleSubmit(event) {
	// 	alert('A name was submitted: ' + this.state);
	// 	event.preventDefault();
	// }
	



	onSubmit(e){
		e.preventDefault();
		const newMailingAddress = {
		  addressCountry: this.country,
		  postalCode: this.postcode,
		  streetAddress: this.streetAddress
		};

		const newCompanyDetails = {
			naam: this.bedrijfsnaam,
			tel: this.tel,
			email: this.email
		}

		Meteor.users.update(userId, {
		  $set: {
		    mailingAddress: newMailingAddress,
		    companyDetails: newCompanyDetails
		  }
		});
		browserHistory.push('/ritten')
	}
	



  render() {	
    return (
    	<div>
    		<Menu/>
    	   	<div className="container">
	    		<div className="row">
	    			<div className='col-md-6 col-md-offset-3'>
			    		{this.state.error ? <p>{this.state.error}</p> : undefined}
			    		<form onSubmit={this.onSubmit.bind(this)} noValidate>
			    			<h3> Uw gegevens </h3>
							<div className="form-group">
			    				<label>naam</label>
			    				<input className="form-control" type='string' onChange={this.handleChangeInput('naam')} ref='naam' name='naam' value={this.state.naam}></input>
			    			</div>
			    			<div className="form-group">
			    				<label>Emailadress</label>
			    				<input className="form-control" type='string' onChange={this.handleChangeInput('email')} ref='email' name='email' value={this.state.email}></input>
			    			</div>
			    			<div className="form-group">
							<label>Telefoon nummer</label>
			    			<input className="form-control" type="string" onChange={this.handleChangeInput("tel")} ref='tel' name='tel' value={this.state.tel}></input>
			    			</div>
			    			<h3> Factuurgegevens </h3>
							<div className="form-group">
							<label>Bedrijfsnaam</label>
			    			<input className="form-control" type="string" onChange={this.handleChangeInput("bedrijfsnaam")} ref='bedrijfnaam' name='bedrijfnaam' value={this.state.bedrijfnaam}></input>
			    			</div>
							<div className="form-group">
			    				<label>Emailadress</label>
			    				<input className="form-control" type="string" onChange={this.handleChangeInput('bedrijfEmail')} ref='bedrijfEmail' name='bedrijfEmail' value={this.state.bedrijfEmail} ></input>
			    			</div>
			    			<div className="form-group">
			    				<label>Address</label>
			    				<input className="form-control" type="string" onChange={this.handleChangeInput('address')} ref='address' name='address' value={this.state.address} ></input>
			    			</div>
			    			<div className='row'>
			    				<div className='col-sm-8'>
					    			<div className="form-group">
					    				<label>Woonplaats</label>
					    				<input className="form-control" type='string' onChange={this.handleChangeInput('woonplaats')} ref='woonplaats' name='woonplaats' value={this.state.woonplaats}></input>
					    			</div>
					    		</div>
					    		<div className='col-sm-4'>
					    			<div className="form-group">
					    				<label>postcode</label>
					    				<input className="form-control" type='string' onChange={this.handleChangeInput('postcode')} ref='postcode' name='postcode' value={this.state.postcode}></input>
					    			</div>
					    		</div>
					    	</div>	
					    	<div className="form-group">
					    				<label>Factuur aanduiding</label>
					    				<p>Optioneel</p>
					    				  <select className="form-control" name="billing" onChange={this.handleChangeInput('billing')} ref='billing' name='billing' value={this.state.billing}>
										    <option value=""></option>
										    <option value="kostenplaats">kostenplaats</option>
										    <option value="grootboeknummer">grootboeknummer</option>
										    <option value="po nummer">po nummer</option>
										    <option value="klantcode">klantcode</option>
										  </select>
					    			</div>		    			
			    			<div className="form-group">
			    				<button className="btn btn-default"> Invoeren</button>
			    			</div>
			    		</form>
			   		</div>
		    	</div>
		    </div>

    	</div>
    	);
  }
}

