import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {locationSort} from '../_helpers/SortHelper';


//We're gonna have to add an on click event for the custom marker, and have a route that will take 
//the user to the page


class CustomMarker extends Component {

  constructor(props){
    super(props);
    this.state = {
      displayText : ""
    };
    this.onMouseOut = this.onMouseOut.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
  }

  onMouseOut() {
    this.setState( {displayText : ""} );
  }

  onMouseOver(){
    this.setState( {displayText : this.props.text} );
  }

  render(){
    const style = this.props.$hover ? "custom-marker-hover" : "custom-marker";
    const beachName = this.props.$hover ? this.props.text : "";
    const beachBubble = this.props.$hover ? "tooltiptext" : "";
    let path = this.props.text.replace(/\s/g, '');
    /*let extractedData = {
      name: this.props.text,
      lat: this.props.location.lat,
      lon: this.props.location.lon,
      entries: [this.props.location]
    };*/
    //console.log(extractedData)
    return(
      <div>
        <Link className={style} to={{ pathname: `/location/${path}`, state:  {data: this.props.location }} }>
          <span className = {beachBubble}>
            {beachName}
          </span>
        </Link>
      </div>
    );
  }
}


class Map extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
    this.pollInterval = null;
    this.url = '/beaches';
  }

  loadCommentsFromServer() {
    axios.get(this.url + "/verbose")
      .then(res => {
        this.setState({ data: res.data });
        console.log("Beaches");
        console.log(res.data);
      })
  }

  componentDidMount() {
    if (!this.pollInterval) {
      this.pollInterval = setInterval(this.loadCommentsFromServer, 2000)
    }
  }

  //when incorporating into another project
  //(with react-router for instance),
  //this will prevent error messages every 2 seconds
  //once the SurveyBox is unmounted
  componentWillUnmount() {
    // eslint-disable-next-line
    this.pollInterval && clearInterval(this.pollInterval);
    this.pollInterval = null;
  }
  static defaultProps = {
     center: {lat: 36.965652,lng: -121.954729},
     zoom: 13
   };


   render(){
     
    //const sortedData = locationSort(this.state.data);
    const GoogleMapsMarkers = this.state.data.map((comment) => (
      (comment.lat && comment.lon)
      ? <CustomMarker
          key={comment._id}
          lat={comment.lat}
          lng={comment.lon}
          text={comment.n}
          location={comment}
          $hover={true}
        /> 
      : null
    ));
    return (
      <div style={{height: '500px', width: '100%'}}>
        <GoogleMapReact
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          
          
          bootstrapURLKeys={{
          key: ['AIzaSyC0KMFMCzYY0TZKQSSGyJ7gDW6dfBIDIDA']
          }}
        >
          { GoogleMapsMarkers }
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
