import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Users from '../database/models/Users'
import loginMock from '../tests/mocks/login.mock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Teste método POST em /login', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Users, "findOne")
      .resolves(loginMock.user1 as Users);
  });

  after(()=>{
    (Users.findOne as sinon.SinonStub).restore();
  })

  it('Verifica se o token é retornado ao passar usuário válido e se status é 200', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(loginMock.validUser1)

    console.log(chaiHttpResponse.body)

    expect(chaiHttpResponse.body).to.haveOwnProperty('token')
    expect(chaiHttpResponse.status).to.be.deep.equal(200)
    expect(chaiHttpResponse).to.have.status(200)
  });

  it('Verifica se retorna um erro ao passar password incorreto', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(loginMock.invalidPasswordUser1)

    expect(chaiHttpResponse.status).to.be.deep.equal(401)
    expect(chaiHttpResponse.body.message).to.be.deep.equal('Incorrect email or password')
  });

  it('Verifica se retorna um erro ao passar email incorreto', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(loginMock.invalidEmailUser1)

    expect(chaiHttpResponse.status).to.be.deep.equal(401)
    expect(chaiHttpResponse.body.message).to.be.deep.equal('Incorrect email or password')
  });

  it('Verifica se retorna um erro 400 e mensagem correta se faltar algum campo - Email', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({ 'password': 'secret_admin' })

    expect(chaiHttpResponse.status).to.be.deep.equal(400)
    expect(chaiHttpResponse.body.message).to.be.deep.equal('All fields must be filled')
  });

  it('Verifica se retorna um erro 400 e mensagem correta se faltar algum campo - Password', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({ 'email': 'admin@admin.com' })

    expect(chaiHttpResponse.status).to.be.deep.equal(400)
    expect(chaiHttpResponse.body.message).to.be.deep.equal('All fields must be filled')
  });

});
