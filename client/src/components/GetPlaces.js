import React,{useEffect} from 'react';
import GetLocation from "./GetLocation";
import L from "leaflet";



const GetPlaces = (props) => {
// let places=props.places
console.log('Starting filter places');

/*
    useEffect(() => {
        fetch(" /listPlaces")
          .then(res => res.json())
          .then(
            (result) => {
                places= result;
            },
            // Remarque : il faut gérer les erreurs ici plutôt que dans
            // un bloc catch() afin que nous n’avalions pas les exceptions
            // dues à de véritables bugs dans les composants.
            (error) => {console.log(error);
            }
          )
      }, []);*/
    
/*const places=[
    {
        "Titre":'Maire Albi',
        "lat":43.9271011353,
        "lng":2.14633989334,
        "addr":"16 Rue de l'Hôtel de ville, 81000 Albi",
        "info":null
},{
    "Titre":'Quelque part en Algérie',
        "lat":23.9271011353,
        "lng":2.14633989334,
        "addr":"not found",
        "info":null
}
];*/

//const userLocation=GetLocation().coordinates;

//  console.log("userLocation :", userLocation);

// Tu utilises l’équation cartésienne d’un cercle de centre de coordonnées (a,b) et de rayon 
//R : (x - a)² + (y - b)² = R²
// De fait, tu n’as plus qu’à tester, pour ton point de coordonnées (x, y), si il vérifie l’inégalité: (x - a)² + (y - b)² < R²




const Rayon=5//Rayon de 5km doit être modifiable
console.log(props.location)
const lieuxDansLeRayon =(Rayon,point,lieu)=>{
var monPoint = L.latLng([point.lat,point.lng]);
var pointDuLieu=L.latLng([lieu.latitude,lieu.longiture])
return (monPoint.distanceTo(pointDuLieu) <= Rayon*1000)
}
useEffect(() => {
    const validPlaces= props.places.filter(e=>lieuxDansLeRayon(Rayon,props.location.coordinates,e))
    console.log("Valide places "+validPlaces);
    props.setPlaces(validPlaces);
 
}, [])


return (null);
};






export default GetPlaces;