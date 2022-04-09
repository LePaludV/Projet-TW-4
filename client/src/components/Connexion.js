import React from 'react';

const Connexion = (props) => {
const sendName=(e)=>{
    e.preventDefault()
    var username=e.target[0].value
  

   
    fetch("/create",{
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body:JSON.stringify({"name":username})
})
    .then(res => res.json())
    .then(
      (result) => {
        props.setUser({name:username,token:result})
        localStorage.setItem({name:username,token:result});
      },
      (error) => {console.log(error);
      }
    ).then(
        console.log(props.user)
    )

}
    return (
        <div className="text-light">
            {props.user.name==null ? 
            <form onSubmit={(e)=>{sendName(e)}}>
            <label htmlFor="choose">Nom : </label>
            <input id="choose" name="user" required/>
            <button className='btn btn-sm btn-secondary'>Envoyer</button>
            <button className='btn btn-sm btn-secondary'>Anonyme</button>
            </form>
            :
            <span>Connecté sous le nom de {props.user.name}</span>}

        </div>
    );
};

export default Connexion;