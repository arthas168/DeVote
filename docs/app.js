$(document).ready(function () {
    let timerStarted = false;

    $('.countdown-timer').hide();
    $('.calculating-result-div').hide();
    $('.vote-ended-div').hide();

    $(".start").click(function () {
        $(".start-btn-div").hide();
        initTimer();
        votingSimulator();
        $(".countdown-timer").show();
        console.log("started");
    });

    function votingSimulator() {

    }

    function initTimer() {
        timerStarted = true;
        document.getElementById('timer').innerHTML =
            "00" + ":" + "10";
        startTimer();

        function startTimer() {
            var presentTime = document.getElementById('timer').innerHTML;
            var timeArray = presentTime.split(/[:]+/);
            var m = timeArray[0];
            var s = checkSecond((timeArray[1] - 1));
            if (s == 59) {
                m = m - 1
            }

            if (m == 0 && s == 0) {
                console.log("timer finished");
                timerStarted = false;
                calculateResults();
            }

            document.getElementById('timer').innerHTML =
                m + ":" + s;
            setTimeout(startTimer, 1000);
        }

        function checkSecond(sec) {
            if (sec < 10 && sec >= 0) {
                sec = "0" + sec;
            }
            if (sec < 0) {
                sec = "59"
            }
            return sec;
        }

        if (timerStarted) {
            $('.site-header').hide();
            $('body').css('padding-top', '7.6rem');
        }

        function calculateResults() {
            $('.countdown-timer').hide();
            $('.calculating-result-div').show();
            setTimeout(showResults, 3000);
        }


        function showResults() {
            $('.calculating-result-div').hide();
            $('body').css('padding-top', '0');
            $('.vote-ended-div').show();
            $('.site-header').show();
        }

        $(".hillary-btn").click(function () {

        });

    }
});

