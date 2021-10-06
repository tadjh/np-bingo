import '@testing-library/cypress/add-commands';
import { Card, Draws } from '@np-bingo/types';
import { checkCard } from '../../src/utils/bingo.validate';
import config from '../../src/config/features';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Pushes new number onto Draws array
       * @param number
       * @param validDraws
       * @returns Cypress.Chainable<Draws>
       */
      updateValidDraws(
        number: number,
        validDraws: Draws
      ): Cypress.Chainable<Draws>;
      /**
       * Checks is card is a winner based on current crossmarks
       * @param card
       * @param validDraws
       * @returns Promise<boolean>
       */
      checkForWin(card: Card, validDraws: Draws): Cypress.Chainable<boolean>;
      /**
       * Get next ball with extended timeout
       * @param loop
       * @returns Cypress.Chainable<JQuery<HTMLElement>>
       */
      waitForNextBall(loop: number): Cypress.Chainable<JQuery<HTMLElement>>;
    }
  }
}

const updateValidDraws = (
  number: number,
  validDraws: Draws
): Cypress.Chainable<Draws> => {
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
  return cy.wrap(validDraws);
};

const checkForWin = (
  card: Card,
  validDraws: Draws
): Cypress.Chainable<boolean> => {
  const { row, column, diagonal } = checkCard(card, validDraws);
  if (row.length > 0 || column.length > 0 || diagonal.length > 0) {
    return cy.wrap(true);
  }
  return cy.wrap(false);
};

const waitForNextBall = (
  loop: number
): Cypress.Chainable<JQuery<HTMLElement>> =>
  cy
    .get('[data-testid=remainder]', {
      timeout: config.ballDelay + 1000 || 6000,
    })
    .should('have.text', `Balls Remaining${74 - loop}`);

Cypress.Commands.add('updateValidDraws', updateValidDraws);
Cypress.Commands.add('checkForWin', checkForWin);
Cypress.Commands.add('waitForNextBall', waitForNextBall);

export {};
