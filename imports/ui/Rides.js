import { Meteor } from 'meteor/meteor' 
import React from 'react';
import { Link, browserHistory } from 'react-router';
import Menu from './Menu'
import MobileList from './mobilelist'
import { BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { RidesDB } from './../api/rides'
import { Clients } from './../api/clients'
import Import from './../api/google'
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";
import { Tracker } from 'meteor/tracker';



const clientsList = []

setTimeout(function() {
  var clientsList2 = Clients.find().fetch()
  for (var i = clientsList2.length - 1; i >= 0; i--) {
    clientsList.push(clientsList2[i].bedrijf)
  };
  // console.log(clientsList)  
}, 1000);


const createClientEditor = (onUpdate, props) => (<ClientEditor onUpdate={ onUpdate } {...props}/>);

const cellEditProp = {
  mode: 'click',
  blurToSave: true,
  afterSaveCell: onAfterSaveCell // a hook for after saving cell
}


function onAfterSaveCell(row, cellName, cellValue) {
  Meteor.call('RidesDB.update', {_id: row._id},row)
}

function onAfterDeleteRow(rowKeys) {
  Meteor.call('RidesDB.delete', rowKeys)
  // alert('The rowkey you drop: ' + rowKeys);
}

function checkFormatter(cell, row) {
    if(cell === true ||cell ===  'true'){
        return `<div align="right"><i class="fa fa-check" aria-hidden="true"></i></div>`;
    }else if(cell === false||cell === 'false'){
        return `<div align="right"><i class="fa fa-times" aria-hidden="true"></i></div>`;
    }else if(cell === undefined || cell === ''){
      return `<div align="right"><i class="fa fa-question" aria-hidden="true"></i></div>`;
    }
  }

function wachtTijdFormatter(cell, row) {
    if(cell === undefined || cell === ''){
      return `<div align="right"><i class="fa fa-times" aria-hidden="true"></i></div>`;
    }else {
        return `${cell} min`;
    }
  }

function dateFullFormatter(cell,row) {
  return ''
}

function bestuurderFormatter(cell, row) {
    if(cell === undefined || cell === ''){
        var datum = moment(row.date).format('DD/MM/YYYY')
        return `<a href="whatsapp://send?text=datum: ${datum} %0ATijd : ${row.time} %0A %0Abedrijf: ${row.bedrijf}  %0A %0ANaam passagier : ${row.passagier} %0A %0APick-up: ${row.van} %0A %0ADrop-off: ${row.naar} %0A %0ABetaling: Op rekening %0AKostenplaats: ${row.kostenplaats} %0A %0ATel: ${row.tel} %0AComments : ${row.comments}" data-action="share/whatsapp/share">Whatsapp</a>
`;
    }else{
        return `${cell}`;
    }
  }
function priceFormatter(cell, row) {
    if(cell === undefined) {
      cell = ''
    }
    return `&#8364; ${cell}`;
  }
// function timeFormatter(cell, row) {
//   return moment(cell).format('DD MMM YYYY HH:mm');
// }

// function bewerkFormatter(cell, row) {
//     return `<i class="fa fa-pencil" aria-hidden="true"></i>
// `;
// }

function refresh(){
  browserHistory.push('/ritten')
};

function Toewijzen() {
  if(true) {
      console.log('yes')
      return ''
    }
}

function isExpandableRow(row) {
      return true;
  }

function expandComponent(row) {
    return (
      <div className="row">
       <div className='col-md-5'>
       <h5>titel: {row.titel}</h5>
       <p>locatie: {row.locatie}</p>
       <p>beschrijving:</p>
       <p>{row.beschrijving}</p>
       </div>
      </div>
       )
  }

function dateFormatter(cell, row) {
  return `${('0' + cell.getDate()).slice(-2)}/${('0' + (cell.getMonth() + 1)).slice(-2)}/${cell.getFullYear()}`;
}

// const startDate = new Date(2015, 0, 1);
// const endDate = new Date();
// new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));



export default class Rides extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      dateStart: '',
      dateEnd: ''
    };

    this.options = {
      defaultSortName: 'dateFull',  // default sort column name
      defaultSortOrder: 'asc',  // default sort order
      afterDeleteRow: onAfterDeleteRow,
      exportCSVText: 'Exporteer',
      insertText: 'Voeg toe',
      deleteText: 'Verwijder',
      saveText: 'Opslaan',
      closeText: 'Sluit',
      expandRowBgColor: 'rgb(242, 255, 163)',
      expandBy: 'column'
    };
  }

    componentDidMount() {
      console.log(this.props.location)
      this.linksTracker = Tracker.autorun(() => {
        Meteor.subscribe('RidesDB');
        const Rides = RidesDB.find().fetch()
        this.setState({ Rides });
      });
    }


  handleBtnClick = () => {
    this.refs.nameCol.applyFilter({
      date: products[2].inStockDate,
      comparator: '='
    });
  }


	render() {
      const selectRowProp = {
      mode: 'checkbox',
      clickToExpand: true
    };
      let {Rides = []} = this.state;
      
      
    	return (
      <div>
        <Menu/>
	    	<div className='container-fluid'>
        <div className='row'>
          <div className='col-md-8'>
            {this.state.error ? <p>{this.state.error}</p> : undefined}
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12 '>
          <BrowserView device={isBrowser}> 
            <BootstrapTable
        data={Rides}
        options={ this.options }
        striped
        expandableRow={ isExpandableRow }
        expandComponent={ expandComponent }
        selectRow={ selectRowProp } 
        expandColumnOptions={{expandColumnVisible: true}}
        cellEdit={ cellEditProp }
        deleteRow={ true }
        pagination
        search>
  			      <TableHeaderColumn isKey editable={false} width="0px" dataField='_id' export={ false }></TableHeaderColumn>
              <TableHeaderColumn editable={false} expandable={ false } width="40px" dataFormat={dateFullFormatter} dataField='dateFull' dataSort={ true } export={ false }></TableHeaderColumn>
              <TableHeaderColumn width="240px" expandable={ false } dataFormat={dateFormatter} expandable={ false } editable={false} dataField='date' filter={ { type: 'DateFilter', defaultValue: { date: moment().format("MM/DD/YYYY"), comparator: '=' } } } >Datum</TableHeaderColumn>
              <TableHeaderColumn width="75px" expandable={ false } editable={false} dataField='time'>Tijd</TableHeaderColumn>
              <TableHeaderColumn width="150px" expandable={ false } dataField='bedrijf' dataSort={ true } editable={ { type: 'select', options: { values: clientsList } } }>Bedrijf</TableHeaderColumn>
              <TableHeaderColumn width="150px" expandable={ false } dataField='passagier'>Passagier</TableHeaderColumn>
              <TableHeaderColumn width="150px" expandable={ false } dataField='tel'>Telefoon nr</TableHeaderColumn>
              <TableHeaderColumn width="250px" expandable={ false } dataField='van'>Van</TableHeaderColumn>
              <TableHeaderColumn width="250px" expandable={ false } dataField='naar'>Naar</TableHeaderColumn>
              <TableHeaderColumn width="150px" expandable={ false } dataField='bestuurder' export={ false } dataFormat={bestuurderFormatter}>Bestuurder</TableHeaderColumn>
              <TableHeaderColumn width="150px" expandable={ false } dataField='comments'>Comments</TableHeaderColumn>
  			  	  <TableHeaderColumn width="40px" expandable={ false } dataField='roadshow' dataFormat={checkFormatter} editable={ { type: 'checkbox', options: { values: 'true:false' } } } >RS</TableHeaderColumn>
              <TableHeaderColumn width="80px" expandable={ false } dataField='wachttijd' dataFormat={wachtTijdFormatter} >WT</TableHeaderColumn>
              <TableHeaderColumn width="200px" expandable={ false } dataField='kostenplaats'>Kostenplaats</TableHeaderColumn>
              <TableHeaderColumn width="100px" expandable={ false } dataField='kosten'dataFormat={priceFormatter}>Kosten</TableHeaderColumn>
            </BootstrapTable>
            <p>RS = Roadshow, WT = Wachttijd</p>
            </BrowserView>
          <MobileView device={isMobile}>
            <MobileList {...this.props}/>

          </MobileView>
          </div>
          </div>
	    	</div>
      </div>
    	);
  }
}



