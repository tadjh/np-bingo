const cypress = require('cypress');

const arg = require('arg');

const args = arg({
  '--open': Boolean,
  '--port': Number,
});
const port = args['--port'] || 9090;
const io = require('socket.io')(port);

const wait = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

// Socket.io server to let two Cypress runners communicate and wait for "checkpoints"
// https://socket.io/

// keep the last checkpoint around
// even if a test runner joins later, it
// should still receive it right away
let lastCheckpoint;

io.on('connection', (socket) => {
  console.log('new connection');
  if (lastCheckpoint) {
    // console.log('sending the last checkpoint "%s"', lastCheckpoint);
    socket.emit('checkpoint', lastCheckpoint);
  }

  socket.on('disconnect', () => {
    console.log('disconnected');
  });

  socket.on('checkpoint', (name) => {
    // console.log('checkpoint: "%s"', name);
    lastCheckpoint = name;
    io.emit('checkpoint', name);
  });
});

if (args['--open']) {
  console.log('opening the host Cypress');
} else {
  console.log('starting the host Cypress');
}
const cypressAction = args['--open'] ? cypress.open : cypress.run;
const hostCypress = cypressAction({
  configFile: 'multiplayer.cypress.json',
  spec: 'cypress/multiplayer/integration/multiplayer.host.spec.ts',
  headed: true,
  browser: 'chrome',
}).then((results) => {
  console.log('Host Cypress has finished');
  return results;
});

// delay starting the second Cypress instance
// to avoid any XVFB race conditions
/* eslint-disable-next-line cypress/no-unnecessary-waiting */
const winnerCypress = wait(5000).then(() => {
  console.log('starting the winner Cypress');
  return cypressAction({
    configFile: 'multiplayer.cypress.json',
    spec: 'cypress/multiplayer/integration/multiplayer.winner.spec.ts',
    headed: true,
    browser: 'chrome',
  }).then(() => {
    console.log('Second Cypress has finished');
  });
});

Promise.all([hostCypress, winnerCypress]).then(() => {
  // TODO: exit with the test code from both runners
  console.log('all done, exiting');
  process.exit(0);
});
