import { useNavigate } from 'react-router-dom';
import './style/style.css'
import { ISTITUTE_NAME } from '../config.ts'

export const Home = () => {

  const navigate = useNavigate()

  return (
    <div className="width-full">
      <div className="display-flex space-around align-center height-654">
        <div className='position-absolute'>
          <div className='display-flex space-around'>
            <div>
              <div className="display-flex"><span className="font-weight-600 font-size-54 font-family">Spostati facilmente con <span className="font-weight-600 blue-color font-size-54 font-family">MyPooling</span></span></div>
              <h2 className="margin-top-40 font-weight-400 font-size-34 font-family">Veloce, Efficace, Sfizioso</h2>
            </div>
          </div>
          <div className='height-140 align-center display-flex'>
            <div className='space-around display-flex width-434'>
              <button onClick={(e) => navigate("/go_to_school")} className='hover z-index-1 font-size-16 font-family border-radius-5 border-none white-color blue-backgroundcolor height-50 width-240'>Vai a scuola</button>
            </div>
            <div className='space-around display-flex width-434'>
              <button onClick={(e) => navigate("/go_home")} className='hover border-smaller z-index-1 border-blue blue-color font-size-16 font-family border-radius-5 height-50 width-240'>Torna a casa</button>
            </div>
          </div>
        </div>
        <img style={{opacity: '4%', height: 654, width: 1880, objectFit: 'cover'}} width={1940} src="wallpaper.jpg" alt="" />
      </div>
      <div className="align-center height-280 display-flex space-around">
        <div className="align-center space-around display-flex height-240 width-340">
          <div>
            <h2 className='font-family font-weight-500 blue-color font-size-24'>Cosa puoi fare qui</h2>
            <h4 className='font-weight-500 font-size-16s'>Puoi dare o ricevere passaggi come e quando vuoi che partano da dove preferisci e arrivino al {ISTITUTE_NAME} o viceversa</h4>
          </div>
        </div>
        <div className="align-center space-around display-flex height-240 width-340">
          <div>
            <h2 className='font-family font-weight-500 blue-color font-size-24'>Perchè utilizzarlo?</h2>
            <h4 className='font-weight-500 font-size-16s'>Molto spesso si è impossibilitati ad arrivare dove vogliamo, Noi serviamo proprio a farti arrivare a destinazione qualunche problema tu incontri, nel viaggio puoi incontrare molte persone nuove e utilizzando meno auto diminuirà del 40% lo smog!</h4>
          </div>
        </div>
        <div className="align-center space-around display-flex height-240 width-340">
          <div>
            <h2 className='font-family font-weight-500 blue-color font-size-24'>Come iniziare</h2>
            <h4 className='font-weight-500 font-size-16s'>Molto semplice, in alto a destra puoi accedere o creare un account, inserisci le tue informazioni basilari per poter iniziare questa fantastica esperienza</h4>
          </div>
        </div>
      </div>
    </div>
  );
}