const apiCall = (blob, setApiResponse, setWarning) => {
    const msRest = require("@azure/ms-rest-js");
    const Face = require("@azure/cognitiveservices-face");
    const key = "paste here";
    const endpoint = "paste here";
    const credentials = new msRest.ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } });
    const client = new Face.FaceClient(credentials, endpoint);
    client.face.detectWithStream(blob, {
        returnFaceAttributes: ["Emotion", "HeadPose", "Age", "Occlusion"],
        detectionModel: "detection_01"
    }).then(function (response) {
        if (!response[0])
            setWarning("Face not visible")
        else {
            setApiResponse(response[0].faceAttributes)
            if (response[0].faceAttributes.age < 18)
                setWarning("Potentially underage driver")
            else if (response[0].faceAttributes.emotion.anger > .1)
                setWarning("Please remain calm")
            else if (response[0].faceAttributes.emotion.sadness > .05)
                setWarning("Take a break")
            else if (Math.abs(response[0].faceAttributes.headPose.yaw) > 10)
                setWarning("Please look straight ahead")
            else if (response[0].faceAttributes.occlusion.eyeOccluded)
                setWarning("Eyes not visible")
            else
                setWarning("")
        }
    })
}

const convertToBlob = (imageBitmap, setApiResponse, setWarning) => {
    //converts octet form to blob to be read by API
    //initiates API call
    let canvas = document.createElement('canvas'); 
    canvas.width = imageBitmap.width;
    canvas.height = imageBitmap.height;
    let context = canvas.getContext('2d');
    context.drawImage(imageBitmap, 0, 0);
    canvas.toBlob((blob) => {
        apiCall(blob, setApiResponse, setWarning)
    })
}

export const captureImage = (setApiResponse, setWarning) => {
    const constraints = {
        video: true
    }
    //captures screenshot in octet form and calls a function to convert to blob
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        let videoTrack = stream.getVideoTracks()[0];
        const imageCapture = new ImageCapture(videoTrack);
        return imageCapture.grabFrame().then(function (imageBitmap) {
            convertToBlob(imageBitmap, setApiResponse, setWarning)
        })
    })
}