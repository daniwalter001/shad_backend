let a = "Daniel"

let getSouscriptionMailBody = (details = {}) => {

  let { souscripteur, souscription_type, cs } = details

  let souscription_mail = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Health+</title>
        <style>
            @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,300;0,500;0,600;0,700;1,100;1,300;1,400;1,500;1,700&family=Russo+One&display=swap");
        </style>
    </head>
    
    <body>
        <div style="
            background-color: rgb(243 244 246);
            border: 2px solid #ddd;
            margin-left: auto;
            margin-right: auto;
            color: black;
            padding: 14px;
            width: 400px;
            font-family: Poppins;
          ">
            <span style="
              font-weight: bold;
              color: #6e50c2;
              font-size: 20px;
              text-transform: uppercase;
              display: block;
            ">
                Health+
            </span>
            <span style="
              font-weight: 500;
              font-size: 16px;
              margin-top: 8px;
              display: block;
            ">
                Demande de souscription
            </span>
            <div style="
              display: flex;
              width: 100%;
              height: 1px;
              background-color: white;
              margin-top: 16px;
              margin-bottom: 16px;
            "></div>
            <div style="font-weight: 400; color: black; opacity: 0.7; font-size: 14px">
                Voici les informations relatives à votre demande de souscription :
    
                <code style="display: block; padding: 12px">
              <div><span>Nom du souscripteur : </span><span> ${souscripteur?.lastname} </span></div>
              <div><span>Prenoms du souscripteur : </span><span> ${souscripteur?.firstname} </span></div>
              <div><span>Email : </span><span> ${souscripteur?.email} </span></div>
              <div><span>Contact : </span><span> ${souscripteur?.phone} </span></div>
    
              <div
                style="
                  display: flex;
                  width: 100%;
                  height: 1px;
                  background-color: white;
                  margin-top: 16px;
                  margin-bottom: 16px;
                "
              ></div>
    
              <div><span>Centre de Santé : </span><span> ${cs?.designation} </span></div>
              <div><span>Email : </span><span> ${cs?.email} </span></div>
              <div><span>Contact : </span><span> ${cs?.contact} </span></div>
              <div><span>Adresse : </span><span> ${cs?.address} </span></div>
    
              <div
                style="
                  display: flex;
                  width: 100%;
                  height: 1px;
                  background-color: white;
                  margin-top: 16px;
                  margin-bottom: 16px;
                "
              ></div>
    
              <div><span>Type de souscription : </span><span> ${souscription_type?.type} </span></div>
              <div><span>Nombre de comptes : </span><span> ${souscription_type?.type} </span></div>
            </code>
    
                <div style="margin-top: 20px; margin-bottom: 20px">
                    Veuillez contacter l'administration pour recevoir la confirmation et
                    la validation de votre compte
                    <code style="display: block; padding: 12px">
                    <div><span>Email : </span><span>support@healthp.com</span></div>
                    <div><span>Contact : </span><span>+228 99101748</span></div>
                </code>
                </div>
                <div style="display: flex; flex-direction: column; align-items: flex-end">
                    <span>Merci de nous avoir choisi.</span>
                    <span style="margin-top: 8px; font-weight: bold; font-size: 16px">Health+</span>
                </div>
            </div>
        </div>
    </body>
    
    </html>`

  return souscription_mail
}


let getSouscriptionActivationMailBody = (details = {}) => {

  let { souscripteur, souscription_type, cs } = details

  let souscription_mail = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Health+</title>
        <style>
            @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,300;0,500;0,600;0,700;1,100;1,300;1,400;1,500;1,700&family=Russo+One&display=swap");
        </style>
    </head>
    
    <body>
        <div style="
            background-color: rgb(243 244 246);
            border: 2px solid #ddd;
            margin-left: auto;
            margin-right: auto;
            color: black;
            padding: 14px;
            width: 400px;
            font-family: Poppins;
          ">
            <span style="
              font-weight: bold;
              color: #6e50c2;
              font-size: 20px;
              text-transform: uppercase;
              display: block;
            ">
                Health+
            </span>
            <span style="
              font-weight: 500;
              font-size: 16px;
              margin-top: 8px;
              display: block;
            ">
                Demande de souscription
            </span>
            <div style="
              display: flex;
              width: 100%;
              height: 1px;
              background-color: white;
              margin-top: 16px;
              margin-bottom: 16px;
            "></div>
            <div style="font-weight: 400; color: black; opacity: 0.7; font-size: 14px">
                Voici les informations relatives à votre souscription :
    
                <code style="display: block; padding: 12px">
              <div><span>Nom du souscripteur : </span><span> ${souscripteur?.lastname} </span></div>
              <div><span>Prenoms du souscripteur : </span><span> ${souscripteur?.firstname} </span></div>
              <div><span>Email : </span><span> ${souscripteur?.email} </span></div>
              <div><span>Contact : </span><span> ${souscripteur?.phone} </span></div>
    
              <div
                style="
                  display: flex;
                  width: 100%;
                  height: 1px;
                  background-color: white;
                  margin-top: 16px;
                  margin-bottom: 16px;
                "
              ></div>
    
              <div><span>Centre de Santé : </span><span> ${cs?.designation} </span></div>
              <div><span>Email : </span><span> ${cs.email} </span></div>
              <div><span>Contact : </span><span> ${cs?.contact} </span></div>
              <div><span>Adresse : </span><span> ${cs?.address} </span></div>
    
              <div
                style="
                  display: flex;
                  width: 100%;
                  height: 1px;
                  background-color: white;
                  margin-top: 16px;
                  margin-bottom: 16px;
                "
              ></div>
    
              <div><span>Type de souscription : </span><span> ${souscription_type?.type} </span></div>
              <div><span>Nombre de comptes : </span><span> ${souscription_type?.type} </span></div>
            </code>
                <div style="margin-top: 20px; margin-bottom: 20px">
                    Veuillez contacter l'administration pour plus d'informations et de support.
                    <code style="display: block; padding: 12px">
                    <div><span>Email : </span><span>support@healthp.com</span></div>
                    <div><span>Contact : </span><span>+228 99101748</span></div>
                </code>
                </div>
                <div style="display: flex; flex-direction: column; align-items: flex-end">
                    <span>Merci de nous avoir choisi.</span>
                    <span style="margin-top: 8px; font-weight: bold; font-size: 16px">Health+</span>
                </div>
            </div>
        </div>
    </body>
    
    </html>`

  return souscription_mail
}

let getPraticienAddedMailBody = (details = {}) => {

  let { user, cs } = details

  console.log(user.lastname)
  console.log({ cs })

  let souscription_mail = `<!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Health+</title>
    <style>
      @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,300;0,500;0,600;0,700;1,100;1,300;1,400;1,500;1,700&family=Russo+One&display=swap");
    </style>
  </head>
  
  <body>
    <div style="
          background-color: rgb(243 244 246);
          border: 2px solid #ddd;
          margin-left: auto;
          margin-right: auto;
          color: black;
          padding: 14px;
          width: 400px;
          font-family: Poppins;
        ">
      <span style="
            font-weight: bold;
            color: #6e50c2;
            font-size: 20px;
            text-transform: uppercase;
            display: block;
          ">
        Health+
      </span>
      <span style="
            font-weight: 500;
            font-size: 16px;
            margin-top: 8px;
            display: block;
          ">
        Bienvenue chez Health+
      </span>
      <div style="
            display: flex;
            width: 100%;
            height: 1px;
            background-color: white;
            margin-top: 16px;
            margin-bottom: 16px;
          "></div>
      <div style="font-weight: 400; color: black; opacity: 0.7; font-size: 14px">
        Votre compte Health+ vient d'être créé. Voici les informations renseignées :
  
        <code style="display: block; padding: 12px">
            <div><span>Nom : </span><span> ${user?.lastname} </span></div>
            <div><span>Prenoms : </span><span> ${user?.firstname}</span></div>
            <div><span>Email : </span><span> ${user?.email}</span></div>
            <div><span>Contact : </span><span> ${user?.phone}</span></div>
            <div><span>Date de naissance  : </span><span> ${user?.birthdate}</span></div>
            <div><span>Nationalité : </span><span> ${user?.nationality}</span></div>
            <div><span>Specialité : </span><span> ${user?.specialite}</span></div>
            <div><span>Adresse : </span><span> ${user?.address}</span></div>
            <div><span>Centre de santé : </span><span> ${cs?.designation}</span></div>
        </code>
        <div style="
                display: flex;
                width: 100%;
                height: 1px;
                background-color: white;
                margin-top: 16px;
                margin-bottom: 16px;
              "></div>
        <div style="margin-top: 20px; margin-bottom: 20px">
          Informations par défaut de <a href="/login">connexion</a>
          <code style="display: block; padding: 12px">
            <div><span>ID/Email : </span><span>${user?.email}</span></div>
            <div><span>Mot de passe : </span><span>${user?.lastname?.toLowerCase()?.concat(user?.email)}</span></div>
        </code>
        </div>
        <div style="display: flex; flex-direction: column; align-items: flex-end">
          <span>Merci de nous avoir choisi.</span>
          <span style="margin-top: 8px; font-weight: bold; font-size: 16px">Health+</span>
        </div>
      </div>
    </div>
  </body>
  
  </html>`

  console.log({ souscription_mail })

  return souscription_mail
}

let getPatientAddedMailBody = (details = {}) => {

  let { patient } = details

  let souscription_mail = `<!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Health+</title>
    <style>
      @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,300;0,500;0,600;0,700;1,100;1,300;1,400;1,500;1,700&family=Russo+One&display=swap");
    </style>
  </head>
  
  <body>
    <div style="
          background-color: rgb(243 244 246);
          border: 2px solid #ddd;
          margin-left: auto;
          margin-right: auto;
          color: black;
          padding: 14px;
          width: 400px;
          font-family: Poppins;
        ">
      <span style="
            font-weight: bold;
            color: #6e50c2;
            font-size: 20px;
            text-transform: uppercase;
            display: block;
          ">
        Health+
      </span>
      <span style="
            font-weight: 500;
            font-size: 16px;
            margin-top: 8px;
            display: block;
          ">
        Bienvenue chez Health+
      </span>
      <div style="
            display: flex;
            width: 100%;
            height: 1px;
            background-color: white;
            margin-top: 16px;
            margin-bottom: 16px;
          "></div>
      <div style="font-weight: 400; color: black; opacity: 0.7; font-size: 14px">
        Votre compte Health+ vient d'être créé. Voici les informations renseignées :
  
        <code style="display: block; padding: 12px">
            <div><span>UID : </span><span> ${patient?.uid} </span></div>
            <div><span>Nom : </span><span> ${patient?.lastname} </span></div>
            <div><span>Prenoms : </span><span> ${patient?.firstname}</span></div>
            <div><span>Email : </span><span> ${patient?.email}</span></div>
            <div><span>Contact : </span><span> ${patient?.phone}</span></div>
            <div><span>Date de naissance  : </span><span> ${patient?.birthdate}</span></div>
            <div><span>Lieu de naissance  : </span><span> ${patient?.birthplace}</span></div>
            <div><span>Sexe  : </span><span> ${patient?.sexe}</span></div>
            <div><span>Groupe sanguin  : </span><span> ${patient?.blood}</span></div>
            <div><span>Rhésus : </span><span> ${patient?.rhesus}</span></div>
            <div><span>Nationalité : </span><span> ${patient?.country}</span></div>
            <div><span>Specialité : </span><span> ${patient?.profession}</span></div>
            <div><span>Etat civil : </span><span> ${patient?.etat_civil}</span></div>
            <div><span>Adresse : </span><span> ${patient?.address}</span></div>
            <div><span>Ville : </span><span> ${patient?.city}</span></div>
            <div><span>Perosnne d'urgence : </span><span> ${patient?.emergency_name}</span></div>
            <div><span>Contact d'urgence : </span><span> ${patient?.emergency_contact}</span></div>
        </code>
        <div style="
                display: flex;
                width: 100%;
                height: 1px;
                background-color: white;
                margin-top: 16px;
                margin-bottom: 16px;
              "></div>
        <div style="margin-top: 20px; margin-bottom: 20px">
          Informations par défaut de <a href="/login">connexion</a>
          <code style="display: block; padding: 12px">
            <div><span>ID/Email : </span><span>${patient?.email}</span></div>
            <div><span>Mot de passe : </span><span>${patient?.lastname?.toLowerCase()?.concat(patient?.email)}</span></div>
        </code>
        </div>
        <div style="display: flex; flex-direction: column; align-items: flex-end">
          <span>Merci de nous avoir choisi.</span>
          <span style="margin-top: 8px; font-weight: bold; font-size: 16px">Health+</span>
        </div>
      </div>
    </div>
  </body>
  
  </html>`

  return souscription_mail
}


module.exports = { getSouscriptionMailBody, getSouscriptionActivationMailBody, getPraticienAddedMailBody, getPatientAddedMailBody }