import React, { Component } from 'react';
import Auth from '../Auth';
import axios from 'axios';

import SurveyTableRow from './SurveyTableRow';

class SurveyEntry extends Component {
  constructor(props) {
    super(props);
    let { beachName, surveyID } = props.match.params;
    console.log(props.match);
    

    this.state = {
      beachName,
      surveyID,
      surveyData:{}
    };
    this.getsurveyData = this.getSurvey.bind(this);
    this.auth = new Auth();
  }

  getSurvey() {
    axios.get(`/beaches/${this.state.surveyID}`)
      .then(res => {
        this.setState({ surveyData: res.data});
      })
      .catch(err => {
        console.log(err);
      });
  }

  // once the component is on the page, gets the surveyData from the server
  componentDidMount() {
    this.getSurvey();
  }

  render() {
    // initializes to null because when component mounts, there is no data yet
    let SRSRows = null;
    let ASRows = null;

    // if there is data (which is once the component mounts)
    if (this.state.surveyData.SRSData) {
      // for every type of trash, return a surveyTableRow component with the data
      SRSRows = this.state.surveyData.SRSData.map((type, i) => {
        return (
          <SurveyTableRow
            key={type._id}
            name={type.name}
            fresh={type.fresh}
            weathered={type.weathered}
          />
        );
      });

      ASRows = this.state.surveyData.ASData.map((type, i) => {
        return (
          <SurveyTableRow
            key={type._id}
            name={type.name}
            fresh={type.fresh}
            weathered={type.weathered}
          />
        );
      });

      document.getElementById('SRS-section').style.display = this.state.surveyData.SRSData.length > 0 ? 'block' : 'none';
      document.getElementById('AS-section').style.display = this.state.surveyData.ASData.length > 0 ? 'block' : 'none';
    }

    if (this.state.surveyData.weight || this.state.surveyData.NumberOfPeople) {
      document.getElementById('b-cleanup-section').style.display = 'block';
    }

    if (
      this.state.surveyData.lat || this.state.surveyData.lon ||
      this.state.surveyData.reason || this.state.surveyData.st ||
      this.state.surveyData.slope || this.state.surveyData.aspect ||
      this.state.surveyData.majorUse || this.state.surveyData.lastTide ||
      this.state.surveyData.nextTide || this.state.surveyData.nroDist ||
      this.state.surveyData.nroName || this.state.surveyData.windDir
    ) {
      document.getElementById('survey-area-section').style.display = 'block';
    }

    if (this.state.surveyData.lastTide || this.state.surveyData.nextTide) {
      document.getElementById('tide-section').style.display = 'block';
    }

    return (
      <div>
        <h2 className="uk-text-primary uk-heading-primary">
          {this.state.surveyData.beach}
          <span className="uk-text-muted uk-text-large uk-margin-left">
            {this.state.surveyData.date}
          </span>
        </h2>
        <div className="uk-grid uk-grid-large uk-grid-match uk-child-width-1-2">
          <div>
            <div className="uk-card uk-card-default uk-card-body">
              <h3 className="uk-card-title">Team Information</h3>
              <p><strong>Team Leader:</strong> {this.state.surveyData.user}</p>
              <p><strong>Organization:</strong> {this.state.surveyData.org}</p>
              <p><strong>Email:</strong> {this.state.surveyData.email}</p>
            </div>
          </div>
          <div id="survey-area-section" style={{ display: 'none' }}>
            <div className="uk-card uk-card-default uk-card-body">
              <h3 className="uk-card-title">Survey Area</h3>
              {
                this.state.surveyData.lat && this.state.surveyData.lon ?
                  <p><strong>GPS Coordinates:</strong> {this.state.surveyData.lat}, {this.state.surveyData.lon}</p> : null
              }
              {
                this.state.surveyData.reason ?
                  <p><strong>Reason for Location Choice:</strong> {this.state.surveyData.reason}</p> : null
              }
              {
                this.state.surveyData.majorUse ?
                  <p><strong>Major Use:</strong> {this.state.surveyData.majorUse}</p> : null
              }
              {
                this.state.surveyData.st ?
                  <p><strong>Substrate Type:</strong> {this.state.surveyData.st}</p> : null
              }
              {
                this.state.surveyData.slope ?
                  <p><strong>Beach Slope:</strong> {this.state.surveyData.slope}</p> : null
              }
              {
                this.state.surveyData.aspect ?
                  <p><strong>Beach Aspect:</strong> {this.state.surveyData.aspect}</p> : null
              }
              {
                this.state.surveyData.windDir ?
                  <p><strong>Wind Direction:</strong> {this.state.surveyData.windDir}</p> : null
              }
              {
                this.state.surveyData.nroName ?
                  <p><strong>Nearest River:</strong> {this.state.surveyData.nroName}</p> : null
              }
              {
                this.state.surveyData.nroDist ?
                  <p><strong>Distance to Nearest River:</strong> {this.state.surveyData.nroDist}m</p> : null
              }
            </div>
          </div>
          <div id="b-cleanup-section" className="uk-grid-margin uk-margin-bottom" style={{ display: 'none' }}>
            <div className="uk-card uk-card-default uk-card-body">
              <h3 className="uk-card-title">Basic Clean Up</h3>
              {
                this.state.surveyData.NumberOfPeople ?
                  <p><strong>Number of People:</strong> {this.state.surveyData.NumberOfPeople}</p> : null
              }
              {
                this.state.surveyData.weight ?
                  <p><strong>Total Weight:</strong> {this.state.surveyData.weight}</p> : null
              }
            </div>
          </div>
          <div id="tide-section" className="uk-grid-margin uk-margin-bottom" style={{ display: 'none' }}>
            <div className="uk-card uk-card-default uk-card-body">
              <h3 className="uk-card-title">Tide Information</h3>
              <h4>The Last Tide</h4>
              <div>
                {
                  this.state.surveyData.lastTide ?
                    (<div>
                      <p><strong>Type:</strong> {this.state.surveyData.lastTide.type}</p>
                      <p><strong>Time:</strong> {this.state.surveyData.lastTide.time}</p>
                      <p><strong>Height:</strong> {this.state.surveyData.lastTide.height}</p>
                    </div>) : null
                }
              </div>
              <h4>The Next Tide</h4>
              <div>
                {
                  this.state.surveyData.nextTide ?
                    (<div>
                      <p><strong>Type:</strong> {this.state.surveyData.nextTide.type}</p>
                      <p><strong>Time:</strong> {this.state.surveyData.nextTide.time}</p>
                      <p><strong>Height:</strong> {this.state.surveyData.nextTide.height}</p>
                    </div>) : null
                }
              </div>
            </div>
          </div>
        </div>
        <div id="SRS-section" style={{ display: 'none' }}>
          <h3>Surface Rib Scan Survey</h3>
          <table className="uk-table uk-table-striped">
            <thead>
              <tr>
                <th>Debris Type</th>
                <th>Amount Fresh</th>
                <th>Amount Weathered</th>
              </tr>
            </thead>
            <tbody>
              {SRSRows}
            </tbody>
          </table>
        </div>
        <div id="AS-section" style={{ display: 'none' }}>
          <h3>Accumulation Survey</h3>
          <table className="uk-table uk-table-striped">
            <thead>
              <tr>
                <th>Debris Type</th>
                <th>Amount Fresh</th>
                <th>Amount Weathered</th>
              </tr>
            </thead>
            <tbody>
              {ASRows}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default SurveyEntry;