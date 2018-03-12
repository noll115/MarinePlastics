import React, { Component } from 'react';


class FormStep2 extends Component {
  render() {
    return (
      <form onSubmit={ this.props.handleSubmit }>

        <h2>Survey Area</h2>
        <label>Name of Beach</label>
        <input
          type='text'
          placeholder='Name of Beach'
          id='beach'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin'
        />
        <label>Reason for Location Choice</label>
        <input
          type='text'
          placeholder='Reason for Location Choice (ex. Proximity, Problem Spot, etc.)'
          id='reason'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin'
        />
        <label>Substrate Type</label>
        <input
          type='text'
          placeholder='Substrate Type (ex. Sand, Gravel, etc.)'
          id='st'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin'
        />
        <label>GPS Coordinates (Starting Point)</label>
        <input
          type='number'
          placeholder='Latitude'
          id='lat'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin'
        />
        <input
          type='number'
          placeholder='Longitude'
          id='lon'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin'
        />
        <label>Slope</label>
        <input
          type='text'
          placeholder='Slope (ex. Steep, Gradual, Gentle, etc.)'
          id='slope'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin'
        />
        <label>Nearest River Output</label>
        <input
          type='text'
          placeholder='Name'
          id='nroName'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin'
        />
        <input
          type='number'
          placeholder='Distance (m)'
          id='nroDist'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin'
        />
        <label>Aspect</label>
        <input
          type='text'
          placeholder='(Compass direction facing water in degrees, perpendicular to spine)'
          id='aspect'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin'
        />
        <label>Tide Information</label>
        <input
          type='text'
          placeholder='Last Tide / Height'
          id='lastTide'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin'
        />
        <input
          type='text'
          placeholder='Next Tide / Height'
          id='nextTide'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin'
        />
        <label>Wind Direction</label>
        <input
          type='text'
          placeholder='Wind Speed/Direction'
          id='windDir'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin'
        />
        <label>Major Usage</label>
        <input
          type='text'
          placeholder='(ex. Recreational, Commercial, Remote/Unused, Private, etc.)'
          id='majorUse'
          onChange={ this.props.handleInputChange }
          className='uk-input uk-margin'
        />
        {/* <input
          type='submit'
          target="_top"
          value='Submit'
          className='uk-button uk-button-primary'
        /> */}
      </form>
    )
  }
}

export default FormStep2;
