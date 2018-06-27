import React from 'react';
import Menu from './Menu'
import AddClient from './addClient'

export default class Factuur extends React.Component {
  render() {
    return (
    	<div>
    		<Menu/>
	    	<p>Admin component here</p>
	    	<AddClient/>
	    </div>

	    	);
  }
}
