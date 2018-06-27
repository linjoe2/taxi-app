import React from 'react';
import { Meteor } from 'meteor/meteor'
import { Link, browserHistory } from 'react-router';
import Menu from './Menu'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { RidesDB } from './../api/rides'
import { Tracker } from 'meteor/tracker';

// Meteor.subscribe('RidesDB')

import 'react-datepicker/dist/react-datepicker.css';
// CSS Modules, react-datepicker-cssmodules.css
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import TimePicker from 'react-bootstrap-time-picker';





export default class Input extends React.Component {
	constructor (props) {
	super(props)
	this.state = {
		startDate: moment(),
		error: '',
		pageId: '',
		wachttijd: '',
		bestuurder: '',
		van: '',
		naar: '',
		bedrijf: '',
		passagier: '',
		kosten: '',
		kostenplaats: '',
		roadshow: '' ,
		wachttijd: '' ,
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
	      Meteor.subscribe('RidesDB');
	      const RideItem = RidesDB.find(this.props.location.query.id).fetch()[0]
	      this.setState( RideItem );
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
		console.log(event.target.checked)

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
		moment.locale('nl');
		let dateFull = this.state.dateFull
		let date = this.state.date
		let datum = this.state.datum
		let time = this.state.time
		let bestuurder = this.state.bestuurder.trim();
		let van = this.state.van.trim();
		let naar = this.state.naar.trim();
		let bedrijf = this.state.bedrijf.trim();
		let passagier = this.state.passagier.trim();
		let kosten = this.state.kosten.trim();
		let kostenplaats = this.state.kostenplaats.trim();
		let roadshow = this.state.roadshow
		let wachttijd = this.state.wachttijd
		let titel = this.state.titel
		let locatie = this.state.locatie
		let beschrijving =this.state.beschrijving
		let comments = this.state.comments
		let agendapunt = {comments: comments, datum: datum, beschrijving: beschrijving, locatie: locatie, titel: titel, date: date,time: time, dateFull: dateFull, bestuurder: bestuurder, van: van,naar: naar,bedrijf: bedrijf, passagier: passagier,kosten: kosten, kostenplaats: kostenplaats,roadshow: roadshow,wachttijd: wachttijd}
		console.log(agendapunt)
		if(!!this.props.location.query.id) {
			console.log('id call')
			Meteor.call('RidesDB.update', {_id: this.props.location.query.id},agendapunt)
		} else {
			console.log('no id')
			Meteor.call('RidesDB.insert', agendapunt)
		}
		browserHistory.push('/ritten?date='+this.state.datum)
	}
	



  render() {
  	console.log(this.props)
  	// let {RideItem = []} = this.state;
  	// console.log(this.state)

	
    return (
    	<div>
    		<Menu/>
    	   	<div className="container">
	    		<div className="row">
	    			<div className='col-md-6 col-md-offset-3'>
			    		{this.state.error ? <p>{this.state.error}</p> : undefined}
			    		<form onSubmit={this.onSubmit.bind(this)} noValidate>
				    		<label>Datum/tijd</label>
				    		<div className="form-group">
				    		{!!!this.state.dateFull ? <input className="form-control" onChange={this.handleChangeInput} type="datetime-local" ref="time"></input> : <input className="form-control" onChange={this.handleChangeInput('dateFull')} readOnly type="string" ref="time" value={this.state.dateFull}></input>}
							</div>
							<div className="form-group">
			    				<label>Bedrijf</label>
			    				<input className="form-control" type='string' onChange={this.handleChangeInput('bedrijf')} ref='bedrijf' name='bedrijf' value={this.state.bedrijf}></input>
			    			</div>
			    			<div className="form-group">
			    				<label>Passagier</label>
			    				<input className="form-control" type='string' onChange={this.handleChangeInput('passagier')} ref='passagier' name='passagier' value={this.state.passagier}></input>
			    			</div>
			    			<div className="form-group">
							<label>Telefoon nummer</label>
			    			<input className="form-control" type="string" onChange={this.handleChangeInput("tel")} ref='tel' name='tel' value={this.state.tel}></input>
			    			</div>
							<div className="form-group">
							<label>Bestuurder</label>
			    			<input className="form-control" type="string" onChange={this.handleChangeInput("bestuurder")} ref='bestuurder' name='bestuurder' value={this.state.bestuurder}></input>
			    			</div>
							<div className="form-group">
			    				<label>van</label>
			    				<input className="form-control" type="string" onChange={this.handleChangeInput('van')} ref='van' name='van' value={this.state.van} ></input>
			    			</div>
			    			<div className="form-group">
			    				<label>naar</label>
			    				<input className="form-control" type="string" onChange={this.handleChangeInput('naar')} ref='naar' name='naar' value={this.state.naar} ></input>
			    			</div>
			    			
			    			<div className="form-group">
			    				<label>Kosten</label>
			    				<input className="form-control" type='string' onChange={this.handleChangeInput('kosten')} ref='kosten' name='kosten' value={this.state.kosten}></input>
			    			</div>
			    			<div className="form-group">
			    				<label>Kostenplaats</label>
			    				<input className="form-control" type='string' onChange={this.handleChangeInput('kostenplaats')} ref='kostenplaats' name='kostenplaats' value={this.state.kostenplaats}></input>
			    			</div>
			    			<div className='row'>
			    				<div className='col-xs-6'>
			    					<label>Wachttijd </label>
			    					<input name="wachttijd" ref="wachttijd" type="string" onChange={this.handleChangeInput('wachttijd')} value={this.state.wachttijd} className="form-control"></input>
			    				</div>
			    				<div className='col-xs-6'>
			    					<label>Roadshow <br></br><input name="roadshow" ref="roadshow" type="checkbox" onChange={this.handleChangeInput('roadshow')} checked={this.state.roadshow}></input></label>
			    				</div>
			    			</div>
			    			<div className="form-group">
			    				<label>Comments</label>
			    				<textarea className="form-control" rows="4" onChange={this.handleChangeInput('comments')} ref='kostenplaats' name='kostenplaats' value={this.state.comments}></textarea>
			    			</div>
			    			<div className="form-group">
			    				<button className="btn btn-default"> Invoeren</button>
			    			</div>
			    			<div>
			    				<h3>titel</h3>
			    				<p>{this.state.titel}</p>
			    				<h3> locatie</h3>
			    				<p>{this.statelocatie}</p>
			    				<h3>beschrijving</h3>
			    				<p>{this.state.beschrijving}</p>
			    			</div>
			    		</form>
			   		</div>
		    	</div>
		    </div>

    	</div>
    	);
  }
}

