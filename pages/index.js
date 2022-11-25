import styles from '../styles/Home.module.css'
import Link from "next/link";
import {useState} from 'react';
import {db} from '../firebaseConfig';
import { getDatabase,ref,set,once,on,update,onChildAdded} from 'firebase/database';
import { nanoid } from 'nanoid'


export default function Home() {
  const [isShown, setIsShown] = useState(false);
  const [isShownConnectWindow, setIsShownConnectWindow] = useState(false);

  const [id,setId] = useState(0)


  //створення групи 
  const handleClick = event => {
    setId(nanoid(5))
    // 👇️ toggle visibility
    setIsShown(current => !current);

  };
  const handleSubmit = async (event) => {
  
    

    event.preventDefault()

    // Get data from the form.
    const data = {
      name: event.target.name.value,
      mail: event.target.mail.value,
      budget: event.target.budget.value,
    }
   
    
    //Firebase data save - rooms
    
    const reference = ref(db, 'room/');
    update(reference,{
      [id]: {
          "players":{
            [data.name]:{
              playerName:data.name,
              playerMail:data.mail
            } 
          },
          owner:data.name,
          ownerMail:data.mail,
          price:data.budget,
          id:id
      }
    })

  }

  //підключення до групи
  const connectClick = event => {
    // setId(nanoid(5))
    // 👇️ toggle visibility
    setIsShownConnectWindow(current => !current);

  };
  const connectSubmit = async (event) => {
  
   
    event.preventDefault()

    // Get data from the form.
    const data = {
      name: event.target.name.value,
      mail: event.target.mail.value,
      code: event.target.code.value,
    }
    console.log(data.code)

    //Firebase data connect to room
    
    const reference = ref(db, 'room/' + `${data.code}/` + 'players/');
    update(reference,{
        [data.name]: {
          playerMail:data.mail,
          playerName:data.name
        }
      
    })

  }
  
  return (
    <div className={styles.container}>
    <div className='result'>

    </div>
      <div className={styles.navWrapper}>
      <nav className={styles.nav}>
        <ul className={styles.ul}>
          <Link href="/" className={styles.link}>Home</Link>
          <Link href="/info" className={styles.link}>Info</Link>
          <Link href="/contacts" className={styles.link}>Contacts</Link>
        </ul>
      </nav>
      </div>

    <div className="d-flex justify-content-center align-items-center">



  {/* створити Групу */} 
  <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createGroup">Створити Кімнату 🎅</button>
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
  <form onSubmit={handleSubmit} className='modalFrom-wrapper'>
      <label htmlFor="name">Твоє Ім'я</label>
      <input type="text" id="name" name="name" required />

      <label htmlFor="mail">Твоя Пошта</label>
      <input type="text" id="mail" name="mail" required />

      <label htmlFor="budget">Бюджет на 1 подарунок (у кожного буде такий бюджет 💸)</label>
      <input type="text" id="budget" name="budget" required />

      <button type="submit"  onClick={handleClick}  data-bs-dismiss="modal" aria-label="Close">Створити</button>
    </form>
    
            </div>
            
          </div>
        </div>
      </div>

  {/* Підключитись До Групи */}
  <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#connecttoGroup">Підключитись до Кімнати 🧑‍🎄</button>
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
                <form onSubmit={connectSubmit} className='modalFrom-wrapper'>
      <label htmlFor="name">Твоє Ім'я</label>
      <input type="text" id="name" name="name" required />

      <label htmlFor="mail">Твоя Пошта</label>
      <input type="text" id="mail" name="mail" required />

      <label htmlFor="budget">Код групи</label>
      <input type="text" id="code" name="code" required />

      <button type="submit"  onClick={connectClick}  data-bs-dismiss="modal" aria-label="Close">Створити</button>
    </form>
    
            </div>
          </div>
        </div>
      </div>

  {/* Старт Гри */}
    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#startGame">Старт гри 🧑‍🎄</button>
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
            Старт гри
            </div>
          </div>
        </div>
      </div>
  
    </div>
    {/* вікно після створення кімнати */}
     <div  className={isShown ? 'showing' : 'not-showing'}> 
      <div className='compliteForm'>
      <button onClick={handleClick}>X</button>
      <span>Твій код - надай його друзям <b>{id}</b></span>
      </div>
    </div> 
     {/* вікно після підключення до кімнати */}
     <div  className={isShownConnectWindow ? 'showing' : 'not-showing'}> 
      <div className='compliteForm'>
      <button onClick={connectClick}>X</button>
      <span>підключився<b>{id}</b></span>
      </div>
    </div> 
    </div>
  
  )
}
