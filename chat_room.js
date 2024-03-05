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

user_name=localStorage.getItem("user");
document.getElementById("username").innerHTML="Welcome " + user_name+ "!";

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
      Room_names = childKey;
      console.log("ROOM NAME - " + Room_names);
      row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)'>"+Room_names+"</div><hr>";
      document.getElementById("output").innerHTML+=row;
      });
});
}
getData();

function logout(){
      localStorage.removeItem("user");
      localStorage.removeItem("room_name");
      window.location="index.html";
}

function addRoom(){
      room_name = document.getElementById("roomname").value;
      firebase.database().ref("/").child(room_name).update({
            purpose: "adding room name" 
      });
      localStorage.setItem("room_name", room_name);
      window.location = "chat_page.html";
}
function redirectToRoomName (name){
      console.log("redirect to room name");
      localStorage.setItem("room_name", name);
      window.location = "chat_page.html";
}