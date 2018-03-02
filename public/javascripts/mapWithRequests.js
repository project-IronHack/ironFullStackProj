$(document).ready(function(){


     //Se inicializa una variable loc para guardar el location
     var loc = {};
  
     //Se dibuja un mapa para que aparezca al cargar la página
     var map = new google.maps.Map(document.getElementById('map'), {
       center: {
         lat: 19.432608,
         lng: -99.133209
       },
       zoom: 15,
     });
 
     //Se obtienen los valores del input
     var input = document.getElementById("gmapInput");
     
     //Se define el autocomplete del input
     function autocomplete(fieldInput){
       const dropdown = new google.maps.places.Autocomplete(fieldInput);
       dropdown.addListener("place_changed", () => {
         console.log(dropdown)
         const place = dropdown.getPlace();
         //Se dibuja el mapa con los datos del input
         var map = new google.maps.Map(document.getElementById('map'), {
           center: {
             lat: place.geometry.location.lat(), 
             lng: place.geometry.location.lng(),
           },
           zoom: 15,
     
         });
         //Se asignan a loc las variables de latitud y longitud
         loc.lat = place.geometry.location.lat();
         loc.lng = place.geometry.location.lng();
     
         //Se dibuja el marcador
         var myMarker = new google.maps.Marker({
           position: loc,
           map: map,
           animation: google.maps.Animation.BOUNCE,
       });

       //cada que escriben
       getLocations(mySitters,map)


     })
     }
 
     
     autocomplete(input);
   
     let markers = []

 
      function getLocations (array,map){
            array.forEach(sitter => {
                axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${sitter.address.split(/[ ,]+/).join('+')}&key=AIzaSyBachfnIFkxYgJfgbHodhbwZDMQYuksFLc`)
                .then(function (response) {
                    console.log(response)
                    console.log(response.data.results[0].geometry.location)
                    let label = sitter.displayName;
                    let position ={
                    lat: response.data.results[0].geometry.location.lat,
                    lng: response.data.results[0].geometry.location.lng,
                    }
                    var pin = new google.maps.Marker({ position, map, label});
                    markers.push(pin)
                })
                .catch(function (error) {
                  console.log(error);
                });
            });
      }
   
      getLocations(mySitters,map)
        
  
})

  
  
