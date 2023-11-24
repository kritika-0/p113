//https://teachablemachine.withgoogle.com/models/SLzfNMSZR/model.json

Webcam.set({
    width:350,
    height:300,
    image_format:'jpg',
    jpg_quality:90
});

camera=document.getElementById('camera');
Webcam.attach("#camera");

function takeSnapshot()
{

    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';

    });
}

console.log('ml5.version: ', ml5.version);

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/SLzfNMSZR/model.json",modelReady);

function modelReady()
{
  console.log("model ready");  
}

function speak()
{ 
   synth=window.speechSynthesis;
   speakdata1="Gesture is"+prediction_1;
   var utterThis=new SpeechSynthesisUtterance(speakdata1);
   synth.speak(utterThis);
}

function check()
{
    img=document.getElementById('captured_image');
    classifier.classify(img,gotResult);

}


function gotResult(error,results){
    if(error)
    {
      console.log(error);  
    }
    else
    {
      console.log(results);
      document.getElementById("result_gesture_name").innerHTML=results[0].label;
      prediction_1=results[0].label;
      speak();
      if(results[0].label=="thumbs up")
      {
        document.getElementById("update_emoji").innerHTML="&#128077;";
      }
     if(results[0].label=="ok")
      {
        document.getElementById("update_emoji").innerHTML="&#128076;";

      }
      if(results[0].label=="victory")
      {
        document.getElementById("update_emoji").innerHTML="&#9996;";
      }
    }
}
