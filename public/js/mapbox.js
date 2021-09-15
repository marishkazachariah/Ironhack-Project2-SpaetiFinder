mapboxgl.accessToken =
  "pk.eyJ1IjoidHJhbnNpcmVudCIsImEiOiJja255bXRtZGowbHF0MnBvM3U4d2J1ZG5vIn0.IVcxB9Xw6Tcc8yHGdK_0zA";
const mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
let address = [];

// setting up
axios.get("/spaeti/").then((res) => {
  const spaetis = res.data;
  spaetis.forEach((spaeti) => {
    address.push(spaeti.location.address.street);
  });
  console.log(address);
});

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
  closeOnClick: false,
  closeOnMove: false,
  offset: [0, -30]
});

// setting coordinates
const coords = [
  [13.405, 52.52],
  [13.6, 52.6],
];


coords.forEach((coord) => {
  new mapboxgl.Marker({
    color: "red",
    draggable: true, // if you want to drag a marker
  })
    .setLngLat(coord)
    .addTo(map);
});

let markers = [];
let coordinates = [];
let marker;
const addMarker = (event) => {
  marker = new mapboxgl.Marker({
    color: "red",
  })
    .setLngLat(event.lngLat)
    .addTo(map)
    .on("dragend", (event) => console.log(event.target._lngLat));
    popup
    .setLngLat(event.lngLat)
    .setHTML('<div><a href="/new" style="text-decoration: none">Add a Späti Here 🎯</a></div><div><button onClick="removeMarker">Remove Marker</button></div>')
  // .setMaxWidth('200px')
  // you can also add a form or button to send something off
  .addTo(map);
  // you could do an axios.post(to the server)
  // this would save the markers
};

map.on("click", addMarker);

// figure out how to remove marker
function removeMarker() {
  //marker.remove();
  console.log("remove");
}
// function removeMarker() {
//   marker.getElement().addEventListener('click', () => {
//     marker.remove();
//   });
// }

// removes but adds another marker to the same spot
// map.on('click', (event) => {
//   marker.getElement().addEventListener('click', () => {
//     marker.remove();
//   });
// })

// setting a marker
// new mapboxgl.Marker({
//   color: "red",
// })
//   .setLngLat(center)
//   .addTo(map);
