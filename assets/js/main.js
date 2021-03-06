// Randomise buttons
function randomiseWords() {
    $(".frenchCard").randomize(".frbtn");
    $(".englishCard").randomize(".engbtn");
}

(function ($) {
    $.fn.randomize = function (childElem) {
        return this.each(function () {
            var $this = $(this);
            var elems = $this.children(childElem);
            elems.sort(function () {
                return Math.round(Math.random()) - 0.8;
            });
            $this.remove(childElem);
            for (var i = 0; i < elems.length; i++) $this.append(elems[i]);
        });
    };
})(jQuery);

// Counter
function countdown(minutes) {
    let seconds = minutes * 80;
    var interval = setInterval(() => {
        counter.innerHTML =
            parseInt(seconds / 60) +
            ":" +
            (seconds % 60 < 10 ? "0" : "") +
            (seconds % 60);
        seconds--;
        var myNodeList = $(".removeButton");

        if (seconds == 0) { // Counter reaches zero
            clearInterval(interval);
            $("#countdownPastModal").modal("show");
        } else if (myNodeList.length >= 26) { // All words have been successfully paired
            clearInterval(interval);
            $("#gameCompleteModal").modal("show");
        }
    }, 1000);
}
$(document).ready(function () {
    // Show pop up on page load
    let name = localStorage.getItem("name");

    if (!name) {
        $("#enterNameModal").modal("show");
    } else {
        document.getElementById("name").innerHTML = name;
        countdown(1);
    }

    // Select english word > french word
    $(".frbtn").click(function () {
        $(".frbtn").removeClass("btn-secondary").addClass("btn-primary");
        $(this).removeClass("btn-primary").addClass("btn-secondary");
        $("#frenchText").val(this.value);
        if (words[$("#englishText").val()] === this.value) {
            $(this).addClass("removeButton fadeOut");
            let englishWord = $("#englishText").val();
            $("#" + englishWord).addClass("removeButton fadeOut");
            matchAll();
        }
    });

    // Select french word > english word
    $(".engbtn").click(function () {
        $(".engbtn").removeClass("btn-secondary").addClass("btn-primary");
        $(this).removeClass("btn-primary").addClass("btn-secondary");
        $("#englishText").val(this.value);
        if (words[this.value] === $("#frenchText").val()) {
            $(this).addClass("removeButton fadeOut");
            let frenchWord = $("#frenchText").val();
            $("#" + frenchWord).addClass("removeButton fadeOut");
            matchAll();
        }
    });

    function matchAll() {
        var myNodeList = $(".removeButton");
        if (myNodeList.length >= 26) {
            $("#gameCompleteModal").modal("show");
            clearInterval(); //Stop counter
        }
    }
    // Reload page on click. 
    $("#restartButton").click(function () {
        location.reload();
    });

    $("#tryAgainButton").click(function () {
        location.reload();
    });

    // Enter name on page load.
    $("#enterNameButton").click(function () {
        var str = $("#nameInput").val();
        if (str == "") {
            $("#enterNameVal").html("Enter Name");
        } else {
            localStorage.setItem("name", str)
            document.getElementById("name").innerHTML = str;
            countdown(1);
            $("#enterNameModal").modal("hide");
        }
    });
});
