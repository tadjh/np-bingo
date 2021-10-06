import { Card, Draws } from '@np-bingo/types';
import { findElementIndex } from '../../../src/utils';

describe('multiplayer winner', () => {
  it('wins a game', () => {
    cy.visit('/');
    cy.findByRole('link', {
      name: /play/i,
    }).click();
    cy.findByRole('button', {
      name: /private room/i,
    }).click();
    cy.findByRole('textbox', {
      name: /code1/i,
    }).type('AAAA');
    // TODO get actual host socket
    cy.intercept('PUT', '/api/game/join/AAAA', {
      statusCode: 200,
      body: {
        room: 'AAAA',
        host: {
          _id: '614052036336e044e3ef30b0',
          createdAt: '2021-09-14T07:40:51.907Z',
          updatedAt: '2021-09-14T07:40:51.907Z',
        },
        message: 'Joined game room AAAA',
      },
    });
    cy.findByRole('button', {
      name: /join/i,
    }).click();

    cy.findByRole('button', {
      name: /ready/i,
    }).click();

    const makeCard = () => {
      return cy.get('.cell').then(($cells) => {
        let card: Card = Array.from($cells, (cell) => parseInt(cell.innerText));

        card[12] = 0;

        cy.task('checkpoint', 'winner has joined');

        cy.findByText(/free/i).click();

        let draws: Draws = [[], [], [], [], []];

        /**
         * Recursive game loop
         * @param prevLoop iterator
         */
        const play = (prevLoop = 0) => {
          let loop = ++prevLoop;
          cy.get('[data-testid=ball-number]')
            .then((ball) => parseInt(ball.text()))
            .then((number) => findElementIndex(number, card))
            .then((index) => {
              if (index >= 0) {
                cy.get(`.cell-${index + 1}`).click();
                return cy.updateValidDraws(card[index], draws).then((draws) =>
                  cy.checkForWin(card, draws).then((success) => {
                    if (success) {
                      cy.findByRole('button', { name: /bingo/i }).click();
                      // TODO needs host socket
                      // cy.task('waitForCheckpoint', 'card winner');
                      // return cy.findByText(/bingo!/i);
                    } else {
                      return cy.waitForNextBall(loop).then(() => play(loop));
                    }
                  })
                );
              } else {
                return cy.waitForNextBall(loop).then(() => play(loop));
              }
            });
        };

        play();
      });
    };

    makeCard();
  });
});
