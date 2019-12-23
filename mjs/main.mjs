/* on importe les modules */
import { quiz } from "./quiz.mjs";
import { Fenetre } from "./Fenetre.mjs";
import { Question } from "./Question.mjs";
import { animation_intro } from "./animation_intro.mjs";
import { Util } from "./Util.mjs";

// Variables de l'application
// Objet littéral pour les questions du quiz
animation_intro(lancerQuiz);

function baisserVolumme() {
  var musique = document.getElementById("musique_intro");
  musique.volume = 0.3;
}
baisserVolumme();

// Console.log("Les questions du Quiz:", questionsQuiz);
function lancerQuiz() {
  let noQuestionEnCours, //no de la question en cours
    conteneurHtml, // qui contiendra une question
    etatQuiz, //Indications sur l'évolution du Quiz
    boutonSuivant, //Bouton pour afficher les questions suivantes
    dateDebut = new Date(); // On crée une date lorsque le quiz commence
  console.log(dateDebut);

  //Quand la page est chargée...

  //On récupère les balises où seront affichées les infos ou autres

  conteneurHtml = document.querySelector("section");
  etatQuiz = document.querySelector("footer > p");
  boutonSuivant = document.querySelector("footer > div");

  // On randomize les questions
  let questionRandom = quiz.listeQuestions;
  Util.shuffleArray(questionRandom);

  // On randomize les réponses
  questionRandom.forEach(question => {
    Util.shuffleArray(question.reponses);
  });

  console.log(questionRandom);

  // On crée une nouvelle question
  const leQuestionnaire = new Question(
    quiz.listeQuestions,
    conteneurHtml,
    "animQuestion",
    finJeu,
    boutonSuivant
  );

  //On initialise les valeurs du quiz pour commencer à jouer
  onCommenceJouer();

  function onCommenceJouer(evt) {
    //Initialiser les variables
    leQuestionnaire.noQuestionEnCours = 0;
    leQuestionnaire.nombreDeBonneReponse = 0;
    leQuestionnaire.creerQuestion();
    leQuestionnaire.afficherProchaineQuestion();
  } // onCommenceJouer

  function finJeu() {
    // on récupère le meilleur score sauvegardé dans localStorage
    let meilleurScore =
      localStorage.getItem("meilleurScore") === null
        ? 0
        : localStorage.getItem("meilleurScore");
    // le maximum entre meilleurScore et leQuestionnaire.nombreDeBonneReponse
    meilleurScore = Math.max(
      meilleurScore,
      leQuestionnaire.nombreDeBonneReponse
    );

    //On crée une variable quand le quiz fini pour savoir le temps écoulé
    var dateFin = new Date();
    let tempsEcoule = dateFin - dateDebut;
    tempsEcoule /= 1000;
    console.log("temps ecoulé : ", tempsEcoule);

    // on enregistre ce meilleur score dans localStorage
    localStorage.setItem("meilleurScore", meilleurScore);
    // on configure les éléments de la fenêtre
    let laPage = document.querySelector("body"),
      largeur = laPage.offsetWidth,
      hauteur = laPage.offsetHeight,
      texte =
        "Le quiz est terminé.<br>" +
        `Vous avez obtenu ${leQuestionnaire.nombreDeBonneReponse} / ${leQuestionnaire.listeQuestions.length}<br>` +
        `Le meilleur pointage à date est ${meilleurScore}<br>` +
        `Votre temps est de : ` +
        Math.round(tempsEcoule) +
        " secondes" +
        "<br>Cliquer pour fermer la fenêtre et rejouer!";

    // Voir constructeur de la classe fenêtre...

    let uneFenetre = new Fenetre(
      0,
      0,
      largeur,
      hauteur,
      "fenetre",
      texte,
      laPage,
      onCommenceJouer
    );
  } // Fin afficherFenetre
}
