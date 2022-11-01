describe('Los estudiantes under monkeys', function() {
  it('visits los estudiantes and survives monkeys with clicks', function() {
    cy.visit('https://losestudiantes.co');
    cy.wait(1000);
    randomClick(10);
  })
  it.only('visits los estudiantes and survives monkeys with events', function() {
    cy.visit('https://losestudiantes.co');
    cy.wait(1000);
    randomEvent(10);
  })
})

function randomClick(monkeysLeft) {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  if(monkeysLeft > 0) {
    cy.get('a').then($links => {
      let randomLink = $links.get(getRandomInt(0, $links.length));
      if(!Cypress.dom.isHidden(randomLink)) {
        cy.wrap(randomLink).click({force: true});
        monkeysLeft = monkeysLeft - 1;
      }
      cy.wait(1000);
      randomClick(monkeysLeft);
    });
  }
}

function randomEvent(monkeysLeft) {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function getRandomEvent() {
    let events = [
        'click',
        'type'
    ]
    return 'cy.wrap(randomLink).' + events[0] + '({force: true});'
  }

  if(monkeysLeft > 0) {
    cy.get('a').then($links => {
      let randomLink = $links.get(getRandomInt(0, $links.length));
      if(!Cypress.dom.isHidden(randomLink)) {
        getRandomEvent()
        monkeysLeft = monkeysLeft - 1;
      }
      cy.wait(1000);
      randomClick(monkeysLeft);
    });
  }
}
