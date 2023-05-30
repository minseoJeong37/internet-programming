$(document).ready(function () {
  $(".header").load("../html/header.html");
});


$("#submitButton").click(function () {
  // 버튼이 클릭되었을 때 실행할 코드 작성
  const subject = "You are a " + $("#action").val() +". Please give me the right answer for this chat Please answer in one line";
  const userChat = $("#userChat").val();
  var divElement = document.createElement("div");
  divElement.classList.add("user-message");
  divElement.innerHTML = userChat;
  var messageWrap = document.querySelector(".message-wrap");    
  messageWrap.appendChild(divElement);

  var inputElement = document.getElementById("userChat");
  inputElement.value = "";

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
      divElement.innerHTML = JSON.stringify(responseData.choices[0].message.content);
      var messageWrap = document.querySelector(".message-wrap");    
      messageWrap.appendChild(divElement);

    })
    .catch((error) => {
      // 오류 처리
      console.error("Error:", error);
    });
});
