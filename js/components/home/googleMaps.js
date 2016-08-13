import React, { Component } from 'react';
import {MapView} from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, View, Text, Button, Icon } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import myTheme from '../../themes/base-theme';
import styles from './styles';

/*
const APIKEY = 'AIzaSyBU1hHi_2jz1bjkLiEZZMfn5VxJsxmyhT4';
https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=bar&key=AIzaSyBU1hHi_2jz1bjkLiEZZMfn5VxJsxmyhT4
var api = {

getRequest(long,lat){
  let longitude = long;
  let latitude = lat;
  console.log("nig"+latitude,longitude);
  var url ='https://maps.googleapis.com/maps/api/place/textsearch/json?key='+ APIKEY+'&query="bar"&location='+latitude+','+longitude+'&radius=8000';
  return fetch(url).then((res) => res.json());
}

};
*/

import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const homePlace = {description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = {description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

class Example extends Component{
  render() {
    return (
      <View>
      <GooglePlacesAutocomplete
        placeholder='Search'
        minLength={2} // minimum length of text to search
        autoFocus={false}
        fetchDetails={true}
        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
          console.log(data);
          console.log(details);
        }}
        getDefaultValue={() => {
          return ''; // text input default value
        }}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: 'AIzaSyBU1hHi_2jz1bjkLiEZZMfn5VxJsxmyhT4',
          language: 'en', // language of the results
          types: '(cities)', // default: 'geocode'
        }}
        styles={{
          description: {
            fontWeight: 'bold',
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
        }}

        currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
        currentLocationLabel="Current location"
        nearbyPlacesAPI='GooglePlacesSearchQuery' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GoogleReverseGeocodingQuery={{
          // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          components:'93635'

        }}
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          rankby: 'distance',
          types: 'food'
        }}


        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

        predefinedPlaces={[homePlace, workPlace]}
      />

      

      </View>
    );
  }
}


module.exports = Example;
