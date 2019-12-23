export class Util {
  /* Détruit tous les noeuds du noeud parent racine */
  /* Racine est le conteneur initiale qui contient tous les noeuds */
  /* Racine n'est pas déruit à la fin du processus, il ne reste que le noeud racine vide */
  static detruireTousLesNoeud(noeud, racine) {
    while (noeud.hasChildNodes()) {
      this.detruireTousLesNoeud(noeud.firstChild, racine);
    }
    if (noeud != racine) {
      noeud.parentNode.removeChild(noeud);
      noeud = null;
    }
  }

  // Fonction pour randomizer les éléments dans un array
  static shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }
}
