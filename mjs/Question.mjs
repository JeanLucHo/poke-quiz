import { Util } from "./Util.mjs";
import { quiz } from "./quiz.mjs";

export class Question {
  /**
   * Classe permettant de créer et d'afficher une fenêtre
   * et, d'appeler une fonction de l'application passée en paramètre
   * @param {Array} listeQuestions - le tableau des question
   * @param {HTMLElement} conteneurHtml -  La question et ses choix de réponses seront insérée dans le conteneurHtml
   * @param {String} classCss  - Classe css pour la question
   * @param {Function} fonction  - fonction référencée à appeler sur un mousedown
   */

  constructor(listeQuestions, conteneurHtml, classCss, finJeu, boutonSuivant) {
    //Récupérer les valeurs passées en paramètre
    this.listeQuestions = listeQuestions;
    this.conteneurHtml = conteneurHtml;
    this.classCss = classCss;
    this.finJeu = finJeu;
    this.boutonSuivant = boutonSuivant;
    this.noQuestionEnCours = 0; // le numéro de la question en cours
    this.noQuestionDéjàValidé = -1; // la question qui vient d'être validée
    this.reference_afficherProchaineQuestion = this.afficherProchaineQuestion.bind(
      this
    );
    this.boutonSuivant.addEventListener(
      "mousedown",
      this.reference_afficherProchaineQuestion,
      false
    );
    this.nombreDeBonneReponse = 0;
  }

  /**
   * Méthode pour créer et afficher les instances de la classe Fenetre
   */
  creerQuestion() {
    // Créer le conteneur de Question
    // qui sera précédé par this (appartient à l'instance)
    this.elmQuestion = document.createElement("article");
    // Tous les éléments à l'intérieur de elmQuestion seront identifiés par des varaiables locales
    // on ajoute la class 'question' au nouvel élément
    this.elmQuestion.classList.add("question");

    //Créer une balise h1 pour le titre
    let elmTitre = document.createElement("h1");
    // on ajoute l'animation animTitreQuestion
    elmTitre.classList.add("animTitreQuestion");

    // On récupère le titre de la question
    elmTitre.innerHTML = this.listeQuestions[this.noQuestionEnCours].titre;
    // on ajoute elm titre à elmQuestion
    this.elmQuestion.appendChild(elmTitre);
    // On créé une liste de réponse
    let elmReponses = document.createElement("ul");
    //console.log("this.noQuestionEnCours = ", this.noQuestionEnCours)
    let elmRep; // une réponse
    let k = 0; // le numéro de la réponse
    // on parcourt l'ensemble des réponses de this.listeQuestions
    for (let rep of this.listeQuestions[this.noQuestionEnCours].reponses) {
      // Création de chaque élément réponse de la liste des réponses
      elmRep = document.createElement("li");
      // on ajoute l'animation des réponses
      elmRep.classList.add("animReponse");
      console.log(rep);

      elmRep.innerHTML = rep[0];
      elmRep.id = k++;
      elmReponses.appendChild(elmRep);
      elmRep.addEventListener("mousedown", this.valideLaReponse.bind(this));
    }
    this.elmQuestion.appendChild(elmReponses);
    this.conteneurHtml.appendChild(this.elmQuestion);
    this.boutonSuivant.removeEventListener(
      "mousedown",
      this.reference_afficherProchaineQuestion,
      false
    );
  }

  valideLaReponse(evt) {
    // on s'assure que la fonction ne s'exécute qu'une seule fois dès que l'utilisateur a cliquer sur un choix
    if (this.noQuestionEnCours != this.noQuestionDéjàValidé) {
      this.noQuestionDéjàValidé = this.noQuestionEnCours;
      console.log(this.noQuestionEnCours - 1);
      console.log(evt.target.id);
      console.log(
        this.listeQuestions[this.noQuestionEnCours - 1].reponses[
          evt.target.id
        ][1]
      );
      // Lorsqu'on choisie la bonne réponses :
      if (
        this.listeQuestions[this.noQuestionEnCours - 1].reponses[
          evt.target.id
        ][1]
      ) {
        evt.target.style.backgroundImage = "url(./img/pokeball-2_correcte.png)";
        evt.target.classList.add("animRectangleReponse");
        this.nombreDeBonneReponse += 1;
        var audio = new Audio(
          "./audio/[Pokémon] PIKACHU - Sound Effect [Free Tone Download].mp3"
        );
        audio.play();
        console.log(audio);
      }
      // Lorsqu'on choisie la mauvaise réponse :
      else {
        evt.target.style.backgroundImage = "url(./img/pokeball-2_faux.png)";
        evt.target.classList.add("animRectangleReponseMauvais");
        var audio = new Audio("./audio/Wrong Buzzer Sound Effect.mp3");
        audio.volume = 0.6;
        audio.play();
      }
      this.boutonSuivant.addEventListener(
        "mousedown",
        this.reference_afficherProchaineQuestion,
        false
      );
    }
  }
  detruireQuestion() {
    while (this.elmQuestion.lastChild) {
      while (this.elmQuestion.lastChild.firstChild) {
        this.elmQuestion.lastChild.removeChild(
          this.elmQuestion.lastChild.firstChild
        );
      }
      this.elmQuestion.removeChild(this.elmQuestion.lastChild);
    }

    console.log(this.conteneurHtml);
    this.conteneurHtml.removeChild(this.elmQuestion);
    //   this.conteneurHtml.removeChild(this.conteneurHtml.lastChild)

    /* on peut aussi utiliser cette approche récursive détruire l'ancienne question */
    // Util.detruireTousLesNoeud(this.conteneurHtml, this.conteneurHtml)
  }

  afficherProchaineQuestion(evt) {
    // S'il reste une question on l'affiche, sinon c'est la fin du jeu ...
    //console.log('this =  ', this)
    //console.log('this.elmQuestion =  ', this.elmQuestion)
    //console.log("this.noQuestionEnCours = ", this.noQuestionEnCours)
    this.detruireQuestion();
    if (this.noQuestionEnCours < this.listeQuestions.length) {
      // On affiche la question
      this.creerQuestion();
      this.noQuestionEnCours++;
    } else {
      this.boutonSuivant.removeEventListener(
        "mousedown",
        this.afficherProchaineQuestion,
        false
      );
      this.finJeu();
    }
    //On incrémente le no de la prochaine question à afficher
  } // afficherProchaineQuestion
} //Fin class Question
