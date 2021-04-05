describe('gridjs-angular', () => {
  beforeEach(() =>
    cy.visit('/iframe.html?id=gridjsangularcomponent--primary&knob-gridConfig')
  );

  it('should render the component', () => {
    cy.get('gridjs-gridjs-angular').should('exist');
  });
});
