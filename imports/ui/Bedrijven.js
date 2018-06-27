import React from 'react';
import Menu from './Menu'
import { Link, browserHistory } from 'react-router';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { Clients } from './../api/clients'
import AddClient from './addClient'
// Meteor.subscribe('Clients')

const cellEditProp = {
  mode: 'dbclick',
  blurToSave: true,
  afterSaveCell: onAfterSaveCell // a hook for after saving cell
}

const selectRowProp = {
  mode: 'checkbox'
};

function onAfterSaveCell(row, cellName, cellValue) {
  Meteor.call('Clients.update', {_id: row._id},row)
}

function onAfterDeleteRow(rowKeys) {
  Meteor.call('Clients.delete', rowKeys)
  // alert('The rowkey you drop: ' + rowKeys);
}

function refresh(){
  browserHistory.push('/bedrijven')
};

export default class Edit extends React.Component {
    constructor(props) {
    super(props);

    this.state = {
      error: ''
    };

    this.options = {
      defaultSortName: 'bedrijf',  // default sort column name
      defaultSortOrder: 'desc',  // default sort order
      afterDeleteRow: onAfterDeleteRow,
      exportCSVText: 'Exporteer',
      insertText: 'Voeg toe',
      deleteText: 'Verwijder',
      saveText: 'Opslaan',
      closeText: 'Sluit'
    };
  }

  render() {
    return (
    	<div>
	    	<Menu/>
    		<div className='row'>
    			<div className='col-md-8'>
					<h2>Alle bedrijven</h2>
     		 		<button className="btn btn-info" onClick={refresh}>Herlaad</button>
     		 		<BootstrapTable deleteRow={ true }  selectRow={ selectRowProp }  options={ this.options }striped hover pagination cellEdit={ cellEditProp }  search={ true } data={Clients.find().fetch()} >
  			    		<TableHeaderColumn isKey editable={false} width="0px" dataField='_id'></TableHeaderColumn>
			            <TableHeaderColumn width="100px" dataField='bedrijf'>Naam</TableHeaderColumn>
			            <TableHeaderColumn width="75px" dataField='time'>Kostenpost</TableHeaderColumn>
			            <TableHeaderColumn width="150px" dataField='tel'>Telefoon nr</TableHeaderColumn>
			        </BootstrapTable>
       			</div>
    			<div className='col-md-4'>
    				<h2> Bedrijf toevoegen</h2>
    				<AddClient/>
    			</div>
	    	</div>
	    </div>
	    	);
  }
}
