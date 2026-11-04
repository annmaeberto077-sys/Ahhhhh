script.js — Complete Website Interactions

/* ==========================================
   VINTAGE LOVE WEBSITE
   Complete JavaScript
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ======================================
       1. FLOATING HEARTS AND SPARKLES
    ====================================== */

    function createFloatingDecoration() {
        const decoration = document.createElement("span");

        decoration.className = "floating-decoration";

        const symbols = ["♡", "♥", "✦", "✧", "❀"];

        decoration.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        decoration.style.setProperty(
            "--left",
            Math.random() * 100 + "vw"
        );

        decoration.style.setProperty(
            "--duration",
            (7 + Math.random() * 6) + "s"
        );

        decoration.style.fontSize =
            (14 + Math.random() * 15) + "px";

        document.body.appendChild(decoration);

        setTimeout(() => {
            decoration.remove();
        }, 14000);
    }

    setInterval(createFloatingDecoration, 1300);


    /* ======================================
       2. SPARKLE CLICK EFFECT
    ====================================== */

    document.addEventListener("click", function (event) {

        const sparkle = document.createElement("span");

        sparkle.className = "sparkle";
        sparkle.textContent = "✦";

        sparkle.style.left = event.clientX + "px";
        sparkle.style.top = event.clientY + "px";

        document.body.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 850);

    });


    /* ======================================
       3. SECRET MESSAGE CARDS
    ====================================== */

    const secretCards = document.querySelectorAll(".secret-card");

    secretCards.forEach((card) => {

        card.addEventListener("click", function () {

            const message = card.dataset.message;
            const reveal = card.querySelector(".reveal");

            if (!message || !reveal) return;

            const alreadyOpened = card.classList.contains("opened");

            if (alreadyOpened) {
                reveal.textContent = "";
                card.classList.remove("opened");
            } else {
                reveal.textContent = message;
                card.classList.add("opened");
            }

        });

    });


    /* ======================================
       4. CLICKABLE FLOWERS
    ====================================== */

    const flowers = document.querySelectorAll(".flower");
    const flowerMessage = document.getElementById("flowerMessage");

    flowers.forEach((flower, index) => {

        flower.addEventListener("click", function () {

            const message = flower.dataset.message;

            if (flowerMessage) {
                flowerMessage.textContent =
                    message || "A little flower for someone special. ♡";
            }

            flower.classList.add("flower-selected");

            flowers.forEach((item) => {
                if (item !== flower) {
                    item.classList.remove("flower-selected");
                }
            });

            flower.style.transform = "translateY(-10px) scale(1.08)";

            setTimeout(() => {
                flower.style.transform = "";
            }, 500);

        });

    });


    /* ======================================
       5. HEART-CATCHING GAME
       Catch 10 hearts to win!
    ====================================== */

    const startGame = document.getElementById("startGame");
    const gameArea = document.getElementById("gameArea");
    const scoreDisplay = document.getElementById("score");
    const gameStatus = document.getElementById("gameStatus");
    const gameHint = document.getElementById("gameHint");
    const gameReward = document.getElementById("gameReward");

    let score = 0;
    let gameRunning = false;
    let heartTimer = null;
    let heartExpiryTimer = null;
    let gameTimeout = null;

    const targetScore = 10;

    function clearGameTimers() {
        clearInterval(heartTimer);
        clearTimeout(heartExpiryTimer);
        clearTimeout(gameTimeout);
    }

    function updateScore() {
        if (scoreDisplay) {
            scoreDisplay.textContent = score;
        }
    }

    function finishGame(won) {

        gameRunning = false;
        clearGameTimers();

        if (gameArea) {
            gameArea.querySelectorAll(".game-heart").forEach((heart) => {
                heart.remove();
            });
        }

        if (won) {

            if (gameStatus) {
                gameStatus.textContent = "YOU DID IT! ♡";
            }

            if (gameHint) {
                gameHint.innerHTML = "You caught every heart! ♡";
            }

            if (gameReward) {
                gameReward.textContent =
                    "Congratulations! You caught 10 hearts, but here's a little secret: my heart was already yours. ♡";
            }

            if (startGame) {
                startGame.textContent = "Play again ♡";
            }

        } else {

            if (gameStatus) {
                gameStatus.textContent = "TIME'S UP!";
            }

            if (gameHint) {
                gameHint.innerHTML = "Aww! Let's try again. ♡";
            }

            if (gameReward) {
                gameReward.textContent =
                    "Every little moment is another chance. Try catching 10 hearts again! ♡";
            }

            if (startGame) {
                startGame.textContent = "Try again ♡";
            }

        }

    }

    function createGameHeart() {

        if (!gameRunning || !gameArea) return;

        const heart = document.createElement("button");

        heart.className = "game-heart";
        heart.type = "button";
        heart.textContent = ["♥", "♡", "💗"][
            Math.floor(Math.random() * 3)
        ];

        const maxX = Math.max(0, gameArea.clientWidth - 45);
        const maxY = Math.max(0, gameArea.clientHeight - 50);

        heart.style.left = Math.random() * maxX + "px";
        heart.style.top = Math.random() * maxY + "px";

        heart.setAttribute("aria-label", "Catch heart");

        heart.addEventListener("click", function () {

            if (!gameRunning) return;

            score++;
            updateScore();

            heart.remove();

            if (score >= targetScore) {
                finishGame(true);
            } else {
                if (gameStatus) {
                    gameStatus.textContent = "KEEP GOING! ♡";
                }

                createGameHeart();
            }

        });

        gameArea.appendChild(heart);

        clearTimeout(heartExpiryTimer);

        heartExpiryTimer = setTimeout(() => {

            if (heart.parentElement) {
                heart.remove();
            }

            if (gameRunning) {
                createGameHeart();
            }

        }, 1800);

    }

    function beginGame() {

        clearGameTimers();

        score = 0;
        gameRunning = true;

        updateScore();

        if (gameReward) {
            gameReward.textContent = "";
        }

        if (gameHint) {
            gameHint.style.display = "none";
        }

        if (gameStatus) {
            gameStatus.textContent = "CATCH THE HEARTS! ♡";
        }

        if (startGame) {
            startGame.textContent = "Game in progress...";
        }

        if (gameArea) {
            gameArea.querySelectorAll(".game-heart").forEach((heart) => {
                heart.remove();
            });
        }

        createGameHeart();

        heartTimer = setInterval(() => {

            if (gameRunning) {
                createGameHeart();
            }

        }, 1400);

        gameTimeout = setTimeout(() => {

            if (gameRunning) {
                finishGame(false);
            }

        }, 30000);

    }

    if (startGame && gameArea) {
        startGame.addEventListener("click", beginGame);
    }


    /* ======================================
       6. GALLERY MUSIC PLAYER
       Music filename: music.mp3
       Music starts after clicking Play.
    ====================================== */

    const gallery = document.querySelector(".photo-grid");

    if (gallery) {

        const player = document.createElement("section");

        player.className = "vintage-player";

        player.innerHTML = `
            <p class="player-label">A LITTLE SOUNDTRACK FOR US</p>

            <div class="record-wrap">
                <div class="vinyl-record" id="vinylRecord"></div>
            </div>

            <h2 class="player-title">Our Little Melody ♡</h2>

            <p class="player-subtitle">
                A song to accompany our memories.
            </p>

            <div class="music-controls">

                <button type="button" id="playMusic"
                    aria-label="Play music">▶</button>

                <button type="button" id="pauseMusic"
                    aria-label="Pause music">Ⅱ</button>

            </div>

            <p class="music-status" id="musicStatus">
                Press play to listen ♡
            </p>
        `;

        gallery.insertAdjacentElement("afterend", player);

        const audio = new Audio("music.mp3");

        audio.loop = true;
        audio.preload = "metadata";

        const playButton = document.getElementById("playMusic");
        const pauseButton = document.getElementById("pauseMusic");
        const vinylRecord = document.getElementById("vinylRecord");
        const musicStatus = document.getElementById("musicStatus");

        playButton.addEventListener("click", async function () {

            try {

                await audio.play();

                vinylRecord.classList.add("playing");
                musicStatus.textContent = "Now playing... ♡";

            } catch (error) {

                musicStatus.textContent =
                    "Please check that music.mp3 is uploaded correctly.";

                console.error("Music playback error:", error);

            }

        });

        pauseButton.addEventListener("click", function () {

            audio.pause();

            vinylRecord.classList.remove("playing");

            musicStatus.textContent = audio.currentTime > 0
                ? "Music paused ♡"
                : "Press play to listen ♡";

        });

        audio.addEventListener("ended", function () {
            vinylRecord.classList.remove("playing");
            musicStatus.textContent = "The song has ended ♡";
        });

    }


    /* ======================================
       7. ENVELOPE / LOVE LETTER
    ====================================== */

    const envelope = document.getElementById("envelope");
    const letterPaper = document.getElementById("letterPaper");

    if (envelope && letterPaper) {

        envelope.addEventListener("click", function () {

            const isHidden = letterPaper.hidden;

            letterPaper.hidden = !isHidden;

            envelope.classList.toggle("open", isHidden);

            envelope.setAttribute(
                "aria-expanded",
                String(isHidden)
            );

            envelope.setAttribute(
                "aria-label",
                isHidden ? "Close letter" : "Open letter"
            );

            if (isHidden) {

                setTimeout(() => {
                    letterPaper.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });
                }, 250);

            }

        });

    }


    /* ======================================
       8. FINAL SURPRISE BUTTON
    ====================================== */

    const finalButton = document.getElementById("finalButton");
    const finalReveal = document.getElementById("finalReveal");

    if (finalButton && finalReveal) {

        finalButton.addEventListener("click", function () {

            const isHidden = finalReveal.hidden;

            finalReveal.hidden = !isHidden;

            finalButton.textContent = isHidden
                ? "Close your gift ♡"
                : "Open your final gift ♡";

            if (isHidden) {

                setTimeout(() => {

                    finalReveal.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                }, 250);

            }

        });

    }


    /* ======================================
       9. BUTTON CLICK ANIMATION
    ====================================== */

    document.querySelectorAll(".button").forEach((button) => {

        button.addEventListener("click", function () {

            button.classList.add("button-clicked");

            setTimeout(() => {
                button.classList.remove("button-clicked");
            }, 300);

        });

    });


    /* ======================================
       10. IMAGE FALLBACK
       Show a message if a photo is missing.
    ====================================== */

    document.querySelectorAll(".polaroid img").forEach((image) => {

        image.addEventListener("error", function () {

            image.alt = "Please upload this memory photo";

            image.style.objectFit = "contain";
            image.style.padding = "15px";
            image.style.background = "#ead8c8";

        });

    });


    /* ======================================
       11. CURRENT YEAR
       Optional footer year element.
    ====================================== */

    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

});