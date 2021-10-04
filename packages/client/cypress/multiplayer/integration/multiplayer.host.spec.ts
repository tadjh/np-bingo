describe('multiplayer host', () => {
  it('hosts a game', () => {
    cy.visit('/');

    return cy
      .get('[data-testid=player-name]')
      .invoke('attr', 'data-socketid')
      .then((socketId) => {
        cy.intercept('POST', '/api/game', {
          statusCode: 200,
          body: {
            room: 'AAAA',
            host: {
              name: 'Host#0000',
              _id: '614052036336e044e3ef30b0',
              socketId: socketId,
              createdAt: '2021-09-14T07:40:51.907Z',
              updatedAt: '2021-09-14T07:40:51.907Z',
            },
            message: 'Created game room AAAA',
          },
        });
        cy.findByRole('button', {
          name: /host/i,
        }).click();

        cy.task('waitForCheckpoint', 'winner has joined');

        cy.findByRole('button', {
          name: /start/i,
        }).click();

        cy.findByTestId('new-ball').click();

        // Game loop
        const draw = (prevLoop = 0) => {
          let loop = ++prevLoop;
          cy.findByTestId('new-ball').click();

          cy.findByRole('button', {
            name: /validate/i,
          }).then(($btn) => {
            if ($btn.hasClass('active')) {
              cy.findByRole('button', {
                name: /validate/i,
              }).click();
              cy.findByText(/checking if card is a winner\.\.\./i).should(
                'be.visible'
              );
              cy.findByText(/bingo!/i);
              cy.task('checkpoint', 'card winner');
            } else {
              if (loop === 75) return;
              draw(loop);
            }
          });
        };

        draw();
      });
  });
});
