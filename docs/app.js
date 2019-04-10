$(document).ready(function () {
    let timerStarted = false;
    let voteEnded = false;

    $('.countdown-timer').hide();
    $('.calculating-result-div').hide();
    $('.vote-ended-div').hide();
    $('.confirmation-div').hide();
    $('.trump-btn').hide();
    $('.hillary-btn').hide();
    $('.vote-done-div').hide();
    $('.winner-div').hide();

    $(".start").click(function () {
        $(".start-btn-div").hide();
        initTimer();
        $(".countdown-timer").show();
        $(".hillary-btn").show();
        $(".trump-btn").show();
    });

    function votingSimulator() {
        let messege = '';
        let randomTrumpVotes = Math.floor(Math.random() * 1000000) + 1000;
        let randomHillaryVotes = Math.floor(Math.random() * 1000000) + 1000;

        if (randomTrumpVotes > randomHillaryVotes) {
            messege = "The winner is Donald Trump with " + numberWithCommas(randomTrumpVotes)
                + " against " + numberWithCommas(randomHillaryVotes)
                + " votes for Hillary Clinton."
        } else if (randomHillaryVotes > randomTrumpVotes) {
            messege = "The winner is Hillary Clinton with " + numberWithCommas(randomHillaryVotes) + " against "
                + numberWithCommas(randomTrumpVotes)
                + " votes for Donald Trump."
        } else if (randomTrumpVotes === randomHillaryVotes) {
            messege = "It's a tie! Good luck America..."
        }

        $('.winner-div span:nth-child(1)').text(messege);
        $('.winner-div span').css('font-size', '16px');
        $('.winner-div span').css('margin-top: -1.5rem');
        $('.winner-div').show();
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
            $('.trump-btn').hide();
            $('.hillary-btn').hide();
            $('.countdown-timer').hide();
            $('.calculating-result-div').show();
            $('.confirmation-div').hide();
            setTimeout(showResults, 3000);
        }

        function showResults() {
            $('.calculating-result-div').hide();
            $('body').css('padding-top', '0');
            $('.vote-ended-div').show();
            $('.site-header').show();
        }

        $(".trump-btn").click(function () {
            $('.confirmation-div').show();
        });

        $(".hillary-btn").click(function () {
            $('.confirmation-div').show();
        });

        $(".confirmation-div span:nth-child(2)").click(function () {
            $(".confirmation-div").hide();
            $('.trump-btn').hide();
            $('.hillary-btn').hide();
            $('.vote-done-div').show();
            setTimeout(removeDoneDiv, 2000);
        });

        $(".confirmation-div span:nth-child(3)").click(function () {
            $('.confirmation-div').hide();
        });

        function removeDoneDiv() {
            $('.vote-done-div').hide();
        }

        $(".vote-ended-div").click(function () {
            if (!voteEnded) {
                votingSimulator();
                voteEnded = true;
            }
        });

        $(".winner-div span:nth-child(2)").click(function () {
            location.reload();
        });
    }
});

