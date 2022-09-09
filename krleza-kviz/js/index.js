// VARIABLE DECLARATIONS ------
// pages
var initPage,
    questionsPage,
    resultsPage,
    // buttons
    startBtn,
    submitBtn,
    continueBtn,
    retakeBtn,
    spanishBtn,
    // question and answers
    question,
    answerList,
    answerSpan,
    answerA,
    answerB,
    answerC,
    answerD,
    // event listeners
    answerDiv,
    answerDivA,
    answerDivB,
    answerDivC,
    answerDivD,
    feedbackDiv,
    selectionDiv,
    toBeHighlighted,
    toBeMarked,
    userScore,
    // quiz
    quiz,
    questionCounter,
    correctAnswer,
    correctAnswersCounter,
    userSelectedAnswer,
    // function names
    newQuiz,
    generateQuestionAndAnswers,
    getCorrectAnswer,
    getUserAnswer,
    selectAnswer,
    deselectAnswer,
    selectCorrectAnswer,
    deselectCorrectAnswer,
    getSelectedAnswerDivs,
    highlightCorrectAnswerGreen,
    highlightIncorrectAnswerRed,
    slikica,
    clearHighlightsAndFeedback,
    prekidac, countdownTimer, bodovi = 0,
    vrijeme = 0,
    uglata, obla;
function ProgressCountdown(timeleft, bar, text) {
    return new Promise((resolve, reject) => {
        countdownTimer = setInterval(() => {
            timeleft--;
            document.getElementById(bar).value = timeleft;
            document.getElementById(text).textContent = timeleft;
            if (timeleft <= 0) {
                clearInterval(countdownTimer);
                resolve(true);
            } else if (timeleft <= 1) {
                $("#sekunde").html("sekunda")
                $("#ostalo").html("ostala")
            } else if (timeleft <= 4) {
                $("#sekunde").html("sekunde")
            }
        }, 1000);
    });
}
$(document).ready(function () {
    // DOM SELECTION ------
    // App pages
    // Page 1 - Initial
    initPage = $('.init-page');
    // Page 2 - Questions/answers
    questionsPage = $('.questions-page');
    // Page 3 - Results
    resultsPage = $('.results-page');
    slikica = $('.slikica');
    // Buttons
    startBtn = $('.init-page__btn, .results-page__retake-btn');
    submitBtn = $('.mrzim');
    continueBtn = $('.questions-page__continue-btn');
    retakeBtn = $('.results-page__retake-btn');
    spanishBtn = $('.results-page__spanish-btn');
    // Answer block divs
    answerDiv = $('.questions-page__answer-div');
    answerDivA = $('.questions-page__answer-div-a');
    answerDivB = $('.questions-page__answer-div-b');
    answerDivC = $('.questions-page__answer-div-c');
    answerDivD = $('.questions-page__answer-div-d');
    // Selection div (for the pointer, on the left)
    selectionDiv = $('.questions-page__selection-div');
    // Feedback div (for the checkmark or X, on the right)
    feedbackDiv = $('.questions-page__feedback-div');
    // Questions and answers
    question = $('.questions-page__question');
    answerList = $('.questions-page__answer-list');
    answerSpan = $('.questions-page__answer-span');
    answerA = $('.questions-page__answer-A');
    answerB = $('.questions-page__answer-B');
    answerC = $('.questions-page__answer-C');
    answerD = $('.questions-page__answer-D');
    // User final score
    userScore = $('.results-page__score');
    prikazBodova = $('.results-page__bodovi');
    cvijece = ["vrata", "kotač", "bočno staklo", "retrovizor", "sjedalo", "mjenjač", "volan", "ručna kočnica", "brisači", "prtljažnik (razg. gepek)", "pojas", "motor", "dječja sjedalica", "rezervoar", "papučice auta",]
    // QUIZ CONTENT ------
    
    function stvori(tekst, tekst2, tekst3) {
        do {
            predmet = cvijece[Math.floor(Math.random() * cvijece.length)];
        }
        while (predmet == tekst || predmet == tekst2 || predmet == tekst3);
        return predmet
    }
    function stvori2(tekst, tekst2, tekst3) {
        do {
            predmet = cvijece2[Math.floor(Math.random() * cvijece2.length)];
        }
        while (predmet == tekst || predmet == tekst2 || predmet == tekst3);
        return predmet
    }
    // FUNCTION DECLARATIONS ------
    $.fn.declasse = function (re) {
        return this.each(function () {
            var c = this.classList
            for (var i = c.length - 1; i >= 0; i--) {
                var classe = "" + c[i]
                if (classe.match(re)) c.remove(classe)
            }
        })
    }
    function shuffle(array) { //izmješaj pitanja
        var i = 0,
            j = 0,
            temp = null
        for (i = array.length - 1; i > 0; i -= 1) {
            j = Math.floor(Math.random() * (i + 1))
            temp = array[i]
            array[i] = array[j]
            array[j] = temp
        }
    }
    // Start the quiz
    newQuiz = function () {
        prekidac = 1;
        bodovi = 0;
        // Set the question counter to 0
        questionCounter = 0;
        // Set the total correct answers counter to 0
        correctAnswersCounter = 0;
        // Hide other pages of the app
        questionsPage.hide();
        resultsPage.hide();
        if (uglata == 1) {
            quiz = [{
                question: "Koje godine je rođen Krleža?",
                answers: ["1893.", "1892.","1891.","1890."],
                correctAnswer: "1893.",
                slika: "slike/roden.jpg",
                opis_slike:"",
                opis: "Miroslav Milan Krleža rođen je 7. VII. 1893. u Zagrebu u obitelji gradskoga redarstvenog nadstražara Miroslava i Ivke. Prema krsnom listu, rođenje u Petrovoj ulici 4; međutim, sam je K. više puta pred raznim sugovornicima taj podatak korigirao: zapravo je rođen u Dugoj ulici 5 (I. Hetrich, Dragutin Tadijanović na zagrebačkoj televiziji, Forum, 1983, 10-12) u stanu na I. katu u sedam sati ujutro.",
                boja_pozadine: "#FCE4EC",
                link:"https://krlezijana.lzmk.hr/clanak.aspx?id=1747"
            },{
                question: "Koja zbirka pjesama od Miroslav Krleže objavljena 1936. godine u Ljubljani se smatra jednom od najvećih dijela hrvatske književnosti?",
                answers: ["Balade Petrice Kerempuha", "Baraka pet be","Hrvatski bog Mars","Povratak Filipa Latinovicza"],
                correctAnswer: "Balade Petrice Kerempuha",
                slika: "slike/balade.jpg",
                opis_slike:"Kip Petrice Kerempuha na Dolcu u Zagrebu, djelo kipara Vanje Radauša, postavljen 1955. godine na malen trg na kojem se preko dana prodaje cvijeće.",
                opis: "Balade Petrice Kerempuha su zbirka kajkavskih pjesama prvi put objavljena 1936. u Ljubljani. Drugo izdanje zbirke izadno je 1946. u Zagrebu te su dodane još četiri balade. Po strukturnim značajkama, po cjelovitosti i nepromjenljivosti kompozicije kao i po neznatnim intervencijama u prvotni tekst, Balade su najdovršenije autorovo književno djelo.",
                boja_pozadine: "#FCE4EC",
                link:"https://krlezijana.lzmk.hr/clanak.aspx?id=218"
            },{
                question: "Koje knjige spadaju pod ciklus knjiga o Glembajevima?",
                answers: ["U agoniji, Gospoda Glembajevi, Leda", "Golgota, Gospoda Glembajevi, Leda","U agoniji, Gospoda Glembajevi, Golgota","Legende, Gospoda Glembajevi, Vučjak"],
                correctAnswer: "U agoniji, Gospoda Glembajevi, Leda",
                slika: "slike/glembaj.jpg",
                opis_slike:"Plakat za predstavu Gospoda Glembajevi u Narodnom kazalištu u Mariboru.",
                opis: "Glembajevi, ciklus, skup od 14 tekstova (3 drame i 11 proza, koje autor sve naziva fragmentima), što ih je Krleža postupno objavljivao 1926-30. Tekstovi Gospoda Glembajevi, U agoniji i Leda su drame. ",
                boja_pozadine: "#FCE4EC",
                link:"https://krlezijana.lzmk.hr/clanak.aspx?id=340"
            },{
                question: "Kako se zove Krležina zbirka pripovjetki antiratne i socijalne tematike koja je svoj konačni redakcija dobila 1946.?",
                answers: ["Hrvatski bog Mars", "Hrvatska rapsodija","Iz zapisa jednog ratnika","Na samrti"],
                correctAnswer: "Hrvatski bog Mars",
                slika: "slike/mars.jpg",
                opis_slike:"Naslovnica prvog izdanja zbirke pripovijedaka <em>Hrvatski bog Mars</em> Miroslava Krleže iz 1922.",
                opis: "Hrvatski bog Mars, ciklus o hrvatskim domobranima u I. svj. ratu. Pod naslovom Hrvatski bog Mars izlaze od 1922. različito koncipirane knjige koje obuhvaćaju fragmente prethodno objavljene u časopisima ili drugim Krležinim knjigama, s opaskom o pripadnosti ciklusu ili bez nje. U Napomeni izdanju Hrvatskog boga Marsa iz 1946, koje standardizira ciklus od sedam fragmenata (upotpunjen Tumačem domobranskih i stranih riječi i pojmova te samom Napomenom), pa se može smatrati konačnom redakcijom.",
                boja_pozadine: "#FCE4EC",
                link:"https://krlezijana.lzmk.hr/clanak.aspx?id=402"
            },{
                question: "Koji roman iz 1932. smatra se prvim cjelovitim modernim romanom u hrvatskoj književnosti?",
                answers: ["Povratak Filipa Latinovicza", "Poplava","Tri kavaljera frajle Melanije","Gospoda Glembajevi"],
                correctAnswer: "Povratak Filipa Latinovicza",
                slika: "slike/filip.jpg",
                opis_slike:"Roman u prvom izdanju iz 1932., Minerva, Zagreb.",
                opis: "Povratak Filipa Latinovicza, roman objavljen prvi put u Zagrebu 1932. Pojedini njegovi dijelovi pisani su, sudeći prema Krležinim pismima J. Benešiću i Benešićevim sjećanjima, u Pragu i Varšavi. Tijekom vremena roman Povratak Filipa Latinovicza postao je reprezentativnim djelom Krležine umjetnosti i pravim interpretacijskim izazovom za mnoge kritičare i teoretičare iz zemlje i iz svijeta. Nije stoga nimalo čudno što u sveukupnoj literaturi o Krležinu djelu tom tekstu pripada jedno od vodećih mjesta.",
                boja_pozadine: "#FCE4EC",
                link:"https://krlezijana.lzmk.hr/clanak.aspx?id=842"
            },{
                question: "Kako se zove posljednji roman Miroslava Krleže koji je izdan u pet knjiga u razdoblju od 1962. do 1976.? ",
                answers: ["Zastave", "Poplava","Tri kavaljera frajle Melanije","Bobočka"],
                correctAnswer: "Zastave",
                slika: "slike/Zastave.jpg",
                opis_slike:"Zgrada Leksikografskog zavoda Miroslav Krleža na Frankopanskoj ulici u Zagrebu",
                opis: "Zastave, roman koji je počeo izlaziti u Akademijinu časopisu Forum, 1962, 3-7/8. U pet nastavaka objavljenje tekstovni materijal prve knjige romana.",
                boja_pozadine: "#FCE4EC",
                link:"https://krlezijana.lzmk.hr/clanak.aspx?id=1200"
            },{
                question: "Koju je ustanovu utemlejio Kreleža 5. listopada 1950.?",
                answers: ["Leksikografski zavod Miroslav Krleža", "Nacionalnu i sveučilišna knjižnicu","Društvo hrvatskih književnika","Hrvatsku akademiju znanosti i umjetnosti"],
                correctAnswer: "Leksikografski zavod Miroslav Krleža",
                slika: "slike/lzmk.jpg",
                opis_slike:"",
                opis: "Leksikografski zavod Miroslav Krleža, središnja hrvatska leksikografska ustanova. Utemeljen je kao Leksikografski zavod FNRJ 5. X. 1950. odlukom jugoslavenske vlade, 1962. preimenovan u Jugoslavenski leksikografski zavod, 1972. osnivačka su prava prenesena na Hrvatski sabor, 1991. uredbom Vlade RH dobio je sadašnje ime, a njegov ustroj i područje djelovanja uređeni su zakonom iz 2003. kojim je Zavod institucionaliziran kao javna ustanova u djelatnosti leksikografije i enciklopedike od osobitog interesa za Republiku Hrvatsku.",
                boja_pozadine: "#FCE4EC",
                link:"https://www.enciklopedija.hr/natuknica.aspx?ID=35937"
            }
            ];
        }
       
        shuffle(quiz)
    };
    // Load the next question and set of answers
    generateQuestionAndAnswers = function () {
        $(".questions-page__answer-list").show()
        question.html("<span style='font-size: 1.3rem;'>" + (questionCounter + 1) + "/" + quiz.length + ".</span> <br>");
        shuffle(quiz[questionCounter].answers);
        answerA.text(quiz[questionCounter].answers[0]);
        if (answerA.html() == "" || null) {
            answerDivA.hide()
        } else {
            answerDivA.show()
        };
        answerB.text(quiz[questionCounter].answers[1]);
        if (answerB.html() == "" || null) {
            answerDivB.hide()
        } else {
            answerDivB.show()
        };
        answerC.text(quiz[questionCounter].answers[2]);
        if (answerC.html() == "" || null) {
            answerDivC.hide()
        } else {
            answerDivC.show()
        };
        answerD.text(quiz[questionCounter].answers[3]);
        if (answerD.html() == "" || null) {
            answerDivD.hide()
        } else {
            answerDivD.show()
        };
        slikica.hide()
        $("#opis").html("<em>" + quiz[questionCounter].question + "</em>")
        $(".definicija").html(quiz[questionCounter].question)
        $(".vrijeme").html('<progress value="60" max="60" id="pageBeginCountdown"><span id="pageBeginCountdownText">60</p>')
        $("body").css({
            "background-color": quiz[questionCounter].boja_pozadine
        })
        if (quiz[questionCounter].question[0] == "_") {
            $(".questions-page__answer-span").each(function () {
                var s = $(this).text().split(' ');
                for (var i = 0; i < 1; i++) {
                    s[i] = s[i].substring(0, 1).toUpperCase() + s[i].substring(1);
                }
                s = s.join(' ');
                $(this).text(s);
            })
        }
        if (prekidac == 1) {
            ProgressCountdown(60, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
        }
    };
    // Store the correct answer of a given question
    getCorrectAnswer = function () {
        correctAnswer = quiz[questionCounter].correctAnswer;
    };
    // Store the user's selected (clicked) answer
    getUserAnswer = function (target) {
        userSelectedAnswer = $(target).find(answerSpan).text();
    };
    // Add the pointer to the clicked answer
    selectAnswer = function (target) {
        $(target).find(selectionDiv).addClass('ion-chevron-right');
        $(target).addClass("odabir")
    };
    // Remove the pointer from any answer that has it
    deselectAnswer = function () {
        if (selectionDiv.hasClass('ion-chevron-right')) {
            selectionDiv.removeClass('ion-chevron-right');
            selectionDiv.parent().removeClass("odabir")
        }
    };
    // Get the selected answer's div for highlighting purposes
    getSelectedAnswerDivs = function (target) {
        toBeHighlighted = $(target);
        toBeMarked = $(target).find(feedbackDiv);
    };
    // Make the correct answer green and add checkmark
    highlightCorrectAnswerGreen = function (target) {
        if (correctAnswer === answerA.text()) {
            answerDivA.addClass('questions-page--correct');
            answerDivA.find(feedbackDiv).addClass('ion-checkmark-round');
        }
        if (correctAnswer === answerB.text()) {
            answerDivB.addClass('questions-page--correct');
            answerDivB.find(feedbackDiv).addClass('ion-checkmark-round');
        }
        if (correctAnswer === answerC.text()) {
            answerDivC.addClass('questions-page--correct');
            answerDivC.find(feedbackDiv).addClass('ion-checkmark-round');
        }
        if (correctAnswer === answerD.text()) {
            answerDivD.addClass('questions-page--correct');
            answerDivD.find(feedbackDiv).addClass('ion-checkmark-round');
        }
    };
    // Make the incorrect answer red and add X
    highlightIncorrectAnswerRed = function () {
        toBeHighlighted.addClass('questions-page--incorrect');
        toBeMarked.addClass('ion-close-round');
    };
    // Clear all highlighting and feedback
    clearHighlightsAndFeedback = function () {
        answerDiv.removeClass('questions-page--correct');
        answerDiv.removeClass('questions-page--incorrect');
        feedbackDiv.removeClass('ion-checkmark-round');
        feedbackDiv.removeClass('ion-close-round');
    };
    // APP FUNCTIONALITY ------
    /* --- PAGE 1/3 --- */
    // Start the quiz:
    resultsPage.hide();
    submitBtn.hide();
    continueBtn.hide();
    // Clicking on start button:
    startBtn.on('click', function () {
        newQuiz();
        // Advance to questions page
        initPage.hide();
        questionsPage.show(300);
        // Load question and answers
        generateQuestionAndAnswers();
        // Store the correct answer in a variable
        getCorrectAnswer();
        // Hide the submit and continue buttons
        submitBtn.hide();
        continueBtn.hide();
    });
    /* --- PAGE 2/3 --- */
    // Clicking on an answer:
    answerDiv.on('click', function () {
        // Make the submit button visible
        // Remove pointer from any answer that already has it
        deselectAnswer();
        // Put pointer on clicked answer
        selectAnswer(this);
        // Store current selection as user answer
        getUserAnswer(this);
        // Store current answer div for highlighting purposes
        getSelectedAnswerDivs(this);
        odgovor();
    });
    function odgovor() {
        vrijeme = parseInt($("#pageBeginCountdownText").text())
        bodovi += vrijeme
        prekidac = 0;
        var ide = 0
        // Disable ability to select an answer
        answerDiv.off('click');
        if (questionCounter != quiz.length - 1) {
            ide = 1
        } else {
            ide = 0
        }
        // Make correct answer green and add a checkmark
        highlightCorrectAnswerGreen();
        clearInterval(countdownTimer);
        if (document.getElementById("pageBeginCountdown").value == "0") {
            $("#krivo")[0].play();
            bodovi -= 10;
            swal({
                title: "Isteklo je vrijeme.",
                html: "<p style='text-align:center'><strong>Točan odgovor je: <span style='color:#bb422a; ' >" + quiz[questionCounter].correctAnswer + "</span></strong>.</p><br><p class='opis'>" + quiz[questionCounter].opis + "</em></p><a class='center' href='"+quiz[questionCounter].link+"' target='_blank'>opširnije...</a><figure><img src='" + quiz[questionCounter].slika + " 'class='slikica2'/> <figcaption>"+quiz[questionCounter].opis_slike+"</figcaption></figure>",
                showCloseButton: true,
                confirmButtonText: ' dalje',
                backdrop: false,
                allowOutsideClick: false, allowEscapeKey: false
            });
            $(".swal2-confirm").click(function () {
                clearInterval(countdownTimer)
                if (ide == 1) {
                    ProgressCountdown(60, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                }
            })
            $(".swal2-close").click(function () {
                clearInterval(countdownTimer)
                if (ide == 1) {
                    ProgressCountdown(60, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                }
            })
        } else {
            // Evaluate if the user got the answer right or wrong
            if (userSelectedAnswer === correctAnswer) {
                // Increment the total correct answers counter
                correctAnswersCounter++;
                bodovi += 10;
                $("#tocno")[0].play();
                broj = vrijeme + 10
                swal({
                    title: "<span style='color:green'>Točno</span>",
                    html: "<span>+" + broj + "</span><br><br><p class='opis'>" + quiz[questionCounter].opis + "</p><a class='center' href='"+quiz[questionCounter].link+"' target='_blank'>opširnije...</a><figure><img src='" + quiz[questionCounter].slika + "'class='slikica2'/> <figcaption>"+quiz[questionCounter].opis_slike+"</figcaption></figure></p>",
                    showCloseButton: true,
                    confirmButtonText: ' dalje',
                    backdrop: false,
                    allowOutsideClick: false, allowEscapeKey: false
                });
                $(".swal2-confirm").click(function () {
                    clearInterval(countdownTimer)
                    if (ide == 1) {
                        ProgressCountdown(60, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                    }
                })
                $(".swal2-close").click(function () {
                    clearInterval(countdownTimer)
                    if (ide == 1) {
                        ProgressCountdown(60, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                    }
                })
            } else {
                highlightIncorrectAnswerRed();
                bodovi -= 10;
                $("#krivo")[0].play();
                swal({
                    title: " <span style='color:#bb422a' >Netočno</span>",
                    html: "<p style='text-align:center'><strong>Točan odgovor je: <span style='color:#bb422a; ' >" + quiz[questionCounter].correctAnswer + "</span></strong>.</p><br><p class='opis'>" + quiz[questionCounter].opis + "</p><a class='center' href='"+quiz[questionCounter].link+"' target='_blank'>opširnije...</a><figure><img src='" + quiz[questionCounter].slika + " 'class='slikica2'/> <figcaption>"+quiz[questionCounter].opis_slike+"</figcaption></figure>",
                    showCloseButton: true,
                    confirmButtonText: ' dalje',
                    backdrop: false,
                    allowOutsideClick: false, allowEscapeKey: false
                });
                $(".swal2-confirm").click(function () {
                    clearInterval(countdownTimer)
                    if (ide == 1) {
                        ProgressCountdown(60, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                    }
                })
                $(".swal2-close").click(function () {
                    clearInterval(countdownTimer)
                    if (ide == 1) {
                        ProgressCountdown(60, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                    }
                })
            }
        }
        // Substitute the submit button for the continue button:
        submitBtn.hide(300);
        nastavi()
    }
    // Clicking on the submit button:
    function nastavi() {
        // Increment question number until there are no more questions, then advance to the next page
        if (questionCounter < quiz.length - 1) {
            questionCounter++;
        } else {
            document.getElementsByClassName('questions-page')[0].style.display = "none"
            document.getElementsByClassName('sakri')[0].style.display = "block"
            document.getElementsByClassName('results-page')[0].style.display = "block"
            // Display user score as a percentage
            userScore.text(Math.floor((correctAnswersCounter / quiz.length) * 100) + " %");
            prikazBodova.text(bodovi);
            $("#input-q2").attr("value", bodovi)
        }
        // Load the next question and set of answers
        generateQuestionAndAnswers();
        // Store the correct answer in a variable
        getCorrectAnswer();
        // Remove all selections, highlighting, and feedback
        deselectAnswer();
        clearHighlightsAndFeedback();
        // Hide the continue button
        continueBtn.hide(300);
        // Enable ability to select an answer
        answerDiv.on('click', function () {
            // Make the submit button visible
            // Remove pointer from any answer that already has it
            deselectAnswer();
            // Put pointer on clicked answer
            selectAnswer(this);
            // Store current answer div for highlighting purposes
            getSelectedAnswerDivs(this);
            // Store current selection as user answer
            getUserAnswer(this);
            odgovor()
        });
    }
    // Clicking on the continue button:
    continueBtn.on('click', function () {
    });
    $(".questions-page__answer-div").dblclick(function () {
        odgovor()
    })
    /* --- PAGE 3/3 --- */
    // Clicking on the retake button:
    retakeBtn.on('click', function () {
        // Go to the first page
        // Start the quiz over
        newQuiz();
        resultsPage.hide();
        questionsPage.show(300);
        // Load question and answers
        generateQuestionAndAnswers();
        // Store the correct answer in a variable
        getCorrectAnswer();
        // Hide the submit and continue buttons
        submitBtn.hide();
        continueBtn.hide();
    });
    // Clicking on the spanish button:
    // Link takes user to Duolingo
});
function touchHandler(event) {
    var touches = event.changedTouches,
        first = touches[0],
        type = "";
    switch (event.type) {
        case "touchstart":
            type = "mousedown";
            break;
        case "touchmove":
            type = "mousemove";
            break;
        case "touchend":
            type = "mouseup";
            break;
        default:
            return;
    }
    // initMouseEvent(type, canBubble, cancelable, view, clickCount, 
    //                screenX, screenY, clientX, clientY, ctrlKey, 
    //                altKey, shiftKey, metaKey, button, relatedTarget);
    var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent(type, true, true, window, 1,
        first.screenX, first.screenY,
        first.clientX, first.clientY, false,
        false, false, false, 0 /*left*/, null);
    first.target.dispatchEvent(simulatedEvent);
    event.preventDefault();
}