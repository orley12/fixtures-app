// import request from 'supertest';
// import app from '../src/main';

// const baseurl = '/api/v1/auth/';
// describe('Authentication Endpoints', () => {
//     let adminToken;
//     let userToken;
//     let teamId;

//     describe('Team Create Tests', () => {
//         beforeEach( async() => {
//             const adminRes = await request(app)
//                 .post(`${baseurl}admin-signin`)
//                 .send({
//                     email: 'john@fixture.com',
//                     password: '123456'
//                 });
//             adminToken = adminRes.body.payload.token;

//             const userRes = await request(app)
//                 .post(`${baseurl}signin`)
//                 .send({
//                     email: 'sunny@fixture.com',
//                     password: '123456'
//                 });
//             userToken = userRes.body.payload.token;
//         });

//         it('should return success and team data', async ()=> {
//             const res = await request(app)
//                 .post(`${baseurl}teams`)
//                 .set('token', adminToken)
//                 .send({
//                     teamName: "manchester united",
//                     stadium: "old taffold",
//                     location: "manchester"
//                 });
//             expect(res.statusCode).toEqual(201);
//             expect(res.body).toHaveProperty('success');
//             expect(res.body).toHaveProperty('message');
//             expect(res.body).toHaveProperty('payload');
//             expect(res.body.success).toEqual(true);
//             expect(res.body.payload).toHaveProperty('fixtures');
//             expect(res.body.payload).toHaveProperty('_id');
//             expect(res.body.payload).toHaveProperty('teamName');
//             expect(res.body.payload).toHaveProperty('stadium');
//             expect(res.body.payload).toHaveProperty('location');
//             expect(res.body.payload).toHaveProperty('creatorId');
//             expect(res.body.payload).toHaveProperty('updated_at');
//             expect(res.body.payload).toHaveProperty('created_at');
//             teamId = res.body.payload._id;
//         }); 

//         it('should return error when no token is provided', async ()=> {
//             const res = await request(app)
//                 .post(`${baseurl}teams`)
//                 .send({
//                     teamName: "manchester united",
//                     stadium: "old taffold",
//                     location: "manchester"
//                 });
//             expect(res.statusCode).toEqual(401);
//             expect(res.body).toHaveProperty('success');
//             expect(res.body).toHaveProperty('message');
//             expect(res.body).toHaveProperty('payload');
//             expect(res.body.success).toEqual(false);
//             expect(res.body.message).toEqual('no token is provided');
//         });
    
//         it('should return error when token as expired', async ()=> {
//             const res = await request(app)
//                 .post(`${baseurl}teams`)
//                 .set('token', `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
//                 eyJpZCI6IjVkOTA3YzQ3Nzc3MWFhMmEzNDBlNDU2ZiIsImlzQWRt
//                 aW4iOnRydWUsImlhdCI6MTU2OTc2Nzk2MywiZXhwIjoxNTY5ODU0
//                 MzYzfQ.eLSCQChQhw8m_EgzbhXEC0ZzNQlYIR2IQsNWrXCgtW0`)
//                 .send({
//                     teamName: "manchester united",
//                     stadium: "old taffold",
//                     location: "manchester"
//                 });
//             expect(res.statusCode).toEqual(401);
//             expect(res.body).toHaveProperty('success');
//             expect(res.body).toHaveProperty('message');
//             expect(res.body).toHaveProperty('payload');
//             expect(res.body.success).toEqual(false);
//             expect(res.body.message).toEqual('Session has expired. Signin to continue');
//         });

//         it('should return error when token is invalid', async ()=> {
//             const res = await request(app)
//                 .post(`${baseurl}teams`)
//                 .set('token', `${ adminToken }4`)
//                 .send({
//                     teamName: "manchester united",
//                     stadium: "old taffold",
//                     location: "manchester"
//                 });
//             expect(res.statusCode).toEqual(401);
//             expect(res.body).toHaveProperty('success');
//             expect(res.body).toHaveProperty('message');
//             expect(res.body).toHaveProperty('payload');
//             expect(res.body.success).toEqual(false);
//             expect(res.body.message).toEqual('Session is invalid. Signin to continue');
//         });

//         it('should return error when non-admin tries creating team', async ()=> {
//             const res = await request(app)
//                 .post(`${baseurl}teams`)
//                 .set('token', userToken)
//                 .send({
//                     teamName: "manchester united",
//                     stadium: "old taffold",
//                     location: "manchester"
//                 });
//             expect(res.statusCode).toEqual(401);
//             expect(res.body).toHaveProperty('success');
//             expect(res.body).toHaveProperty('message');
//             expect(res.body).toHaveProperty('payload');
//             expect(res.body.success).toEqual(false);
//             expect(res.body.message).toEqual('permission denied');
//         });

//         it('should return error when required data is missing', async ()=> {
//             const res = await request(app)
//                 .post(`${baseurl}teams`)
//                 .set('token', adminToken)
//                 .send({
//                     stadium: "old taffold",
//                     location: "manchester"
//                 });
//             expect(res.statusCode).toEqual(400);
//             expect(res.body).toHaveProperty('success');
//             expect(res.body).toHaveProperty('message');
//             expect(res.body).toHaveProperty('payload');
//             expect(res.body.success).toEqual(false);
//             expect(res.body.payload[0]).toEqual('teamName is required');
//         });

//         it('should return error when existing team tries to be recreated', async ()=> {
//             const res = await request(app)
//                 .post(`${baseurl}teams`)
//                 .set('token', adminToken)
//                 .send({
//                     teamName: "manchester united",
//                     stadium: "old taffold",
//                     location: "manchester"
//                 });
//             expect(res.statusCode).toEqual(409);
//             expect(res.body).toHaveProperty('success');
//             expect(res.body).toHaveProperty('message');
//             expect(res.body).toHaveProperty('payload');
//             expect(res.body.success).toEqual(false);
//             expect(res.body.payload[0]).toEqual('teamName is required');
//         });
//     });

//     describe('Team update Tests', () => {
//         beforeEach( async() => {
//             const adminRes = await request(app)
//                 .post(`${baseurl}admin-signin`)
//                 .send({
//                     email: 'john@fixture.com',
//                     password: '123456'
//                 });
//             adminToken = adminRes.body.payload.token;

//             const userRes = await request(app)
//                 .post(`${baseurl}signin`)
//                 .send({
//                     email: 'sunny@fixture.com',
//                     password: '123456'
//                 });
//             userToken = userRes.body.payload.token;
//         });

//         it('should return success and team data', async ()=> {
//             const res = await request(app)
//                 .patch(`${baseurl}teams/${teamId}`)
//                 .set('token', adminToken)
//                 .send({
//                     teamName: "Man U",
//                 });
//             expect(res.statusCode).toEqual(200);
//             expect(res.body).toHaveProperty('success');
//             expect(res.body).toHaveProperty('message');
//             expect(res.body).toHaveProperty('payload');
//             expect(res.body.success).toEqual(true);
//             expect(res.body.payload).toEqual('fixtures');
//             expect(res.body.message).toEqual('_id');
//             expect(res.body.message).toEqual('teamName');
//             expect(res.body.message).toEqual('stadium');
//             expect(res.body.message).toEqual('location');
//             expect(res.body.message).toEqual('creatorId');
//             expect(res.body.message).toEqual('updated_at');
//             expect(res.body.message).toEqual('created_at');
//         }); 

//         it('should return error when no token is provided', async ()=> {
//             const res = await request(app)
//                 .patch(`${baseurl}teams/${teamId}`)
//                 .send({
//                     teamName: "Man U",
//                 });
//             expect(res.statusCode).toEqual(401);
//             expect(res.body).toHaveProperty('success');
//             expect(res.body).toHaveProperty('message');
//             expect(res.body).toHaveProperty('payload');
//             expect(res.body.success).toEqual(false);
//             expect(res.body.message).toEqual('no token is provided');
//         });
    
//         it('should return error when token as expired', async ()=> {
//             const res = await request(app)
//                 .patch(`${baseurl}teams/${teamId}`)
//                 .set('token', `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
//                 eyJpZCI6IjVkOTA3YzQ3Nzc3MWFhMmEzNDBlNDU2ZiIsImlzQWRt
//                 aW4iOnRydWUsImlhdCI6MTU2OTc2Nzk2MywiZXhwIjoxNTY5ODU0
//                 MzYzfQ.eLSCQChQhw8m_EgzbhXEC0ZzNQlYIR2IQsNWrXCgtW0`)
//                 .send({
//                     teamName: "Man U",
//                 });
//             expect(res.statusCode).toEqual(401);
//             expect(res.body).toHaveProperty('success');
//             expect(res.body).toHaveProperty('message');
//             expect(res.body).toHaveProperty('payload');
//             expect(res.body.success).toEqual(false);
//             expect(res.body.message).toEqual('Session has expired. Signin to continue');
//         });

//         it('should return error when token is invalid', async ()=> {
//             const res = await request(app)
//                 .patch(`${baseurl}teams/${teamId}`)
//                 .set('token', `${ adminToken }4`)
//                 .send({
//                     teamName: "Man U",
//                 });
//             expect(res.statusCode).toEqual(401);
//             expect(res.body).toHaveProperty('success');
//             expect(res.body).toHaveProperty('message');
//             expect(res.body).toHaveProperty('payload');
//             expect(res.body.success).toEqual(false);
//             expect(res.body.message).toEqual('Session is invalid. Signin to continue');
//         });

//         it('should return error when non-admin tries updating team', async ()=> {
//             const res = await request(app)
//                 .patch(`${baseurl}teams/${teamId}`)
//                 .set('token', userToken)
//                 .send({
//                     teamName: "manchester united",
//                     stadium: "old taffold",
//                     location: "manchester"
//                 });
//             expect(res.statusCode).toEqual(401);
//             expect(res.body).toHaveProperty('success');
//             expect(res.body).toHaveProperty('message');
//             expect(res.body).toHaveProperty('payload');
//             expect(res.body.success).toEqual(false);
//             expect(res.body.message).toEqual('permission denied');
//         });

//         it('should return error when invalid data is entered', async ()=> {
//             const res = await request(app)
//                 .patch(`${baseurl}teams/${teamId}`)
//                 .set('token', adminToken)
//                 .send({
//                     stadium: 77,
//                 });
//             expect(res.statusCode).toEqual(400);
//             expect(res.body).toHaveProperty('success');
//             expect(res.body).toHaveProperty('message');
//             expect(res.body).toHaveProperty('payload');
//             expect(res.body.success).toEqual(false);
//             expect(res.body.payload[0]).toEqual('stadium must be a string');
//         });

//         it('should return error when existing team tries to be recreated', async ()=> {
//             const res = await request(app)
//                 .patch(`${baseurl}teams`)
//                 .set('token', adminToken)
//                 .send({
//                     teamName: "Arsenal",
//                 });
//             expect(res.statusCode).toEqual(409);
//             expect(res.body).toHaveProperty('success');
//             expect(res.body).toHaveProperty('message');
//             expect(res.body).toHaveProperty('payload');
//             expect(res.body.success).toEqual(false);
//             expect(res.body.payload[0]).toEqual('teamName is required');
//         });
//     });

//     describe('Team delete Tests', () => {
//         beforeEach( async() => {
//             const adminRes = await request(app)
//                 .post(`${baseurl}admin-signin`)
//                 .send({
//                     email: 'john@fixture.com',
//                     password: '123456'
//                 });
//             adminToken = adminRes.body.payload.token;

//             const userRes = await request(app)
//                 .post(`${baseurl}signin`)
//                 .send({
//                     email: 'sunny@fixture.com',
//                     password: '123456'
//                 });
//             userToken = userRes.body.payload.token;
//         });

//         it('should return success and team data', async ()=> {
//             const res = await request(app)
//                 .delete(`${baseurl}teams/${teamId}`)
//                 .set('token', adminToken);
//             expect(res.statusCode).toEqual(200);
//             expect(res.body).toHaveProperty('success');
//             expect(res.body).toHaveProperty('message');
//             expect(res.body).toHaveProperty('payload');
//             expect(res.body.success).toEqual(true);
//             expect(res.body.payload).toEqual('fixtures');
//             expect(res.body.message).toEqual('_id');
//             expect(res.body.message).toEqual('teamName');
//             expect(res.body.message).toEqual('stadium');
//             expect(res.body.message).toEqual('location');
//             expect(res.body.message).toEqual('creatorId');
//             expect(res.body.message).toEqual('updated_at');
//             expect(res.body.message).toEqual('created_at');
//         }); 

//         it('should return error when no token is provided', async ()=> {
//             const res = await request(app)
//                 .delete(`${baseurl}teams/${teamId}`);
//             expect(res.statusCode).toEqual(401);
//             expect(res.body).toHaveProperty('success');
//             expect(res.body).toHaveProperty('message');
//             expect(res.body).toHaveProperty('payload');
//             expect(res.body.success).toEqual(false);
//             expect(res.body.message).toEqual('no token is provided');
//         });
    
//         it('should return error when token as expired', async ()=> {
//             const res = await request(app)
//                 .delete(`${baseurl}teams/${teamId}`)
//                 .set('token', `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
//                 eyJpZCI6IjVkOTA3YzQ3Nzc3MWFhMmEzNDBlNDU2ZiIsImlzQWRt
//                 aW4iOnRydWUsImlhdCI6MTU2OTc2Nzk2MywiZXhwIjoxNTY5ODU0
//                 MzYzfQ.eLSCQChQhw8m_EgzbhXEC0ZzNQlYIR2IQsNWrXCgtW0`);
//             expect(res.statusCode).toEqual(401);
//             expect(res.body).toHaveProperty('success');
//             expect(res.body).toHaveProperty('message');
//             expect(res.body).toHaveProperty('payload');
//             expect(res.body.success).toEqual(false);
//             expect(res.body.message).toEqual('Session has expired. Signin to continue');
//         });

//         it('should return error when token is invalid', async ()=> {
//             const res = await request(app)
//                 .delete(`${baseurl}teams/${teamId}`)
//                 .set('token', `${ adminToken }4`);
//             expect(res.statusCode).toEqual(401);
//             expect(res.body).toHaveProperty('success');
//             expect(res.body).toHaveProperty('message');
//             expect(res.body).toHaveProperty('payload');
//             expect(res.body.success).toEqual(false);
//             expect(res.body.message).toEqual('Session is invalid. Signin to continue');
//         });

//         it('should return error when non-admin tries deleting team', async ()=> {
//             const res = await request(app)
//                 .delete(`${baseurl}teams/${teamId}`)
//                 .set('token', userToken);
//             expect(res.statusCode).toEqual(401);
//             expect(res.body).toHaveProperty('success');
//             expect(res.body).toHaveProperty('message');
//             expect(res.body).toHaveProperty('payload');
//             expect(res.body.success).toEqual(false);
//             expect(res.body.message).toEqual('permission denied');
//         });

//         it('should return warning when team is already deleted', async ()=> {
//             const res = await request(app)
//                 .delete(`${baseurl}teams/${teamId}`)
//                 .set('token', adminToken);
//             expect(res.statusCode).toEqual(200);
//             expect(res.body).toHaveProperty('success');
//             expect(res.body).toHaveProperty('message');
//             expect(res.body).toHaveProperty('payload');
//             expect(res.body.success).toEqual(false);
//             expect(res.body.message).toEqual('team not found');
//         });
//     });

//     describe('Team get Tests', () => {
//         beforeEach( async() => {
//             const adminRes = await request(app)
//                 .post(`${baseurl}admin-signin`)
//                 .send({
//                     email: 'john@fixture.com',
//                     password: '123456'
//                 });
//             adminToken = adminRes.body.payload.token;

//             const userRes = await request(app)
//                 .post(`${baseurl}signin`)
//                 .send({
//                     email: 'sunny@fixture.com',
//                     password: '123456'
//                 });
//             userToken = userRes.body.payload.token;
//         });

//         it('should return success and team data', async ()=> {
//             const res = await request(app)
//                 .get(`${baseurl}teams/${teamId}`)
//                 .set('token', adminToken);
//             expect(res.statusCode).toEqual(200);
//             expect(res.body).toHaveProperty('success');
//             expect(res.body).toHaveProperty('message');
//             expect(res.body).toHaveProperty('payload');
//             expect(res.body.success).toEqual(true);
//             expect(res.body.payload).toEqual('fixtures');
//             expect(res.body.message).toEqual('_id');
//             expect(res.body.message).toEqual('teamName');
//             expect(res.body.message).toEqual('stadium');
//             expect(res.body.message).toEqual('location');
//             expect(res.body.message).toEqual('creatorId');
//             expect(res.body.message).toEqual('updated_at');
//             expect(res.body.message).toEqual('created_at');
//         }); 

//         it('should return error when no token is provided', async ()=> {
//             const res = await request(app)
//                 .get(`${baseurl}teams/${teamId}`);
//             expect(res.statusCode).toEqual(401);
//             expect(res.body).toHaveProperty('success');
//             expect(res.body).toHaveProperty('message');
//             expect(res.body).toHaveProperty('payload');
//             expect(res.body.success).toEqual(false);
//             expect(res.body.message).toEqual('no token is provided');
//         });
    
//         it('should return error when token as expired', async ()=> {
//             const res = await request(app)
//                 .get(`${baseurl}teams/${teamId}`)
//                 .set('token', `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
//                 eyJpZCI6IjVkOTA3YzQ3Nzc3MWFhMmEzNDBlNDU2ZiIsImlzQWRt
//                 aW4iOnRydWUsImlhdCI6MTU2OTc2Nzk2MywiZXhwIjoxNTY5ODU0
//                 MzYzfQ.eLSCQChQhw8m_EgzbhXEC0ZzNQlYIR2IQsNWrXCgtW0`);
//             expect(res.statusCode).toEqual(401);
//             expect(res.body).toHaveProperty('success');
//             expect(res.body).toHaveProperty('message');
//             expect(res.body).toHaveProperty('payload');
//             expect(res.body.success).toEqual(false);
//             expect(res.body.message).toEqual('Session has expired. Signin to continue');
//         });

//         it('should return error when token is invalid', async ()=> {
//             const res = await request(app)
//                 .get(`${baseurl}teams/${teamId}`)
//                 .set('token', `${ adminToken }4`);
//             expect(res.statusCode).toEqual(401);
//             expect(res.body).toHaveProperty('success');
//             expect(res.body).toHaveProperty('message');
//             expect(res.body).toHaveProperty('payload');
//             expect(res.body.success).toEqual(false);
//             expect(res.body.message).toEqual('Session is invalid. Signin to continue');
//         });

//         it('should return error when team is not found', async ()=> {
//             const res = await request(app)
//                 .get(`${baseurl}teams/${teamId}`)
//                 .set('token', userToken);
//             expect(res.statusCode).toEqual(200);
//             expect(res.body).toHaveProperty('success');
//             expect(res.body).toHaveProperty('message');
//             expect(res.body).toHaveProperty('payload');
//             expect(res.body.success).toEqual(false);
//             expect(res.body.message).toEqual('resource not found');
//         });
//     });

//     describe('Teams get Tests', () => {
//         beforeEach( async() => {
//             const adminRes = await request(app)
//                 .post(`${baseurl}admin-signin`)
//                 .send({
//                     email: 'john@fixture.com',
//                     password: '123456'
//                 });
//             adminToken = adminRes.body.payload.token;

//             const userRes = await request(app)
//                 .post(`${baseurl}signin`)
//                 .send({
//                     email: 'sunny@fixture.com',
//                     password: '123456'
//                 });
//             userToken = userRes.body.payload.token;
//         });

//         it('should return success and team data', async ()=> {
//             const res = await request(app)
//                 .get(`${baseurl}teams`)
//                 .set('token', adminToken);
//             expect(res.statusCode).toEqual(200);
//             expect(res.body).toHaveProperty('success');
//             expect(res.body).toHaveProperty('message');
//             expect(res.body).toHaveProperty('payload');
//             expect(res.body.success).toEqual(true);
//             expect(res.body.payload).to.be('array');
//         }); 

//         it('should return error when no token is provided', async ()=> {
//             const res = await request(app)
//                 .get(`${baseurl}teams`);
//             expect(res.statusCode).toEqual(401);
//             expect(res.body).toHaveProperty('success');
//             expect(res.body).toHaveProperty('message');
//             expect(res.body).toHaveProperty('payload');
//             expect(res.body.success).toEqual(false);
//             expect(res.body.message).toEqual('no token is provided');
//         });
    
//         it('should return error when token as expired', async ()=> {
//             const res = await request(app)
//                 .get(`${baseurl}teams`)
//                 .set('token', `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
//                 eyJpZCI6IjVkOTA3YzQ3Nzc3MWFhMmEzNDBlNDU2ZiIsImlzQWRt
//                 aW4iOnRydWUsImlhdCI6MTU2OTc2Nzk2MywiZXhwIjoxNTY5ODU0
//                 MzYzfQ.eLSCQChQhw8m_EgzbhXEC0ZzNQlYIR2IQsNWrXCgtW0`);
//             expect(res.statusCode).toEqual(401);
//             expect(res.body).toHaveProperty('success');
//             expect(res.body).toHaveProperty('message');
//             expect(res.body).toHaveProperty('payload');
//             expect(res.body.success).toEqual(false);
//             expect(res.body.message).toEqual('Session has expired. Signin to continue');
//         });

//         it('should return error when token is invalid', async ()=> {
//             const res = await request(app)
//                 .get(`${baseurl}teams`)
//                 .set('token', `${ adminToken }4`);
//             expect(res.statusCode).toEqual(401);
//             expect(res.body).toHaveProperty('success');
//             expect(res.body).toHaveProperty('message');
//             expect(res.body).toHaveProperty('payload');
//             expect(res.body.success).toEqual(false);
//             expect(res.body.message).toEqual('Session is invalid. Signin to continue');
//         });
//     });
// });