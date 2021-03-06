import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

class LocationBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            surveys: [],
            loading: false,
            lat: [0,0,0,0],
            lon: [0,0,0,0],
            clicked: false //Prevents the user from spamming the click button and loading the surveys multiple times
        }
        this.getSurveysFromBeach = this.getSurveysFromBeach.bind(this);
        this.createHTMLForEntries = this.createHTMLForEntries.bind(this);
        this.getLatLon = this.getLatLon.bind(this);
    };

    // Called when a user expands the accordion
    // Fetches surveys listed under the beach that is clicked
    getSurveysFromBeach() {
        this.setState({clicked: true, loading: true});
        let beachID = this.props.location._id;

        axios.get('/beaches/' + beachID)
          .then(res => {
            this.setState({loading: false});
            // For every month returned by the get request, render html that links to survey page
            // Then append that html to the surveysHTML array, which is then updated to the state
            for (let month of Object.keys(res.data)) {
                let survey = res.data[month]
                this.createHTMLForEntries(month, survey);

            }
          })
          .catch(err => {
            console.log(err);
          })
      }

    

    // returns HTML for every entry in the sorted array of locations
    // should display date and contain a link to specific survey page
    createHTMLForEntries(month, survey) {
        let surveyID = survey.survey;
        let promise = [];
        let surveyDay;
        //We need to use a promise here because we want the surveys to be displayed in
        //the correct order, ie by date
        promise.push(axios.get(`/beaches/surveys/${surveyID}/date`));

        axios.all(promise)
            .then(response => {
                response.map(res => surveyDay = new Date(res.data));
            })
            .then(() => {
                let surveysHTML = this.state.surveys;
                surveysHTML.push(
                    <li key={`entry-${surveyID}`}>
                        <Link className="uk-link-muted"
                        to={{ pathname: `/surveys/${surveyID.replace(' ', '-')}`,
                                state: {beachName: this.props.location.n, surveyID: surveyID, info: this.props.location,
                                userProfile: this.props.userProfile} }}>
                            {surveyDay.toLocaleDateString()}
                        </Link>
                    </li>
                );
                this.setState({surveys: surveysHTML})
            })
    }

    getLatLon() {
        let beachID = this.props.location._id;
        axios.get(`/beaches/${beachID}/coords`)
          .then( res => {
            let lat = res.data.lat;
            let latDeg = Math.floor(lat);
            let tempDecimal = (lat - latDeg) * 60;
            let latMin = Math.floor(tempDecimal);
            let latSec = (tempDecimal - latMin) * 60;
            latSec = (Math.trunc((latSec*100))/100);
            let latDir = Math.sign(latDeg);
            latDeg = latDeg * latDir;
            
            let lon = res.data.lon;
            let lonDeg = Math.floor(lon);
            tempDecimal = (lon - lonDeg) * 60;
            let lonMin = Math.floor(tempDecimal);
            let lonSec = (tempDecimal - lonMin) * 60;
            lonSec = (Math.trunc((latSec*100))/100);
            let lonDir = Math.sign(lonDeg);
            lonDeg = lonDeg * lonDir;

            this.setState({lat: [latDeg, latMin, latSec, latDir], lon: [lonDeg, lonMin, lonSec, lonDir]});
          })
    
      }

    handleAccordionClick = (e) => {
        if(this.state.surveys.length === 0 && !this.state.clicked)
            this.getSurveysFromBeach();

        let accordionWrapper = e.target.parentElement;
        let accordionContent = e.target.nextSibling;
        if (e.target.classList.contains('uk-text-muted')) {
          accordionWrapper = e.target.parentElement.parentElement;
          accordionContent = e.target.parentElement.nextSibling;
        }

        if (accordionWrapper.classList.contains('uk-open')) {
          accordionWrapper.classList.remove('uk-open');
          accordionContent.style.display = 'none';
        } else {
          accordionWrapper.classList.add('uk-open');
          accordionContent.style.display = 'block';
        }
    }

    componentDidMount() {
        //if(this.state.lat===[0,0,0] && this.state.lon===[0,0,0]){ 
          this.getLatLon();
        //} 
      }

    render() {
        let lat = this.state.lat;
        let lon = this.state.lon;
        return (
        <div className="uk-card uk-card-default uk-card-body uk-margin ">
            <div>
                <ul className="uk-accordion uk-margin-remove-bottom">
                    <li>
                        <span className="survey-bar uk-accordion-title uk-margin-remove-bottom" onClick={this.handleAccordionClick}>
                        <Link to={{ pathname: `/location/${this.props.path}`, state: { data: this.props.location, userProfile: this.props.userProfile  } }} style={{ textDecoration: 'none', color: 'black'  }}>
                            {this.props.location.n}
                            </Link>
                            <div className="uk-text-muted uk-text-small uk-margin-remove-bottom">
                                {lat[0]}&deg;{lat[1]}'{lat[2]}''{(lat[3]===1) ? 'N' : 'S'} {lon[0]}&deg;{lon[1]}'{lon[2]}''{(lon[3]===1) ? 'E' : 'W'}
                            </div>
                        </span>
                        <div className="uk-accordion-content" style={{ display: 'none' }}>
                        <p>
                        <Link to={{ pathname: `/location/${this.props.path}`, state: { data: this.props.location,
                                    userProfile: this.props.userProfile } }}>
                                    Go to location page
                        </Link>
                            </p>
                            <ul className="uk-list uk-list-bullet uk-padding-remove-left">
                                {this.state.loading ? "Loading surveys..." : this.state.surveys}
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
    }
}
export default LocationBar;
