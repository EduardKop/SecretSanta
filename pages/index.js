import {useState} from 'react';
import {db} from '../firebaseConfig';
import { getDatabase,ref,set,once,on,update,onValue} from 'firebase/database';
import { nanoid } from 'nanoid'
import Nav from '../components/nav'
import ChristmasLights from '../components/christmasLights';
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import Description from '../components/description';
import Image from 'next/image'
import leaf from '../img/leaf.png'

export default function Home() {


  const [isShownCreateModal, setisShownCreateModal] = useState(false);
  const [isShownConnectWindow, setIsShownConnectWindow] = useState(false);
  const [isShownStartModal, setisShownStartModal] = useState(false);
  const [ShownMailsModal,setShownMailsModal] = useState(false);
  const [allPlayers, setAllPlayers] = useState([])
  const [budget,setBudget] = useState('')
  const [name, setName] = useState('')
  const [mail, setMail] = useState('')
  const [code,setCode] = useState('')
  const [rooms,setRooms] = useState('')
  const [id,setId] = useState(0)
  const [connectModalWindowTextContent,setconnectModalWindowTextContent] = useState('')
  const [createModalWindowTextContent,setcreateModalWindowTextContent] = useState('')
  const [startModalWindowTextContent,setstartModalWindowTextContent] = useState('')
  const [emailsModalWindowTextContent,setemailsModalWindowTextContent] = useState('')
  const [btnClassChangeDoneMailResult,setbtnClassChangeDoneMailResult] = useState('start-btn')

  //створення групи 
  const closeCreateModalWindow = event => {
    setId(nanoid(5))
    if (mail == '' || budget == '' || name == '') {
      setcreateModalWindowTextContent('ви не заповнили усі поля')
    }
    setisShownCreateModal(current => !current);


  };
  const createForm = async (event) => {
  
    
    event.preventDefault()

    // Get data from the form.
    const data = {
      name: event.target.name.value,
      mail: event.target.mail.value,
      budget: event.target.budget.value,
    }

    if (mail == '' || budget == '' || name == '') {
      console.log('введіть дані')
    }else {
      setcreateModalWindowTextContent(`групу створено, ваш код - ${id}`)
      createRommFirebase()
    }
    
    
    //Firebase data save - rooms
    async function createRommFirebase() {
      const reference = ref(db, 'room/');
      update(reference,{
        [id]: {
            "players":{
              [data.name]:{
                playerName:`${data.name}~${data.mail}`
              } 
            },
            owner:`${data.name}~${data.mail}`,
            price:data.budget,
            id:id
        }
      })
    }
   

  }

  //підключення до групи
  const closeConnectModalWindow = event => {
 
    if (mail == '' || budget == '' || name == '') {
      setconnectModalWindowTextContent('ви не заповнили усі поля')
    }
    setIsShownConnectWindow(current => !current);  

  };

  const connectForm = async (event) => {

  event.preventDefault()
  function isValidKey(key) {
    // Return false if the key is an empty string or contains an invalid character
    return key !== "" && !/[.#\$\/\[\]]/.test(key);
  }

  // Get data from the form.

      if (mail == '' || code == '' || name == '') {
        console.log('введіть дані')
      }else {
            console.log(name)
            setconnectModalWindowTextContent('готово')
            const reference = ref(db, 'room/' + `${code}/` + 'players/');
            if (isValidKey(name)) {
              update(reference,{
                [name]: {
                  playerName:`${name}~${mail}`
                }
              
            })
            } else {
              console.log('присутні заборонені символи')
              setconnectModalWindowTextContent('Присутні заборонені символи .#\$\/\[\]')

            }
          
    
  }

  }

  //старт гри
  const closeStartModalWindow = event => {
    // setId(nanoid(5))
    // 👇️ toggle visibility
    if (code == '') {
      setstartModalWindowTextContent('введіть код')
    }
    setisShownStartModal(current => !current);
    
  };
  const startForm = async (event) => {
  setAllPlayers([])

  event.preventDefault()
  const data = {
    code: event.target.code.value
  }
  
  if (data.code === '') {
    setstartModalWindowTextContent('введіть код')
    setbtnClassChangeDoneMailResult('none')

  }else {
    const reference = ref(db, 'room/' + `${data.code}/`);
    onValue(reference, (el) => {
      try {
       
    setstartModalWindowTextContent(
      `
    перевірьте чи всі гравці є у грі, також перевірьте чи кількість гравцій є парною, щоб хтось не залишився без подарунка.
    Якщо все вірно - натисни кнопку нижче
      `
    )
    setbtnClassChangeDoneMailResult('start-btn')

      startRommFirebase()
      }catch(err){
      console.log('код не вірний')
      setstartModalWindowTextContent('групу не знайдено, перевірьте код')
      setbtnClassChangeDoneMailResult('none')
      }

});
  }
  
  async function startRommFirebase() {

  const referenceRoom = ref(db, 'room/' + `${data.code}/`);
  let arr = []
  onValue(referenceRoom, (el) => {
    for ( var key in el.val().players){
      arr.push(el.val().players[key].playerName)
      
    }
    localStorage.setItem('allPlayers', JSON.stringify(arr));
    const players = JSON.parse(localStorage.getItem('allPlayers'));
    if (players) {
      setAllPlayers(players);
    }
    localStorage.setItem('price', JSON.stringify(el.val().price));
    const budget = JSON.parse(localStorage.getItem('price'));
    if (budget) {
      setBudget(budget);
    }
  });
}
  }
  
  //старт після перевірки
  const startEmailsGame = event => {
    const players = JSON.parse(localStorage.getItem('allPlayers'));
    if ( players.length  % 2 === 0 ){  
    setstartModalWindowTextContent('готово')
    setbtnClassChangeDoneMailResult('none')

  //  allPlayers
  const shuffle = (arr) => {
      for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };
 
  const randomNames = shuffle(players);
  
  const matches = randomNames.map((name, index) => {
      return {
      santaName: name.split('~')[0],
      receiverName: (randomNames[index + 1] || randomNames[0]).split('~')[0],
      santa: name.split('~')[1],
      receiver: (randomNames[index + 1] || randomNames[0]).split('~')[1],
      };
  });
  console.log(matches)
  for (let i = 0;i < matches.length; i++ ){
    console.log(matches[i])
  }
  for (let i =0; i < matches.length; i++){
    var templateParams = {
      receiverMail:matches[i].receiver,
      reciverName:matches[i].receiverName,
      santaName:matches[i].santaName,
      santaEmail: matches[i].santa,
      budget:budget
  };
   
  emailjs.send('service_b38za18', 'template_ed7n5xh', templateParams, 'Q7lWdDmc7LlpNWzVv')
      .then(function(response) {
         console.log('SUCCESS!', response.status, response.text);
      }, function(error) {
         console.log('FAILED...', error);
      });
  }

}else {
  setstartModalWindowTextContent(`кількість гравців в кімнаті - ${players.length}, це не парна кількість,
  щоб почати гру, добавте грався - у кожного має бути таємний санта і кількість гравців має бути парною
  `)
  setbtnClassChangeDoneMailResult('none')
} 

  }

  return (
    <>

          <ChristmasLights />
          <Nav />


    <div className='indexApp'>
    <div className='wrapper'>
    <div className='imgWrapper'>
          <Image  src={leaf}/>
    </div>
    <div className='gameForm-wrapper'>
    <div className="gameForm">



  {/* створити Групу */} 
  <button type="button" className="btn gameForm-btn" data-bs-toggle="modal" data-bs-target="#createGroup">Створити Кімнату 🎅</button>
      <div
        className="modal fade"
        id="createGroup"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
              Створити групу 
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
  <form onSubmit={createForm} className='modalFrom-wrapper'>
      <label htmlFor="name">🎄 Твоє Ім'я🎄  <span>(Вкажи повне Ім'я та Нову пошту(Місто),телефон в цьому полі через кому, якщо ви граєте з пересилкою)</span></label>
      <input type="text" id="name"  onChange={(e) => setName(e.target.value)} name="name" />

      <label htmlFor="mail">🎄 Твій Email 🎄</label>
      <input type="text" id="mail" onChange={(e) => setMail(e.target.value)} name="mail" />

  
      <label htmlFor="budget">🎄 Бюджет на 1 подарунок 🎄</label>
      <input type="text" id="budget" onChange={(e) => setBudget(e.target.value)} name="budget" />

      <button type="submit"  onClick={closeCreateModalWindow}  data-bs-dismiss="modal" aria-label="Close">Створити</button>
    </form>
    
            </div>
            
          </div>
        </div>
      </div>

  {/* Підключитись До Групи */}
  <button type="button" className="btn gameForm-btn" data-bs-toggle="modal" data-bs-target="#connecttoGroup">Підключитись до Кімнати 🧑‍🎄</button>
      <div
        className="modal fade"
        id="connecttoGroup"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Підключитись до групи
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
                <form onSubmit={connectForm} className='modalFrom-wrapper'>
      <label htmlFor="name">🎄 Твоє Ім'я 🎄 
      <span>
      (Вкажи повне Ім'я та Нову пошту,телефон <br></br>
      в цьому полі через кому, якщо ви граєте з пересилкою)</span></label>
      <input type="text" id="name"onChange={(e) => setName(e.target.value)}  name="name" required />

      <label htmlFor="mail">🎄 Твій Email 🎄</label>
      <input type="text" id="mail"  onChange={(e) => setMail(e.target.value)} name="mail" required />

      <label htmlFor="budget">🎄 Код групи 🎄</label>
      <input type="text" id="code" name="code" onChange={(e) => setCode(e.target.value)} required />

      <button type="submit"  onClick={closeConnectModalWindow}  data-bs-dismiss="modal" aria-label="Close">Підключитись</button>
    </form>
    
            </div>
          </div>
        </div>
      </div>

  {/* Старт Гри */}
    <button type="button" className="btn gameForm-btn" data-bs-toggle="modal" data-bs-target="#startGame">Старт гри 🧑‍🎄</button>
      <div
        className="modal fade"
        id="startGame"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="startGame">
                Старт гри
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
            <form onSubmit={startForm} className='modalFrom-wrapper'>
      <label htmlFor="code">🎄 Код групи 🎄
      <span>
      не потрібно розпочинати гру, якщо всі <br></br>
      гравці ще не в групі, найкраще рішення, <br></br>
      щоб гру розпочинав той, хто створював групу</span></label>
      <input type="text" id="code"  onChange={(e) => setCode(e.target.value)} name="code" />

      <button type="submit"  onClick={closeStartModalWindow}  data-bs-dismiss="modal" aria-label="Close">Почати гру</button>
    </form>
            </div>
          </div>
        </div>
      </div>
  
    </div>
    </div>
    {/* вікно після створення кімнати */}
    <div  className={isShownCreateModal ? 'showing' : 'not-showing'}> 
      <div className='compliteForm'>
      <div className='close'>
      <button className='close-btn' onClick={closeCreateModalWindow}>x</button>
      </div>
      <div className='content'>
      <span>{createModalWindowTextContent}</span>
      </div>
      </div>
    </div> 
     {/* вікно після підключення до кімнати */}
     <div  className={isShownConnectWindow ? 'showing' : 'not-showing'}> 
      <div className='compliteForm'>
      <div className='close'>
      <button className='close-btn' onClick={closeConnectModalWindow}>x</button>
      </div>
      <div className='content'>
      <span>{connectModalWindowTextContent}</span>
      </div>
      </div>
    </div> 
    {/* вікно після старту гри */}
    <div  className={isShownStartModal ? 'showing' : 'not-showing'}> 
      <div className='compliteForm'>
      <div className='close'>
      <button className='close-btn' onClick={closeStartModalWindow}>x</button>
      </div> 
      <div className='contentWindowStartGame'>
      {startModalWindowTextContent}
      {allPlayers.map((player) => {
          return <>
          <h5 >{player}</h5>
        
          </>
        })}
        <button type="button" method="post" className={btnClassChangeDoneMailResult} onClick={startEmailsGame} >все вірно 🧑‍🎄</button>

     
      </div>
    
      </div>  
    </div> 
   
    </div>
          <Description />
    </div>
    </>
  )
}


