/**
* Boucle while(): "tant que"

***************************************** Nombre d'Or *************************************

* Générer un nombre aléatoire entre 1 et 15 (Math.random())
* Demander à l'utilisateur  de deviner ce nombre aléatoire (prompt() et parseInt())
* Si le nombre est une lettre ou un caractères spécial , demander de resaisir le chiffre

* Il a perdu si...: Il a atteint 10 tentatives de devinette, afficher "Vous avez perdu"
* Il a gagné si...: Si le nombre saisis est le nombre aléatoire, on arrete le jeu et on affiche
  son nombre d'essai "Vous avez gagné au bout de 2 tentatives!"

* Bonus: On stockera tous les essais des nombres saisies dans un tableau
	et affichera tous ces essais si il a perdu avec la solution

* Bonus 2: On affichera si il est près du nombre à trouver selon un écart type de 2 ( +/- 2)
	Afficher le message "Vous êtes bouillant"

* Bonus 3: Demander le niveau d'entrée du jeu au début:
  niveau débutant(nombre aléatoire entre 1 et 15, 10 chances)
	niveau intermédiaire(nombre aléatoire entre 1 et 25, 8 chances)
	niveau professionnel (nombre aléatoire entre 1 et 40, 4 chances)

* Bonus 4: A l'aide d'une fonction et boucle, demander si il a perdu ou gagner
	de vouloir rejouer ce qui relancera depuis le debut le jeu.

*/

var lancement = {

	difficulte: '',

	removeElement: function(Elt) {
		var divElt = document.getElementById("wrapper");
		var supprElt = document.querySelector(Elt);
		divElt.removeChild(supprElt);
	},

	createElement: function(Elt, text){
		var quitterElt = document.createElement(Elt);
		quitterElt.href = "Exercice_6_While.html";
		quitterElt.textContent = text;
		document.body.appendChild(quitterElt);
	},

	checkDifficulte: function(){

	},

	lancerProgramme: function(programme){
		var lancerElt = document.getElementById("lancer");//ajout d'un gestionnaire d'événement au lien html
		lancerElt.addEventListener("click", function () {
		//lancement.checkDifficulte();
		var formElt = document.querySelector('form');
			for (var i = 0; i < formElt.difficulte.length; i++){
				if (formElt.difficulte[i].checked){
					this.difficulte = formElt.difficulte.value;
					console.log(formElt.difficulte.value);
				}
			}
		if (this.difficulte == undefined){
			alert("Pas de niveau de difficulté selectionné");
			lancement.removeElement("form");
			lancement.removeElement("a");
			var quitterElt = document.createElement("a");
		quitterElt.href = "Exercice_6_While.html";
		quitterElt.textContent = "quitter le programme";
		document.body.appendChild(quitterElt);

		}
		lancement.removeElement("form");
		lancement.removeElement("a");
		programme.run(this.difficulte);
		var text = "Voulez-vous rejouer ?";
		lancement.createElement("a", text);
		});
	},

};



var nombredOr = {

	nombre: 0,
	reponse: 0,
	tabEssais: [],
	difficulte: '',
	nombreMin: 0,
	nombreMax: 0,
	nombreChances: 0,

	run: function(difficulte){
		this.difficulte = difficulte;
		console.log(this.difficulte);
		this.setParamJeu();
		this.genererNombre();
		this.comparer();
	},

	setParamJeu: function(){
		switch(this.difficulte){
		case "debutant":
			this.nombreMin = 1;
			this.nombreMax = 15;
			this.nombreChances = 10;
			break;
		case "intermediaire":
			this.nombreMin = 1;
			this.nombreMax = 25;
			this.nombreChances = 8;
			break;
		case "professionnel":
			this.nombreMin = 1;
			this.nombreMax = 40;
			this.nombreChances = 4;
			break;
		default:
			console.log("Pas de niveau de difficulté renseigné");
		}
		console.log("paramètres : " + this.nombreMin + ", " + this.nombreMax + ", " + this.nombreChances);
	},

	genererNombre: function(){
		var nombre = Math.floor(Math.random() * (this.nombreMax - this.nombreMin + 1)) + this.nombreMin;
		this.nombre = nombre;
		console.log("le nombre généré : " + this.nombre);
	},

	devinette: function(){
		do {
			var reponse = parseInt(prompt("Merci de rentrer un nombre entre 1 et " + this.nombreMax));
		} while(isNaN(reponse));
		this.reponse = reponse;
	},

	

	insertionElement: function(text){
		var pElt = document.createElement("p");
		pElt.textContent = text;
		document.body.appendChild(pElt);
	},

	insertionElementLi: function(text, ul) {
		var liElt = document.createElement("li");
		liElt.textContent = text;
		console.log(ul);
		ul.appendChild(liElt);
	},

	ecartType: function(nombre){
		var ecartType = this.nombre - nombre;
		if (ecartType <= 2 && ecartType >= -2 && ecartType !== 0) {
			alert("Vous êtes chaud(e) bouillant(e) !");
		}
	},


	comparer: function(){
		var compteur = 0;
		while(this.reponse !== this.nombre && compteur <= (this.nombreChances -1)){	
			this.devinette();
			console.log("compteur : " + compteur);
			this.tabEssais.push(this.reponse);
			console.log("tableau Essais : " + this.tabEssais);
			compteur++;
			this.ecartType(this.reponse);
		}
		 if (this.reponse == this.nombre) {
	 	var text = "Bravo vous avez gagné en " + compteur + " essai(s), vous pouvez adopter un air hautain et condescendant";
		this.insertionElement(text);
		} else {
			var text = "Vous êtes un gros blaireau, ayez honte de vous-même et éoutez du Maître Gim's";
			this.insertionElement(text);
			var ulElt = document.createElement("ul");
			for (var i = 0; i < this.tabEssais.length; i++){
				var text = "Essais " + (i + 1) + " :" + this.tabEssais[i];
				this.insertionElementLi(text, ulElt);
			}
			document.body.appendChild(ulElt);
			var solution = "La solution était : " + this.nombre ;
			this.insertionElement(solution);
		}
	},
};



//lancement.lancerProgramme(nombredOr);

lancement.lancerProgramme(nombredOr);