var words = {
  Dog: "Chien",
  Bike: "Vélo",
  Guitar: "Guitare",
  Book: "Livre",
};

$(document).ready(function () {
  // If the user clicks on a english word then an french word run this function
  $(".frbtn").click(function () {
    $(".frbtn").removeClass("btn-secondary").addClass("btn-primary"); // Change button color to show selection
    $(this).removeClass("btn-primary").addClass("btn-secondary"); // Restore to org color if user selects another button
    $("#frenchText").val(this.value); // Display selected word in textarea
    // console.log(words[$("#frenchText").val()]); // temp log
    if (words[$("#englishText").val()] === this.value) {
      $(this).addClass("removeTest"); // Add CSS class to remove button on successful match.
      let englishWord = $("#englishText").val();
      document.getElementById(englishWord).classList.add("removeTest");
    }
  });

  // If the user clicks on a french word then an english word run this function
  $(".engbtn").click(function () {
    $(".engbtn").removeClass("btn-secondary").addClass("btn-primary");
    $(this).removeClass("btn-primary").addClass("btn-secondary");
    $("#englishText").val(this.value);
    console.log(words[$("#englishText").val()]); // temp log
    if (words[this.value] === $("#frenchText").val()) {
      $(this).addClass("removeTest");
      let frenchWord = $("#frenchText").val();
      document.getElementById(frenchWord).classList.add("removeTest");
    }
  });

  // Timer
  var secondsDown = 10; // Increse in for final project.
  var timeIntervalUp = setInterval(function () {
    startTimer();
  }, 1000);

  function startTimer() {
    document.getElementById("counter").innerHTML =
      "Time Remaining: " + secondsDown;
    secondsDown--;

    if (secondsDown == 0) {
      clearInterval(timeIntervalUp);
      endTimer();
      reload();
    }
  }
  function endTimer() {
    document.getElementById("counter").innerHTML = "Time ran out";
  }

  function reload() {
    // Run modal with restricted user options. Only option available is to restart page
    $("#myModal").modal({
      backdrop: "static",
      keyboard: false,
    });
  }
});
