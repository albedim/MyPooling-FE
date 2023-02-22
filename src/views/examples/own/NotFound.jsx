import { SpinnerCircularFixed } from "spinners-react";

export const NotFound = ({page}) => {
  return(
    <>
    {
      page ? (
        <div className="align-center height-full width-full display-flex space-around">
          <img className="width-340" src={require("../../../assets/img/notfound.png")} alt="" />
        </div>
      ):(
        <div className="align-center space-around display-flex">
          <img className="width-240" src={require("../../../assets/img/notfound.png")} alt="" />
        </div>
      )
    }
    </>
  );
}