// const myHeading = document.querySelector('h1');
// myHeading.textContent = 'Hello world!';

var myImage = document.querySelector('img');
myImage.onclick = function() {
	var mySrc = myImage.getAttribute('src');
	if(mySrc === 'images/html-icon.png') {
		myImage.setAttribute('src', 'images/css-icon.png');
	}
	else {
		myImage.setAttribute('src', 'images/html-icon.png');
	}
}

var myButton = document.querySelector('button');
var myHeading = document.querySelector('h1');

function setUserName() {
	var myName = prompt('please input your nickname.');
	if(!myName) {
		setUserName();
	}
	else {
		localStorage.setItem('name', myName);
		myHeading.textContent = 'Thank you ' + myName + '!';
	}
}

if(!localStorage.getItem('name')) {
	setUserName();
}
else {
	var storedName = localStorage.getItem('name');
	myHeading.textContent = 'Thank you ' + storedName + '!';
}
myButton.onclick = function(){setUserName();}