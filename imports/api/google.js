import React from 'react';
import CalendarAPI from 'node-google-calendar'
import { browserHistory } from 'react-router';


function startSync(){
	Meteor.call('googleSync', (err,res)=> {
		console.log(err + res)
    browserHistory.push('/ritten')
	})
}

export default class Import extends React.Component {
  render() {
    return (
      <div>
      	<button className="btn btn-info syncButton" onClick={startSync}>synchroniseer</button>
      </div>
    );
  }
}

<Import />