describe('Los estudiantes under monkeys', function() {
  it.only('visits los estudiantes and survives monkeys with events', function() {
    cy.visit('https://losestudiantes.co');
    cy.wait(1000);
    randomEvent(10);
  })
})

function randomEvent(numberOfEvents) {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  if(numberOfEvents > 0) {
    cy.window().then((win)=>
    {
      let event = getRandomInt(1,4);
      switch (event) {
        case 1:
          let a = win.document.getElementsByTagName("a");
          if(a.length > 0){
            cy.get('a').then($links => {
              let randomLink = $links.get(getRandomInt(0, $links.length));
              if(!Cypress.dom.isHidden(randomLink)) {
                cy.wrap(randomLink).click({force: true});
              }
            });
          }
          break;
        case 2:
          let inputs = win.document.getElementsByTagName("input");
          if(inputs.length > 0){
            cy.get('input').then($fields => {
              let randomField = $fields.get(getRandomInt(0, $fields.length));
              if(!Cypress.dom.isHidden(randomField)) {
                cy.wrap(randomField).type('monkey', { force: true });
              }
            });
          }
          break;
        case 3:
          let selects = win.document.getElementsByTagName("select");
          if(selects.length > 0){
            cy.get('select').then($fields => {
              let randomField = $fields.get(getRandomInt(0, $fields.length));
              if(!Cypress.dom.isHidden(randomField)) {
                cy.wrap(randomField).select(getRandomInt(0,1),{force: true});
              }
            });
          }
          break;
        case 4:
          let buttons = win.document.getElementsByTagName("button");
          if(buttons.length > 0){
            cy.get('button').then($fields => {
              let randomField = $fields.get(getRandomInt(0, $fields.length));
              if(!Cypress.dom.isHidden(randomField)) {
                cy.wrap(randomField).click({ force: true });
              }
            });
          }
          break;
      }
    });
    numberOfEvents = numberOfEvents - 1;
    cy.wait(500);
    randomEvent(numberOfEvents);
  }
}
