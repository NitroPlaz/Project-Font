difference = 0;
RightWristX = 0;
LeftWristX = 0;

function setup() {
    video = createCapture(VIDEO);
    video.size(550, 500);
    video.position(10, 80);
    
    canvas = createCanvas(800, 400);
    canvas.position(700, 130);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Is Initialized!');
}

function draw() {
    background('#0D0907');

    document.getElementById("font_side").innerHTML = "Font size of the text will be = " + difference + "px"; 
    fill('#FFFF00');
    textSize(difference);
    text("Font", 50, 400);
}

function gotPoses(results , error) {
    if(error) {
        console.error(error);
    }
    if(results.length > 0) {
        console.log(results);

        LeftWristX = results[0].pose.leftWrist.x;
        RightWristX = results[0].pose.rightWrist.x;
        difference = floor(LeftWristX - RightWristX);

        console.log("LeftWristX = " + LeftWristX + " RightWristX = " + RightWristX + " Difference = " + difference);
    }
}