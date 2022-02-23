const roomsFile = require('./rooms.js');
const playerFile = require('./characters.js'); // i later on realized it was useless to have a separate player file and enemy file but i was too tired to replace
const enemiesFile = require('./characters.js')
const main = require('./main.js');
const prompts = require('prompts');

function action(choice){
    switch(choice){
        case "look":
            console.log(playerFile.player.name + " looks around");
            console.log(playerFile.player.name + " is in the " + roomsFile.rooms[playerFile.player.pos].name + " and it is a " + roomsFile.rooms[playerFile.player.pos].info);
            let connectedRooms = [];
            for (let i = 0; i < roomsFile.rooms[playerFile.player.pos].connections.length; i++){
                connectedRooms.splice(0,0,roomsFile.rooms[roomsFile.rooms[playerFile.player.pos].connections[i]].name)
            }
            console.log("\nThere are doorways leading to: ")
            for (let i = 0; i < connectedRooms.length; i++){
                console.log(connectedRooms[i].name)
            }
            if(roomsFile.rooms[playerFile.player.pos].enemyId.length != 0){
                enemiesFile.enemies[roomsFile.rooms[playerFile.player.pos].enemyId].attack();
            }
            break;

        case "goTo":           
            async function chooseRoom() {
                let actionChoices = [];
                for(let i = 0; i < roomsFile.rooms[playerFile.player.pos].connectedRooms; i++){
                    actionChoices.push({
                        title: roomsFile.rooms[playerFile.player.pos].connectedRooms[i].name,
                        value: roomsFile.rooms[playerFile.player.pos].connectedRooms[i].id
                    })
                }

                const response = await prompts({
                    type: 'select',
                    name: 'value',
                    message: 'Which room are you going to?',
                    choices: actionChoices
                })
                
                playerFile.player.pos = response.value;
                console.log(playerFile.player.name + ' moves to ' + roomsFile.rooms[response.value].name + '\n-----------------------');
                if(response.value == 3){
                    console.log('Congratulations ' + playerFile.player.name + "! You made it through the dungeon alive!\n--------------------")
                }

                if(roomsFile.rooms[playerFile.player.pos].enemyId.length > 0) {
                    enemiesFile.enemies[roomsFile.rooms[playerFile.player.pos].enemyId].attack();
                }
                main.gameLoop();
            }
            chooseRoom();

            break;
        case "attack":
            if(roomsFile.rooms[playerFile.player.pos].enemyId.length >= 1){
                async function chooseEnemy(){
                    let actionChoices = [];
                    for(let i = 0; i < roomsFile.rooms[playerFile.player.pos].enemyId.length; i++){
                        actionChoices.push({
                            title: enemiesFile.enemies[roomsFile.rooms[playerFile.player.pos].enemyId[i]].name,
                            value: roomsFile.rooms[playerFile.player.pos].enemyId[i]
                        })
                    }

                    const response = await prompts({
                        type: 'select',
                        name: 'value',
                        message: "Which enemy do you want to attack?",
                        choices: actionChoices
                    })

                    playerFile.player.attack(response.value)

                    main.gameLoop()
                }
                chooseEnemy();
            }
            break;

        case "exit":
            process.exit();
    }
}

module.exports = { action };