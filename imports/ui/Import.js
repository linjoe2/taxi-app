import React from 'react';
import Menu from './Menu'

function startSync(){
	console.log('test')
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