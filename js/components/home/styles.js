
'use strict';

var React = require('react-native');

var { StyleSheet } = React;

module.exports = StyleSheet.create({
    row: {
    	flex: 1,
    	alignItems: 'center'
    },
    text: {
        fontSize: 13,
        color: '#070706',
        alignItems: 'center'
    },
    locationText:{
      fontSize: 13,
      color: '#FFFFFF',
      alignItems: 'center',
      marginLeft:15,
      marginBottom:5

    },
    mapStyle:{
      flex:2,
      height:200,
    },
    listItemContain:{
      padding:30

    },
    thumbnailStyle:{
    },
    title:{
      fontSize:20,
      color:'#FF9B42'

    },
    locationContain:{
      backgroundColor:'#EDDEA4'
    }
});
