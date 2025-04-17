import * as GameObjects from './objects.js';

// ------------------- Enemy variables --------------------------------------------------------
// Enemy box elements
const ENEMY_MODEL = document.getElementById("enemy");
const ENEMY_CURRENT_HEALTH = document.getElementById("enemyCurrentHealth");
const RENDER_ENEMY_HP = document.getElementById("enemyHealthPoints");

// Enemy HP default value
const ENEMY_DEFAULT_HEALTH = 100;
let enemyMaxHealth = ENEMY_DEFAULT_HEALTH;
let enemy;
let enemyHealthPercent;
// Enemy gold drop default
const ENEMY_GOLD_DROP_DEFAULT = 10;
let enemyGoldDrop = ENEMY_GOLD_DROP_DEFAULT;
// Increase rate of monster and gold per level
const ENEMY_LEVEL_RATE = 1.50;
const ENEMY_GOLD_DROP_INCREASE_RATE = 1.25;

// Boss HP default value
const BOSS_ENEMY_DEFAULT_HEALTH = 10000;
let bossEnemyMaxHealth = BOSS_ENEMY_DEFAULT_HEALTH;
// Boss gold drop default
const BOSS_GOLD_DROP_DEFAULT = 1000;
let bossEnemyGoldDrop = BOSS_GOLD_DROP_DEFAULT;
const BOSS_LEVEL_RATE = 50;
const BOSS_GOLD_DROP_INCREASE_RATE = 25;

// Display progression
const RENDER_ENEMIES_DEFEATED = document.getElementById("enemies-defeated");
let enemiesDefeatedCount = 0;
// Display enemies defeated count
RENDER_ENEMIES_DEFEATED.innerHTML = "💀 " + enemiesDefeatedCount;

const RENDER_STAGE_LEVEL = document.getElementById("stage-level");
const DEFAULT_STAGE = 1;
let stageLevel = DEFAULT_STAGE;
RENDER_STAGE_LEVEL.innerHTML = stageLevel;

// ------------------- Player variables --------------------------------------------------------
// Elements to display player stats
const RENDER_PLAYER_ATTACK_POWER = document.getElementById("attackPower");

// Player default attack
const PLAYER_DEFAULT_ATTACK_POWER = 100;
let playerAttackPower = PLAYER_DEFAULT_ATTACK_POWER; // Player attack damage

// Player upgrades
let upgradeMultiplier = 0;
const FLAT_UPGRADE = 100;

// ------------------- Gold variables --------------------------------------------------------
// Display player gold
const RENDER_PLAYER_GOLD = document.getElementById("gold-amount");

// Gold default start and drop
const PLAYER_DEFAULT_GOLD = 1000000;
let playerGold = PLAYER_DEFAULT_GOLD;

// Create Player object
let player = new GameObjects.Player(playerAttackPower, playerGold);
// Display Player stats
RENDER_PLAYER_ATTACK_POWER.innerHTML = "Attack Power: " + player.attackPower;
// Display gold
RENDER_PLAYER_GOLD.innerHTML = player.gold;


// ------------------- Menu variables --------------------------------------------------------
// Upgrade menu button
const UPGRADE_ATTACK_BUTTON = document.getElementById("upgrade-menu");
// Reset menu button
const RESET_GAME_BUTTON = document.getElementById("reset-menu");

// ------------------- Enemy Images --------------------------------------------------------
// Poring images
const PORING_IDLE = "/assets/poring-idle.png";
const PORING_IDLE_2 = "/assets/poring-idle2.png";
const PORING_DAMAGED = "/assets/poring-damaged.png";

// Mastering images
const MASTERING_IDLE = "/assets/mastering-idle.png";
const MASTERING_IDLE_2 = "/assets/mastering-idle2.png";
const MASTERING_DAMAGED = "/assets/mastering-damaged.png";

let enemyIdleImage;
let enemyIdleImage2;
let enemyDamagedImage = PORING_DAMAGED;

let bossEnemyIdleImage = MASTERING_IDLE;
let bossEnemyIdleImage2 = MASTERING_IDLE_2;
let bossEnemyDamagedImage = MASTERING_DAMAGED;

let enemyImage = document.getElementById("enemy-image");

// ------------------- Game functions --------------------------------------------------------
// Spawn new enemy
function spawnNewEnemyAndImage(image) {
    enemyIdleImage = image;
    // Create Enemy object
    enemy = new GameObjects.Enemy(enemyMaxHealth, enemyGoldDrop);
    enemyImage.src = enemyIdleImage;
    // Calculate percentage of enemy health remaining
    enemyHealthPercent = (enemy.currentHP / enemy.maxHealth) * 100;
    // Update enemy health bar
    ENEMY_CURRENT_HEALTH.style.width = enemyHealthPercent + "%";
    // Display enemy HP
    RENDER_ENEMY_HP.innerHTML = enemy.currentHP + " HP";
    ENEMY_CURRENT_HEALTH.style.backgroundColor = "rgb(5, 200, 5)";
}

spawnNewEnemyAndImage(PORING_IDLE);

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

// Enemy image when taking damage
function enemyTakeDamage(image) {
    enemyDamagedImage = image;
    enemyImage.src = enemyDamagedImage;
    setTimeout(() => {
        enemyImage.src = enemyIdleImage;
    }, 400);
}

function enemyDrop() {
    player.gold += enemy.goldDrop;
    // Level up enemy and gold drop
    enemyMaxHealth = Math.round(enemyMaxHealth * ENEMY_LEVEL_RATE);
    enemyGoldDrop = Math.round(enemyGoldDrop * ENEMY_GOLD_DROP_INCREASE_RATE);
    enemiesDefeatedCount += 1;
    // Update gold and progress values displayed
    RENDER_PLAYER_GOLD.innerHTML = player.gold;
    RENDER_ENEMIES_DEFEATED.innerHTML = "💀 " + enemiesDefeatedCount;
}

// Spawn new enemy
function spawnNewBossEnemyAndImage(image) {
    enemyIdleImage = image;
    // Create Enemy object
    enemy = new GameObjects.Enemy(bossEnemyMaxHealth, bossEnemyGoldDrop);
    enemy.boss = true;
    enemyImage.src = enemyIdleImage;
    // Calculate percentage of enemy health remaining
    enemyHealthPercent = (enemy.currentHP / enemy.maxHealth) * 100;
    // Update enemy health bar
    ENEMY_CURRENT_HEALTH.style.width = enemyHealthPercent + "%";
    // Display enemy HP
    RENDER_ENEMY_HP.innerHTML = enemy.currentHP + " HP";
    ENEMY_CURRENT_HEALTH.style.backgroundColor = "rgb(5, 200, 5)";
}

// Enemy image when taking damage
function bossEnemyTakeDamage(image) {
    enemyImage.src = image;
    setTimeout(() => {
        enemyImage.src = bossEnemyIdleImage;
    }, 400);
}

function bossEnemyDrop() {
    player.gold += enemy.goldDrop;
    // Level up enemy and gold drop
    bossEnemyMaxHealth = Math.round(bossEnemyMaxHealth * BOSS_LEVEL_RATE);
    bossEnemyGoldDrop = Math.round(bossEnemyGoldDrop * BOSS_GOLD_DROP_INCREASE_RATE);
    enemiesDefeatedCount += 1;
    // Update values displayed
    RENDER_PLAYER_GOLD.innerHTML = player.gold;
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
    }, 600);
    setTimeout(() => {
        RENDER_NOTIFICATION.style.display = "none";
    }, 1000);
}


// Displays damage when attacking
function showDamageNotification(message) {
    const DAMAGE_MESSAGE_BOX = document.getElementById("damage-messages-container");
    // Creates div for damage message
    const DAMAGE_MESSAGE = document.createElement("div");
    DAMAGE_MESSAGE.classList.add("damage-message");
    // Creates damage message from argument
    DAMAGE_MESSAGE.innerHTML = message;
    // Places damage message in container
    DAMAGE_MESSAGE_BOX.appendChild(DAMAGE_MESSAGE);
    // Animate and remove after fade
    setTimeout(() => {
        DAMAGE_MESSAGE.style.opacity = 0;
        DAMAGE_MESSAGE.style.transition = "opacity 0.5s ease";
    }, 400);
    setTimeout(() => {
        // Removes damage message after fade
        DAMAGE_MESSAGE_BOX.removeChild(DAMAGE_MESSAGE);
    }, 800);
}

// Attacking enemy function
function attackEnemy() {
    enemy.takeDamage(player.attackPower);
    showDamageNotification(player.attackPower)
    handleEnemyHP();

    // Renders normal or boss damage image
    if (enemy.boss) {
        enemyTakeDamage(MASTERING_DAMAGED);
    } else {
        enemyTakeDamage(PORING_DAMAGED);
    }

    // Normal or boss enemy drops
    if (enemy.isDefeated()) {
        if (enemy.boss) {
            bossEnemyDrop();
        } else {
            enemyDrop();
        }

        // Spawn next enemy (normal or boss at 10th enemy)
        if (enemiesDefeatedCount % 10 === 0) {
            enemy.boss = true;
            spawnNewBossEnemyAndImage(MASTERING_IDLE);
        } else {
            spawnNewEnemyAndImage(PORING_IDLE);
        }
    }
}

// ------------------- Menu functions --------------------------------------------------------
// Upgrade Player attack
const UPGRADE_PRICE_DEFAULT = 100;
let upgradePrice = UPGRADE_PRICE_DEFAULT;
// Price on upgrade menu
const RENDER_UPGRADE_PRICE = document.getElementById("upgrade-price");
RENDER_UPGRADE_PRICE.innerHTML = upgradePrice;
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
        RENDER_PLAYER_GOLD.innerHTML = player.gold;
    }
}

// Reset game
function resetGame(){
    // Reset all enemy values
    enemyMaxHealth = ENEMY_DEFAULT_HEALTH;
    enemyGoldDrop = ENEMY_GOLD_DROP_DEFAULT;
    spawnNewEnemyAndImage(enemyIdleImage);
    // Reset all boss enemy values
    bossEnemyMaxHealth = BOSS_ENEMY_DEFAULT_HEALTH;
    bossEnemyGoldDrop = BOSS_GOLD_DROP_DEFAULT;
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
    RENDER_PLAYER_GOLD.innerHTML = player.gold;
    RENDER_ENEMIES_DEFEATED.innerHTML = "💀 " + enemiesDefeatedCount;
}

// ----------------- Event Listeners ----------------------------------------------
// Click function to attack enemy
ENEMY_MODEL.addEventListener('click', attackEnemy);

// Click function to upgrade player attack
UPGRADE_ATTACK_BUTTON.addEventListener('click', upgradePlayerAttack);

// Click function to reset game
RESET_GAME_BUTTON.addEventListener('click', resetGame);