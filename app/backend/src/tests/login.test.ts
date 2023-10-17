import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
// a importação import { chaiHttp } from 'chai-http' não quer funcionar
import chaiHttp = require('chai-http');
import { app } from '../app';
import SequelizeUser from '../database/models/SequelizeUsers'
import { mockedJWT, correctLoginData, correctUserData } from './utils/mocks/Login.mock';
import * as jwt from 'jsonwebtoken';
chai.use(chaiHttp);
const { expect } = chai;

describe('POST /login', function () {
  beforeEach(function () { sinon.restore(); });
  it('Testa se a função retorna um toke quando o login é bem sucedido', async function() {
    // Arrange
    sinon.stub(SequelizeUser, 'findOne').resolves(correctUserData as any);
    // Act
    const { status, body } = await chai.request(app).post('/login').send(correctLoginData);
    // Assert
    expect(status).to.equal(200);
    expect(body).to.have.key('token');
  });

  it('Testa se a função retorna um erro quando o email estiver errado@errado', async function() {
    // Arrange
    const invalidEmail = { "email": "email@email.com", "password": "secret_admin" }
    // Act
    sinon.stub(SequelizeUser, 'findOne').resolves(null);
    const { status, body } = await chai.request(app).post('/login').send(invalidEmail);
    // Assert
    expect(status).to.equal(401);
    expect(body.message).to.be.equal('Invalid email or password');
  });

  it('Testa se a função retorna um erro quando a senha estiver muito errada', async function() {
    // Arrange
    const invalidLogin = { "email": "admin@admin.com", "password": "senhamuitoerrada1234" }
    // Act
    sinon.stub(SequelizeUser, 'findOne').resolves(correctUserData as any);
    const { status, body } = await chai.request(app).post('/login').send(invalidLogin);
    // Assert
    expect(status).to.equal(401);
    expect(body.message).to.be.equal('Invalid email or password');
  });

  it('Testa se a função retorna um erro quando o body estiver vazio', async function() {
    // Arrange
    // Act
    const { status, body } = await chai.request(app).post('/login').send({});
    // Assert
    expect(status).to.equal(400);
    expect(body.message).to.be.equal('All fields must be filled');
  });

  it('Testa se a função retorna um erro quando o email for inválido', async function() {
    // Arrange
    // Act
    const { status, body } = await chai.request(app).post('/login').send({"email": "naoTem-email.com", "password": "132313" });
    // Assert
    expect(status).to.equal(401);
    expect(body.message).to.be.equal('Invalid email or password');
  });

  it('Testa se a função retorna um erro quando a senha for inválida', async function() {
    // Arrange
    // Act
    const { status, body } = await chai.request(app).post('/login').send({ "email": "valid@email.com", "password": "1323" });
    // Assert
    expect(status).to.equal(401);
    expect(body.message).to.be.equal('Invalid email or password');
  });
});

describe('GET /login/role', async function () {
  beforeEach(function () { sinon.restore(); });
  it('Testa se a função retorna a role correta', async function () {
    // Arrange
    sinon.stub(jwt, 'verify').callsFake(() => mockedJWT);
    // Act
    const { status, body } = await chai.request(app).get('/login/role')
    .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjk2NTM3OTgxLCJleHAiOjE2OTcxNDI3ODF9.CVcjL_Htx4eQ-HPYxtET-0brT54vaSbVR-yfeaUFD_o');
    // Assert
    expect(status).to.equal(200);
    expect(body.role).to.be.deep.equal(mockedJWT.role);
  });

  it('Testa se a função retorna a mensagem esperada quando o token não for encontrado', async function () {
    // Arrange
    // Act
    const { status, body } = await chai.request(app).get('/login/role')
    // Assert
    expect(status).to.equal(401);
    expect(body.message).to.be.equal('Token not found');
  });

  it('Testa se a função retorna um erro quando o token for inválido', async function () {
    // Arrange
    sinon.stub(jwt, 'verify').throws();
    // Act
    const { status, body } = await chai.request(app).get('/login/role').set('Authorization', 'bearer tokenI')
    // Assert
    expect(status).to.equal(401);
    expect(body.message).to.be.equal('Token must be a valid token');
  });
});