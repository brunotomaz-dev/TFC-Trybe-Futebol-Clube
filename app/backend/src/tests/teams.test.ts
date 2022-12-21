import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Teams from '../database/models/Teams';
import teamsMock from '../tests/mocks/teams.mock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testa o método GET em /teams', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Teams, "findAll")
      .resolves(teamsMock.allTeams as Teams[]);
  });

  after(()=>{
    (Teams.findAll as sinon.SinonStub).restore();
  })

  it('Verifica se retorna um resultado válido', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams');
    
    expect(chaiHttpResponse.body).to.be.equal(teamsMock.allTeams)
    expect(chaiHttpResponse.status).to.be.deep.equal(200)
    expect(chaiHttpResponse).to.have.status(200)
  })
})