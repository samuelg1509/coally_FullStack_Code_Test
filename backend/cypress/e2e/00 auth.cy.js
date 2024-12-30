import {
    USER_NAME,
    USER_EMAIL,
    TEST_PASSWORD
} from './constants/index.cy.js';

describe('Register testing', () => {
    it(`Testing endpoint: ${Cypress.config('baseUrl')}/api/auth/register`, () => {
        cy.request({
            method: 'POST', 
            url: `${Cypress.config('baseUrl')}/api/auth/register`,
            body: {
                "username":USER_NAME,
                "email":USER_EMAIL,
                "password":TEST_PASSWORD
              }
        }).as('ping');
  
        cy.get('@ping')
        .then(pong => {
            
            cy.log(pong)
                expect(pong.status, 'Response status 201').to.eq(201);
                expect(pong.body, "success key in response").to.have.ownPropertyDescriptor('success');
                expect(pong.body, "cod_error key in response").to.have.ownPropertyDescriptor('cod_error');
                expect(pong.body.success, "true in success key").to.be.true;
                
        });
    })

    it(`Testing fail 403 in endpoint: ${Cypress.config('baseUrl')}/api/auth/register`, () => {
        cy.request({
            method: 'POST', 
            failOnStatusCode: false,
            url: `${Cypress.config('baseUrl')}/api/auth/register`,
            body: {
                "username":USER_NAME,
                "email":USER_EMAIL,
                "password":TEST_PASSWORD
              }
        }).as('ping');
  
        cy.get('@ping')
        .then(pong => {
            
            cy.log(pong)
                expect(pong.status, 'Response status 403').to.eq(403);
                expect(pong.body, "cod_error key in response").to.have.ownPropertyDescriptor('cod_error')
                expect(pong.body.success, "false in success key").to.be.false;

        });
    })
});