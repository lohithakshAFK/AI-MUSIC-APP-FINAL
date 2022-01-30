centuries = "";
believer = "";
left_wrist_x = "";
left_wrist_y = "";
right_wrist_x = "";
right_wrist_y = "";
leftWristScore = 0;
song_status_leftWrist = "";
rightWristScore = 0;
song_status_rightWrist = "";

function preload(){
    centuries = loadSound("centuries2.wav");
    believer = loadSound("believer2.wav");
}

function setup(){
    canvas = createCanvas(500,300);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
}

function draw(){
    
    image(video,0,0,500,300);

    fill("red");
    stroke("red");
    
    song_status_leftWrist = believer.isPlaying();
    song_status_rightWrist = believer.isPlaying();

    if(leftWristScore > 0.2){
        circle(left_wrist_x,left_wrist_y,20);
        centuries.stop();

        if(song_status_leftWrist == false){
            believer.play();
            document.getElementById("song_name_label").innerHTML = "Now Playing : Believer";
        }
    }
    

    if(rightWristScore > 0.2){
        circle(right_wrist_x,right_wrist_y,20);
        believer.stop();

        if(song_status_rightWrist == false){
            centuries.play();
            document.getElementById("song_name_label").innerHTML = "Now Playing : Iron Man - Centuries";
        }
    }
    
    
    

}

function modelLoaded(){
    console.log("PoseNet Loaded");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        right_wrist_x = results[0].pose.rightWrist.x;
        right_wrist_y = results[0].pose.rightWrist.y;
        left_wrist_x = results[0].pose.leftWrist.x;
        left_wrist_y = results[0].pose.leftWrist.y;
        leftWristScore = results[0].pose.score;
        rightWristScore = results[0].pose.score;
        console.log("right wrist x = " + right_wrist_x + ", y = " + right_wrist_y);
        console.log("left wrist x = " + left_wrist_x + ", y = " + left_wrist_y);
        console.log(leftWristScore);
        console.log(rightWristScore);
    }
}