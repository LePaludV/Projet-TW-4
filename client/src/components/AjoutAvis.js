import React from 'react';
import txtLang from "../lang.json"

const AjoutAvis = (props) => {

    //console.log(props.avis);
    /*Liste d'avis de la forme : 

    avis ={
        [
            {nomDeUser,note,text,date}
        ]
    }
    */

    const sendAvis=(e)=>{
        e.preventDefault();

        var note = document.querySelector('input[name="stars"]:checked').value;
        var texte= e.target.texte.value;
        var avis ={"nom":props.user.name,"note":note,"text": texte,"date":new Date()};
        var tmp=props.newAvis;
        props.setNewAvis(tmp.concat(avis))

    }
    return (
      <div>
        <form
          onSubmit={(e) => {
            sendAvis(e);
          }}
        >
          <label htmlFor="rating"> Votre note :</label>

          <div class="rating">
            {" "}
            <label>
              <input type="radio" name="stars" value="1" />
              <span class="icon">★</span>
            </label>
            <label>
              <input type="radio" name="stars" value="2" />
              <span class="icon">★</span>
              <span class="icon">★</span>
            </label>
            <label>
              <input type="radio" name="stars" value="3" />
              <span class="icon">★</span>
              <span class="icon">★</span>
              <span class="icon">★</span>
            </label>
            <label>
              <input type="radio" name="stars" value="4" />
              <span class="icon">★</span>
              <span class="icon">★</span>
              <span class="icon">★</span>
              <span class="icon">★</span>
            </label>
            <label>
              <input type="radio" name="stars" value="5" />
              <span class="icon">★</span>
              <span class="icon">★</span>
              <span class="icon">★</span>
              <span class="icon">★</span>
              <span class="icon">★</span>
            </label>
          </div>
          {props.user.name!=null?<p>{txtLang[props.lang][15]} : {props.user.name}</p>: <p>{txtLang[props.lang][16]}</p> }
          
          
          <label htmlFor="texte"></label>
          <textarea
            className="form-control"
            placeholder="Mettez votre avis ici"
            id="texte"
            style={{ height: 100 + "px" }}
          ></textarea>
          <br />

          <button type="submit" className="btn btn-primary">
          {txtLang[props.lang][17]}
          </button>
        </form>
      </div>
    );
};

export default AjoutAvis;