// Author : Maya OURARI 12200604

// variables globales
let grille = [[], [], [], []];
for (let i = 0; i < 4; i++) {
  for (let j = 0; j < 4; j++) {
    grille[i][j] = 0;
  }
}

let score = 0;
let nbVide = 16;
/////


// fonction qui construit la grille du jeu
function construitGrille() {
  let str = "<table>\n"
  for (let i = 0; i < 4; i++) {
    str += "<tr>\n";
    for (let j = 0; j < 4; j++) {
      if (grille[i][j] != 0)
        str += "<th>" + grille[i][j] + "</th>\n";
      else
        str += "<th></th>\n";
    }
    str += "</tr>\n";
  }
  str += "</table>\n";

  $("#grille").html(str);
}

// Actualisation du score
function afficheScore() {
  $("#score").html(score);
  if (nbVide == 16) gameOver();
}

// Actualisation du nb de cases vides
function caseVide(i, x) {
  if (i > nbVide) return; // ne fait rien

  let cpt = -1;

  for (let j = 0; j < 4; j++) {
    for (let k = 0; k < 4; k++) {

      if (grille[j][k] == 0) cpt++;

      if (cpt == i) {
        grille[j][k] = x;
        nbVide--;
        return; // arreter le programme une fois la i-eme case vide trouvee
      }
    }
  }

}

// Reinitialisation de la partie
function nouvelle() {
  score = 0;

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      grille[i][j] = 0;
    }
  }

  nbVide = 16;

  let case1 = Math.floor(Math.random() * nbVide);
  let case2 = Math.floor(Math.random() * nbVide);
  while (case1 == case2) { // au cas ou on retombe sur la meme case
    Math.floor(Math.random() * nbVide);
  }

  if (case2 == 15) {
    caseVide(case2, 2);
    caseVide(case1, 2);
  }
  else {
    caseVide(case1, 2);
    caseVide(case2, 2);
  }

  construitGrille();
  afficheScore();
}

// Fonctin de fusion des cases
function glisse(x) {
  let direction = ['g', 'd', 'h', 'b'];
  if (!direction.includes(x)) {
    console.log("glisse : veuillez entrer une direction (g, d, h, b)");
    return;
  }

  let i, j;

  switch (x) {
    case 'g':
      for (j = 3; j > 0; j--) {
        for (i = 3; i >= 0; i--) {
          if (grille[i][j] == grille[i][j - 1] && grille[i][j] != 0) {
            grille[i][j - 1] *= 2;
            grille[i][j] = 0;
            nbVide++;
            score += grille[i][j - 1];
          }
          if (grille[i][j - 1] == 0 && grille[i][j] != 0) {
            grille[i][j - 1] = grille[i][j];
            grille[i][j] = 0;
          }
        }
      }
      break;

    case 'd':
      for (j = 0; j < 3; j++) {
        for (i = 0; i < 4; i++) {
          if (grille[i][j] == grille[i][j + 1] && grille[i][j] != 0) {
            grille[i][j + 1] *= 2;
            grille[i][j] = 0;
            nbVide++;
            score += grille[i][j + 1];
          }
          if (grille[i][j + 1] == 0 && grille[i][j] != 0) {
            grille[i][j + 1] = grille[i][j];
            grille[i][j] = 0;
          }
        }
      }
      break;

    case 'h':
      for (j = 3; j >= 0; j--) {
        for (i = 3; i > 0; i--) {
          if (grille[i][j] == grille[i - 1][j] && grille[i][j] != 0) {
            grille[i - 1][j] *= 2;
            grille[i][j] = 0;
            nbVide++;
            score += grille[i - 1][j];
          }
          if (grille[i - 1][j] == 0 && grille[i][j] != 0) {
            grille[i - 1][j] = grille[i][j];
            grille[i][j] = 0;
          }
        }
      }
      break;

    case 'b':
      for (j = 0; j < 4; j++) {
        for (i = 0; i < 3; i++) {
          if (grille[i][j] == grille[i + 1][j] && grille[i][j] != 0) {
            grille[i + 1][j] *= 2;
            grille[i][j] = 0;
            nbVide++;
            score += grille[i + 1][j];
          }
          if (grille[i + 1][j] == 0 && grille[i][j] != 0) {
            grille[i + 1][j] = grille[i][j];
            grille[i][j] = 0;
          }
        }
      }
      break;
  }

  let tile = Math.floor(Math.random() * nbVide);
  console.log("avant ajout, nbvide = " + nbVide + ", tile = " + tile);
  caseVide(tile, 2);
  construitGrille();
  afficheScore();
}

// fonction affichage game over
function gameOver() {
  $("p").append('<p id="gameover">Game Over !</p>');
}

$(document).ready(() => {
  nouvelle();
  $("#newgame").click(nouvelle);

  console.log("nb vide : " + nbVide);

  // ajout event listener touches fleches
  $(document).keydown(function (k) {
    if (nbVide > 0) {
      switch (k.which) {
        case 37:    // fleche gauche
          glisse('g');
          break;
        case 38:    // fleche haut
          glisse('h');
          break;
        case 39:    // fleche droite
          glisse('d');
          break;
        case 40:    // fleche bas
          glisse('b');
          break;
      }
    }

  });

});