import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
// a importação import { chaiHttp } from 'chai-http' não quer funcionar
import chaiHttp = require('chai-http');
import { app } from '../app';
import SequelizeMatches from '../database/models/SequelizeMatches';
import { matches, inProgress, endedMatches, mockNewMatch } from './utils/mocks/Matches.mock';
import * as jwt from 'jsonwebtoken';
import { mockedJWT } from './utils/mocks/Login.mock'
import Validate from '../middleware/validate.middleware';
chai.use(chaiHttp);
const { expect } = chai;

describe('GET, /matches', () => {
  beforeEach(function () { sinon.restore(); });
  it('Testa se a função retorna todas as partidas', async function() {
    // Arrange
    sinon.stub(SequelizeMatches, 'findAll').resolves(matches as any);
    // Act
    const { status, body } = await chai.request(app).get('/matches');
    // Assert
    expect(status).to.equal(200);
    expect(body).to.deep.equal(matches);
  });

  it('Testa se a função retorna todas as partidas finalizadas', async function() {
    // Arrange
    sinon.stub(SequelizeMatches, 'findAll').resolves(endedMatches as any);
    // Act
    const { status, body } = await chai.request(app).get('/matches?inProgress=true');
    // Assert
    expect(status).to.equal(200);
    expect(body).to.deep.equal(endedMatches);
  });

  it('Testa se a função retorna todas as partidas em progresso', async function() {
    // Arrange
    sinon.stub(SequelizeMatches, 'findAll').resolves(inProgress as any);
    // Act
    const { status, body } = await chai.request(app).get('/matches?inProgress=true');
    // Assert
    expect(status).to.equal(200);
    expect(body).to.deep.equal(inProgress);
  });
});

describe('PATCH, /matches', () => {
  beforeEach(function () { sinon.restore(); });
  it('Testa se a função retorna a mensagem informando que a partida acabou', async function() {
    // Arrange
    sinon.stub(jwt, 'verify').callsFake(() => mockedJWT);
    sinon.stub(SequelizeMatches, 'update').resolves([1]);
    // Act
    const { status, body } = await chai.request(app).patch('/matches/42/finish').set('Authorization', 'token');
    // Assert
    expect(status).to.equal(200);
    expect(body).to.deep.equal({ message: "Finished" });
  });

  it('Testa se a função retorna uma mensagem quando a partida ainda não acabou', async function() {
    // Arrange
    sinon.stub(jwt, 'verify').callsFake(() => mockedJWT);
    sinon.stub(SequelizeMatches, 'update').resolves([0]);
    // Act
    const { status, body } = await chai.request(app).patch('/matches/1/finish').set('Authorization', 'token');
    // Assert
    expect(status).to.equal(409);
    expect(body).to.deep.equal({ message: `There are no updates to perform in Match ${mockedJWT.id}` });
  });

  it('Testa se a função retorna a mensagem esperada quando os gols forem atualizados', async function() {
    // Arrange
    sinon.stub(jwt, 'verify').callsFake(() => mockedJWT);
    sinon.stub(SequelizeMatches, 'update').resolves([1]);
    // Act
    const { status, body } = await chai.request(app).patch('/matches/1').set('Authorization', 'token')
    .send({"homeTeamGoals": 3, "awayTeamGoals": 1});
    // Assert
    expect(status).to.equal(200);
    expect(body).to.deep.equal({ message: "Goals Updated" });
  });

  it('Testa se a função retorna a mensagem esperada quando não tem partida pra atualizar', async function() {
    // Arrange
    sinon.stub(jwt, 'verify').callsFake(() => mockedJWT);
    sinon.stub(SequelizeMatches, 'update').resolves([0]);
    // Act
    const { status, body } = await chai.request(app).patch('/matches/1').set('Authorization', 'token').send();
    // Assert
    expect(status).to.equal(409);
    expect(body).to.deep.equal({ message: `There are no updates to perform in Match ${mockedJWT.id}` });
  });

  it('Testa se é possível criar uma partida com sucesso', async function() {
    // Arrange
    sinon.stub(jwt, 'verify').callsFake(() => mockedJWT);
    sinon.stub(SequelizeMatches, 'create').resolves(mockNewMatch as any);
    sinon.stub(Validate, 'validateNewMatch').returns();
    const { id, ...sendData } = mockNewMatch;
    // Act
    const { status, body } = await chai.request(app).post('/matches').set('Authorization', 'token').send(sendData);
    // Assert
    expect(status).to.equal(201);
    expect(body).to.deep.equal(mockNewMatch);
  });

  it('Testa se a função retorna a mensagem esperada quando o homeTeamId não for informado', async function() {
   // Arrange
    sinon.stub(jwt, 'verify').callsFake(() => mockedJWT);
    sinon.stub(SequelizeMatches, 'create').resolves(mockNewMatch as any);
    sinon.stub(Validate, 'validateNewMatch').returns();
    const { id, homeTeamId , ...sendData } = mockNewMatch;
    // Act
    const { status, body } = await chai.request(app).post('/matches').set('Authorization', 'token').send(sendData);
    // Assert
    expect(status).to.equal(400);
    expect(body).to.deep.equal({ message: 'homeTeamId is required' });
  });
});
