mapboxgl.accessToken ="pk.eyJ1IjoidHJhbnNpcmVudCIsImEiOiJja255bXRtZGowbHF0MnBvM3U4d2J1ZG5vIn0.IVcxB9Xw6Tcc8yHGdK_0zA";
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

const center = [13.388934755146948, 52.51391886345337];
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v11", // style URL
  center: center,
  doubleClickZoom: false, // if you want to disable double click to zoom
  zoom: 11, // starting zoom
});

const nav = new mapboxgl.NavigationControl();
map.addControl(nav, "top-left");

const popup = new mapboxgl.Popup({
  closeButton: true,
  closeOnClick: false,
  closeOnMove: false,
  offset: [0, -30]
});

let markers = [];
let coordinates = [];
let marker;



const addMarker = (event) => {
  coordinates = event.lngLat;
  marker = new mapboxgl.Marker({
    color: "red",
  })
    .setLngLat(coordinates)
    .addTo(map)
    .on("dragend", (event) => console.log(event.target._lngLat));
    popup
    .setLngLat(event.lngLat)
    .setHTML
    ('<form action="/new" method="POST"><div><a href="/new" style="text-decoration: none">Add a Späti Here 🎯</a></div></form><div><button>Remove Marker</button></div>')
  // .setMaxWidth('200px')
  // you can also add a form or button to send something off
  .addTo(map);
  console.log(coordinates);
  // removes but adds another marker to the same spot
  marker.getElement().addEventListener('click', () => {
    marker.remove();
  });
  // you could do an axios.post(to the server)
  // this would save the markers
  markers.push(coordinates);
  console.log(markers);
};

map.on("click", addMarker);

// axios.post('/', (req, res, next) => {
//   req.body = markers; 
// })
// .then((response) => {
//   console.log(response);
// }, (error) => {
//   next(error);
// });
