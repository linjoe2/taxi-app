import React from 'react';
import { RidesDB } from './../api/rides'
import { Tracker } from 'meteor/tracker';
import moment from 'moment'
import Import from './../api/google'

export default class MobileList extends React.Component {
    constructor(props) {
    super(props);

    this.state = {
      error: '',
      startDate: this.props.location.query.date || moment().format('YYYY-MM-DD'),
      dateEnd: ''
    };
    this.handleChange = this.handleChange.bind(this);
    // this.subscribe('RidesDB');
    // this.autorun(() => {
    //   this.setState({
    //     RideList: RidesDB.find({datum: this.state.startDate}).fetch()
    //   });
    // });
  }

  componentDidMount() {
      this.linksTracker = Tracker.autorun(() => {
        Meteor.subscribe('RidesDB');
        const Rides = RidesDB.find({datum: this.state.startDate}, {sort: { time : 1 } } ).fetch()
        this.setState({ Rides });
      });
    }

  handleChange(date) {
    this.setState({ 
      startDate: date.target.value
     })
    const Rides = RidesDB.find( {datum: date.target.value}, {sort: { time : 1 } } ).fetch()
        this.setState({ Rides });
  }

  render() {
        let {Rides = []} = this.state;
    return (
      <div>
        <div className='row'>
          <div className='col-xs-7'>
              <div className='dateFilter' ref='dateFilter'>
                <input className="form-control" onChange={this.handleChange} type="date" ref="time" value={this.state.startDate}></input>
              </div>
          </div>
          <div className='col-xs-5'>
            <Import/>
          </div>
        </div>
        <div>
            {Rides.map(RideItem => 

                <div key={RideItem._id} className={!RideItem.kosten ? "listItem listNot": "listItem listOk"}>
                    <div className='row'>
                      <div className='col-xs-6'>
                        <h5 className="listTitle"><i className="fa fa-briefcase" aria-hidden="true"></i> {RideItem.bedrijf} </h5>
                      </div>
                      <div className='col-xs-6'>
                        <h5><i className="fa fa-user" aria-hidden="true"></i> {RideItem.passagier}</h5>
                      </div>

                    </div>
                    <div className='row'>
                        <div className='col-xs-6'>
                          <h5 className="listSub">{moment(RideItem.date).format('DD/MM/YYYY')}</h5>
                        </div>
                        <div className='col-xs-6'>
                            <h5>{RideItem.time}</h5>
                        </div>
                      </div>
                    <ul className="list-group list-group-flush">
                    <li className='list-group-item'><i className="fa fa-road" aria-hidden="true"></i> {RideItem.van}</li>
                    <li className='list-group-item'><i className="fa fa-road" aria-hidden="true"></i> {RideItem.naar}</li>
                    <li className='list-group-item'><i className="fa fa-id-card" aria-hidden="true"></i> {RideItem.bestuurder}</li>
                    </ul>
                    <div className='row'>
                      <div className='col-xs-6 listLink right'>
                      <a className="listLink btn btn-info" role="button" href={"whatsapp://send?text=datum: "+RideItem.date+" %0ATijd : "+RideItem.time+" %0A %0Abedrijf: "+RideItem.bedrijf+"  %0A %0ANaam passagier : "+RideItem.passagier+" %0A %0APick-up: "+RideItem.van+" %0A %0ADrop-off: "+RideItem.naar+" %0A %0ABetaling: "+RideItem.kostenplaats+" %0A %0ATel: "+RideItem.tel+" %0AComments : "+RideItem.comments} data-action="share/whatsapp/share">Whatsapp</a>
                      </div>
                      <div className='col-xs-6 listLink left'>
                      <a href={"invoer?id="+RideItem._id} className="listLink btn btn-primary" role="button">bewerk</a>
                      </div>
                    </div>

                </div>
              
            )}
          
  	    </div>
      </div>
	    	);
  }
}

//////
// Brands = class Cars extends Tracker.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       brand: this.props.brand
//     };
//     this.autorun(() => {
//       this.subscribe( 'brand', this.state.brand );
//     });
//     this.autorun(() => {
//       this.setState({
//         ready: this.subscriptionsReady(),
//         cars: Models.find({ brand: this.state.brand }).fetch()
//       });
//     });
//   }
 
//   handleChange() {
//     this.setState({brand: this.refs.brand.value});
//   }
 
//   render() {
//     let {cars = []} = this.state;
//     let selectBrand = this.handleChange.bind(this);
//     let brands = ["Volvo", "Tesla", "DeLorean"];
 
//     return (
//       <div>
//         <select ref="brand" onChange={selectBrand} defaultValue={this.state.selected}>
//           {brands.map((brand, i) =>
//             <option value={brand} key={i}>{brand}</option>
//           )}
//           {super.render()}
//         </select>
//       </div>
//     );
//   }
// }

