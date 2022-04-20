import React from 'react';

const BodyListAvis = (props) => {
    
        
            {props.listAvis.map((item) => {(
              const date= (new Date(item.date));
              return (
              <tr key={item.date} >

              <th scope="row">{item.nom!=null? item.nom : <i>Anonyme</i>} </th>
              <td><EtoileNoteAvis note={item.note} /></td>
              <td>{item.text}</td>
              <td>{(item.date).getDate()}/{(item.date).getMonth()+1}/{(item.date).getUTCFullYear()}</td>
              </tr>
          );
        })}
};

export default BodyListAvis;