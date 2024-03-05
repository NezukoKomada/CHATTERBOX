const firebaseConfig = {
    apiKey: "AIzaSyArvfRUvbOswCijxnC-LGdN68q3okBCWCA",
    authDomain: "chattterbox-2c872.firebaseapp.com",
    databaseURL: "https://chattterbox-2c872-default-rtdb.firebaseio.com",
    projectId: "chattterbox-2c872",
    storageBucket: "chattterbox-2c872.appspot.com",
    messagingSenderId: "573009113807",
    appId: "1:573009113807:web:9c27a4a1a2273fca4cbdba"
};

firebase.initializeApp(firebaseConfig);

room_name=localStorage.getItem("room_name");
user_name=localStorage.getItem("user");

function logout(){
    localStorage.removeItem("user");
    localStorage.removeItem("room_name");
    window.location="index.html";
}

function send()
{
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        name:user_name,
        message:msg,
        like:0
    });
    document.getElementById("msg").value = "";
}

function getData() { console.log("inside get data"); firebase.database().ref("/"+room_name).on('value', function(snapshot) {document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") { 
    firebase_message_id = childKey; 
    message_data = childData;
    console.log(firebase_message_id);
    console.log(message_data);
    name1 = message_data['name'];
    message = message_data['message'];
    like = message_data['like'];
    name_with_tag = "<h4>"+ name1 +"<img class='user_tick' src='tick.png'></h4>";
    message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
    like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='update_Like(this.id)'>";
    span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";
    row = name_with_tag + message_with_tag +like_button + span_with_tag;
    document.getElementById("output").innerHTML+=row;
} }); }); }
getData();

function update_Like(message_id)
{
    console.log("clicked on like button 11 + message_id");
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) + 1;
    console.log(updated_likes);
    firebase.database().ref(room_name).child(message_id).update({
        like : updated_likes
    });
}

function back(){
    window.location = "chat_room.html";
}