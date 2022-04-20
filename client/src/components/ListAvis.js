import React from 'react';
import EtoileNoteAvis from './EtoileNoteAvis';

const ListAvis = (props) => {
    console.log("chargement avis");

    var listAvis = (props.newAvis).concat(props.avis)

    listAvis = props.listAvis.map((item) => ({"date":new Date(item.date),"nom":item.nom,"note":item.note,'text':item.text}))
    console.log(listAvis);
     
    return (
        <div className="list-group">
            <table className="table">
  <thead>
    <tr>
      <th scope="col">Nom</th>
      <th scope="col">Note</th>
      <th scope="col">Avis</th>
      <th scope="col">Date</th>
    </tr>
  </thead>
  <tbody>

            
            {listAvis.map((item) => (
              
               
                <tr key={item.date} >

                <th scope="row">{item.nom!=null? item.nom : <i>Anonyme</i>} </th>
                <td><EtoileNoteAvis note={item.note} /></td>
                <td>{item.text}</td>
                <td>{(item.date).getDate()}/{(item.date).getMonth()+1}/{(item.date).getUTCFullYear()}</td>
                </tr>
            ))}
            </tbody>
            </table>
        </div>
    );
};

export default ListAvis;