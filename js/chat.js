$(document).ready(function () {
  $(".header").load("../html/header.html");
});

let GPTsubject = "";

$("#action").keydown(function (keyNum) {
  if (keyNum.keyCode == 13) {
    $("#subjectButton").click();
  }
});

$("#userChat").keydown(function (keyNum) {
  if (keyNum.keyCode == 13) {
    $("#submitButton").click();
  }
});

$("#submitButton").click(function () {
  // 버튼이 클릭되었을 때 실행할 코드 작성
  const subject =
    "You are a " +
    $("#action").val() +
    ". Please give me the right answer for this chat Please answer in one line";
  const userChat = $("#userChat").val();
  var divElement = document.createElement("div");
  divElement.classList.add("user-message");
  divElement.innerHTML = userChat;
  var messageWrap = document.querySelector(".message-wrap");
  messageWrap.appendChild(divElement);

  var inputValue = $("#action").val();
  var newMessage = $("<p>").text("");
  $(".message-wrap").append(newMessage);

  // Scroll to the bottom of .message-wrap
  $(".message-wrap").scrollTop($(".message-wrap")[0].scrollHeight);

  var inputElement = document.getElementById("userChat");
  inputElement.value = "";

  // 입력시 3초 제한
  $(this).prop("disabled", true);
  // Disable the input
  $("#userChat").prop("disabled", true);
  // After 3 seconds...
  setTimeout(function () {
    // Enable the button and input
    $("#submitButton").prop("disabled", false);
    $("#userChat").prop("disabled", false);
  }, 3000); // 3000 milliseconds = 3 seconds

  const url = "http://localhost:8080/chat-gpt/question";

  const data = {
    userRequest: subject,
    question: userChat,
  };

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
      var divElement = document.createElement("div");
      divElement.classList.add("gpt-message");
      divElement.innerHTML = JSON.stringify(
        responseData.choices[0].message.content
      );

      var messageWrap = document.querySelector(".message-wrap");
      messageWrap.appendChild(divElement);

      var inputValue = $("#action").val();
      var newMessage = $("<p>").text("");
      $(".message-wrap").append(newMessage);

      // Scroll to the bottom of .message-wrap
      $(".message-wrap").scrollTop($(".message-wrap")[0].scrollHeight);
    })
    .catch((error) => {
      // 오류 처리
      console.error("Error:", error);
    });
});

$("#subjectButton").click(function (event) {
  // Prevent the form from submitting
  event.preventDefault();
  // Get the value from the input field
  var inputValue = $("#action").val();
  // Replace the content of the h1 tag with the input value
  $("#subject").text(inputValue);

  GPTsubject = inputValue;
});
