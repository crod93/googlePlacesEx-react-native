
const APIKEY = 'AIzaSyBU1hHi_2jz1bjkLiEZZMfn5VxJsxmyhT4';
module.exports = function (lat,long){

var url ="https://maps.googleapis.com/maps/api/place/nearbysearch/json?key="+ APIKEY+"&type=bar&location="+lat+","+long+"&radius=8000";

return fetch(url)
.then(function (res) {
  return res.json();

})
.then(function (json) {

  if(json.status=="OK"){
    return {
    data:json.results


  }
}

});



}
