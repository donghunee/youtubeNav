// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// $("#item-wrap").text("qwe");
// $("body").scrollTop($(document).height());
// alert("qwe");
// $("html, body").scrollTop($(document).height());
// const emem = document.getElementById("item-wrap");
// emem.innerText("qweqw");
// Search the bookmarks when entering the search keyword.
// $("#item-wrap").text("QWEQ");
// var port = chrome.runtime.connect({ name: "knockknock" });
// var laserExtensionId = "abcdefghijklmnoabcdefhijklmnoabc";
// var port = chrome.runtime.connect(laserExtensionId);
// port.postMessage("ㅂㅈㄷ");
// var port = chrome.tabs.connect();

function getParameterByName(name, url) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(url);
  return results == null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function fn(str) {
  var res;
  // res = str.replace(/[^0-9]/g, "");
  res = str.match(/[0-9]{1,2}(?=:)/g);
  // res = res.split(",");
  // console.log(res);
  return res;
}

function rn(str) {
  var res;
  // res = str.replace(/[^0-9]/g, "");
  res = str.match(/(?<=:)[0-9]{2}/g);
  return res;
}

function ho(str) {
  var res;
  // res = str.replace(/[^0-9]/g, "");
  // res = str.match(/[0-9]{1,2}(:)[0-9]{2}/g);
  res = str.split(/[0-9]{1,2}:[0-9]{2}/g);
  res.splice(0, 1);
  return res;
}

function hodo(str) {
  var res;
  // res = str.replace(/[^0-9]/g, "");
  // res = str.match(/[0-9]{1,2}(:)[0-9]{2}/g);
  res = str.split(/[0-9]{1,2}:[0-9]{2}/g);
  res.splice(0, 1);
  return res;
}

let preResult = 0;

$(document).ready(function () {
  getUrl(function (url) {
    const params = getParameterByName("v", url);
    ajaj(params);
  });
});
function ajaj(params) {
  let nextToken;
  $.ajax({
    url: `https://www.googleapis.com/youtube/v3/commentThreads?key=AIzaSyCEPRtcNEEj1j1jf38t-azXiuhX8Aeuc5s&textFormat=plainText&part=snippet&videoId=${params}&maxResults=100`,
    // context: document.body,
  })
    .done(function (res) {
      // const result = res.json();
      // console.log(result);
      const resultArr = res.items;

      resultArr.forEach((n) => {
        const str = n.snippet.topLevelComment.snippet.textDisplay;
        if (str.indexOf(":") != -1) {
          let result = 0;
          preResult = 0;
          var xx = fn(str);
          var yy = rn(str);
          if (xx && yy) {
            // console.log(xx);
            // console.log(yy);
            const ar = ho(str);
            console.log(str);
            for (let i = 0; i < xx.length; i++) {
              console.log(xx[i]);
              console.log(yy[i]);
              if (xx[i] >= 60) {
                continue;
              }
              if (xx[i] && yy[i]) {
                result = xx[i] * 60 + yy[i] * 1;
                if (preResult == result) {
                  break;
                }
                preResult = result;
                console.log(ar[i]);
                // console.log(result);
                // console.log(xx[i]);
                // console.log(yy[i]);
                console.log(`${xx[i]}:${yy[i]}///${str}`);
                if (ar[i]) {
                  $("#item-wrap").append(
                    `<div name="${result}" class="item"><span style="color:#1469d6">${xx[i]}:${yy[i]}</span>${ar[i]}</div>`
                  );
                } else {
                  $("#item-wrap").append(
                    `<div name="${result}" class="item"><span style="color:#1469d6">${xx[i]}:${yy[i]}</span></div>`
                  );
                }
              } else {
                continue;
              }
            }
          }
        } else {
          // alert("Not Found!!");
        }
        // console.log(n.snippet.topLevelComment);
      });
      $("#loading").css("display", "none");
      if (res.nextPageToken) {
        nextToken = res.nextPageToken;
        test(params, nextToken);
      }
      return nextToken;
      // $("#item-wrap").text(JSON.stringify(res));
      // $(this).addClass("done");
    })
    .always(function (res) {
      $(".item").click((e) => {
        console.log();
        const result = e.target.getAttribute("name");

        recall(result, params);
      });
    });
}

function getUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true,
  };

  chrome.tabs.query(queryInfo, function (tabs) {
    var tab = tabs[0];
    var url = tab.url;
    callback(url);
  });
}

function test(params, token) {
  $.ajax({
    url: `https://www.googleapis.com/youtube/v3/commentThreads?key=AIzaSyCEPRtcNEEj1j1jf38t-azXiuhX8Aeuc5s&textFormat=plainText&part=snippet&videoId=${params}&maxResults=100&pageToken=${token}`,
    // context: document.body,
  })
    .done(function (res) {
      // const result = res.json();
      // console.log(result);
      const resultArr = res.items;
      if (res.nextPageToken) {
        nextToken = res.nextPageToken;
      }
      resultArr.forEach((n) => {
        const str = n.snippet.topLevelComment.snippet.textDisplay;
        if (str.indexOf(":") != -1) {
          let result = 0;
          preResult = 0;
          var xx = fn(str);
          var yy = rn(str);
          console.log(str);
          if (xx && yy) {
            const ar = ho(str);
            for (let i = 0; i < xx.length; i++) {
              console.log(xx[i]);
              console.log(yy[i]);
              if (xx[i] >= 60) {
                continue;
              }
              if (xx[i] && yy[i]) {
                result = xx[i] * 60 + yy[i] * 1;
                if (preResult == result) {
                  break;
                }
                preResult = result;
                // console.log(result);
                // console.log(xx[i]);
                // console.log(yy[i]);
                console.log(ar[i]);
                console.log(`${xx[i]}:${yy[i]}///${str}`);

                if (ar[i]) {
                  $("#item-wrap").append(
                    `<div name="${result}" class="item"><span style="color:#1469d6">${xx[i]}:${yy[i]}</span>${ar[i]}</div>`
                  );
                } else {
                  $("#item-wrap").append(
                    `<div name="${result}" class="item"><span style="color:#1469d6">${xx[i]}:${yy[i]}</span></div>`
                  );
                }
              } else {
                continue;
              }
            }
          }
        } else {
          // alert("Not Found!!");
        }
        // console.log(n.snippet.topLevelComment);
      });
      if (res.nextPageToken) {
        nextToken = res.nextPageToken;
        test(params, nextToken);
      }
      // test(params);
      // $("#item-wrap").text(JSON.stringify(res));
      // $(this).addClass("done");
    })
    .always(function (res) {
      $(".item").click((e) => {
        console.log();
        const result = e.target.getAttribute("name");
        recall(result, params);
      });
    });
}

// $(document).ready(function () {
//   $(document).scroll(function () {
//     var maxHeight = $(document).height();
//     var currentScroll = $(window).scrollTop() + $(window).height();

//     if (maxHeight <= currentScroll + 100) {
//       alert("gigi");
//       // $.ajax({
//       //   // Append next contents
//       //   ...
//       // })
//     }
//   });
// });

// $(window).scroll(function () {
//   var scrolltop = $(document).scrollTop();
//   console.log(scrolltop);
//   var height = $(document).height();
//   console.log(height);
//   var height_win = $(window).height();
//   console.log(height_win);

//   if (
//     Math.round($(window).scrollTop()) ==
//     $(document).height() - $(window).height()
//   ) {
//     alert("오호");
//   }
// });

// port.postMessage({ joke: "Knock knock" });
// port.onMessage.addListener(function (msg) {
//   if (msg.question == "Who's there?")
//     port.postMessage({ answer: "Madame" });
//   else if (msg.question == "Madame who?")
//     port.postMessage({ answer: "Madame... Bovary" });
// });
// window.postMessage(
//   { type: "FROM_PAGE", text: "Hello from the webpage!" },
//   "*"
// );

// https: chrome.extension.sendMessage({
//   action: "e",
//   source: "dhdhdh",
// });

// alert("qweq");
// chrome.runtime.onConnect.addListener(function (port) {
//   console.assert(port.name == "knockknock");
//   port.onMessage.addListener(function (msg) {
//     if (msg.joke == "Knock knock")
//       port.postMessage({ question: "Who's there?" });
//     else if (msg.answer == "Madame")
//       port.postMessage({ question: "Madame who?" });
//     else if (msg.answer == "Madame... Bovary")
//       port.postMessage({ question: "I don't get it." });
//   });
// });

// alert("Eaw");
// alert("qwe");
// console.log("클릭요");
// chrome.runtime.sendMessage({ greeting: "hello" }, function (response) {
//   // console.log(response.farewell);
//   // document.body.innerText = response.farewell;
//   alert("허허 왜 안됨");
// });
// port.postMessage({ joke: "Knock knock" });
// port.onMessage.addListener(function (msg) {
//   if (msg.question == "Who's there?") {
//     console.log("Qweq");
//     port.postMessage({ answer: "Madame" });
//   } else if (msg.question == "Madame who?") {
//     console.log("Qweq");
//     port.postMessage({ answer: "Madame... Bovary" });
//   }
// });

// var port = chrome.runtime.connect();
// window.addEventListener(
//   "message",
//   function (event) {
//     // We only accept messages from ourselves
//     if (event.source != window) return;

//     if (event.data.type && event.data.type == "FROM_PAGE") {
//       console.log("Content script received: " + event.data.text);
//       port.postMessage(event.data.text);
//     }
//   },
//   false
// );

const recall = (result, params) => {
  try {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { result: result, params: params },
        function (response) {
          try {
            console.log(response.farewell);
          } catch (error) {
            console.log(error);
          }
        }
      );
    });
    console.log("디버깅");
    return;
  } catch (error) {
    console.log(error);
  }
};

// chrome.extension.onMessage.addListener({ greeting: "hello" }, function (
//   request,
//   sender
// ) {
//   if (request.action == "getSource") {
//     // console.log(document.getElementById("item-wrap"));
//     // document.getElementById("item-wrap").innerHTML("qwee");
//     // document.body.innerText = "qweq";
//     // 여기가 받은 내용을 처리하는 부분
//     // console.log(request);
//     // document.body.innerText = request.source;
//     // let test = request.source;
//     // test.forEach((n) => {
//     //   document.body.innerHTML = "qweq";
//     // });
//     // alert(test);
//     // document.body.innerHTML = request.source;
//     // const test = document_body.getElementById("item-wrap");
//     // console.log(test);
//     console.log(request.source);
//   } else if (request.action == "getSource") {
//     // console.log("Qweqew");
//     document.body.innerText = request.source;

//     // $("#item-wrap").html("요청이 완료되었습니다!");
//   }
// });

// function go() {
//   alert("Qwe");
// }

// function myFunction() {
//   console.log("asd");
//   alert("qwe");
// }

// $.ajax({
//   url:
//     "https://www.googleapis.com/youtube/v3/commentThreads?key=AIzaSyCEPRtcNEEj1j1jf38t-azXiuhX8Aeuc5s&textFormat=plainText&part=snippet&videoId=4nk-SH6VmIU&maxResults=100",
//   // url: "https://localhost:3000",
//   type: "GET",
//   dataType: "jsonp",
//   cors: true,
//   contentType: "application/json",
//   secure: true,
//   headers: {
//     "Access-Control-Allow-Origin": "*",
//   },
// })
//   .done(function (json) {
//     $("#item-wrap").html("요청이 완료되었습니다!");
//   })
//   // HTTP 요청이 실패하면 오류와 상태에 관한 정보가 fail() 메소드로 전달됨.
//   .fail(function (xhr, status, errorThrown) {
//     alert("qwe");
//     $("#item-wrap").html("요청이 완료되었습니다!");

//     // HTTP 요청이 성공하거나 실패하는 것에 상관없이 언제나 always() 메소드가 실행됨.
//   })
//   .always(function (xhr, status) {
//     alert("qwe");

//     $("#item-wrap").html("요청이 완료되었습니다!");
//   });

// chrome.extension.onMessage.addListener(function (request, sender) {
//   if (request.action == "getSource") {
//     // console.log(document.getElementById("item-wrap"));
//     // document.getElementById("item-wrap").innerHTML("qwee");
//     // document.body.innerText = "qweq";
//     // 여기가 받은 내용을 처리하는 부분
//     // console.log(request);
//     // document.body.innerText = request.source;
//     // let test = request.source;
//     // test.forEach((n) => {
//     //   document.body.innerHTML = "qweq";
//     // });
//     // alert(test);
//     // document.body.innerHTML = request.source;
//     // const test = document_body.getElementById("item-wrap");
//     // console.log(test);
//     $.ajax({
//       url:
//         "https://www.googleapis.com/youtube/v3/commentThreads?key=AIzaSyCEPRtcNEEj1j1jf38t-azXiuhX8Aeuc5s&textFormat=plainText&part=snippet&videoId=4nk-SH6VmIU&maxResults=100",
//       type: "GET",
//       dataType: "jsonp",
//       cors: true,
//       contentType: "application/json",
//       secure: true,
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//       },
//     })
//       .done(function (json) {
//         alert("qwe");
//         $("#item-wrap").html("요청이 완료되었습니다!");
//       })
//       // HTTP 요청이 실패하면 오류와 상태에 관한 정보가 fail() 메소드로 전달됨.
//       .fail(function (xhr, status, errorThrown) {
//         alert("qwe");
//         $("#item-wrap").html("요청이 완료되었습니다!");

//         // HTTP 요청이 성공하거나 실패하는 것에 상관없이 언제나 always() 메소드가 실행됨.
//       })
//       .always(function (xhr, status) {
//         $("#item-wrap").html("요청이 완료되었습니다!");
//       });
//   } else if (request.action == "getSource") {
//     // console.log("Qweqew");
//     document.body.innerText = request.source;

//     // $("#item-wrap").html("요청이 완료되었습니다!");
//   }
// });

// chrome.runtime.sendMessage({ greeting: "hello" }, function (response) {
//   // console.log(response.farewell);
//   const res = response.farewell;
//   // console.log(res);
//   // res.then((n) => {
//   //   alert(n);
//   // });
//   alert(JSON.stringify(res));
//   // alert(JSON.parse(res));
//   // res.then((tho) => {
//   //   document.body.innerText = tho;
//   // });
//   // document.body.innerText = response.farewell;
// });

function onWindowLoad() {
  // chrome.runtime.sendMessage({ greeting: "hello" }, function (response) {
  //   console.log(response.farewell);
  // });
  // alert("Qwe");
  chrome.tabs.executeScript(
    null,
    {
      file: "getSource.js",
    },
    function () {
      if (chrome.extension.lastError) {
        document.body.innerText =
          "There was an error injecting script : \n" +
          chrome.extension.lastError.message;
      }
    }
  );
}

window.onload = onWindowLoad;
