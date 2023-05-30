$(document).ready(function () {
  $(".header").load("../html/header.html");
});

const question = "elephant";

$("#submitButton").click(function () {
  // 버튼이 클릭되었을 때 실행할 코드 작성
  $("#userInput").focus();
  const subject = "Please answer yes or no to the" + question + "question";
  const userChat = $("#userInput").val();

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
      var result = JSON.stringify(responseData.choices[0].message.content);
      $("#gpt-text").text(result.replace(/"/g, ""));
    })
    .catch((error) => {
      // 오류 처리
      console.error("Error:", error);
    });
});

$("#inputCorrect").click(function () {
  if ($("#userInput").val() == question) {
    $("#gpt-text").css("color", "#6AC7B2");
    $("#gpt-text").text("정답");
  } else {
    $("#userInput").focus();
    $("#gpt-text").css("color", "red");
    $("#gpt-text").text("오답");
  }
});
