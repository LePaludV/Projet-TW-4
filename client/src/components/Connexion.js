import React,{useState} from 'react';

const Connexion = (props) => {
    const [logUser, setLogUser] = useState(null)
   
    //console.log((props.user.token));

const sendName=(e)=>{
    e.preventDefault()
    var username=e.target[0].value
    fetch("/create",{
        method:'POST',
        headers: {'Accept': 'application/json','Content-Type': 'application/json'},
        body:JSON.stringify({"name":username})})
    .then(res => res.json())
    .then(
      (result) => {
        var token =result.token
        props.setUser({name:username,token:token})
        localStorage.setItem("name",username)
        localStorage.setItem("token",token)
      },
      (error) => {console.log(error);
      }
    ).then(
        console.log(props.user)
    )

}

const sendToken=(e)=>{
    e.preventDefault()
    var token=e.target[0].value
    console.log("le token envoyé : "+token);
    fetch("/getUserInfo ",{
        method:'POST',
        headers: {'Accept': 'application/json','Content-Type': 'application/json'},
        body:JSON.stringify({"token":token})})
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result);
        var res=result[0]
        var name=res.username
        props.setUser({name:name,token:token})
        localStorage.setItem("name",name)
        localStorage.setItem("token",token)
        //setTrips(result.trips)
      },
      (error) => {console.log(error);
      }
    ).then(
        console.log(props.user)
    )
    

}


//ptit btn se connecter -> affiche un case pour demander le token + btn envoyer 
// pto btn s'inscrire -> affiche une case pour entrer un pseudo, quand send donne info nécessaire 
    return (
        <div className="text-light">
        {props.user.name==null ? (
        <>
            { logUser==null ? ( //L'user doit faire un choix entre connexion et inscription 
                <>
                    <a href='#' className='link link-secondary' onClick={()=>{setLogUser(true)}}>S'inscrire</a> /
                    <a href='#' className='link link-secondary' onClick={()=>{setLogUser(false)}}>Se connecter</a>
                </>
            ):(
                <>
                {logUser===true ? ( //Si on a pas récuperer les données utilisateur dans le localStorage
                        /*L'user a fait le choi de se connecter */ 
                        <div className="row">
                        <form className="col" onSubmit={(e)=>{sendName(e)}}>
                        <input placeholder="Entrez un nom d'utilisateur" id="choose" name="userNAME" required/>
                        </form>
                        <div className="col">
                        <a href="#" class="link link-secondary" onClick={()=>{setLogUser(null)}}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg></a></div>
                        </div>
                    
                ):(<> { logUser===false ?(
                        /*L'user a fait le choix de se connecter */
                        <div className="row">
                        <form className="col" onSubmit={(e)=>{sendToken(e)}}>
                        <input placeholder="Entrez votre token" id="choose" name="userID" required/>
                        </form>
                       <div className="col">
                        <a href="#" class="link link-secondary" onClick={()=>{setLogUser(null)}}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg></a>
                        </div>
                        </div>
                        )
                        :(<>error</>)
                }
                </>)}
                </>
            )
    
            }
        </>
        )
    :
    (<div> <span>Bienvenue {props.user.name} </span>
    <a href="#" class="link link-info" onClick={()=>{props.setInfoPerso(!props.infoPerso)}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
  </svg></a>

  {/* Deconnexion */}
  <a href="#" class="link link-danger" onClick={()=>{setLogUser(null); props.setUser({'name':null,'token':null})}}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
</svg></a>

  </div>
    )
    }
           

        </div>
    );
};

export default Connexion;