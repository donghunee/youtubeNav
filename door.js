// function get_source(document_body) {

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // let url =
  //   "https://www.googleapis.com/youtube/v3/commentThreads?key=AIzaSyCEPRtcNEEj1j1jf38t-azXiuhX8Aeuc5s&textFormat=plainText&part=snippet&videoId=4nk-SH6VmIU&maxResults=100";
  // document_body.ytd-app.scrollTop = 1010;
  // const result = await fetch(url);
  // const jso = await result.json();
  // console.log(jso);
  // console.log(document);
  // const qwe = document.getElementsByClassName(
  //   "style-scope ytd-video-primary-info-renderer"
  // );
  // alert(qwe);
  console.log("되냐");
  window.location.href = "http://www.abc.com/";
  location.href = "https://www.youtube.com";
  // gogo(url).then((n) => {
  //   console.log(n);
  //   sendResponse({ farewell: co });
  // });
  // console.log(result);
  sendResponse({ farewell: "qwe" });
  // result.then((n) => {

  // });

  // result.then((r) => {
  //   // console.log(r);
  // });

  // const result = document_body.getElementsByClassName(
  //   "yt-simple-endpoint style-scope yt-formatted-string"
  // );

  // // console.log(document_body.innerText);

  // for (let index of result) {
  //   console.log(index);
  // }

  // console.log(
  //   sender.tab
  //     ? "from a content script:" + sender.tab.url
  //     : "from the extension"
  // );
  // if (request.greeting == "hello") sendResponse({ farewell: "goodbye" });
});

// result.forEach(function (n) {
//   console.log(n);
// });

// return document_body.getElementsByClassName(
//   "yt-simple-endpoint style-scope yt-formatted-string"
// );
// }
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

// chrome.runtime.onConnect.addListener(function (port) {
//   console.assert(port.name == "knockknock");
//   console.log("잉?");
//   window.location.href = "http://www.abc.com/";
//   location.href = "https://www.youtube.com";
//   console.log("qweq1111");
//   // alert("qwewq");
//   port.onMessage.addListener(function (msg) {
//     if (msg.joke == "Knock knock")
//       port.postMessage({ question: "Who's there?" });
//     else if (msg.answer == "Madame")
//       port.postMessage({ question: "Madame who?" });
//     else if (msg.answer == "Madame... Bovary")
//       port.postMessage({ question: "I don't get it." });
//   });
// });
