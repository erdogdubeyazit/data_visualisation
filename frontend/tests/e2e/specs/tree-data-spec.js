describe('Tree Display E2E Tests', () => {
    beforeEach(() => {
      cy.intercept('GET', '**/nodes', {
        body: {
          data: [{
            name: 'Root',
            description: 'Root node',
            children: [
              { name: 'Child 1', description: 'Child node' },
              { name: 'Child 2', description: 'Another child node' }
            ]
          }]
        }
      }).as('getNodes');
  
      cy.visit('/');
      cy.wait('@getNodes');
    });
  
    it('should correctly parse and render the tree structure', () => {
      cy.get('svg .node-circle').should('have.length', 3);

      cy.get('svg text').contains('Root').should('exist');
      cy.get('svg text').contains('Child 1').should('exist');
      cy.get('svg text').contains('Child 2').should('exist');

      cy.get('svg .link').should('have.length', 2);

      cy.get('svg')
        .should('have.attr', 'width', '600')
        .and('have.attr', 'height', '500');
    });
  
    it('should display alert with node details when a node is selected', () => {
      cy.get('svg text').contains('Root').click();

      cy.get('#nodeDetails').should('exist');
      cy.get('#nodeDetails h1').contains('Root');
      cy.get('#nodeDetails p').contains('Root node');
    });
  
    it('should hide alert when deselect button is clicked', () => {
      cy.get('svg text').contains('Root').click();
  
      cy.get('#nodeDetails .btn-close').click();
  
      cy.get('#nodeDetails').should('not.exist');
    });
  });
  