import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
// a importação import { chaiHttp } from 'chai-http' não quer funcionar
import chaiHttp = require('chai-http');
import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeams'
import { teams, team } from './utils/mocks/Team.mock';
chai.use(chaiHttp);
const { expect } = chai;
describe('Seu teste', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });
  beforeEach(function () { sinon.restore(); });
  it('Testa se a rota retorna todos os times', async function () {
    // Arrange
    sinon.stub(SequelizeTeam, 'findAll').resolves(SequelizeTeam.bulkBuild(teams as any));
    const { status, body } = await chai.request(app).get('/teams');
    // Act
    // Assert
    expect(status).to.equal(200);
    expect(body).to.deep.equal(teams);
  });

  it('Testa se a rota retorna o time correto pelo id', async function() {
    // Arrange
    sinon.stub(SequelizeTeam, 'findByPk').resolves(SequelizeTeam.build(team as any));
    const { status, body } = await chai.request(app).get('/teams/5');
    // Act
    // Assert
    expect(status).to.equal(200);
    expect(body).to.deep.equal(team);
  })

  it('Testa se retorna a mensagem esperada quando não encontrar um time pelo ID', async function() {
    // Arrange
    sinon.stub(SequelizeTeam, 'findByPk').resolves(null);
    const { status, body } = await chai.request(app).get('/teams/5');
    // Act
    // Assert
    expect(status).to.equal(404);
    expect(body.message).to.be.equal('Team 5 not found');
  });
});
