
var pointSize = 3;

let xy = [];

let i = 0;

let angleResult = 0;

let angleArray = [];

// let photo = null;

let photoUrl = null;

let parsingArray = [];

const buttonDisable = () => {
  document.getElementById("submitForm").disabled = true;
}

const buttonEnable = () => {
  document.getElementById("submitForm").disabled = false;
}

const a = document.getElementById("myCanvas");
a.addEventListener("click",(event) => {
  getPosition(event);

});

function getPosition(event){
     var rect = canvas.getBoundingClientRect();
     var x = event.clientX - rect.left;
     var y = event.clientY - rect.top;
     xy.push([x,y]);
     drawCoordinates(x,y);
     i++;
     if (i>=6) {
      return;
     };
     if(i>1){
      drawLine(xy[i-2][0],xy[i-2][1],xy[i-1][0],xy[i-1][1])
     };
     if(i>2){
      const angle = getAngle(xy[i-3][0],xy[i-3][1],xy[i-2][0],xy[i-2][1],xy[i-1][0],xy[i-1][1])
      storeAngle(angle, i);
     };
     if(i==5){
      // alert("Great job! Now press submit for result")
      photoUrl = getImageData();
      // parsingArray.push([angleArray,photoUrl])
      storePhoto(photoUrl);
      buttonEnable();
     }
};

function drawCoordinates(x,y){
    var ctx = document.getElementById("myCanvas").getContext("2d");
    ctx.fillStyle = "#46fc3c"; // Red color
    ctx.beginPath();
    ctx.arc(x, y, 8, 0, Math.PI * 2, true);
    ctx.fill();
};

const drawLine = (x1,y1,x2,y2) => {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth=3;
    ctx.stroke();
};

const getAngle = (x1,y1,x2,y2,x3,y3) => {
    var line12 = Math.sqrt(Math.pow(x2-x1,2)+
                        Math.pow(y2-y1,2)); // p0->c (b)
    var line23 = Math.sqrt(Math.pow(x2-x3,2)+
                        Math.pow(y2-y3,2)); // p1->c (a)
    var line13 = Math.sqrt(Math.pow(x3-x1,2)+
                         Math.pow(y3-y1,2)); // p0->p1 (c)
    angleResult = (Math.acos((line23*line23+line12*line12-line13*line13)/(2*line23*line12)))*180/Math.PI;
    // angleArray.push(angleResult);
    return angleResult
    // storeAngle()
};

const storeAngle = (angle, i) => {
  const angleFormInput = document.getElementById(`assessment_angle${i-2}`)
  angleFormInput.value = angle;
};

const storePhoto = photo => {
  const photoFormInput = document.getElementById('assessment_photo')
  photoFormInput.value = photo;
};

const getImageData = () => {
   return canvas.toDataURL('image/png');
      // photo.setAttribute('src', data);
};



// const assessmentForm = document.querySelector("#new_assessment");

// const prepareFormData = e => {
//   console.log("hello");
//   assessmentForm.submit();
// };

// // const submitBtn = document.querySelector(" query #new_assessment > input.btn");
// assessmentForm.addEventListener("submit", prepareFormData, false)


