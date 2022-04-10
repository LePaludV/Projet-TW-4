import React from 'react';

const EtoileNoteAvis = (props) => {
    let stars = [];

    for (let i = 0; i < props.note; i++) {
        stars.push(<span key={i} class="icon" >★</span>);
    }

    for (let i = props.note; i < 5; i++) {
        stars.push(<span key={i} class="icon" style={{color:"darkgray"}} >★</span>);
    }
    return (
        <div>
            {stars}
        </div>
    );
};

export default EtoileNoteAvis;