'use strict';

import React, { Component } from 'react';
import {RefreshControl} from 'react-native';
import { connect } from 'react-redux';
import { openDrawer } from '../../actions/drawer';
import { replaceRoute } from '../../actions/route';
import { Container, Header, Title, Content, View, Text, Button, Icon} from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import myTheme from '../../themes/base-theme';
import styles from './styles';
import api from './api.js';
import Lists from './list.js';
import PTRView from 'react-native-pull-to-refresh';
import SpinnerNB from '../loaders/Spinner.ios.js'

class Home extends Component {

    replaceRoute(route) {
        this.props.replaceRoute(route);
    }

    constructor(props){
      super(props);
      this.state={
        initialLognitude:0,
        initialLatitude:0,
        lastLognitude:0,
        lastLatitude:0,
        responseRecived:false,




      };
    }
    componentWillMount(){
      navigator.geolocation.getCurrentPosition(
          (position) => {
            let initialLog = JSON.stringify(position.coords.longitude);
            this.setState({initialLognitude:initialLog});
            let initialLat = JSON.stringify(position.coords.latitude);
            this.setState({initialLatitude:initialLat});

          },
          (error) => alert(error.message),
          {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );

        this.watchID = navigator.geolocation.watchPosition((position) => {
          let lastLong = JSON.stringify(position.coords.longitude);
          this.setState({lastLognitude:lastLong});
          let lastLat = JSON.stringify(position.coords.latitude);
          this.setState({lastLatitude:lastLat});
        });



    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
}
  _displayResults(){
    if(!this.state.responseRecived){

    api(this.state.lastLatitude,this.state.lastLognitude).then((res) => {

      if(res == null){
        console.log('null',res);

        this.setState({response:'no results found, please refresh to try again'});

      }
      else{

      this.setState({
        response:res,
        responseRecived:true

      });


    }

  }).done();

}
  else {
    return;
      }

  }
  _displayList(){
    return <Lists response={this.state.response} myLat={this.state.lastLatitude} myLog={this.state.lastLognitude}/>

  }

  _refresh() {
  return new Promise((resolve) => {
    setTimeout(()=>{resolve()}, 2000)
  });
}
  render() {
      return (

            <Container theme={myTheme}style={{backgroundColor: '#F7F5F7'}}>

                <Header style={{backgroundColor:'#00A7E1'}}>
                    <Button transparent onPress={() => this.replaceRoute('login')}>
                        <Icon name='ios-power' />
                    </Button>

                    <Title>Bar Hoper</Title>

                    <Button transparent onPress={this.props.openDrawer}>
                        <Icon name='ios-menu' />
                    </Button>

                </Header>

                <Content>
                  <PTRView onRefresh={this._refresh()} >
                  <View style={styles.locationContain}>

                  <Text style={styles.locationText}>Current Location:{this.state.lastLatitude}, {this.state.lastLognitude}</Text>

                  </View>

                   {this._displayResults()}
                  {this.state.responseRecived ? this._displayList() : <SpinnerNB animating={!this.state.responseRecived}/>}
                  </PTRView>

                  </Content>


            </Container>
        );
    }
}

function bindAction(dispatch) {
    return {
        openDrawer: ()=>dispatch(openDrawer()),
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

export default connect(null, bindAction)(Home);
