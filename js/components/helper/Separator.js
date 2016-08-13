import React, {Component} from 'react';
import{
  View,
  StyleSheet,



} from 'react-native'

class Separator extends Component{

  render() {
    return(
      <View style={styles.separator}>
      </View>
    )
  }



}

var styles = StyleSheet.create({
  separator:{
    height:1,
    backgroundColor:'#DDDDDD',
    flex:1,
  }


});

module.exports=Separator;
