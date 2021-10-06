describe('host', () => {
  it.skip('hosts a game until all balls are drawn', () => {
    cy.visit('/');
    cy.intercept('POST', '/api/game', {
      statusCode: 200,
      body: {
        room: '0000',
        host: {
          _id: '614052036336e044e3ef30b0',
          createdAt: '2021-09-14T07:40:51.907Z',
          updatedAt: '2021-09-14T07:40:51.907Z',
        },
        message: 'Created game room 0000',
      },
    });
    cy.findByRole('button', {
      name: /host/i,
    }).click();
    cy.findByRole('button', {
      name: /start/i,
    }).click();

    // Game loop
    const play = (prevLoop = 0) => {
      let loop = ++prevLoop;
      cy.findByTestId('new-ball')
        .click()
        .then(() => {
          if (loop === 75) return;
          play(loop);
        });
    };

    play();
  });
});
