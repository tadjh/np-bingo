import { findElementIndex } from '../../src/utils';
import { Card, Draws } from '@np-bingo/types';

describe('solo', () => {
  it('wins game', () => {
    cy.visit('/');
    cy.findByRole('link', {
      name: /play/i,
    }).click();
    cy.findByRole('link', {
      name: /solo/i,
    }).click();

    let card: Card = [];

    cy.get('.cell').each((element) => card.push(parseInt(element.text())));

    cy.findByRole('button', {
      name: /start/i,
    }).click();

    cy.findByText(/free/i).click();

    let draws: Draws = [[], [], [], [], []];

    /**
     * Recursive game loop
     * @param prevLoop iterator
     */
    const solo = (prevLoop = 0) => {
      let loop = ++prevLoop;
      cy.get('[data-testid=ball-number]')
        .then((ball) => parseInt(ball.text()))
        .then((number) => findElementIndex(number, card))
        .then((index) => {
          if (index >= 0) {
            return cy
              .get(`.cell-${index + 1}`)
              .click()
              .updateValidDraws(card[index], draws)
              .then((draws) =>
                cy
                  .checkForWin(card, draws)
                  .then((success) =>
                    success
                      ? cy.findByRole('button', { name: /bingo/i }).click()
                      : cy.waitForNextBall(loop).then(() => solo(loop))
                  )
              );
          } else {
            return cy.waitForNextBall(loop).then(() => solo(loop));
          }
        });
    };
    solo();
  });

  it('no bingo', () => {
    cy.visit('/');
    cy.findByRole('link', {
      name: /play/i,
    }).click();
    cy.findByRole('link', {
      name: /solo/i,
    }).click();

    let card: Card = [];

    cy.get('.cell').each((element) => card.push(parseInt(element.text())));

    cy.findByRole('button', {
      name: /start/i,
    }).click();

    cy.findByText(/free/i).click();

    let draws: Draws = [[], [], [], [], []];

    /**
     * Recursive game loop
     * @param prevLoop iterator
     */
    const solo = (prevLoop = 0) => {
      let loop = ++prevLoop;
      cy.get('[data-testid=ball-number]')
        .then((ball) => parseInt(ball.text()))
        .then((number) => findElementIndex(number, card))
        .then((index) => {
          if (loop === 4) {
            return cy
              .findByRole('button', { name: /bingo/i })
              .click()
              .then(() => cy.findByText(/jumping the gun\. no bingo\.\.\./i));
          } else if (index >= 0) {
            cy.get(`.cell-${index + 1}`).click();
            return cy.updateValidDraws(card[index], draws).then((draws) =>
              cy
                .checkForWin(card, draws)
                .waitForNextBall(loop)
                .then(() => solo(loop))
            );
          } else {
            cy.waitForNextBall(loop).then(() => solo(loop));
          }
        });
    };
    solo();
  });

  it('loses game', () => {
    cy.visit('/');
    cy.findByRole('link', {
      name: /play/i,
    }).click();
    cy.findByRole('link', {
      name: /solo/i,
    }).click();

    let card: Card = [];

    cy.get('.cell').each((element) => card.push(parseInt(element.text())));

    cy.findByRole('button', {
      name: /start/i,
    }).click();

    cy.findByText(/free/i).click();

    const waitOrGameOver = (loop: number) => {
      if (loop === 75) {
        cy.findByText(/game over!/i).should('exist');
        cy.findByRole('button', {
          name: /replay/i,
        }).should('be.enabled');
        cy.findByRole('button', {
          name: /bingo/i,
        }).should('not.be.enabled');
        return cy.wrap('done');
      } else {
        return cy.waitForNextBall(loop).then(() => solo(loop));
      }
    };

    /**
     * Recursive game loop
     * @param prevLoop iterator
     */
    const solo = (prevLoop = 0) => {
      let loop = ++prevLoop;
      cy.get('[data-testid=ball-number]')
        .then((ball) => parseInt(ball.text()))
        .then((number) => findElementIndex(number, card))
        .then((index) => {
          if (index >= 0) {
            cy.get(`.cell-${index + 1}`).click();
            waitOrGameOver(loop);
          } else {
            waitOrGameOver(loop);
          }
        });
    };
    solo();
  });

  it('replays', () => {
    cy.visit('/');
    cy.findByRole('link', {
      name: /play/i,
    }).click();
    cy.findByRole('link', {
      name: /solo/i,
    }).click();

    let card: Card = [];

    cy.get('.cell').each((element) => card.push(parseInt(element.text())));

    cy.findByRole('button', {
      name: /start/i,
    }).click();

    cy.findByText(/free/i).click();

    let draws: Draws = [[], [], [], [], []];

    /**
     * Recursive game loop
     * @param prevLoop iterator
     */
    const solo = (prevLoop = 0) => {
      let loop = ++prevLoop;
      cy.get('[data-testid=ball-number]')
        .then((ball) => parseInt(ball.text()))
        .then((number) => findElementIndex(number, card))
        .then((index) => {
          if (index >= 0) {
            return cy
              .get(`.cell-${index + 1}`)
              .click()
              .updateValidDraws(card[index], draws)
              .then((draws) =>
                cy
                  .checkForWin(card, draws)
                  .then((success) =>
                    success
                      ? replay()
                      : cy.waitForNextBall(loop).then(() => solo(loop))
                  )
              );
          } else {
            return cy.waitForNextBall(loop).then(() => solo(loop));
          }
        });
    };
    solo();

    const replay = () => {
      cy.findByRole('button', { name: /bingo/i }).click();
      cy.findByRole('button', { name: /replay/i }).click();
    };
  });
});
