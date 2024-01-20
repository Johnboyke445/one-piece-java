// Sélectionne l'élément du DOM qui a la classe CSS 'perso'
const perso = document.querySelector('.perso');
// Sélectionne l'élément du DOM qui a la classe CSS 'obstacle'
const obstacle = document.querySelector('.obstacle');
// Initialise le score à 0
let score = 0;
// Variable pour suivre si le bonhomme a déjà sauté pendant cette période de vérification
let hasJumped = false;

// Fonction gérant le saut du personnage
function jump() {
    // Vérifie si le personnage n'a pas déjà la classe 'animation' et n'a pas déjà sauté
    if (!perso.classList.contains('animation') && !hasJumped) {
        // Ajoute la classe 'animation' pour déclencher l'animation de saut
        perso.classList.add('animation');
        
        // Supprime la classe 'animation' après 500 millisecondes (0,5 seconde)
        setTimeout(() => {
            perso.classList.remove('animation');
        }, 500);

        // Marque que le bonhomme a déjà sauté pendant cette période de vérification
        hasJumped = true;
    }
}

// Écoute les événements de touche enfoncée (keydown) sur tout le document
document.addEventListener('keydown', (event) => {
    // Si la touche enfoncée est la barre d'espace, appelle la fonction jump()
    if (event.key === ' ') {
        jump();
    }
});

// Écoute l'événement 'animationend' (fin de l'animation) sur l'élément du personnage
perso.addEventListener('animationend', () => {
    // Supprime la classe 'animation' lorsque l'animation de saut se termine
    perso.classList.remove('animation');
    // Réinitialise hasJumped après la fin de l'animation de saut
    hasJumped = false;
});

// Interval pour vérifier la collision avec les obstacles et mettre à jour le score
var verification = setInterval(function() {
    // Récupère la position verticale du personnage
    var persoTop = parseInt(window.getComputedStyle(perso).getPropertyValue("top"));
    // Récupère la position horizontale de l'obstacle
    var obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));

    // Vérifie si le personnage a été touché par l'obstacle
    if (obstacleLeft < 20 && obstacleLeft > 0 && persoTop >= 130) {
        // Arrête l'animation de l'obstacle
        obstacle.style.animation = "none";
        // Affiche un message d'alerte
        alert("Vous avez perdu");
        // Arrête la vérification après la collision
        clearInterval(verification);
    } else {
        // Vérifie si le bonhomme a sauté et si l'obstacle a été évité
        if (persoTop >= 130 && persoTop <= 150 && obstacleLeft < 20 && hasJumped) {
            // Augmente le score de 1 uniquement lorsque le bonhomme a sauté avec succès
            score++;
            // Met à jour l'élément HTML qui affiche le score
            document.getElementById('score').textContent = score;
            // Réinitialise hasJumped pour éviter une augmentation continue du score
            hasJumped = false;
        }
    }
}, 10);