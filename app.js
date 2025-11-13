// ===== GAME STATE AND CONFIGURATION =====
const gameState = {
    puzzle1Solved: false,
    puzzle2Solved: false,
    puzzle3Solved: false
};

const ANSWERS = {
    PUZZLE1_CODE: '45239',
    PUZZLE1_KEYWORD: 'somnath',
    PUZZLE2_KEY: 'somnath',
    PUZZLE2_DECRYPTED: 'I am here for you, you cannot be alone.',
    PUZZLE3_PIN: '1023',
    ROTATION: 11
};

const REWARD_MESSAGES = [
    "You have successfully navigated my heart's maze. This quest was just a tiny fraction of the effort I want to put into making you feel cherished.",
    "When you feel lonely, know that I wholeheartedly want to be present there to hug you, not just in words, but in person.",
    "The time for an online friendship is ending.",
    "Let's go on that ideal date, starting with that coffee and beach view, and ending with the beautiful Marine Drive view.",
    "Will you officially go on that ideal date with me? 💖"
];

// ===== DOM ELEMENTS =====
const elements = {
    // Puzzle sections
    puzzle1: document.getElementById('puzzle1'),
    puzzle2: document.getElementById('puzzle2'),
    puzzle3: document.getElementById('puzzle3'),
    
    // Progress indicators
    progress1: document.getElementById('progress1'),
    progress2: document.getElementById('progress2'),
    progress3: document.getElementById('progress3'),
    
    // Puzzle 1
    puzzle1Input: document.getElementById('puzzle1Input'),
    puzzle1Submit: document.getElementById('puzzle1Submit'),
    puzzle1Status: document.getElementById('puzzle1Status'),
    beachScene: document.getElementById('beachScene'),
    
    // Puzzle 2
    puzzle2Input: document.getElementById('puzzle2Input'),
    puzzle2Submit: document.getElementById('puzzle2Submit'),
    puzzle2Status: document.getElementById('puzzle2Status'),
    decryptedMessage: document.getElementById('decryptedMessage'),
    pinReveal: document.getElementById('pinReveal'),
    cipherNote: document.getElementById('cipherNote'),
    
    // Puzzle 3
    puzzle3Input: document.getElementById('puzzle3Input'),
    puzzle3Submit: document.getElementById('puzzle3Submit'),
    puzzle3Status: document.getElementById('puzzle3Status'),
    heartLock: document.getElementById('heartLock'),
    
    // Final reward
    finalReward: document.getElementById('finalReward'),
    rewardLine1: document.getElementById('rewardLine1'),
    rewardLine2: document.getElementById('rewardLine2'),
    rewardLine3: document.getElementById('rewardLine3'),
    rewardLine4: document.getElementById('rewardLine4'),
    rewardLine5: document.getElementById('rewardLine5'),
    
    // Background
    floatingHearts: document.getElementById('floatingHearts')
};

// ===== INITIALIZATION =====
function init() {
    setupEventListeners();
    createFloatingHearts();
    addMouseSparkles();
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Puzzle toggle handlers
    document.querySelectorAll('.puzzle-header').forEach(header => {
        header.addEventListener('click', handlePuzzleToggle);
    });
    
    // Puzzle 1
    elements.puzzle1Submit.addEventListener('click', () => checkPuzzle1());
    elements.puzzle1Input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkPuzzle1();
    });
    elements.beachScene.addEventListener('click', createRipple);
    
    // Puzzle 2
    elements.puzzle2Submit.addEventListener('click', () => checkPuzzle2());
    elements.puzzle2Input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkPuzzle2();
    });
    
    // Puzzle 3
    elements.puzzle3Submit.addEventListener('click', () => checkPuzzle3());
    elements.puzzle3Input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkPuzzle3();
    });
}

// ===== PUZZLE TOGGLE =====
function handlePuzzleToggle(e) {
    const header = e.currentTarget;
    const puzzleSection = header.closest('.puzzle-section');
    
    if (puzzleSection.classList.contains('disabled')) return;
    
    const wasActive = puzzleSection.classList.contains('active');
    
    // Close all puzzles
    document.querySelectorAll('.puzzle-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Open clicked puzzle if it wasn't active
    if (!wasActive) {
        puzzleSection.classList.add('active');
    }
}

// ===== PUZZLE 1: BEACH VIEW =====
function checkPuzzle1() {
    const userInput = elements.puzzle1Input.value.trim().replace(/\s/g, '');
    
    if (userInput === ANSWERS.PUZZLE1_CODE) {
        gameState.puzzle1Solved = true;
        elements.puzzle1Status.textContent = `✨ SUCCESS! The secret word is: ${ANSWERS.PUZZLE1_KEYWORD.toUpperCase()}`;
        elements.puzzle1Status.className = 'status-message success';
        
        // Disable puzzle 1
        elements.puzzle1.classList.add('disabled');
        elements.progress1.classList.add('completed');
        elements.progress1.classList.remove('active');
        
        // Enable and open puzzle 2
        setTimeout(() => {
            elements.puzzle2.classList.remove('disabled');
            elements.puzzle2.classList.add('active');
            elements.progress2.classList.add('active');
            scrollToElement(elements.puzzle2);
            createSparkles(5);
        }, 1000);
    } else {
        elements.puzzle1Status.textContent = '❌ Incorrect code. Look closely at the ocean waters...';
        elements.puzzle1Status.className = 'status-message error';
        shakeElement(elements.puzzle1Input);
    }
}

// ===== PUZZLE 2: DECRYPT MESSAGE =====
function checkPuzzle2() {
    const userInput = elements.puzzle2Input.value.trim().toLowerCase();
    
    if (userInput === ANSWERS.PUZZLE2_KEY) {
        const decrypted = decryptCipher(elements.cipherNote.textContent.replace(/"/g, '').trim(), ANSWERS.ROTATION);
        
        if (decrypted === ANSWERS.PUZZLE2_DECRYPTED) {
            gameState.puzzle2Solved = true;
            
            elements.puzzle2Status.textContent = '✨ Message decrypted successfully!';
            elements.puzzle2Status.className = 'status-message success';
            
            // Show decrypted message
            elements.decryptedMessage.className = 'decrypted-message';
            elements.decryptedMessage.style.display = 'block';
            elements.decryptedMessage.innerHTML = `<strong>💝 Decrypted Message:</strong><br>"${decrypted}"`;
            
            // Show PIN
            setTimeout(() => {
                elements.pinReveal.className = 'pin-box';
                elements.pinReveal.style.display = 'block';
                elements.pinReveal.innerHTML = `
                    <div class="pin-label">🔑 Your PIN for Marine Drive:</div>
                    <div class="pin-value">${ANSWERS.PUZZLE3_PIN}</div>
                `;
                
                // Disable puzzle 2
                elements.puzzle2.classList.add('disabled');
                elements.progress2.classList.add('completed');
                elements.progress2.classList.remove('active');
                
                // Enable puzzle 3
                setTimeout(() => {
                    elements.puzzle3.classList.remove('disabled');
                    elements.puzzle3.classList.add('active');
                    elements.progress3.classList.add('active');
                    scrollToElement(elements.puzzle3);
                    createSparkles(5);
                }, 1000);
            }, 500);
        }
    } else {
        elements.puzzle2Status.textContent = '❌ Incorrect key. Remember the word from the cafe!';
        elements.puzzle2Status.className = 'status-message error';
        shakeElement(elements.puzzle2Input);
    }
}

// ===== PUZZLE 3: FINAL LOCK =====
function checkPuzzle3() {
    const userInput = elements.puzzle3Input.value.trim();
    
    if (userInput === ANSWERS.PUZZLE3_PIN) {
        gameState.puzzle3Solved = true;
        
        elements.puzzle3Status.textContent = '🎉 Lock opened! Welcome to our dream date...';
        elements.puzzle3Status.className = 'status-message success';
        
        // Animate lock opening
        elements.heartLock.classList.add('unlocked');
        
        // Complete progress
        elements.progress3.classList.add('completed');
        elements.progress3.classList.remove('active');
        
        // Show final reward
        setTimeout(() => {
            elements.puzzle3.classList.add('disabled');
            revealFinalMessage();
        }, 1000);
    } else {
        elements.puzzle3Status.textContent = '❌ Incorrect PIN. Check the decrypted message carefully.';
        elements.puzzle3Status.className = 'status-message error';
        shakeElement(elements.puzzle3Input);
    }
}

// ===== CIPHER DECRYPTION (ROT-N) =====
function decryptCipher(cipherText, rotation) {
    let result = '';
    for (let i = 0; i < cipherText.length; i++) {
        let char = cipherText[i];
        const charCode = char.charCodeAt(0);
        
        if (charCode >= 97 && charCode <= 122) {
            // lowercase
            char = String.fromCharCode(((charCode - 97 + rotation) % 26) + 97);
        } else if (charCode >= 65 && charCode <= 90) {
            // uppercase
            char = String.fromCharCode(((charCode - 65 + rotation) % 26) + 65);
        }
        result += char;
    }
    return result;
}

// ===== FINAL MESSAGE REVEAL =====
async function revealFinalMessage() {
    elements.finalReward.style.display = 'block';
    scrollToElement(elements.finalReward);
    
    // Launch confetti
    launchConfetti();
    
    // Typewriter effect for each line
    await typewriterEffect(elements.rewardLine1, REWARD_MESSAGES[0], 30);
    await delay(300);
    await typewriterEffect(elements.rewardLine2, REWARD_MESSAGES[1], 30);
    await delay(300);
    await typewriterEffect(elements.rewardLine3, REWARD_MESSAGES[2], 40);
    await delay(300);
    await typewriterEffect(elements.rewardLine4, REWARD_MESSAGES[3], 30);
    await delay(500);
    await typewriterEffect(elements.rewardLine5, REWARD_MESSAGES[4], 50);
    
    // More celebration
    createFloatingHearts(20);
}

// ===== TYPEWRITER EFFECT =====
function typewriterEffect(element, text, speed = 50) {
    return new Promise(resolve => {
        element.innerHTML = '';
        let index = 0;
        
        const cursor = document.createElement('span');
        cursor.className = 'typewriter-cursor';
        element.appendChild(cursor);
        
        const interval = setInterval(() => {
            if (index < text.length) {
                cursor.insertAdjacentText('beforebegin', text[index]);
                index++;
            } else {
                clearInterval(interval);
                cursor.remove();
                resolve();
            }
        }, speed);
    });
}

// ===== UTILITY FUNCTIONS =====
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function scrollToElement(element) {
    setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
}

function shakeElement(element) {
    element.style.animation = 'shake 0.5s ease';
    setTimeout(() => {
        element.style.animation = '';
    }, 500);
}

// ===== VISUAL EFFECTS =====
function createRipple(e) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    
    const rect = elements.beachScene.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.width = '100px';
    ripple.style.height = '100px';
    
    elements.beachScene.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

function createFloatingHearts(count = 15) {
    const heartEmojis = ['💕', '💖', '💗', '💝', '💓', '❤️', '🌹'];
    
    for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 5 + 8) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';
        heart.style.fontSize = (Math.random() * 10 + 15) + 'px';
        
        elements.floatingHearts.appendChild(heart);
        
        setTimeout(() => heart.remove(), 12000);
    }
}

function launchConfetti() {
    const colors = ['#ff69b4', '#ffb6c1', '#ff9999', '#ffd700', '#98d8c8', '#c77dff'];
    const shapes = ['❤️', '💖', '⭐', '✨', '🌟', '💕'];
    
    for (let i = 0; i < 150; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            
            // Random shape or colored square
            if (Math.random() > 0.5) {
                confetti.textContent = shapes[Math.floor(Math.random() * shapes.length)];
                confetti.style.fontSize = '20px';
            } else {
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.width = (Math.random() * 10 + 5) + 'px';
                confetti.style.height = (Math.random() * 10 + 5) + 'px';
            }
            
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 5000);
        }, i * 20);
    }
}

function createSparkles(count = 3) {
    const sparkleSymbols = ['✨', '⭐', '💫', '🌟'];
    
    for (let i = 0; i < count; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.textContent = sparkleSymbols[Math.floor(Math.random() * sparkleSymbols.length)];
        sparkle.style.left = (Math.random() * 80 + 10) + '%';
        sparkle.style.top = (Math.random() * 60 + 20) + '%';
        sparkle.style.fontSize = (Math.random() * 20 + 15) + 'px';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 1000);
    }
}

function addMouseSparkles() {
    let lastSparkle = 0;
    
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastSparkle > 200) {
            lastSparkle = now;
            
            if (Math.random() > 0.7) {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle';
                sparkle.textContent = '✨';
                sparkle.style.left = e.pageX + 'px';
                sparkle.style.top = e.pageY + 'px';
                sparkle.style.fontSize = '12px';
                
                document.body.appendChild(sparkle);
                
                setTimeout(() => sparkle.remove(), 1000);
            }
        }
    });
}

// ===== START THE EXPERIENCE =====
document.addEventListener('DOMContentLoaded', init);