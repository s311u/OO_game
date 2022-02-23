/* const { exit } = require('process'); */
const prompts = require('prompts');
const action = require('./choices.js');




async function gameLoop() {
    let continueGame = true;

    const actionChoices = [
        { title: 'Look around', value: 'look' },
        { title: 'Go to room', value: 'goTo' },
        { title: 'Attack', value: 'attack'},
        { title: 'Exit game', value: 'exit'}
    ];

    const response = await prompts({
      type: 'select',
      name: 'value',
      message: 'Choose your action',
      choices: actionChoices
    });

    console.log('You selected ' + response.value);
    action.action(response.value);
    
    if(continueGame) {
      gameLoop();
    }    
}


process.stdout.write('\033c');

console.log('WELCOME TO THE DUNGEONS OF LORD OBJECT ORIENTUS!')
console.log('================================================')
console.log('You walk down the stairs to the dungeons')
gameLoop();