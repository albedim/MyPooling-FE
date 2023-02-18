import { useNavigate } from 'react-router-dom';
import './style/style.css'
import { ISTITUTE_NAME } from '../config.ts'
import { ChooseTripPoup } from './ChooseTripPopup';

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
                <button onClick={(e) => navigate("/choose")} className='hover z-index-1 font-size-16 font-family border-radius-5 border-none white-color blue-backgroundcolor height-50 width-240'>Cerca un passsaggio</button>
              </div>
              <div className='space-around display-flex width-434'>
                <button onClick={(e) => navigate("/dashboard")} className='hover ok-backgroundcolor border-smaller z-index-1 border-blue blue-color font-size-16 font-family border-radius-5 height-50 width-240'>Offri un passaggio</button>
              </div>
            </div>
          </div>
          <img style={{opacity: '4%', height: 654, width: 1880, objectFit: 'cover'}} width={1940} src="wallpaper.jpg" alt="" />
        </div>
        <div className="align-center height-280 display-flex space-around">
          <div className="align-center space-around display-flex height-240 width-340">
            <div>
              <h2 className='font-family font-weight-500 blue-color font-size-24'>Cosa puoi fare qui</h2>
              <h4 className='font-weight-500 font-size-16s'>Puoi dare o ricevere passaggi come e quando vuoi partendo da dove preferisci e arrivindo al {ISTITUTE_NAME} o viceversa</h4>
            </div>
          </div>
          <div className="align-center space-around display-flex height-240 width-340">
            <div>
              <h2 className='font-family font-weight-500 blue-color font-size-24'>Perchè utilizzarlo?</h2>
              <h4 className='font-weight-500 font-size-16s'>Molto spesso potresti non riuscire ad andare dove vuoi perchè piove o c'è uno sciopero dei mezzi. Beh, noi ti aiutiamo proprio in questo! Nel viaggio puoi incontrare molte persone nuove e si utilizzeranno meno auto così che lo smog potrà diminuire addirittura del 40%</h4>
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