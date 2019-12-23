export class Fenetre {
  /**
   * Classe permettant de créer et d'afficher une fenêtre
   * et, d'appeler une fonction de l'application passée en paramètre
   * @param {Number} posX - position du mot sur l'axe des X
   * @param {Number} posY - position du mot sur l'axe des Y
   * @param {Number} largeur - largeur de la fenêtre
   * @param {Number} hauteur - hauteur de la fenêtre
   * @param {String} classeCSS  - classe CSS pour la mise en forme de la fenêtre
   * @param {String} texte  - texte à afficher dans la fenêtre
   * @param {HTMLElement} conteneurParent -  balise HTML pour afficher les mots animés
   * @param {Function} fonction  - fonction référencée à appeler sur un mousedown
   */

  constructor(
    posX,
    posY,
    largeur,
    hauteur,
    classeCSS,
    texte,
    conteneurParent,
    fonction
  ) {
    //Récupérer les valeurs passées en paramètre
    this.posX = posX;
    this.posY = posY;
    this.largeur = largeur;
    this.hauteur = hauteur;
    this.classeCSS = classeCSS;
    this.texte = texte;
    this.conteneurParent = conteneurParent;
    this.fonction = fonction;

    //Autre propriété de la fenêtre
    this.pourcentageEchelle = 0;

    //Créer la fenêtre
    this.creerFenetre();
  }

  /**
   * Méthode pour créer et afficher les instances de la classe Fenetre
   */
  creerFenetre() {
    //Créer une balise <div>
    this.elHTML = document.createElement("div");
    //Appliquer les éléments de style
    this.elHTML.style.width = this.largeur + "px";
    this.elHTML.style.height = this.hauteur + "px";
    this.elHTML.style.left = this.posX + "px";
    this.elHTML.style.top = this.posY + "px";
    this.elHTML.classList.add(this.classeCSS);

    //Mettre le texte et la fenêtre dans son conteneur parent
    this.elHTML.innerHTML = this.texte;
    this.conteneurParent.appendChild(this.elHTML);

    //Partir la première requête d'animation
    window.requestAnimationFrame(() => this.animerFenetre());

    // On fait jouer l'audio quand la fenetre arrive
    var audio = new Audio("./audio/fin.mp3");
    audio.volume = 0.75;
    audio.play();
  }

  /**
   * Méthode pour animer la fenêtre au moment de son affichage
   */
  animerFenetre(tempsActuel) {
    //Incrémenter le pourcentage d'animation pour l'échelle
    this.pourcentageEchelle += 0.03;

    //On agrandit la fenêtre tant que son échelle est < 1,

    if (this.pourcentageEchelle < 1) {
      //Animer l'échelle
      this.elHTML.style.transform = "scale(" + this.pourcentageEchelle + ")";

      //Prochaine requête d'animation
      window.requestAnimationFrame(() => this.animerFenetre());
    } else {
      //Mettre un écouteur pour fermer la fenêtre et appeler la fonction passée en paramètre
      this.elHTML.addEventListener(
        "mousedown",
        evt => this.fermerFenetre(evt),
        false
      );
    }
  }

  fermerFenetre(evt) {
    //Enlever l'écouteur sur l'élément HTML
    this.elHTML.removeEventListener(
      "mousedown",
      evt => this.fermerFenetre(evt),
      false
    );

    //Enlever la fenetre
    this.conteneurParent.removeChild(this.elHTML);

    //Appeler la fonction passée en paramètre
    this.fonction();

    //Enlever les références
    this.elHTML = null;
    this.conteneurParent = null;
    this.fonction = null;

    //Arrêter la propagation de l'événement
    evt.stopPropagation();
  }
} //Fin classe Fenetre
