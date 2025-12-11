// script.js
// Quiz logic for American Football 101
// Handles scoring, pass/fail, and per-question feedback.

// Run after the DOM loads
document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("quiz-form");
  if (!form) return; // Only run this on the quiz page.

  var summary = document.getElementById("quiz-summary");
  var resetBtn = document.getElementById("reset-btn");

  function setFeedback(elementId, isCorrect, message, perQuestionScore) {
    var el = document.getElementById(elementId);
    if (!el) return;
    var statusClass = isCorrect ? "correct" : "incorrect";
    var label = isCorrect ? "Correct" : "Incorrect";
    el.innerHTML =
      '<span class="badge ' +
      statusClass +
      '">Score: ' +
      perQuestionScore +
      " / 1 – " +
      label +
      "</span>" +
      '<span class="answer-text"> ' +
      message +
      "</span>";
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var score = 0;
    var totalQuestions = 5;

    // Q1 – touchdown points (fill-in)
    var q1Input = document.getElementById("q1");
    var q1Value = q1Input ? q1Input.value.trim().toLowerCase() : "";
    var q1Correct = ["6", "six"];
    var q1IsCorrect = q1Correct.indexOf(q1Value) !== -1;
    if (q1IsCorrect) score++;
    setFeedback(
      "q1-feedback",
      q1IsCorrect,
      "Correct answer: a touchdown is worth 6 points.",
      q1IsCorrect ? 1 : 0
    );

    // Q2 – 11 offensive players
    var q2Selected = document.querySelector('input[name="q2"]:checked');
    var q2Value = q2Selected ? q2Selected.value : null;
    var q2IsCorrect = q2Value === "11";
    if (q2IsCorrect) score++;
    setFeedback(
      "q2-feedback",
      q2IsCorrect,
      "Correct answer: 11 offensive players are allowed on the field.",
      q2IsCorrect ? 1 : 0
    );

    // Q3 – 10 yards for a first down
    var q3Selected = document.querySelector('input[name="q3"]:checked');
    var q3Value = q3Selected ? q3Selected.value : null;
    var q3IsCorrect = q3Value === "10";
    if (q3IsCorrect) score++;
    setFeedback(
      "q3-feedback",
      q3IsCorrect,
      "Correct answer: an offense usually needs 10 yards for a new first down.",
      q3IsCorrect ? 1 : 0
    );

    // Q4 – line of scrimmage definition
    var q4Selected = document.querySelector('input[name="q4"]:checked');
    var q4Value = q4Selected ? q4Selected.value : null;
    var q4IsCorrect = q4Value === "where-play-begins";
    if (q4IsCorrect) score++;
    setFeedback(
      "q4-feedback",
      q4IsCorrect,
      "Correct answer: it's the imaginary line where the ball is spotted and each play begins.",
      q4IsCorrect ? 1 : 0
    );

    // Q5 – multi-select offensive positions (QB, RB, WR)
    var q5Checked = Array.prototype.slice
      .call(document.querySelectorAll('input[name="q5"]:checked'))
      .map(function (cb) {
        return cb.value;
      });

    var correctSet = ["qb", "rb", "wr"];
    var q5IsCorrect =
      q5Checked.length === correctSet.length &&
      correctSet.every(function (val) {
        return q5Checked.indexOf(val) !== -1;
      });

    if (q5IsCorrect) score++;
    setFeedback(
      "q5-feedback",
      q5IsCorrect,
      "Correct answers: Quarterback (QB), Running Back (RB), and Wide Receiver (WR) are offensive positions.",
      q5IsCorrect ? 1 : 0
    );

    // Overall result
    var percentage = Math.round((score / totalQuestions) * 100);
    var passed = percentage >= 70;

    if (summary) {
      summary.innerHTML =
        '<div class="summary-card">' +
        '<h2>Overall result: <span class="' +
        (passed ? "text-pass" : "text-fail") +
        '">' +
        (passed ? "Pass" : "Fail") +
        "</span></h2>" +
        "<p>Total score: <strong>" +
        score +
        " / " +
        totalQuestions +
        "</strong> (" +
        percentage +
        "%)</p>" +
        '<p class="small">You can scroll up to review the feedback and correct answers for each question.</p>' +
        "</div>";
    }
  });

  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      form.reset();
      if (summary) summary.innerHTML = "";
      var feedbackBlocks = document.querySelectorAll(".feedback");
      feedbackBlocks.forEach(function (block) {
        block.innerHTML = "";
      });
    });
  }
});
