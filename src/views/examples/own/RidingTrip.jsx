export const RidingTrip = ({ code, creator, departure_date, mode, slots }) => {

  return (
    <div className="align-center space-around display-flex height-280">
      <div className="height-284">
        <div className="box-shadow border-radius-5 height-240 width-340">
          <div className="display-flex space-between align-center height-74">
            <div className="display-flex align-center width-140"><span className="font-weight-600 font-size-20 margin-left-34 blue-color font-family">#{code}</span></div>
            <div className="space-around align-center display-flex display-flex width-114">
              <span className="gray-color font-weight-500 font-family font-size-17">{slots} POSTI</span>
            </div>
          </div>
          <div className="height-80">

          </div>
          <div className="space-between display-flex height-80">
            <div className="align-center width-164 space-around display-flex">
              <div className="width-98">
                <div className="display-flex align-center height-34 width-140"><span className="font-weight-500 font-size-16 font-family">Creato da <span onClick={(e) => { window.location.href = '/MyPooling-FE/profile/' + creator }} className="hover font-weight-600 font-size-16 font-family">@{creator}</span></span></div>
                <div className="align-center display-flex height-24 width-140"><h4 className="font-size-14 font-weight-400 gray-color font-family">{departure_date.substring(0,10).split("-")[2] + "/" + departure_date.substring(0,10).split("-")[1] + "/" + departure_date.substring(0,10).split("-")[0].substring(2,4) + ", " + departure_date.substring(11, 16)}</h4></div>
              </div>
            </div>
            <div className="space-around align-center display-flex width-160">
              <div className="border-blue blue-color align-center space-around display-flex border-radius-5 height-34 width-124 border-smaller">
                {
                  mode == 'home' ? (
                    <span className="font-family">CASA</span>
                  ) : (
                    <span className="font-family">ISTITUTO</span>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}