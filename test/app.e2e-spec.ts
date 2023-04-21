import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  //let organizationId: number;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  // it('POST /organization', async () => {
  //   const response = await request(app.getHttpServer())
  //     .post('/organization')
  //     .send(OrganizationBuilder())
  //     .expect(201);
  //
  //   organizationId = response.body.id;
  // });
  //
  // it('GET /organization', async () => {
  //   return await request(app.getHttpServer())
  //     .get('/organization')
  //     .expect(200)
  //     .then((response) => {
  //       expect(response.body.length).toEqual(2);
  //     });
  // });

  // it('DELETE /organization/:id', async () => {
  //   return await request(app.getHttpServer())
  //     .delete(`/organization/${organizationId}`)
  //     .expect(200);
  // });

  // it('GET /organization throws 404', async () => {
  //   return await request(app.getHttpServer())
  //     .get(`/organization/${organizationId}`)
  //     .expect(404);
  // });
});
