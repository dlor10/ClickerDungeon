import * as GameObjects from './objects.js';

// --------------- Enemy variables -------------------------------------------
// Enemy box elements
const ENEMY_MODEL = document.getElementById("enemy");
const ENEMY_CURRENT_HEALTH = document.getElementById("enemyCurrentHealth");
const RENDER_ENEMY_HP = document.getElementById("enemyHealthPoints");

// Enemy HP default value
const ENEMY_DEFAULT_HEALTH = 100;
let enemyMaxHealth = ENEMY_DEFAULT_HEALTH;
// Enemy gold drop default
const GOLD_DROP_DEFAULT = 10;
let enemyGoldDrop = GOLD_DROP_DEFAULT;

// Create Enemy object
let enemy = new GameObjects.Enemy(enemyMaxHealth, enemyGoldDrop);
// Calculate percentage of enemy health remaining
let enemyHealthPercent = (enemy.currentHP / enemy.maxHealth) * 100;
// Update enemy health bar
ENEMY_CURRENT_HEALTH.style.width = enemyHealthPercent + "%";
// Display enemy HP
RENDER_ENEMY_HP.innerHTML = enemy.currentHP + " HP";

const RENDER_ENEMIES_DEFEATED = document.getElementById("enemies-defeated");
let enemiesDefeatedCount = 0;
// Display enemies defeated count
RENDER_ENEMIES_DEFEATED.innerHTML = "💀 " + enemiesDefeatedCount;

const RENDER_STAGE_LEVEL = document.getElementById("stage-level");

// Increase rate of monster and gold per level
let enemyLevelIncreaseRate = 1.50;
let goldDropIncreaseRate = 1.25;

// ------------------- Player variables --------------------------------------
// Elements to display player stats
const RENDER_PLAYER_ATTACK_POWER = document.getElementById("attackPower");

// Player default attack
const PLAYER_DEFAULT_ATTACK_POWER = 100;
let playerAttackPower = PLAYER_DEFAULT_ATTACK_POWER; // Player attack damage

// Player upgrades
let upgradeMultiplier = 0;
const FLAT_UPGRADE = 100;

// ------------------- Gold variables -----------------------------------------
// Display player gold
const RENDER_PLAYER_GOLD = document.getElementById("gold-amount");

// Gold default start and drop
const PLAYER_DEFAULT_GOLD = 1000;
let playerGold = PLAYER_DEFAULT_GOLD;

// Create Player object
let player = new GameObjects.Player(playerAttackPower, playerGold);
// Display Player stats
RENDER_PLAYER_ATTACK_POWER.innerHTML = "Attack Power: " + player.attackPower;
// Display gold
RENDER_PLAYER_GOLD.innerHTML = "🪙 " + player.gold;

// ------------------- Menu variables -----------------------------------------
// Upgrade menu button
const UPGRADE_ATTACK_BUTTON = document.getElementById("upgrade-menu");
// Reset menu button
const RESET_GAME_BUTTON = document.getElementById("reset-menu");


// ------------------- Game functions ------------------------------------------
// handleEnemyHP
function handleEnemyHP() {
    // Recalculate percentage of enemy health remaining
    enemyHealthPercent = (enemy.currentHP / enemy.maxHealth) * 100;
    // Update enemy health bar
    ENEMY_CURRENT_HEALTH.style.width = enemyHealthPercent + "%";
    // Change enemy health bar color by percentage
    if (enemyHealthPercent <= 25) {
				ENEMY_CURRENT_HEALTH.style.backgroundColor = "red";
    } else if (enemyHealthPercent <= 50 && enemyHealthPercent > 25) {
				ENEMY_CURRENT_HEALTH.style.backgroundColor = "orange";
    } else if (enemyHealthPercent <= 75 && enemyHealthPercent > 50) {
				ENEMY_CURRENT_HEALTH.style.backgroundColor = "yellow";
    } else {
				ENEMY_CURRENT_HEALTH.style.backgroundColor = "rgb(5, 200, 5)";
    }
    // Updates enemy HP number displayed
    RENDER_ENEMY_HP.innerHTML = enemy.currentHP + " HP";
}

function spawnNewEnemy() {
      // Affects after defeating enemy
    if (enemy.isDefeated()) {
        
        player.gold += enemy.goldDrop;

        // Level up enemy and gold drop
        enemyMaxHealth = Math.round(enemyMaxHealth * enemyLevelIncreaseRate);
        enemyGoldDrop = Math.round(enemyGoldDrop * goldDropIncreaseRate);
        enemy = new GameObjects.Enemy(enemyMaxHealth, enemyGoldDrop);
        enemyHealthPercent = (enemy.currentHP / enemy.maxHealth) * 100;
        
        enemiesDefeatedCount += 1;
        
        // Update values displayed
        RENDER_PLAYER_GOLD.innerHTML = "🪙 " + player.gold;
        RENDER_ENEMIES_DEFEATED.innerHTML = "💀 " + enemiesDefeatedCount;
        RENDER_ENEMY_HP.innerHTML = enemy.currentHP + " HP";
        
        // Reset health bar visually
        ENEMY_CURRENT_HEALTH.style.backgroundColor = "rgb(5, 200, 5)";
        ENEMY_CURRENT_HEALTH.style.width = enemyHealthPercent + "%";
    }
}

// Upgrade Player attack
const UPGRADE_PRICE_DEFAULT = 100;
let upgradePrice = UPGRADE_PRICE_DEFAULT;
// Price on upgrade menu
const RENDER_UPGRADE_PRICE = document.getElementById("upgrade-price");
RENDER_UPGRADE_PRICE.innerHTML = "🪙 " + upgradePrice;
// Note: Increase Upgrade Price as player progress later.
// Upgrade player attack function
function upgradePlayerAttack() {
    // Notification when not enough gold
    if (player.gold < upgradePrice) {
        showNotification("You do not have enough gold!");
    } else {
        player.attackPower += FLAT_UPGRADE;
        player.gold -= upgradePrice;
        showNotification("Attack Power Upgraded!")
        RENDER_PLAYER_ATTACK_POWER.innerHTML = "Attack Power: " + player.attackPower;
        RENDER_PLAYER_GOLD.innerHTML = "🪙 " + player.gold;
    }
}

// Reset game
function resetGame(){
    // Reset all enemy values
    enemyMaxHealth = ENEMY_DEFAULT_HEALTH;
    enemyGoldDrop = GOLD_DROP_DEFAULT;
    enemy = new GameObjects.Enemy(enemyMaxHealth, enemyGoldDrop);
    enemyHealthPercent = (enemy.currentHP / enemy.maxHealth) * 100;
    // Reset all player values
    playerAttackPower = PLAYER_DEFAULT_ATTACK_POWER;
    playerGold = PLAYER_DEFAULT_GOLD;
    player = new GameObjects.Player(playerAttackPower, playerGold);
    enemiesDefeatedCount = 0;
    // Reset UI
    ENEMY_CURRENT_HEALTH.style.width = enemyHealthPercent + "%";
    ENEMY_CURRENT_HEALTH.style.backgroundColor = "rgb(5, 200, 5)";
    RENDER_ENEMY_HP.innerHTML = enemy.currentHP + " HP";
    RENDER_PLAYER_ATTACK_POWER.innerHTML = "Attack Power: " + player.attackPower;
    RENDER_PLAYER_GOLD.innerHTML = "🪙 " + player.gold;
    RENDER_ENEMIES_DEFEATED.innerHTML = "💀 " + enemiesDefeatedCount;
}

// Element to display messages notifications
const RENDER_NOTIFICATION = document.getElementById("notification");
// Message notification function
function showNotification(message){
    RENDER_NOTIFICATION.innerHTML = message;
    RENDER_NOTIFICATION.style.opacity = 1;
    RENDER_NOTIFICATION.style.display = "block";
    setTimeout(() => {
        RENDER_NOTIFICATION.style.transition = "opacity .5s ease-in-out";
        RENDER_NOTIFICATION.style.opacity = 0;
    }, 800);
    RENDER_NOTIFICATION.style.transition = "";
}

// Displays damage when attacking
function showDamageNotification(message) {
    const DAMAGE_MESSAGE_BOX = document.getElementById("damage-messages-container");
    const DAMAGE_MESSAGE = document.createElement("div");
    DAMAGE_MESSAGE.classList.add("damage-message");
    DAMAGE_MESSAGE.textContent = message;
    DAMAGE_MESSAGE_BOX.appendChild(DAMAGE_MESSAGE);
    // Animate and remove after fade
    setTimeout(() => {
            DAMAGE_MESSAGE.style.opacity = 0;
            DAMAGE_MESSAGE.style.transition = "opacity 0.5s ease";
    }, 400);
    setTimeout(() => {
            DAMAGE_MESSAGE_BOX.removeChild(DAMAGE_MESSAGE);
    }, 800);
}

// Attacking enemy function
function attackEnemy(){
    enemy.takeDamage(player.attackPower);
    showDamageNotification(player.attackPower)
    handleEnemyHP();
    spawnNewEnemy();
}


// ----------------- Event Listeners ----------------------------------------------
// Click function to attack enemy
ENEMY_MODEL.addEventListener('click', attackEnemy);

// Click function to upgrade player attack
UPGRADE_ATTACK_BUTTON.addEventListener('click', upgradePlayerAttack);

// Click function to reset game
RESET_GAME_BUTTON.addEventListener('click', resetGame);