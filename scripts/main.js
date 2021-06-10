/*
*  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
*
*  Use of this source code is governed by a BSD-style license
*  that can be found in the LICENSE file in the root of the source
*  tree.
*/

'use strict';

const videoElement = document.querySelector('video');
const audioInputSelect = document.querySelector('select#audioSource');
const audioOutputSelect = document.querySelector('select#audioOutput');
const videoSelect = document.querySelector('select#videoSource');
const selectors = [audioInputSelect, audioOutputSelect, videoSelect];

audioOutputSelect.disabled = !('sinkId' in HTMLMediaElement.prototype);

function gotDevices(deviceInfos) {
  // Handles being called several times to update labels. Preserve values.
  const values = selectors.map(select => select.value);
  selectors.forEach(select => {
    while (select.firstChild) {
      select.removeChild(select.firstChild);
    }
  });
  for (let i = 0; i !== deviceInfos.length; ++i) {
    const deviceInfo = deviceInfos[i];
    const option = document.createElement('option');
    option.value = deviceInfo.deviceId;
    if (deviceInfo.kind === 'audioinput') {
      option.text = deviceInfo.label || `microphone ${audioInputSelect.length + 1}`;
      audioInputSelect.appendChild(option);
    } else if (deviceInfo.kind === 'audiooutput') {
      option.text = deviceInfo.label || `speaker ${audioOutputSelect.length + 1}`;
      audioOutputSelect.appendChild(option);
    } else if (deviceInfo.kind === 'videoinput') {
      option.text = deviceInfo.label || `camera ${videoSelect.length + 1}`;
      videoSelect.appendChild(option);
    } else {
      console.log('Some other kind of source/device: ', deviceInfo);
    }
  }
  selectors.forEach((select, selectorIndex) => {
    if (Array.prototype.slice.call(select.childNodes).some(n => n.value === values[selectorIndex])) {
      select.value = values[selectorIndex];
    }
  });
}

navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);

// Attach audio output device to video element using device/sink ID.
function attachSinkId(element, sinkId) {
  if (typeof element.sinkId !== 'undefined') {
    element.setSinkId(sinkId)
        .then(() => {
          console.log(`Success, audio output device attached: ${sinkId}`);
        })
        .catch(error => {
          let errorMessage = error;
          if (error.name === 'SecurityError') {
            errorMessage = `You need to use HTTPS for selecting audio output device: ${error}`;
          }
          console.error(errorMessage);
          // Jump back to first output device in the list as it's the default.
          audioOutputSelect.selectedIndex = 0;
        });
  } else {
    console.warn('Browser does not support output device selection.');
  }
}

function changeAudioDestination() {
  const audioDestination = audioOutputSelect.value;
  attachSinkId(videoElement, audioDestination);
}

function gotStream(stream) {
  window.stream = stream; // make stream available to console
  videoElement.srcObject = stream;
  // Refresh button list in case labels have become available
  return navigator.mediaDevices.enumerateDevices();
}

function handleError(error) {
  console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
}

function start() {
  if (window.stream) {
    window.stream.getTracks().forEach(track => {
      track.stop();
    });
  }
  const audioSource = audioInputSelect.value;
  const videoSource = videoSelect.value;
  const constraints = {
    audio: {deviceId: audioSource ? {exact: audioSource} : undefined},
    video: {deviceId: videoSource ? {exact: videoSource} : undefined}
  };
  navigator.mediaDevices.getUserMedia(constraints).then(gotStream).then(gotDevices).catch(handleError);
}

audioInputSelect.onchange = start;
audioOutputSelect.onchange = changeAudioDestination;

videoSelect.onchange = start;

start();

// const myHeading = document.querySelector('h1');
// myHeading.textContent = 'Hello world!';

// // var myImage = document.querySelector('img');
// // myImage.onclick = function() {
// // 	var mySrc = myImage.getAttribute('src');
// // 	if(mySrc === 'images/html-icon.png') {
// // 		myImage.setAttribute('src', 'images/css-icon.png');
// // 	}
// // 	else {
// // 		myImage.setAttribute('src', 'images/html-icon.png');
// // 	}
// // }

// // chrome.runtime.onMessage.addListener(function(msg) {
// //   switch (msg.id) {
// //     case "green":
// //       $("body").css("background-color", msg.id);
// //       break;

// //     case "red":
// //   	  $("body").css("background-color", msg.id);
// //       break;

// //     default:

// // var url = "http://110.67.242.95:8000/recommendArticles";
// // var request = new XMLHttpRequest();
// // request.open("GET", url);

// // request.onreadystatechange = function () {
// // 	if (request.status == 200) {
// //   		var result = request.responseText;
// // 	}
// // };
// // request.send(null);

// // var output = '<marquee>'+'hello'+'</marquee>';
// // $("body").prepend(output);

// // $("body").prepend('<marquee>'+result+'</marquee>');
// $('body').prepend('hello');
// //   }
// // });

// // var myButton = document.querySelector('button');
// // var myHeading = document.querySelector('h1');

// // function setUserName() {
// // 	var myName = prompt('please input your nickname.');
// // 	if(!myName) {
// // 		setUserName();
// // 	}
// // 	else {
// // 		localStorage.setItem('name', myName);
// // 		myHeading.textContent = 'Thank you ' + myName + '!';
// // 	}
// // }

// // if(!localStorage.getItem('name')) {
// // 	setUserName();
// // }
// // else {
// // 	var storedName = localStorage.getItem('name');
// // 	myHeading.textContent = 'Thank you ' + storedName + '!';
// // }
// // myButton.onclick = function(){setUserName();}