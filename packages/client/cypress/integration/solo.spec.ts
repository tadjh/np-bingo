import { findElementIndex } from '../../src/utils';
import config from '../../src/config/features';
import { checkCard } from '../../src/utils/bingo.validate';
import { Card, Draws } from '@np-bingo/types';

/**
 * Pushes new number onto Draws array
 * @param number
 * @param validDraws
 * @returns Promise<Draws>
 */
const updateValidDraws = (number: number, validDraws: Draws) => {
  if (number <= 15) {
    validDraws[0].push(number);
  } else if (number <= 30) {
    validDraws[1].push(number);
  } else if (number <= 45) {
    validDraws[2].push(number);
  } else if (number <= 60) {
    validDraws[3].push(number);
  } else if (number <= 75) {
    validDraws[4].push(number);
  }
  return Promise.resolve(validDraws);
};

/**
 * Checks is card is a winner based on current crossmarks
 * @param card
 * @param validDraws
 * @returns Promise<boolean>
 */
const checkForWin = (card: Card, validDraws: Draws) => {
  const { row, column, diagonal } = checkCard(card, validDraws);
  if (row.length > 0 || column.length > 0 || diagonal.length > 0) {
    return Promise.resolve(true);
  }
  return Promise.resolve(false);
};

/**
 * Get next ball with extended timeout
 * @param loop
 * @returns
 */
const waitForNextBall = (loop: number) =>
  cy
    .get('[data-testid=remainder]', {
      timeout: config.ballDelay + 1000 || 6000,
    })
    .should('have.text', `Balls Remaining${74 - loop}`);

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
    const play = (prevLoop = 0) => {
      let loop = prevLoop + 1;
      cy.get('[data-testid=ball-number]')
        .then((ball) => parseInt(ball.text()))
        .then((number) => findElementIndex(number, card))
        .then((index) => {
          if (index >= 0) {
            cy.get(`.cell-${index + 1}`).click();
            return updateValidDraws(card[index], draws)
              .then((draws) => checkForWin(card, draws))
              .then((success) => {
                if (success) {
                  cy.findByRole('button', { name: /bingo/i }).click();
                  return;
                } else {
                  return waitForNextBall(loop).then(() => play(loop));
                }
              });
          } else {
            return waitForNextBall(loop).then(() => play(loop));
          }
        });
    };

    play();
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
    const play = (prevLoop = 0) => {
      let loop = prevLoop + 1;
      cy.get('[data-testid=ball-number]')
        .then((ball) => parseInt(ball.text()))
        .then((number) => findElementIndex(number, card))
        .then((index) => {
          if (loop === 4) {
            return cy
              .findByRole('button', { name: /bingo/i })
              .click()
              .then(() => {
                cy.findByText(/jumping the gun\. no bingo\.\.\./i);
              });
          } else if (index >= 0) {
            cy.get(`.cell-${index + 1}`).click();
            return updateValidDraws(card[index], draws)
              .then((draws) => checkForWin(card, draws))
              .then(() => {
                return waitForNextBall(loop).then(() => play(loop));
              });
          } else {
            return waitForNextBall(loop).then(() => play(loop));
          }
        });
    };

    play();
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

    /**
     * Recursive game loop
     * @param prevLoop iterator
     */
    const play = (prevLoop = 0) => {
      let loop = prevLoop + 1;

      if (loop === 75) {
        cy.findByText(/game over!/i).should('exist');
        cy.findByRole('button', {
          name: /replay/i,
        }).should('be.enabled');
        cy.findByRole('button', {
          name: /bingo/i,
        }).should('not.be.enabled');
        return;
      }

      return cy
        .get('[data-testid=ball-number]')
        .then((ball) => parseInt(ball.text()))
        .then((number) => findElementIndex(number, card))
        .then((index) => {
          if (index >= 0) {
            return cy
              .get(`.cell-${index + 1}`)
              .click()
              .then(() => waitForNextBall(loop).then(() => play(loop)));
          } else {
            return waitForNextBall(loop).then(() => play(loop));
          }
        });
    };

    play();
  });
});
