mapboxgl.accessToken =
  "pk.eyJ1IjoidHJhbnNpcmVudCIsImEiOiJja255bXRtZGowbHF0MnBvM3U4d2J1ZG5vIn0.IVcxB9Xw6Tcc8yHGdK_0zA";
const mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });

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
  offset: [0, -30],
});

// let markers = [];
let coordinates = [];
let marker;
let street;
let city;
let plz;

const addMarker = (event) => {
  coordinates = event.lngLat;
  marker = new mapboxgl.Marker({
    color: "red",
  })
    .setLngLat(coordinates)
    .addTo(map)
    .on("dragend", (event) => console.log(event.target._lngLat));
  popup
    .setLngLat(coordinates)
    .setHTML(
      '<form action="/new" method="POST"><div><button type="submit">Add a Späti Here 🎯</button></div></form><div><button>Remove Marker</button></div>'
    )
    // .setMaxWidth('200px')
    // you can also add a form or button to send something off
    .addTo(map);
  console.log(coordinates);
  const lat = coordinates.lat;
  const long = coordinates.lng;

  // Add the geocoder to the map.
  map.addControl(
    new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    })
  );

  mapboxClient.geocoding
  .reverseGeocode({
    query: [long, lat]
  })
  .send()
  .then(function(response) {
    if (
      response &&
      response.body &&
      response.body.features &&
      response.body.features.length
    ) {
      // var feature = response.body.features[0];
      // console.log(feature);
      const fullAddress = response.body.features[0].place_name;
      const splitAddress = fullAddress.split(',');
      const plzCity = splitAddress[1].split(' ');
      street = splitAddress[0];
      plz = plzCity[1];
      city = plzCity[2];
    }
  });
  // removes but adds another marker to the same spot
  marker.getElement().addEventListener("click", () => {
    marker.remove();
  });
  // you could do an axios.post(to the server)
  // axios
  //   .post("/new")
  //   .then(response => {
  //     console.log(response.data[0]);
  //   })
  //   .catch(error => {
  //     console.log(error.response);
  //   });

  // to do: post to street, plz, city and replace innertext with variables: street, plz, city
  // axios.post('/new', {
  //   street: document.getElementById('street').value,
  //   plz: document.getElementById('zip').value,
  //   city: document.getElementById('city').value
  // })
  // .then(createdAddress => {
  //   console.log(createdAddress)
  // })
};


map.on("click", addMarker);

// show the createdSpäti on the map as a marker
axios.get('/spaeti/')
  .then(res => {
    //console.log(res)
    const spaetis = res.data
    for (let i = 0; i < spaetis.length; i++) {
      const coord = [spaetis[i].longitude, spaetis[i].latitude]
      //console.log(coord)
      addMarker2(coord)
     }
  })

  async function addMarker2 (coord) {
    //console.log(mapboxgl)
    await new mapboxgl.Marker({
        color: "red",
      })
        .setLngLat(coord)
        .addTo(map) 
}
  