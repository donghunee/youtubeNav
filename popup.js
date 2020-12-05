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
  res = str.match(/[0-9]{1,2}(?=:)/g);
  return res;
}

function rn(str) {
  var res;
  res = str.match(/(?<=:)[0-9]{2}/g);
  return res;
}

function ho(str) {
  var res;
  res = str.split(/[0-9]{1,2}:[0-9]{2}/g);
  res.splice(0, 1);
  return res;
}

function hodo(str) {
  var res;
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
    url: `https://www.googleapis.com/youtube/v3/commentThreads?key=키를입력해주세용&textFormat=plainText&part=snippet&videoId=${params}&maxResults=100`,
  })
    .done(function (res) {
      const resultArr = res.items;

      resultArr.forEach((n) => {
        const str = n.snippet.topLevelComment.snippet.textDisplay;
        if (str.indexOf(":") != -1) {
          let result = 0;
          preResult = 0;
          var xx = fn(str);
          var yy = rn(str);
          if (xx && yy) {
            const ar = ho(str);
            for (let i = 0; i < xx.length; i++) {
              if (xx[i] >= 60) {
                continue;
              }
              if (xx[i] && yy[i]) {
                result = xx[i] * 60 + yy[i] * 1;
                if (preResult == result) {
                  break;
                }
                preResult = result;
                if (ar[i]) {
                  $("#item-wrap").append(
                    `<div name="${result}" class="item"><span style="color:#1469d6;pointer-events: none; ">${xx[i]}:${yy[i]}</span>${ar[i]}</div>`
                  );
                } else {
                  $("#item-wrap").append(
                    `<div name="${result}" class="item"><span style="color:#1469d6;pointer-events: none; ">${xx[i]}:${yy[i]}</span></div>`
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
    url: `https://www.googleapis.com/youtube/v3/commentThreads?key=키를입력해주세용&textFormat=plainText&part=snippet&videoId=${params}&maxResults=100&pageToken=${token}`,
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
          // console.log(str);
          if (xx && yy) {
            const ar = ho(str);
            for (let i = 0; i < xx.length; i++) {
              if (xx[i] >= 60) {
                continue;
              }
              if (xx[i] && yy[i]) {
                result = xx[i] * 60 + yy[i] * 1;
                if (preResult == result) {
                  break;
                }
                preResult = result;
                if (ar[i]) {
                  $("#item-wrap").append(
                    `<div name="${result}" class="item"><span style="color:#1469d6;pointer-events: none; ">${xx[i]}:${yy[i]}</span>${ar[i]}</div>`
                  );
                } else {
                  $("#item-wrap").append(
                    `<div name="${result}" class="item"><span style="color:#1469d6;pointer-events: none; ">${xx[i]}:${yy[i]}</span></div>`
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
        const result = e.target.getAttribute("name");
        recall(result, params);
      });
    });
}

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
    return;
  } catch (error) {}
};

function onWindowLoad() {
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
