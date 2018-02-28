    //Se inicializa una variable loc para guardar el location
    var loc = {};

    //Se dibuja un mapa para que aparezca al cargar la página
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: 25, 
        lng: -80,
      },
      zoom: 15,
    });
    
    //Se obtienen los valores del input
    var input = document.getElementById("gmapInput");
    
    //Se define el autocomplete del input
    function autocomplete(input){
      const dropdown = new google.maps.places.Autocomplete(input);
      dropdown.addListener("place_changed", () => {
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
    })
    }
    
    autocomplete(input);