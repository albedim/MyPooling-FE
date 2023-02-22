import { SpinnerCircularFixed } from "spinners-react";

export const Loading = ({visible}) => {
  return(
    <>
    {
      visible ? (
        <div className="z-index-2 position-absolute align-center space-around display-flex height-full width-full">
          <SpinnerCircularFixed	 size={84} color='#589df8' thickness={140} secondaryColor={'white'} />
        </div>
      ):(
        <div className="opacity z-index-2 position-absolute align-center space-around display-flex height-full width-full">
          <SpinnerCircularFixed	 size={84} color='#589df8' thickness={140} secondaryColor={'white'} />
        </div>
      )
    }
    </>
  );
}