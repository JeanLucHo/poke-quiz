export function animation_question() {
  // On selectionne le h1
  let laQuestion = document.querySelector("h1");

  // On lui donne la class "animTitreQuestion"
  laQuestion.classList.add("animTitreQuestion");
  laQuestion.addEventListener("animationend", monterPokeball, false);

  /*
   * Fonction qui anime le titre de la question
   */
  animTitreQuestion();
  function animTitreQuestion(evt) {
    //On enlève l'écouteur
    laQuestion.removeEventListener("animationend", monterPokeball, false);

    //Quand le mot est monté, on place le deuxième mot avec son animation
    laQuestion.addEventListener("animationend", finIntro, false);
  }
}
