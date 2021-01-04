

var firebaseConfig = {
  apiKey: "AIzaSyBXPOGVP4z12TYHipn0-C8r55oGqAw523c",
  authDomain: "staff-support-b1ce3.firebaseapp.com",
  databaseURL: "https://staff-support-b1ce3.firebaseio.com",
  projectId: "staff-support-b1ce3",
  storageBucket: "staff-support-b1ce3.appspot.com",
  messagingSenderId: "1036048138694",
  appId: "1:1036048138694:web:654881679863092c8bb2c7",
  measurementId: "G-FF50GX1DM2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();

var db = firebase.firestore();



const sched = document.querySelector('#schedule');
const form = document.querySelector('.note-form')
//create element and render cafe

function renderSch(doc){
  let li = document.createElement('li');
  let name = document.createElement('li');
  let time = document.createElement('span1');
  let date = document.createElement('span2');
  let cross = document.createElement('span3');
  
  li.setAttribute('data-id',doc.id)
  name.textContent = doc.data().name;
  time.textContent = doc.data().time;
  date.textContent = doc.data().date;
 
  cross.textContent = 'x';
  
  
  li.appendChild(name);
  li.appendChild(date);
  li.appendChild(time);
  li.appendChild(cross);
  
  sched.appendChild(li);
  
  //deleting data
  cross.addEventListener('click',(e)=>{
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute('data-id');
    db.collection('schedule').doc(id).delete();
  })
  
  
  
  
  //css with jquery
  
  $("span1").css("font-weight","bold");
  $("span1").css("color","orange");
  $("span2").css("padding-right","2em");
   $("span2").css("font-weight","bold");
  $("span2").css("color","red");
  $("li").css("font-weight","bold");
  $("li").css("color","black");
  $("li").css("font-size","larger")
   $("li").css("font-style","italic")
  $("span3").css("padding","0.5");
  $("span3").css("margin-left","2em")
  $("span3").css("background-color","lightblue")
  
}

//getting data
// db.collection('schedule').get().then((snapshot)=>{
//   snapshot.docs.forEach(doc =>{
//     renderSch(doc);
//   })
  
// })
 
// saving data 
form.addEventListener('submit',(e)=>{
  e.preventDefault();
  db.collection('schedule').add({
    name: form.name.value,
    date: form.date.value,
    time: form.time.value
  });
  form.name.value ="";
  form.time.value ="";
  form.time.value ="";
})

// real-time listener
db.collection('schedule').onSnapshot(snapshot =>{
  let changes = snapshot.docChanges();
  changes.forEach(change=>{
    if(change.type == 'added'){
      renderSch(change.doc);
    }else if(change.type == 'removed'){
      let li = sched.querySelector('[data-id=' + change.doc.id + ']');
      sched.removeChild(li);
    }
  })
})
