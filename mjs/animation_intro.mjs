/*
 *Gérer les événements des animations pour les synchroniser
 */
import { Util } from "./Util.mjs";
export function animation_intro(lancerQuiz) {
  //Récupérer les mots
  let pokeball = document.querySelector(".pokeball");
  let laSection = document.querySelector("section");

  /*
   *Quand l'animation pour le pokeball est terminée
   */
  pokeball.classList.add("pokeball");
  pokeball.addEventListener("animationend", monterPokeball, false);

  function monterPokeball(evt) {
    //On enlève l'écouteur
    pokeball.removeEventListener("animationend", monterPokeball, false);

    //On termine l'inttro et commence le quiz
    pokeball.addEventListener("animationend", finIntro, false);
  }

  function finIntro(evt) {
    // on détruit les elements dans la balise "section"
    Util.detruireTousLesNoeud(laSection, laSection);
    // On lance le Quiz
    lancerQuiz();
  }
} // fin animation_intro
