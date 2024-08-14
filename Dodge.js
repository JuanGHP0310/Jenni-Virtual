document.addEventListener('DOMContentLoaded', () => {
    const character = document.getElementById('character');
    const scoreDisplay = document.getElementById('score');
    let isJumping = false;
    let gravity = 0.9;
    let position = 0;
    let obstaclesAvoided = 0;
    const maxObstacles = 19;
    const words = ['ansiedad', 'miedos', 'rabia', 'ira', 'furia', 'rara', 'enfado', 'loca', 'desconfiar', 'torpe', 'dudas', 'odio', 'insegura', 'fea', 'tonta', 'mentiras', 'falsa', 'mala', 'torpe'];

    function control(e) {
        if (e.keyCode === 32) {
            if (!isJumping) {
                isJumping = true;
                jump();
            }
        }
    }

    function handleJump() {
        if (!isJumping) {
            isJumping = true;
            jump();
        }
    }

    document.addEventListener('keyup', control);
    document.addEventListener('click', handleJump); // Detecta clics en la pantalla

    function jump() {
        let count = 0;
        let timerId = setInterval(function () {
            if (count === 15) {
                clearInterval(timerId);
                let downTimerId = setInterval(function () {
                    if (count === 0) {
                        clearInterval(downTimerId);
                        isJumping = false;
                    }
                    position -= 5;
                    count--;
                    position = position * gravity;
                    character.style.bottom = position + 'px';
                }, 20);
            }
            position += 30;
            count++;
            position = position * gravity;
            character.style.bottom = position + 'px';
        }, 20);
    }

    function generateObstacles() {
        const obstacle = document.createElement('div');
        obstacle.classList.add('obstacle');
        const word = words[obstaclesAvoided % words.length];
        obstacle.textContent = word;
        obstacle.style.height = (Math.random() * 40 + 20) + 'px';
        document.querySelector('.game-container').appendChild(obstacle);
        let randomTime = Math.max(1500, 3000 - (obstaclesAvoided * 100)); // Reduce el tiempo entre obstáculos a medida que avanza
        setTimeout(generateObstacles, randomTime);

        obstacle.addEventListener('animationiteration', () => {
            obstacle.remove();
            obstaclesAvoided++;
            scoreDisplay.textContent = 'Puntuación: ' + obstaclesAvoided;
            if (obstaclesAvoided >= maxObstacles) {
                alert('¡Felicidades! Has superado todo lo negativo, lo que te hará más fuerte y podrás ser más feliz con Juan. Y has ganado un regalo...');
                document.location.reload();
            }
        });

        let obstaclePosition = parseInt(window.getComputedStyle(obstacle).right);
        let checkCollision = setInterval(function () {
            obstaclePosition = parseInt(window.getComputedStyle(obstacle).right);
            if (obstaclePosition > 750 && obstaclePosition < 800 && position < 50) {
                clearInterval(checkCollision);
                alert('Ay... Que despropósito... bueno, eso es porque estabas un poco aquellada pero no pasa nada mi amor, vamos, tu puedeees');
                document.location.reload();
            }
        }, 20);
    }

    generateObstacles();
});
