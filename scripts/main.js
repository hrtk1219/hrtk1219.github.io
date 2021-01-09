const myHeading = document.querySelector('h1');
myHeading.textContent = 'Hello world!';

// var myImage = document.querySelector('img');
// myImage.onclick = function() {
// 	var mySrc = myImage.getAttribute('src');
// 	if(mySrc === 'images/html-icon.png') {
// 		myImage.setAttribute('src', 'images/css-icon.png');
// 	}
// 	else {
// 		myImage.setAttribute('src', 'images/html-icon.png');
// 	}
// }

// chrome.runtime.onMessage.addListener(function(msg) {
//   switch (msg.id) {
//     case "green":
//       $("body").css("background-color", msg.id);
//       break;

//     case "red":
//   	  $("body").css("background-color", msg.id);
//       break;

//     default:

// var url = "http://110.67.242.95:8000/recommendArticles";
// var request = new XMLHttpRequest();
// request.open("GET", url);

// request.onreadystatechange = function () {
// 	if (request.status == 200) {
//   		var result = request.responseText;
// 	}
// };
// request.send(null);

// var output = '<marquee>'+'hello'+'</marquee>';
// $("body").prepend(output);

// $("body").prepend('<marquee>'+result+'</marquee>');
$('body').prepend('hello');
//   }
// });

// var myButton = document.querySelector('button');
// var myHeading = document.querySelector('h1');

// function setUserName() {
// 	var myName = prompt('please input your nickname.');
// 	if(!myName) {
// 		setUserName();
// 	}
// 	else {
// 		localStorage.setItem('name', myName);
// 		myHeading.textContent = 'Thank you ' + myName + '!';
// 	}
// }

// if(!localStorage.getItem('name')) {
// 	setUserName();
// }
// else {
// 	var storedName = localStorage.getItem('name');
// 	myHeading.textContent = 'Thank you ' + storedName + '!';
// }
// myButton.onclick = function(){setUserName();}