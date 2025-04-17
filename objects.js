// Constructors to work on ----------------------------------------------------
// Enemy object
export class Enemy {
    // Enemy constructor
    constructor() {
        this.maxHealth = 0;
        this.currentHP = 0;
        this.goldDrop = 0;
        this.boss = false;
    }
    setEnemyStats(maxHealth, goldDrop) {
        this.maxHealth = maxHealth;
        this.currentHP = maxHealth;
        this.goldDrop = goldDrop;
    }
    // Attacking enemy function
    takeDamage(damage) {
        // Decrease health
        this.currentHP -= damage;
        // Makes sure enemy health does not go negative
        if (this.currentHP < 0) {
            this.currentHP = 0;
        }
    }
    isDefeated() {
        if (this.currentHP === 0) {
            return true;
        }
        return false;
    }
}

// Player object
export class Player {
    // Player constructor
    constructor(attackPower, gold) {
        this.attackPower = attackPower;
        this.gold = gold;
    }
    upgradePower(powerUp) {
        this.attackPower += powerUp;
    }
}
