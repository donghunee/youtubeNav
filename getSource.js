// function get_source(document_body) {
//   // document_body.
//   history.go(0);
//   console.log("qweqweq");
//   // const result = document_body.getElementsByClassName(
//   //   "yt-simple-endpoint style-scope yt-formatted-string"
//   // );

//   // console.log(document_body.innerText);

//   // for (let index of result) {
//   //   console.log(index);
//   // }

//   // result.forEach(function (n) {
//   //   console.log(n);
//   // });
//   return document_body.innerText;
//   // return document_body.getElementsByClassName(
//   //   "yt-simple-endpoint style-scope yt-formatted-string"
//   // );
// }

// var port = chrome.runtime.connect();
// chrome.runtime.onConnect.addListener(function (port) {
//   console.log("adijaiwdjiawij");
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

// window.addEventListener(
//   "message",
//   function (event) {
//     this.console.log("Qwee");
//     // We only accept messages from ourselves
//     if (event.source != window) return;

//     if (event.data.type && event.data.type == "FROM_PAGE") {
//       console.log("Content script received: " + event.data.text);
//       this.alert("gogogogogo");
//       // port.postMessage(event.data.text);
//     }
//   },
//   false
// );

// var port = chrome.runtime.connect({ name: "knockknock" });

// // port.postMessage({ joke: "Knock knock" });

// port.onMessage.addListener(function (msg) {
//   if (msg.question == "Who's there?") port.postMessage({ answer: "Madame" });
//   else if (msg.question == "Madame who?")
//     port.postMessage({ answer: "Madame... Bovary" });
// });

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   alert("qeqe");
//   console.log(
//     sender.tab
//       ? "from a content script:" + sender.tab.url
//       : "from the extension"
//   );
//   history.go(0);
//   if (request.greeting == "hello") sendResponse({ farewell: "goodbye2" });
// });

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // window.location.href = "http://www.abc.com/";
  // let ma = Math.floor(Math.random() * 100) + 1;
  const result = request.result;
  const params = request.params;

  // $.ajax({
  //   url: `/watch?v=${params}&t=${result}s`,
  //   // context: document.body,
  // })
  //   .done(function (res) {
  //     // const result = res.json();
  //     // console.log(result);
  //     // const resultArr = res.items;
  //     console.log(res);
  //     $(".style-scope yt-img-shadow").css("display", "none");
  //     // alert(res);
  //   })
  //   .fail(function (xhr, status, errorThrown) {
  //     // alert("fail");
  //   });
  $("#container").append(
    `<div id="content-text" slot="content" split-lines="" class="style-scope ytd-comment-renderer"><a class="yt-simple-endpoint style-scope yt-formatted-string" spellcheck="false" href="/watch?v=q75scBzQcHk&amp;t=55s" dir="auto">0:55</a></div>`
  );
  // location.href = `/watch?v=${params}&t=${result}s`;
  sendResponse({ farewell: "제발" });
});

// var port = chrome.runtime.connect({ name: "knockknock" });
// port.postMessage({ joke: "Knock knock" });
// port.onMessage.addListener(function (msg) {
//   if (msg.question == "Who's there?") port.postMessage({ answer: "Madame" });
//   else if (msg.question == "Madame who?")
//     port.postMessage({ answer: "Madame... Bovary" });
// });

// chrome.extension.onMessage.addListener(function (request, sender) {
//   alert("된다된다");
// });

// var port = chrome.runtime.connect();

// window.addEventListener(
//   "message",
//   function (event) {
//     this.alert("qweqwe");
//     // We only accept messages from ourselves
//     if (event.source != window) return;
//     if (event.data.type && event.data.type == "FROM_PAGE") {
//       console.log("Content script received: " + event.data.text);
//       port.postMessage(event.data.text);
//     }
//   },
//   false
// );

// chrome.runtime.onConnectExternal.addListener(function (port) {
//   port.onMessage.addListener(function (msg) {
//     // See other examples for sample onMessage handlers.
//     console.log(msg);
//   });
// });
// chrome.extension.sendMessage({
//   action: "getSource",
//   source: get_source(document.body),
//   // source: "gogo",
// });

// window.postMessage({ type: "FROM_PAGE", text: "Hello from the webpage!" }, "*");

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
