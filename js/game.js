$(document).ready(function () {
  $(".header").load("../html/header.html");
});

const question = "elephant";
let count = 0;

$("#submitButton").click(function () {
  // 버튼이 클릭되었을 때 실행할 코드 작성
  const subject = "Please answer yes or no to the" + question + "question";
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

    increaseWidth();
});

$("#inputCorrect").click(function () {
  if ($("#userInput").val() == question) {
    $("#gpt-text").css("color", "#6AC7B2");
    $("#gpt-text").text("정답");
    refreshPage();
  } else {
    $("#userInput").focus();
    $("#gpt-text").css("color", "red");
    $("#gpt-text").text("오답");
    increaseWidth();
  }
});

function increaseWidth() {
  count++;
  var progressBar = document.getElementById('progressBar');
  var currentWidth = parseFloat(progressBar.style.width) || 9.7;
  var newWidth = currentWidth + 9.7;
  
  if (newWidth <= 100) {
    progressBar.style.width = newWidth + '%';
    var countElement = document.getElementById("count");
    countElement.textContent = (count + 1) + "/10";
  } else{
    alert("실패");
    refreshPage();
  }
  if(count==9){
    progressBar.style.backgroundColor = "red";
  }

  
}

function refreshPage() {
  location.reload();
}