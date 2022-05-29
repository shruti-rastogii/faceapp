import React from 'react';
import Webcam from "react-webcam";
import './App.css';
import bg from './bgpic.jpg'
import Component from './Component';
import { captureImage } from './helpers';
 
function App() {
  const [apiResponse, setApiResponse] = React.useState({})
  const [warning, setWarning] = React.useState("")
  const apiInterval = 3000      //milliseconds between API calls, reduce for better performance

  React.useEffect(() => {
    const interval = setInterval(() => {          //initiates interval for API call
      captureImage(setApiResponse, setWarning)
    }, apiInterval);
    return () => clearInterval(interval);
  },);
 
  return (
    <div className="background" style={{backgroundImage: `url(${bg})`}}>
      <div className='camera'>
        <Webcam
          audio={false}
          height={360}
          width={480}
        />
      </div>
      {!!apiResponse.age &&
      <React.Fragment>
        <div className="warning" style={{backgroundColor: `${warning.length? 'rgba(255,138,152,0.7)': 'rgb(98, 255, 138, 0.7)'}`}}>
          {warning.length?warning:"All good, keep driving" /*display warning message if exists, else all good*/}
        </div>
        {warning!=="Face not visible" &&
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <Component title="Age:" 
            value={apiResponse.age} 
            error={apiResponse.age<18}/>
          <Component title="" 
            value={apiResponse.emotion.anger > .1?"Angry":apiResponse.emotion.sadness > .05?"Sad":"Stable Emotions"} 
            error={(apiResponse.emotion.anger > .1) || (apiResponse.emotion.sadness > .05)}/>
          <Component title="" 
            value={apiResponse.headPose.yaw>10?
              "Looking left":
              apiResponse.headPose.yaw<-10?
                "Looking right":
                "Looking straight"} 
            error={Math.abs(apiResponse.headPose.yaw) > 10}/>
          <Component title="Eyes Visibile:" 
            value={apiResponse.occlusion.eyeOccluded?"No":"Yes"} 
            error={apiResponse.occlusion.eyeOccluded}/>
        </div>
        }
      </React.Fragment>
      }
    </div>
  );
}
 
export default App;