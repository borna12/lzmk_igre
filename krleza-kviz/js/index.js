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
    cvijece = ["vrata", "kota??", "bo??no staklo", "retrovizor", "sjedalo", "mjenja??", "volan", "ru??na ko??nica", "brisa??i", "prtlja??nik (razg. gepek)", "pojas", "motor", "dje??ja sjedalica", "rezervoar", "papu??ice auta",]
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
    function shuffle(array) { //izmje??aj pitanja
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
                question: "Koje je godine ro??en Miroslav Krle??a?",
                answers: ["1893.", "1892.","1891.","1890."],
                correctAnswer: "1893.",
                slika: "",
                opis_slike:"",
                opis: "Miroslav Milan Krle??a ro??en je 7. srpnja. 1893. u Zagrebu u obitelji gradskoga redarstvenog nadstra??ara Miroslava i Ivke. Prema krsnom listu, ro??en je u Petrovoj ulici 4; me??utim, sam je Krle??a vi??e puta pred raznim sugovornicima taj podatak korigirao: zapravo je ro??en u Dugoj ulici 5 (I. Hetrich, Dragutin Tadijanovi?? na zagreba??koj televiziji, <em>Forum</em>, 1983., 10-12.) u stanu na I. katu u sedam sati ujutro.",
                boja_pozadine: "#FCE4EC",
                link:"https://krlezijana.lzmk.hr/clanak.aspx?id=1747"
            },
            {
                question: "Tko je glavni lik u prvoj objavljenoj Krle??inoj drami <em>Legenda</em>?",
                answers: ["Kristofor Kolumbo", "Juraj Kri??ani??","Isus Krist","Michelangelo Buonarroti"],
                correctAnswer: "Isus Krist",
                slika: "",
                opis_slike:"",
                opis: "<em>Legenda</em> je prva Krle??ina drama objavljena 1914. te ujedno i prvi njegov otisnuti tekst. Drama <em>Legenda</em> interpretacija je posljednjih Isusovih dana, na podlozi tekstova evan??elja. Kasnije je pridodana knjizi dramskih tekstova <em>Legende</em>, koja je objavljena 1933. te sadr??ava sljede??e dramske tekstove: <em>Legenda</em>, <em>Michelangelo</em> <em>Buonarroti</em>, <em>Kristofor</em> <em>Kolumbo</em>, <em>Maskerata</em>, <em>Kraljevo</em>, <em>Adam i Eva</em>.",
                boja_pozadine: "#FCE4EC",
                link:"https://krlezijana.lzmk.hr/clanak.aspx?id=533"
            },
            {
                question: "Koja poznata Krle??ina antiratna novela zapo??inje ironijskim prikazom grofa Maksimilijana Axelrodea i zavr??ava smr??u studenta Vidovi??a?",
                answers: ["Bitka kod Bistrice Lesne", "Baraka Pet Be","Domobran Jambrek","Tri domobrana"],
                correctAnswer: "Baraka Pet Be",
                slika: "",
                opis_slike:"",
                opis: "<em>Baraka Pet Be</em> novela je koja je prvi put objavljena u Novoj Evropi&nbsp;1921., a zatim je uvr&scaron;tena u zbirku antiratnih novela <em>Hrvatski bog Mars</em> (Zagreb, 1922).",
                boja_pozadine: "#FCE4EC",
                link:"https://krlezijana.lzmk.hr/clanak.aspx?id=221"
            },

            {
                question: "Koji je Krle??in roman ispripovijedan u prvome licu?",
                answers: ["Povratak Filipa Latinovicza", "Na rubu pameti","Banket u Blitvi","Zastave"],
                correctAnswer: "Na rubu pameti",
                slika: "slike/pameti.jpg",
                opis_slike:"<em>Na rubu pameti</em>, Zagreb 1938.",
                opis: "<em>Na rubu pameti</em> ??etvrti je Krle??in roman, prvi je put objavljen u Zagrebu 1938.",
                boja_pozadine: "#FCE4EC",
                link:"https://krlezijana.lzmk.hr/clanak.aspx?id=636"
            },
           
            {
                question: "Koji je prvi Krle??in ??asopis koji je ure??ivao s Augustom Cesarcem?",
                answers: ["Plamen", "Danas","Pe??at","Forum"],
                correctAnswer: "Plamen",
                slika: "slike/plamen.jpg",
                opis_slike:"??asopis <em>Plamen</em>, Zagreb 1919. br. 3.",
                opis: "<em>Plamen &ndash; polumjese??nik za sve kulturne probleme</em> prvi je Krle??in ??asopis. Ure??ivali su ga August Cesarec i Krle??a (odgovorni urednik), objavljivao ga je zagreba??ki <em>Jug</em> (pri kojem je u Ilici 7 bilo uredni&scaron;tvo i uprava), likovno ga je opremio Ljubo Babi??. Tiskao ga je, vjerojatno u nakladi od dvije tisu??e primjeraka, Hermes.",
                boja_pozadine: "#FCE4EC",
                link:"https://krlezijana.lzmk.hr/clanak.aspx?id=1997"
            },


            {
                question: "S kojim se knji??evnim tradicijama Krle??a obra??unava u eseju <em>Hrvatska knji??evna la??</em>?",
                answers: ["s hrvatskim srednjovjekovljem i renesansom", "s hrvatskim barokom i klasicizmom","s hrvatskim prosvjetiteljstvom i predromantizmom","s hrvatskim preporodom i modernom"],
                correctAnswer: "s hrvatskim preporodom i modernom",
                slika: "slike/hrv_knjizevna_laz.jpg",
                opis_slike:"esej <em>Hrvatska knji??evna la??</em> u ??asopisu <em>Plamen</em>, Zagreb 1919. br. 1.",
                opis: "<em>Hrvatska knji??evna la??</em> poznati je Krle??in esej objavljen u prvome broju ??asopisa <em>Plamen</em> 1919. godine i mo??e se smatrati avangardnim manifestom u kojemu Krle??a kriti??ki odbacuje knji??evnost preporoda i hrvatske moderne te jugoslavenski nacionalizam, a kao pozitivne izdvaja bogumile, Jurja Kri??ani??a i Silvija Strahimira Kranj??evi??a.",
                boja_pozadine: "#FCE4EC",
                link:"https://krlezijana.lzmk.hr/clanak.aspx?id=398"
            },


            {
                question: "Koji se od pjesni??kih tekstova uvr??tava me??u Krle??ine <em>Simfonije</em>?",
                answers: ["Kaos", "Khevenhiller","Pan","Saloma"],
                correctAnswer: "Pan",
                slika: "slike/simfonije.jpg",
                opis_slike:"<em>Simfonije</em>, Zagreb 1933. (ovitak u izdanju Minerve F. Bruck)",
                opis: "<em>Pan</em> je jedan od &scaron;est Krle??inih duljih poetskih tekstova koji se pojavljuju u zbirci <em>Simfonije</em> (Zagreb, 1933.). Izvorno je objavljen u samostalnom izdanju (Zagreb, 1917.), s podnaslovom <em>Simfonijska pjesma</em>.",
                boja_pozadine: "#FCE4EC",
                link:"https://krlezijana.lzmk.hr/clanak.aspx?id=748"
            },
           
           
            {
                question: "Koja se zbirka pjesama Miroslava Krle??e objavljena 1936. godine u Ljubljani smatra jednim od najve??ih djela hrvatske knji??evnosti?",
                answers: ["Balade Petrice Kerempuha", "Baraka Pet Be","Hrvatski bog Mars","Povratak Filipa Latinovicza"],
                correctAnswer: "Balade Petrice Kerempuha",
                slika: "slike/balade.jpg",
                opis_slike:"Kip Petrice Kerempuha na Dolcu u Zagrebu, djelo kipara Vanje Radau??a, postavljen 1955. godine.",
                opis: "<em>Balade Petrice Kerempuha</em> zbirka su kajkavskih pjesama prvi put objavljena 1936. u Ljubljani. Drugo izdanje zbirke izdano je 1946. u Zagrebu te su dodane jo?? ??etiri balade. Po strukturnim zna??ajkama, po cjelovitosti i nepromjenjivosti kompozicije kao i po neznatnim intervencijama u prvotni tekst, Balade su najcjelovitije autorovo knji??evno djelo.",
                boja_pozadine: "#FCE4EC",
                link:"https://krlezijana.lzmk.hr/clanak.aspx?id=218"
            },{
                question: "Koje drame ??ine Krle??inu dramsku trilogiju o Glembajevima?",
                answers: ["U agoniji, Gospoda Glembajevi, Leda", "Golgota, Gospoda Glembajevi, Leda","U agoniji, Gospoda Glembajevi, Golgota","Legende, Gospoda Glembajevi, Vu??jak"],
                correctAnswer: "U agoniji, Gospoda Glembajevi, Leda",
                slika: "slike/glembajevi.jpg",
                opis_slike:"<em>Gospoda Glembajevi</em>, Miroslav Krle??a, 1928. DHK",
                opis: "Glembajevi, ciklus, skup od 14 tekstova (3 drame i 11 proza, koje autor sve naziva fragmentima), ??to ih je Krle??a postupno objavljivao 1926. ??? 1930. Tekstovi <em>Gospoda Glembajevi</em>, <em>U agoniji</em> i <em>Leda</em> su drame. ",
                boja_pozadine: "#FCE4EC",
                link:"https://krlezijana.lzmk.hr/clanak.aspx?id=340"
            },
           
           
            {
                question: "Koga na kraju poznate Krle??ine drame <em>Gospoda Glembajevi</em> Leone Glembay ubije ??karama?",
                answers: ["barunicu Castelli", "Pubu Fabriczyja","Ignjata Glembaya","Alojzija Silberbrandta"],
                correctAnswer: "barunicu Castelli",
                slika: "slike/glembaj.jpg",
                opis_slike:"Plakat za predstavu <em>Gospoda Glembajevi</em> u Narodnom kazali??tu u Mariboru.",
                opis: "Na kraju Krle??ine drame <em>Gospoda Glembajevi</em> mo??emo pro??itati: Leone pojuri za barunicom Castelli sa &scaron;karama u ruci. ??uje se graja iza scene nakon koje istr??ava sluga s rije??ima:&nbsp;<em>Gospon doktor zaklali su barunicu!</em>.",
                boja_pozadine: "#FCE4EC",
                link:"https://krlezijana.lzmk.hr/clanak.aspx?id=363"
            },
            {
                question: "Kako se zove Krle??ina zbirka pripovijetki antiratne i socijalne tematike koja je svoju kona??nu redakciju dobila 1946.?",
                answers: ["Hrvatski bog Mars", "Hrvatska rapsodija","Iz zapisa jednog ratnika","Na samrti"],
                correctAnswer: "Hrvatski bog Mars",
                slika: "slike/mars.jpg",
                opis_slike:"<em>Hrvatski bog Mars</em>, Zagreb 1922.",
                opis: "<em>Hrvatski bog Mars</em>, ciklus o hrvatskim domobranima u I. svjetskom ratu. Pod naslovom <em>Hrvatski bog Mars</em> izlaze od 1922. razli??ito koncipirane knjige koje obuhva??aju fragmente prethodno objavljene u ??asopisima ili drugim Krle??inim knjigama, s napomenom o pripadnosti ciklusu ili bez nje. U Napomeni izdanju <em>Hrvatskog boga Marsa</em> iz 1946, koje standardizira ciklus od sedam fragmenata (upotpunjen <em>Tuma??em domobranskih i stranih rije??i i pojmova</em> i <em>Napomenom</em>), pa se mo??e smatrati kona??nom redakcijom.",
                boja_pozadine: "#FCE4EC",
                link:"https://krlezijana.lzmk.hr/clanak.aspx?id=402"
            },{
                question: "Koji se roman iz 1932. smatra  prvim cjelovitim modernim romanom u hrvatskoj knji??evnosti?",
                answers: ["Povratak Filipa Latinovicza", "Poplava","Tri kavaljera frajle Melanije","Gospoda Glembajevi"],
                correctAnswer: "Povratak Filipa Latinovicza",
                slika: "",
                opis_slike:"",
                opis: "<em>Povratak Filipa Latinovicza</em>, roman objavljen prvi put u Zagrebu 1932. Pojedini njegovi dijelovi pisani su, sude??i prema Krle??inim pismima J. Bene??i??u i Bene??i??evim sje??anjima, u Pragu i Var??avi. Tijekom vremena roman <em>Povratak Filipa Latinovicza</em> postao je reprezentativnim djelom Krle??ine umjetnosti i pravim interpretacijskim izazovom za mnoge kriti??are i teoreti??are iz zemlje i iz svijeta. Nije stoga nimalo ??udno ??to u sveukupnoj literaturi o Krle??inu djelu tom tekstu pripada jedno od vode??ih mjesta.",
                boja_pozadine: "#FCE4EC",
                link:"https://krlezijana.lzmk.hr/clanak.aspx?id=842"
            },{
                question: "Kako se zove posljednji roman Miroslava Krle??e, koji je izdan u pet knjiga u razdoblju od 1962. do 1976.? ",
                answers: ["Zastave", "Poplava","Tri kavaljera frajle Melanije","Bobo??ka"],
                correctAnswer: "Zastave",
                slika: "slike/zastave.jpg",
                opis_slike:"ovitak <em>Zastave</em> iz 1967. u izdanju Zore koji je likovno opremio E. Murti??",
                opis: "<em>Zastave</em>, roman koji je po??eo izlaziti u Akademijinu ??asopisu <em>Forum</em>, 1962., 3???7/8. U pet nastavaka objavljen je tekstovni materijal prve knjige romana.",
                boja_pozadine: "#FCE4EC",
                link:"https://krlezijana.lzmk.hr/clanak.aspx?id=1200"
            },{
                question: "Koju je ustanovu utemeljio Krle??a 5. listopada 1950.?",
                answers: ["Leksikografski zavod Miroslav Krle??a", "Nacionalnu i sveu??ili??nu knji??nicu","Dru??tvo hrvatskih knji??evnika","Hrvatsku akademiju znanosti i umjetnosti"],
                correctAnswer: "Leksikografski zavod Miroslav Krle??a",
                slika: "slike/lzmk.jpg",
                opis_slike:"",
                opis: "Leksikografski zavod Miroslav Krle??a, sredi??nja hrvatska leksikografska ustanova. Utemeljen je kao Leksikografski zavod FNRJ 5. listopada 1950. odlukom jugoslavenske vlade, 1962. preimenovan u Jugoslavenski leksikografski zavod, 1972. osniva??ka su prava prenesena na Hrvatski sabor, 1991. uredbom Vlade RH dobio je sada??nje ime, a njegov ustroj i podru??je djelovanja ure??eni su zakonom iz 2003. kojim je Zavod odre??en kao javna ustanova u djelatnosti leksikografije i enciklopedike od osobitog interesa za Republiku Hrvatsku.",
                boja_pozadine: "#FCE4EC",
                link:"https://www.enciklopedija.hr/natuknica.aspx?ID=35937"
            },
            {
                question: "U prvome tjednu kojega se mjeseca svake godine odr??ava <em>Festival Miroslava Krle??e</em>?",
                answers: ["srpnja", "lipnja","svibnja","travnja"],
                correctAnswer: "srpnja",
                slika: "",
                opis_slike:"",
                opis: "Festival se svake godine odvija po??etkom srpnja u Zagrebu te se na njemu izvode predstave temeljene na Krle??inim djelima, odr??avaju predavanja o Krle??i i organiziraju obilasci Zagreba tematski povezani s Krle??inim ??ivotom i djelom. 7. srpnja u 7 sati svake godine, u sklopu Festivala, organizira se Ro??endan kod Krle??e u povodu proslave pi&scaron;??eva ro??endana.",
                boja_pozadine: "#FCE4EC",
                link:"https://krlezijana.lzmk.hr/clanak.aspx?id=1747"
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

        if( quiz[questionCounter].correctAnswer=="s hrvatskim preporodom i modernom"){
            $(".questions-page__answer-line").addClass("prored2")
        }
        else{
            $(".questions-page__answer-line").removeClass("prored2")
        }
        if( quiz[questionCounter].correctAnswer=="Leksikografski zavod Miroslav Krle??a" || quiz[questionCounter].correctAnswer=="U agoniji, Gospoda Glembajevi, Leda" || quiz[questionCounter].correctAnswer=="Balade Petrice Kerempuha"){
            $(".questions-page__answer-line").addClass("prored")
        }
        else{
            $(".questions-page__answer-line").removeClass("prored")
        }
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
            Swal.fire({
                title: "Isteklo je vrijeme.",
                html: "<p style='text-align:center'><strong>To??an je odgovor: <span style='color:#bb422a; ' >" + quiz[questionCounter].correctAnswer + "</span></strong></p><br><p class='opis'>" + quiz[questionCounter].opis + "</em></p><br><a class='center' href='"+quiz[questionCounter].link+"' target='_blank'>op??irnije...</a><figure><img src='" + quiz[questionCounter].slika + " 'class='slikica2'/> <figcaption>"+quiz[questionCounter].opis_slike+"</figcaption></figure>",
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
                nastavi()
            })
            $(".swal2-close").click(function () {
                clearInterval(countdownTimer)
                if (ide == 1) {
                    ProgressCountdown(60, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                }
                nastavi()
            })

            if(quiz[questionCounter].slika==""){
                $("figure").hide()
            }
        } else {
            // Evaluate if the user got the answer right or wrong
            if (userSelectedAnswer === correctAnswer) {
                // Increment the total correct answers counter
                correctAnswersCounter++;
                bodovi += 10;
                $("#tocno")[0].play();
                broj = vrijeme + 10
                Swal.fire({
                    title: "<span style='color:green'>To??no</span>",
                    html: "<span>+" + broj + "</span><br><br><p class='opis'>" + quiz[questionCounter].opis + "</p><br><a class='center' href='"+quiz[questionCounter].link+"' target='_blank'>op??irnije...</a><figure><img src='" + quiz[questionCounter].slika + "'class='slikica2'/> <figcaption>"+quiz[questionCounter].opis_slike+"</figcaption></figure></p>",
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
                    nastavi()
                })
                $(".swal2-close").click(function () {
                    clearInterval(countdownTimer)
                    if (ide == 1) {
                        ProgressCountdown(60, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                    }
                    nastavi()
                })
                if(quiz[questionCounter].slika==""){
                    $("figure").hide()
                }
            } else {
                highlightIncorrectAnswerRed();
                bodovi -= 10;
                $("#krivo")[0].play();
                Swal.fire({
                    title: " <span style='color:#bb422a' >Neto??no</span>",
                    html: "<p style='text-align:center'><strong>To??an je odgovor: <span style='color:#bb422a; ' >" + quiz[questionCounter].correctAnswer + "</span></strong></p><br><p class='opis'>" + quiz[questionCounter].opis + "</p><br><a class='center' href='"+quiz[questionCounter].link+"' target='_blank'>op??irnije...</a><figure><img src='" + quiz[questionCounter].slika + " 'class='slikica2'/> <figcaption>"+quiz[questionCounter].opis_slike+"</figcaption></figure>",
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
                    nastavi()
                })
                $(".swal2-close").click(function () {
                    clearInterval(countdownTimer)
                    if (ide == 1) {
                        ProgressCountdown(60, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                    }
                    nastavi()
                })
                if(quiz[questionCounter].slika==""){
                    $("figure").hide()
                }

               
            }
        }
      
        // Substitute the submit button for the continue button:
        submitBtn.hide(300);
        
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