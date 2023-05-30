$(document).ready(function () {
  $(".header").load("../html/header.html");
});

$("#userInput").keydown(function (keyNum) {
  if (keyNum.keyCode == 13) {
    $("#submitButton").click();
  }
});

$("#submitButton").click(function () {
  // 버튼이 클릭되었을 때 실행할 코드 작성

  const subject = "We're playing word chain";
  const userChat = $("#userInput").val();

  const url = "http://localhost:8080/chat-gpt/question";

  const data = {
    userRequest: subject,
    question: userChat,
  };

  // 입력시 3초 제한
  $(this).prop("disabled", true);
  // Disable the input
  $("#userInput").prop("disabled", true);
  // After 3 seconds...
  setTimeout(function () {
    // Enable the button and input
    $("#submitButton").prop("disabled", false);
    $("#userInput").prop("disabled", false);
    $("#userInput").focus();
    $("#userInput").val("");
  }, 1500); // 1500 milliseconds = 1.5 seconds

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((responseData) => {
      // 요청에 대한 응답 처리
      var result = JSON.stringify(responseData.choices[0].message.content);
      $("#gpt-text").text(result.replace(/"/g, ""));
    })
    .catch((error) => {
      // 오류 처리
      console.error("Error:", error);
    });
});
