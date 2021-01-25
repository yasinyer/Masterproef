let video;
let poseNet;
let pose;
let skeleton;

var socket;



function setup() {
  createCanvas(1280, 960);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);

  socket = io.connect('http://localhost:3000');
}

function draw() {
  translate(video.width, 0);
  scale(-1, 1);
  image(video, 0, 0, video.width, video.height);
}

function gotPoses(poses){
  console.log('Sending: '+ poses);
  if(poses.length > 0){
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;

    var data = {
      pose: pose,
    }
    socket.emit('pose', data);
  }
}




function modelLoaded(){
  console.log('PoseNet is ready');
}

function draw() {
  translate(video.width, 0);
  scale(-1, 1);
  image(video, 0, 0, video.width, video.height);

  if (pose) {
    for (let i = 0; i < skeleton.length; i++) {
      let a = skeleton[i][0];
      let b = skeleton[i][1];
      strokeWeight(2);
      stroke(0);

      line(a.position.x, a.position.y, b.position.x, b.position.y);
    }
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      fill(0);
      stroke(255);
      ellipse(x, y, 16, 16);
    }
  }
}