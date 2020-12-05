function onWindowLoad() {
  console.log("팝업 페이지의 DOM 접근 : ", $("#product_name").text());
  // 위 결과는 위 html 파일에서 product_name 아이디의 태그 값인 Injecting Product Name.... 이 된다.
}

window.onload = onWindowLoad;
