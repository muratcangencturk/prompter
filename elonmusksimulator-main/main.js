import { t, getLanguage, updateTexts, setLanguage, initI18n } from './translations.js';
import { loadHighScore, saveHighScore } from './score.mjs';

// Vital status definitions with symbols and colors
const vitalStatuses = {
    "spacex": { symbol: "🚀", label: "SpaceX", color: "#cc0000", value: 50 },
    "neuralink": { symbol: "🧠", label: "Neuralink", color: "#800080", value: 50 },
    "tesla": { symbol: "⚡", label: "Tesla", color: "#fcb323", value: 50 },
    "public_opinion": { symbol: "🗣️", label: "Public Opinion", color: "#0077be", value: 50 },
    "government": { symbol: "🏛️", label: "Government", color: "#005bbb", value: 50 },
    "finance": { symbol: "💰", label: "Finance", color: "#2ecc71", value: 50 },
    "gaming": { symbol: "🎮", label: "Gaming", color: "#3498db", value: 50 },
    "crypto": { symbol: "🪙", label: "Crypto", color: "#76b900", value: 50 },
    "ai_bots": { symbol: "🤖", label: "AI & Bots", color: "#95a5a6", value: 50 },
    "mars": { symbol: "🪐", label: "Mars", color: "#e74c3c", value: 50 },
    "legacy": { symbol: "👨‍👩‍👧‍👦", label: "Legacy", color: "#922BFF", value: 50 },
    "x_twitter": { symbol: "𝕏", label: "X (Twitter)", color: "#1DA1F2", value: 50 },
    "boring": { symbol: "🚇", label: "Boring Co.", color: "#FF6B6B", value: 50 },
    "innovation": { symbol: "💡", label: "Innovation", color: "#FFA500", value: 50 }
};

// Game state variables
let currentQuestionIndex = 0;
let isGameOver = false;
let shuffledQuestions = [];
let currentQuestion = null;
let currentScore = 0;
let bestScore = 0;

// Animation and interaction state flags
let isAnimating = false;
let isDragging = false;
let swipeInProgress = false;
let isCardCreating = false;
let lastSwipeTime = 0;

// Swipe tracking variables
let mouseDownTime = 0;
let mouseDownX = 0;

// Debug mode
const debugMode = false;

// Swipe configuration constants
const SWIPE_THRESHOLD = 50;
const SWIPE_RESISTANCE = 2.2;
const ROTATION_FACTOR = 0.05;
const ANIMATION_DURATION = 600;
const RESPONSE_DISPLAY_DURATION = 1200;
const VELOCITY_THRESHOLD = 0.5;
const SPRING_BACK_DURATION = 350;
const INERTIA_FACTOR = 0.8;
const CENTER_THRESHOLD = 20;
const CLICK_THRESHOLD = 300;

// Elon Musk face images
const elonNormalImage = 'elon_musk_cartoon.png';
const elonHappyImage = 'elon_musk_happy.png';
const elonAngryImage = 'elon_musk_angry.png';

// Debug logging function
function debugLog(...args) {
    if (debugMode) {
        console.log(...args);
    }
}

// Create vital status elements
function createVitalElements() {
    const vitalsContainer = document.getElementById('vitals');
    vitalsContainer.textContent = '';

    Object.entries(vitalStatuses).forEach(([key, vital]) => {
        const vitalDiv = document.createElement('div');
        vitalDiv.className = 'vital';
        vitalDiv.title = `${vital.label} - ${vital.value}`;

        const symbolDiv = document.createElement('div');
        symbolDiv.textContent = vital.symbol;

        const levelDiv = document.createElement('div');
        levelDiv.className = 'vital-level';

        const fillDiv = document.createElement('div');
        fillDiv.className = 'vital-fill';
        fillDiv.style.width = `${vital.value}%`;
        fillDiv.style.background = vital.color;

        const tooltipDiv = document.createElement('div');
        tooltipDiv.className = 'vital-tooltip';
        tooltipDiv.textContent = `${vital.label}: ${vital.value}`;

        levelDiv.appendChild(fillDiv);
        levelDiv.appendChild(tooltipDiv);

        const nameDiv = document.createElement('div');
        nameDiv.className = 'vital-name';
        nameDiv.style.color = vital.color;
        nameDiv.textContent = vital.label;

        vitalDiv.appendChild(symbolDiv);
        vitalDiv.appendChild(levelDiv);
        vitalDiv.appendChild(nameDiv);

        vitalsContainer.appendChild(vitalDiv);
    });
}

// Update vital status visualizations
function updateVitalElements() {
    const vitalsContainer = document.getElementById('vitals');
    const vitalElements = vitalsContainer.querySelectorAll('.vital');
    
    vitalElements.forEach((element, index) => {
        const key = Object.keys(vitalStatuses)[index];
        const vital = vitalStatuses[key];
        const fill = element.querySelector('.vital-fill');
        const tooltip = element.querySelector('.vital-tooltip');
        
        if (fill) {
            fill.style.width = `${vital.value}%`;
            fill.style.background = vital.color;
        }
        
        if (tooltip) {
            tooltip.textContent = `${vital.label}: ${vital.value}`;
        }
        
        element.title = `${vital.label} - ${vital.value}`;
    });
    
    // Check for game over condition
    checkGameOver();
}

function updateScoreDisplay() {
    const current = document.getElementById('current-score');
    const best = document.getElementById('best-score');
    if (current) current.textContent = currentScore;
    if (best) best.textContent = bestScore;
}

// Check if any vital has reached 0 or 100
function checkGameOver() {
    if (isGameOver) return;
    
    for (const key in vitalStatuses) {
        const value = vitalStatuses[key].value;
        if (value <= 0 || value >= 100) {
            showGameOver();
            return;
        }
    }
}

// Show game over screen
function showGameOver() {
    isGameOver = true;
    document.getElementById('game-over').classList.add('show');
}

// Create a card with the current question
async function createCard() {
    // Prevent multiple card creations
    if (isCardCreating) {
        debugLog("Card creation already in progress, skipping");
        return;
    }
    
    isCardCreating = true;
    debugLog("Creating new card, currentQuestionIndex:", currentQuestionIndex);
    
    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent = '';
    
    // Reset if we've gone through all questions
    if (currentQuestionIndex >= shuffledQuestions.length) {
        debugLog("Reached end of questions, loading more if available");
        shuffledQuestions = [];
        await ensureQuestionsAvailable();
    }
    
    // Store the current question for overlay display
    currentQuestion = shuffledQuestions[currentQuestionIndex];
    debugLog("Current question:", currentQuestion.text);
    
    // Create the card element
    const card = document.createElement('div');
    card.className = 'card next-card-enter';
    card.id = 'current-card';
    card.tabIndex = 0; // allow keyboard focus
    
    // Top instruction
    const topInstruction = document.createElement('p');
    topInstruction.className = 'swipe-instruction';
    topInstruction.textContent = t('swipeInstruction');

    // Emoji container
    const emojiDiv = document.createElement('div');
    emojiDiv.className = 'card-emojis';
    currentQuestion.emojis.forEach(emoji => {
        const span = document.createElement('span');
        span.textContent = emoji;
        emojiDiv.appendChild(span);
    });

    // Question text
    const questionHeading = document.createElement('h2');
    questionHeading.textContent = currentQuestion.text;

    // Elon illustration
    const illustration = document.createElement('div');
    illustration.className = 'elon-illustration';
    const img = document.createElement('img');
    img.src = elonNormalImage;
    img.alt = 'Elon Musk';
    img.className = 'elon-face';
    img.id = 'elon-face';
    illustration.appendChild(img);

    // Bottom instruction
    const bottomInstruction = document.createElement('p');
    bottomInstruction.className = 'swipe-instruction';
    bottomInstruction.textContent = t('swipeInstruction');

    // Append all parts to card
    card.appendChild(topInstruction);
    card.appendChild(emojiDiv);
    card.appendChild(questionHeading);
    card.appendChild(illustration);
    card.appendChild(bottomInstruction);
    
    // Add the card to the container
    cardContainer.appendChild(card);
    
    // Trigger animation after a short delay
    setTimeout(() => {
        card.classList.add('next-card-enter-active');
        
        // Remove animation classes after animation completes
        setTimeout(() => {
            card.classList.remove('next-card-enter', 'next-card-enter-active');
            isCardCreating = false;
        }, 300);
    }, 50);
    
    // Set up event listeners for the new card
    setupCardInteraction(card);
}

// Set up interaction events for a card
function setupCardInteraction(card) {
    // Mouse/Touch events
    card.addEventListener('mousedown', handleDragStart);
    card.addEventListener('touchstart', handleDragStart, { passive: true });
    
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('touchmove', handleDragMove, { passive: false });
    
    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('touchend', handleDragEnd);
    
    // Prevent default behavior for touch events to avoid scrolling
    card.addEventListener('touchmove', function(e) {
        if (isDragging) {
            e.preventDefault();
        }
    }, { passive: false });
}

// Handle the start of a drag operation
function handleDragStart(e) {
    if (isAnimating || isGameOver) return;
    
    const card = document.getElementById('current-card');
    if (!card) return;
    
    isDragging = true;
    mouseDownTime = Date.now();
    
    // Get the starting X position
    if (e.type === 'mousedown') {
        mouseDownX = e.clientX;
    } else if (e.type === 'touchstart' && e.touches.length > 0) {
        mouseDownX = e.touches[0].clientX;
    }
    
    debugLog("Drag started at:", mouseDownX);
}

// Handle drag movement
function handleDragMove(e) {
    if (!isDragging || isAnimating || isGameOver) return;
    
    const card = document.getElementById('current-card');
    if (!card) return;
    
    let currentX;
    if (e.type === 'mousemove') {
        currentX = e.clientX;
    } else if (e.type === 'touchmove' && e.touches.length > 0) {
        currentX = e.touches[0].clientX;
        // Prevent scrolling when dragging
        e.preventDefault();
    } else {
        return;
    }
    
    const deltaX = currentX - mouseDownX;
    const resistance = Math.abs(deltaX) / SWIPE_RESISTANCE;
    const rotation = deltaX * ROTATION_FACTOR;
    
    // Apply transformation to the card
    card.style.transform = `translateX(${deltaX}px) rotate(${rotation}deg)`;
    
    // Update Elon's face based on swipe direction
    updateElonFace(deltaX);
    
    // Show appropriate overlay based on swipe direction
    updateOverlays(deltaX);
    
    debugLog("Dragging, deltaX:", deltaX);
}

// Update Elon's face based on swipe direction
function updateElonFace(deltaX) {
    const elonFace = document.getElementById('elon-face');
    if (!elonFace) return;
    
    if (deltaX > SWIPE_THRESHOLD) {
        // Swiping right (YES) - Happy face
        elonFace.src = elonHappyImage;
    } else if (deltaX < -SWIPE_THRESHOLD) {
        // Swiping left (NO) - Angry face
        elonFace.src = elonAngryImage;
    } else {
        // Neutral position - Normal face
        elonFace.src = elonNormalImage;
    }
}

// Update overlay visibility based on swipe direction
function updateOverlays(deltaX) {
    const leftOverlay = document.getElementById('left-overlay');
    const rightOverlay = document.getElementById('right-overlay');
    
    // Set overlay text content based on current question
    leftOverlay.textContent = currentQuestion.leftResponse;
    rightOverlay.textContent = currentQuestion.rightResponse;
    
    if (deltaX > SWIPE_THRESHOLD) {
        // Show right (YES) overlay
        rightOverlay.style.display = 'block';
        rightOverlay.style.visibility = 'visible';
        rightOverlay.classList.add('show-overlay');
        leftOverlay.classList.remove('show-overlay');
    } else if (deltaX < -SWIPE_THRESHOLD) {
        // Show left (NO) overlay
        leftOverlay.style.display = 'block';
        leftOverlay.style.visibility = 'visible';
        leftOverlay.classList.add('show-overlay');
        rightOverlay.classList.remove('show-overlay');
    } else {
        // Hide both overlays
        leftOverlay.classList.remove('show-overlay');
        rightOverlay.classList.remove('show-overlay');
    }
}

// Handle the end of a drag operation
function handleDragEnd(e) {
    if (!isDragging || isGameOver) return;
    
    const card = document.getElementById('current-card');
    if (!card) return;
    
    isDragging = false;
    
    let endX;
    if (e.type === 'mouseup') {
        endX = e.clientX;
    } else if (e.type === 'touchend' && e.changedTouches.length > 0) {
        endX = e.changedTouches[0].clientX;
    } else {
        endX = mouseDownX; // Default to starting position if can't determine end position
    }
    
    const deltaX = endX - mouseDownX;
    const timeDelta = Date.now() - mouseDownTime;
    const velocity = Math.abs(deltaX) / timeDelta;
    
    debugLog("Drag ended, deltaX:", deltaX, "velocity:", velocity);
    
    // Determine if this was a swipe or a click
    if (Math.abs(deltaX) < 5 && timeDelta < CLICK_THRESHOLD) {
        // This was a click, reset card position
        resetCardPosition(card);
        return;
    }
    
    // Check if the swipe was strong enough
    if (Math.abs(deltaX) > SWIPE_THRESHOLD || velocity > VELOCITY_THRESHOLD) {
        // Complete the swipe
        completeSwipe(card, deltaX > 0);
    } else {
        // Not enough movement, return to center
        resetCardPosition(card);
    }
}

// Reset card to center position with animation
function resetCardPosition(card) {
    isAnimating = true;
    
    // Reset Elon's face
    const elonFace = document.getElementById('elon-face');
    if (elonFace) {
        elonFace.src = elonNormalImage;
    }
    
    // Hide overlays
    document.getElementById('left-overlay').classList.remove('show-overlay');
    document.getElementById('right-overlay').classList.remove('show-overlay');
    
    // Animate card back to center
    card.style.transition = `transform ${SPRING_BACK_DURATION}ms cubic-bezier(0.215, 0.610, 0.355, 1.000)`;
    card.style.transform = 'translateX(0) rotate(0deg)';
    
    // Reset after animation completes
    setTimeout(() => {
        card.style.transition = '';
        isAnimating = false;
    }, SPRING_BACK_DURATION);
}

// Complete a swipe in the given direction
function completeSwipe(card, isRight) {
    if (swipeInProgress) return;
    swipeInProgress = true;
    isAnimating = true;
    
    // Prevent rapid swipes
    const now = Date.now();
    if (now - lastSwipeTime < ANIMATION_DURATION) {
        debugLog("Swipe too soon after last swipe, ignoring");
        resetCardPosition(card);
        swipeInProgress = false;
        isAnimating = false;
        return;
    }
    lastSwipeTime = now;
    
    debugLog("Completing swipe, direction:", isRight ? "right" : "left");
    
    // Apply the appropriate swipe class
    if (isRight) {
        card.classList.add('swiped-right');
    } else {
        card.classList.add('swiped-left');
    }
    
    // Keep the overlay visible
    const leftOverlay = document.getElementById('left-overlay');
    const rightOverlay = document.getElementById('right-overlay');
    
    // Set overlay text content based on current question
    leftOverlay.textContent = currentQuestion.leftResponse;
    rightOverlay.textContent = currentQuestion.rightResponse;
    
    if (isRight) {
        // Right swipe (YES)
        rightOverlay.style.display = 'block';
        rightOverlay.style.visibility = 'visible';
        rightOverlay.classList.add('show-overlay');
        leftOverlay.classList.remove('show-overlay');
        
        // Update Elon's face to happy
        const elonFace = document.getElementById('elon-face');
        if (elonFace) {
            elonFace.src = elonHappyImage;
        }
        
        // Apply the impact of the decision
        applyDecisionImpact(true);
    } else {
        // Left swipe (NO)
        leftOverlay.style.display = 'block';
        leftOverlay.style.visibility = 'visible';
        leftOverlay.classList.add('show-overlay');
        rightOverlay.classList.remove('show-overlay');
        
        // Update Elon's face to angry
        const elonFace = document.getElementById('elon-face');
        if (elonFace) {
            elonFace.src = elonAngryImage;
        }
        
        // Apply the impact of the decision
        applyDecisionImpact(false);
    }
    
    // Show the response for a moment before creating a new card
    setTimeout(() => {
        // Hide overlays
        leftOverlay.classList.remove('show-overlay');
        rightOverlay.classList.remove('show-overlay');
        
        // Move to next question
        currentQuestionIndex++;
        currentScore++;
        if (currentScore > bestScore) {
            bestScore = currentScore;
            saveHighScore(bestScore);
        }
        updateScoreDisplay();
        
        // Create a new card after the current one is gone
        setTimeout(async () => {
            await createCard();
            swipeInProgress = false;
            isAnimating = false;
        }, 300);
    }, RESPONSE_DISPLAY_DURATION);
}

// Apply the impact of a decision to vital statuses
function applyDecisionImpact(isRight) {
    if (!currentQuestion || !currentQuestion.impact) return;
    
    const impact = isRight ? currentQuestion.impact.right : currentQuestion.impact.left;
    
    // Apply each impact value
    for (const [key, value] of Object.entries(impact)) {
        if (vitalStatuses[key]) {
            vitalStatuses[key].value = Math.max(0, Math.min(100, vitalStatuses[key].value + value));
        }
    }
    
    // Add Innovation impact for technology-related questions if not explicitly defined
    if (!impact.innovation) {
        // Check if this is a technology-related question that should affect innovation
        const techKeywords = ['technology', 'ai', 'robot', 'future', 'invention', 'research', 'development', 'breakthrough'];
        const questionText = currentQuestion.text.toLowerCase();
        const responseText = isRight ? currentQuestion.rightResponse.toLowerCase() : currentQuestion.leftResponse.toLowerCase();
        
        const isTechQuestion = techKeywords.some(keyword => questionText.includes(keyword) || responseText.includes(keyword));
        
        if (isTechQuestion) {
            // Determine if this is a positive or negative impact on innovation
            const positiveImpact = isRight ? 
                (impact.spacex > 0 || impact.tesla > 0 || impact.neuralink > 0 || impact.ai_bots > 0) : 
                (impact.spacex < 0 || impact.tesla < 0 || impact.neuralink < 0 || impact.ai_bots < 0);
            
            // Apply innovation impact
            const innovationImpact = positiveImpact ? 10 : -10;
            vitalStatuses.innovation.value = Math.max(0, Math.min(100, vitalStatuses.innovation.value + innovationImpact));
        }
    }
    
    // Update the UI
    updateVitalElements();
}

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Filter out questions missing required text or responses
function filterValidQuestions(arr) {
    return arr.filter(q => {
        const text = q.text && q.text.trim();
        const left = q.leftResponse && q.leftResponse.trim();
        const right = q.rightResponse && q.rightResponse.trim();
        return text && left && right;
    });
}

function addInnovationImpactToQuestions(questionsArray) {
    return questionsArray.map(question => {
        // Deep clone the question to avoid modifying the original
        const newQuestion = JSON.parse(JSON.stringify(question));
        
        // Check if this is a technology-related question
        const techKeywords = ['technology', 'ai', 'robot', 'future', 'invention', 'research', 'development', 'breakthrough', 'spacex', 'tesla', 'neuralink'];
        const questionText = newQuestion.text.toLowerCase();
        
        const isTechQuestion = techKeywords.some(keyword => questionText.includes(keyword));
        
        if (isTechQuestion) {
            // Add innovation impact if not already present
            if (newQuestion.impact && newQuestion.impact.left && !newQuestion.impact.left.innovation) {
                // Determine impact based on other tech-related impacts
                const positiveImpact = 
                    (newQuestion.impact.left.spacex > 0 || 
                     newQuestion.impact.left.tesla > 0 || 
                     newQuestion.impact.left.neuralink > 0 || 
                     newQuestion.impact.left.ai_bots > 0);
                
                newQuestion.impact.left.innovation = positiveImpact ? 10 : -10;
            }
            
            if (newQuestion.impact && newQuestion.impact.right && !newQuestion.impact.right.innovation) {
                // Determine impact based on other tech-related impacts
                const positiveImpact = 
                    (newQuestion.impact.right.spacex > 0 || 
                     newQuestion.impact.right.tesla > 0 || 
                     newQuestion.impact.right.neuralink > 0 || 
                     newQuestion.impact.right.ai_bots > 0);
                
                newQuestion.impact.right.innovation = positiveImpact ? 10 : -10;
            }
        }
        
        return newQuestion;
    });
}

// Combine all questions
// Question categories loaded lazily from JSON files
const categories = {
    tech: { file: { en: 'tech.json', tr: 'tech_tr.json' }, questions: [], loaded: false },
    politics: { file: { en: 'politics.json', tr: 'politics_tr.json' }, questions: [], loaded: false },
    misc: { file: { en: 'misc.json', tr: 'misc_tr.json' }, questions: [], loaded: false }
};

// Load a category's questions if not already loaded
async function loadCategory(name) {
    const cat = categories[name];
    if (!cat || cat.loaded) return;
    try {
        const response = await fetch(cat.file[getLanguage()]);
        const data = await response.json();
        const valid = filterValidQuestions(data);
        cat.questions = addInnovationImpactToQuestions(valid);
        cat.loaded = true;
    } catch (err) {
        console.warn(`Fetch failed for ${cat.file[getLanguage()]}, attempting module import`, err);
        try {
            const module = await import(
                /* webpackIgnore: true */ `./${cat.file[getLanguage()]}`,
                { assert: { type: 'json' } }
            );
            const valid = filterValidQuestions(module.default);
            cat.questions = addInnovationImpactToQuestions(valid);
            cat.loaded = true;
        } catch (importErr) {
            console.error('Failed to load questions:', importErr);
            cat.questions = [];
        }
    }
}

// Combine questions from all loaded categories
function getLoadedQuestions() {
    let combined = [];
    Object.values(categories).forEach(cat => {
        if (cat.loaded) combined = combined.concat(cat.questions);
    });
    return combined;
}

// Ensure at least one category is loaded and questions are available
async function ensureQuestionsAvailable() {
    if (shuffledQuestions.length === 0) {
        const unloaded = Object.keys(categories).filter(k => !categories[k].loaded);
        if (unloaded.length > 0) {
            await loadCategory(unloaded[0]);
        }
        shuffledQuestions = shuffleArray(getLoadedQuestions());
        currentQuestionIndex = 0;
    }
}

// Initialize the game
async function initGame() {
    // Reset game state
    isGameOver = false;
    currentQuestionIndex = 0;
    currentScore = 0;
    bestScore = loadHighScore();
    updateScoreDisplay();
    
    // Reset vital statuses
    for (const key in vitalStatuses) {
        vitalStatuses[key].value = 50;
    }
    
    // Create vital status elements
    createVitalElements();
    

    // Ensure at least one category of questions is loaded
    await ensureQuestionsAvailable();
    
    console.log(`Game initialized with ${shuffledQuestions.length} questions`);
    
    // Hide game over screen
    document.getElementById('game-over').classList.remove('show');
    
    // Create the first card
    await createCard();
}

// Share results using Web Share API or copy to clipboard
function shareResults() {
    const message = `I scored ${currentScore} in Elon Musk Simulator!`;
    const url = window.location.href;
    if (navigator.share) {
        navigator.share({ title: 'Elon Musk Simulator', text: message, url })
            .catch(err => console.error('Share failed:', err));
    } else if (navigator.clipboard) {
        navigator.clipboard.writeText(`${message} ${url}`)
            .then(() => alert('Copied to clipboard'))
            .catch(err => {
                console.error('Copy failed:', err);
                prompt('Copy this text:', `${message} ${url}`);
            });
    } else {
        prompt('Copy this text:', `${message} ${url}`);
    }
}

// Set up restart button
document.getElementById('restart-button').addEventListener('click', function() {
    initGame();
});

// Set up quit button
document.getElementById('quit-button').addEventListener('click', function() {
    // Could redirect to another page or close the window
    // For now, just restart
    initGame();
});

// Set up share button
document.getElementById('share-button').addEventListener('click', shareResults);

// Initialize the game when the page loads

window.addEventListener('load', function() {
    initI18n();
    initGame();
    // if ('serviceWorker' in navigator) {
    //     navigator.serviceWorker.register('sw.js', { updateViaCache: 'none' })
    //         .then(reg => console.log('Service Worker registered', reg))
    //         .catch(err => console.error('Service Worker registration failed:', err));
    // }
});

// Language toggle buttons
document.getElementById('btn-en').addEventListener('click', () => {
    setLanguage('en');
    Object.values(categories).forEach(cat => {
        cat.loaded = false;
        cat.questions = [];
    });
    shuffledQuestions = [];
    initGame();
});

document.getElementById('btn-tr').addEventListener('click', () => {
    setLanguage('tr');
    Object.values(categories).forEach(cat => {
        cat.loaded = false;
        cat.questions = [];
    });
    shuffledQuestions = [];
    initGame();
});
