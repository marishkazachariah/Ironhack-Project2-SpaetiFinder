mapboxgl.accessToken ="pk.eyJ1IjoibXphY2hhcmlhaCIsImEiOiJja3RlNWt6dzIwNHJjMndxbjV3bnlpcmU2In0.7MRhuJXrG3GmAbv65IIEew";
const center = [13.4532321, 52.5331092];
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v11", // style URL
  center: center, // starting position [lng, lat]
  doubleClickZoom: false, // if you want to disable double click to zoom
  // get the location of the user using the navigator object
  // navigator.geolocation.getCurrentPosition(function(pos){console.log(pos.coords)});
  zoom: 12, // starting zoom
  // pitch: 100   // angle of how the map is tilted
});

const nav = new mapboxgl.NavigationControl();
map.addControl(nav, "top-left");

// add popup stickers/notifications to specific locations
// popups can be closed by user
const popup = new mapboxgl.Popup({
  closeButton: true,
});

popup
  .setLngLat(center)
  .setHTML("<h1>Hello 👋</h1>")
  // .setMaxWidth('200px')
  // you can also add a form or button to send something off
  .addTo(map);

// setting coordinates
const coords = [
    [13.405,  52.52],
    [13.6, 52.6]
]

coords.forEach(coord => {
    new mapboxgl.Marker({
        color: 'red',
        draggable: true // if you want to drag a marker 
    })
    .setLngLat(coord)
    .addTo(map);
})

const addMarker = event => {
    new mapboxgl.Marker({
        color: "red",
      })
        .setLngLat(event.lngLat)
        .addTo(map)
        .on('dragend', event => console.log(event.target._lngLat));
        // you could do an axios.post(to the server)
        // this would save the markers 
}

map.on('click', addMarker);

// great to detect when user clicks on a map and console log() it
map.on('click', (event) => {
    // console.log('i clicked on the map'); // detects click
    // console.log(event.lngLat);  // gets coordinate of mouse click on map

})

// setting a marker
new mapboxgl.Marker({
  color: "red",
})
  .setLngLat(center)
  .addTo(map);

