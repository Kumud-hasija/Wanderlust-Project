
  mappboxgl.accessToken=mapToken;

  const map = new mapboxgl.Map({
    container:'map',
    style:'mapbox://styles/mapbox/streets-v12',
    center:listing.geometry.coordinates,
    zoom:9,
  });


  const marker = new mapboxgl.Marker({color:"red"})
  .setLngLat( listing.geometrycoordinates )
  .setPopup(
    new mapboxgl.Popup({offset:25}).setHTML(
      `<h4>${listing.loaction}</h4><p>Exact location provided after booking</p>`
    )
  )
  .addTo(map);