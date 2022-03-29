import React from 'react';
import GetLocation from "./GetLocation";

const getPlaces = () => {
    
const places=[
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
];

const userLocation=GetLocation().coordinates;

//  console.log("userLocation :", userLocation);

// Tu utilises l’équation cartésienne d’un cercle de centre de coordonnées (a,b) et de rayon 
//R : (x - a)² + (y - b)² = R²
// De fait, tu n’as plus qu’à tester, pour ton point de coordonnées (x, y), si il vérifie l’inégalité: (x - a)² + (y - b)² < R²


const Rayon=0.5/80//Rayon de 5km doit être modifiable

const estDansLeRayon=(userLocation,x,y,R)=>{
    return(((x-userLocation.lng)**2 + (y-userLocation.lat)**2)<R**2)
}

const validPlaces= places.filter(e=>estDansLeRayon(userLocation,e.lng,e.lat,Rayon))
//console.log(validPlaces);
return validPlaces;
};






export default getPlaces;