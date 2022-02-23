function randomNumber(){
    Math.floor(Math.random() * 100)
}
class Character {
    constructor(name, healthPoints, damagePoints, successRate, attackAsset){// name of character, healthpoints, damagepoints dealt to other characters, success rate
        this.name = name;
        this.health = healthPoints;
        this.dp = damagePoints;
        this.sr = successRate;
        this.ass = attackAsset;
    }
}

class Player extends Character{
    constructor(name, health, dp, sr, position){ //adding position to player class name
        super(name, health, dp, sr);
        this.pos = position;
    }
    attack(id){
        if (randomNumber < this.sr){
            console.log(this.name + " bravely attacks " + enemies[id].name + " with their " + this.ass)
            console.log(this.name + " hits " + enemies[id].name + " with" + this.dp)
            enemies[id].health -= this.dp;
            if(enemies[id].health<=0){
                console.log(enemies[id].name + " is hit and destroyed!")
                enemies.splice(id, 1)
            }
        }else{
            console.log(this.name + "'s attack misses the " + enemies[id].name)
        }
    }
}
let player = new Player("Player", 10, 2, 75, 0, "shiny sword");

class Enemy extends Character{
    constructor(id, name, health, dp, sr, location, ass){ //adding location and id to enemy class name
        super(name, health, dp, sr, ass);
        this.location = location;
        this.id = id;
    }
    attack(player){
        console.log(player.name + " sees a " + this.name)
        if (this.health > 0){
            console.log(this.name + " attacks " + player.name + " with its " + this.ass);
            if (randomNumber() < this.sr){
                player.health -= this.dp;
                if(player.health > 0){
                    console.log(this.name + " hits " + player.name + " with " + this.dp + " leaving " + player.name + " with " + player.health);
                }else {
                    console.log(this.name + " hits " + player.name + " with " + this.dp + " killing " + player.name);
                    console.log("Game over!");
                    process.exit();    
                };
            }else {
                console.log(this.name + "'s misses " + player.name + "!")
            }
        }
    }
}
let enemies = [
    new Enemy(0, "Sewer Rat", 2, 1, 50, "sharp teeth"),
    new Enemy(1, "Giant Dragon", 4, 8, 90, "sharp claws and fiery breath")
];


module.exports = {enemies, player}