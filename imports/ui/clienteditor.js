import React from 'react';
// import { Clients } from './../api/clients'

// const clientsList = Clients.find().fetch()
const currencies = [ 'USD', 'GBP', 'EUR' ];

class ClientEditor extends React.Component {
  constructor(props) {
    super(props);
    this.updateData = this.updateData.bind(this);
    this.state = { amount: props.defaultValue.amount, currency: props.defaultValue.currency };
  }
  focus() {
    this.refs.inputRef.focus();
  }
  updateData() {
    this.props.onUpdate({ amount: this.state.amount, currency: this.state.currency });
  }
  render() {
    return (
      <span>
        <input
          ref='inputRef'
          className={ ( this.props.editorClass || '') + ' form-control editor edit-text' }
          style={ { display: 'inline', width: '50%' } }
          type='text'
          value={ this.state.amount }
          onKeyDown={ this.props.onKeyDown }
          onChange={ (ev) => { this.setState({ amount: parseInt(ev.currentTarget.value, 10) }); } } />
        <select
          value={ this.state.currency }
          onKeyDown={ this.props.onKeyDown }
          onChange={ (ev) => { this.setState({ currency: ev.currentTarget.value }); } } >
          { currencies.map(currency => (<option key={ currency } value={ currency }>{ currency }</option>)) }
        </select>
        <button
          className='btn btn-info btn-xs textarea-save-btn'
          onClick={ this.updateData }>
          save
        </button>
      </span>
    );
  }
}