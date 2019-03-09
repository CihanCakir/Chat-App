//import { userInfo } from "os";

let socket = io();
//mesajlar geldikçe scrollbar otomatik olarak aşağı inmesi için bu fonksiyon oluşturuldu
function scrollToBottom() {
    let messages = document.querySelector('#messages').lastElementChild;
    messages.scrollIntoView();
}
socket.on('connect', () => {
    let searchQuery = window.location.search.substring(1);
    //odaya ilk girişte aldığımız bilgileri JSON objesi haline getiriyoruz.
  let params = JSON.parse('{"' + decodeURI(searchQuery).replace(/&/g,'","').replace(/\+/g,' ').replace(/=/g,'":"') + '"}');
socket.emit('join',params , function(err){
    if(err){
        alert(err);
        window.location.href='/';
    }else{
            console.log('success login');
    }
})

});
socket.on('disconnect', () => {
    console.log('disconnected to server.');
});

socket.on('updateUserList',function(users) {
            let ol = document.createElement('ol');
            users.forEach(function (user){
                let li = document.createElement('li');
                li.innerHTML = user;
                ol.appendChild(li);
            });
            let usersList = document.querySelector('#users');
            usersList.innerHTML="";
            usersList.appendChild(ol);
})



socket.on('newMessage', function (message) {
    const formattedTime = moment(message.createdAt).format('LT');
    const template = document.querySelector('#message-template').innerHTML;
    const html = Mustache.render(template, {
        from:message.from,
        text:message.text,
        createdAt: formattedTime
    });
//client tarafından dönen değeri div etiketi içerisine yerleştiriyoruz render ile template den dönen değeri
    const div = document.createElement('div');
    div.innerHTML = html

    document.querySelector('#messages').appendChild(div);
    scrollToBottom();
    // bu amına koduğumun selectoru yüzünden yanlış div etiketini vermişim body dedğil gösterilecek mesajın yerini belirtmek için kullanılır !!!!bir1


/*
    const formattedTime = moment(message.createdAt).format('LT');
    console.log("newMessage", message);
    let li= document.createElement("li");
    li.innerText = `${message.from} ${formattedTime} ${message.text}`
    document.querySelector('body').appendChild(li);
*/
});


socket.on('newLocationMessage', function (message) {
    const formattedTime = moment(message.createdAt).format('LT');
    console.log("newLocationMessage", message);

    const template = document.querySelector('#location-message-template').innerHTML;
    const html = Mustache.render(template, {
        from: message.from,
        url:message.url,
        createdAt: formattedTime
    });
    const div = document.createElement('div');
    div.innerHTML = html

    document.querySelector('#messages').appendChild(div);
    scrollToBottom();



  /*  let li= document.createElement('li');
    let a = document.createElement('a');
    li.innerText = `${message.from} ${formattedTime}:`
    a.setAttribute('target','_blank');
    a.setAttribute('href', message.url);
    a.innerText ='My Current Location:';
    li.appendChild(a);
    document.querySelector('body').appendChild(li);
    */
});

/*socket.emit('createMessage',{
    from:'User1',
    text:'hey'
}, function (message){
    console.log('Got it',message);
});
*/
// we are listening at this buton acitivy so clients press button and browser save this message= link we dont wanna do that
document.querySelector('#submit-btn').addEventListener('click', function (e){
e.preventDefault();

socket.emit("createMessage",{
    from: "User",
    text: document.querySelector('input[name="message"]').value
}, function () {
    
})

});
// we want to send to location and its need geography apı services -->
document.querySelector('#send-location').addEventListener('click', function (e) {
    if(!navigator.geolocation){
        return alert("Geolocation sizin browserınızda desteklemiyor")
    }
    navigator.geolocation.getCurrentPosition(function (position){
        socket.emit('createLocationMessage',{
            lat: position.coords.latitude,
            lng: position.coords.longitude
        })
    }, function (){
        alert("unable fetch location");
    })
});