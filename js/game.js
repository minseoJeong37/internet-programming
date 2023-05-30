$(document).ready(function () {
  $(".header").load("../html/header.html");
});

const question = "elephant"

$('#submitButton').click(function() {
  // 버튼이 클릭되었을 때 실행할 코드 작성
  const subject = "Please answer yes or no to the" + question + "question";
  const userChat = $('#userInput').val();

  const url = 'http://localhost:8080/chat-gpt/question';

  const data = {
    userRequest: subject,
    question: userChat
  };

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(responseData => {
      // 요청에 대한 응답 처리
      alert(JSON.stringify(responseData.choices[0].message.content));
    })
    .catch(error => {
      // 오류 처리
      console.error('Error:', error);
    });
});

$('#inputCorrect').click(function(){
  if($('#userInput').val() == question){
    alert("정답");
  } else {
    alert("실패");
  }
})
