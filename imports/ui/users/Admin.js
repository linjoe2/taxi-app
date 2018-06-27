import React from 'react';
import Menu from './../Menu'
import Signup from './Signup'
export default class Admin extends React.Component {
  render() {
    return (
    	<div className='wrapper'>
	    	<Menu/>
	    	<div className="container">
	    		<div className="row">
	    			<div className='col-md-6 col-md-offset-3'>
		    			<Signup/>
		    		</div>
		    	</div>
		    </div>
		</div>
	    	);
  }
}
