'use strict';
import React, { Component } from 'react';
import{MapView,Modal} from 'react-native';
import { connect } from 'react-redux';
import { replaceOrPushRoute } from '../../actions/route';
import { openDrawer, closeDrawer } from '../../actions/drawer';
import { Container, Header, Title, Content, View, Text, Button, Icon, List, ListItem, Thumbnail} from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import Separator from '../helper/Separator.js'
import myTheme from '../../themes/base-theme';
import styles from './styles';
import PlaceItem from './placeDetails.js';

const aspectZoom = 1.7; // controlls the zoom of the map
//add to markers, tintColor: MapView.PinColors.PURPLE to change pin color


class Lists extends Component {

  constructor(props){
    super(props);
    this.state={
      listData:this.props.response.data,
    }
  }

_displayMod(){
  //
  console.log('display list item');

}



  _getList() {
  return this.state.listData.map((data, i) => {
    return(

      <View key={i}>
      <ListItem style={styles.listItemContain}>
      <Button transparent onPress={this._displayMod.bind(this)}>

        <View>
        <Thumbnail source={{uri: data.icon}}  style={styles.thumbnailStyle}/>
        <Text style={styles.title}>{data.name}</Text>
        <Text note style={styles.text}>{data.vicinity}</Text>
        </View>
          </Button>

      </ListItem>
      </View>

    );
  });
}

_handleAnnotations(){

  if(this.state.listData != null){

  var markers = this.state.listData.map(function(v){
    return {
       latitude:v.geometry.location.lat,
       longitude:v.geometry.location.lng,
       title:v.name
    }
    });
  }
console.log(markers);
}

rad2deg(rad){
return  rad * (180/Math.PI);

}
deg2rad(deg){
return deg * (Math.PI/180);
}


  render(){
    // zoom region
    var region = {
      latitude:Number(this.props.myLat),
      longitude:Number(this.props.myLog),
      latitudeDelta:0,
      longitudeDelta:0
    };
    var radiusInRad = aspectZoom / 6371;//aspectZoom/radius of the earth in KM
    region.longitudeDelta = this.rad2deg(radiusInRad / Math.cos(this.deg2rad(region.latitude)));
    region.latitudeDelta = aspectZoom * this.rad2deg(radiusInRad);


    // annotations
    if(this.state.listData != null){

    var markers = this.state.listData.map(function(v){
      return {
         latitude:v.geometry.location.lat,
         longitude:v.geometry.location.lng,
         title:v.name,
      }
      });
    }


    return(
      <View>



      <MapView
      style={styles.mapStyle}
      showsUserLocation={true}
      region={region}
      annotations={markers}

      />
      <Separator/>


      <List>


      {this._getList()}


      </List>
      </View>
    );






  }



}





module.exports = Lists;
