import request from 'supertest';
import app from '../src/main';

const baseurl = '/api/v1/auth/';
describe('Authentication Endpoints', () => {
    describe('Admin Signup Tests', () => {
        // it('should return a success responds when user is created', async ()=> {
        //     const res = await request(app)
        //         .post(`${baseurl}admin-signup`)
        //         .send({
        //             firstName: 'john',
        //             lastName: 'doe',
        //             password: '123456',
        //             confirmPassword: '123456',
        //             email: 'john@fixture.com',
        //             username: 'johndoe',
        //             gender: 'male'
        //         });
        //     expect(res.statusCode).toEqual(201);
        //     expect(res.body).toHaveProperty('success');
            
        //     expect(res.body).toHaveProperty('payload');
        //     expect(res.body.success).toEqual(true);
        //     expect(res.body.payload).toHaveProperty('isAdmin');
        //     expect(res.body.payload).toHaveProperty('_id');
        //     expect(res.body.payload).toHaveProperty('firstName');
        //     expect(res.body.payload).toHaveProperty('lastName');
        //     expect(res.body.payload).toHaveProperty('email');
        //     expect(res.body.payload).toHaveProperty('username');
        //     expect(res.body.payload).toHaveProperty('updated_at');
        //     expect(res.body.payload).toHaveProperty('created_at');
        //     expect(res.body.payload).toHaveProperty('token');
        // });

        it('should return error when passwords dont match', async ()=> {
            const res = await request(app)
                .post(`${baseurl}admin-signup`)
                .send({
                    firstName: 'john',
                    lastName: 'doe',
                    password: '123456',
                    confirmPassword: '12345',
                    email: 'john@fixture.com',
                    username: 'johndoe',
                    gender: 'male'
                });
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('success');
            expect(res.body).toHaveProperty('payload');
            expect(res.body).toHaveProperty('message');
            expect(res.body.success).toEqual(false);
            expect(res.body.payload[0]).toEqual('confirmPassword must be one of [ref:password]');
        });

        it('should return error when required input is missing', async ()=> {
            const res = await request(app)
                .post(`${baseurl}admin-signup`)
                .send({
                    lastName: 'doe',
                    password: '123456',
                    confirmPassword: '123456',
                    email: 'john@fixture.com',
                    username: 'sunny',
                    gender: 'male'
                });
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('success');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('payload');
            expect(res.body.success).toEqual(false);
            expect(res.body.payload[0]).toEqual('firstName is required');
        });

        it('should return error when trying to re-create existing admin', async ()=> {
            const res = await request(app)
                .post(`${baseurl}admin-signup`)
                .send({
                    firstName: 'john',
                    lastName: 'doe',
                    password: '123456',
                    confirmPassword: '123456',
                    email: 'john@fixture.com',
                    username: 'johndoe',
                    gender: 'male'
                });
            expect(res.statusCode).toEqual(409);
            expect(res.body).toHaveProperty('success');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('payload');
            expect(res.body.success).toEqual(false);
            expect(res.body.message).toEqual('resource already exist');
        });
    });

    describe('Admin Signin Tests', () => {

        it('should return a success responds when registered admin signs in', async ()=> {
            const res = await request(app)
                .post(`${baseurl}admin-signin`)
                .send({
                    email: 'john@fixture.com',
                    password: '123456'
                });
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('success');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('payload');
            expect(res.body.payload).toHaveProperty('isAdmin');
            expect(res.body.payload).toHaveProperty('_id');
            expect(res.body.payload).toHaveProperty('firstName');
            expect(res.body.payload).toHaveProperty('lastName');
            expect(res.body.payload).toHaveProperty('email');
            expect(res.body.payload).toHaveProperty('username');
            expect(res.body.payload).toHaveProperty('updated_at');
            expect(res.body.payload).toHaveProperty('created_at');
            expect(res.body.payload).toHaveProperty('token');
        });

        it('should return error when admin doesn\'t exist', async ()=> {
            const res = await request(app)
                .post(`${baseurl}admin-signin`)
                .send({
                    email: 'tony@fixture.com',
                    password: '123456'
                });
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('success');
            expect(res.body).toHaveProperty('payload');
            expect(res.body.success).toEqual(false);
            expect(res.body.message).toEqual('admin not found');
        }); 

        it('should return error when non admin tries signning in as admin', async ()=> {
            const res = await request(app)
                .post(`${baseurl}admin-signin`)
                .send({
                    email: 'sunny@fixture.com',
                    password: '123456'
                });
            expect(res.statusCode).toEqual(401);
            expect(res.body).toHaveProperty('success');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('payload');
            expect(res.body.success).toEqual(false);
            expect(res.body.message).toEqual('permission denied');
        });
        
        it('should return error when required input is not provided', async ()=> {
            const res = await request(app)
                .post(`${baseurl}admin-signin`)
                .send({
                    password: '123456'
                });
                console.log(res.body);
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('success');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('payload');
            expect(res.body.success).toEqual(false);
            expect(res.body.payload[0]).toEqual('email is required');
        });

        it('should return error when invalid password is inputted', async ()=> {
            const res = await request(app)
                .post(`${baseurl}admin-signin`)
                .send({
                    email: 'john@fixture.com',
                    password: '12345'
                });
            expect(res.statusCode).toEqual(401);
            expect(res.body).toHaveProperty('success');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('payload');
            expect(res.body.success).toEqual(false);
            expect(res.body.message).toEqual('invalid password');
        });
    });

    describe('User Signup Tests', () => {
        // it('should return a success responds when user is created', async ()=> {
        //     const res = await request(app)
        //         .post(`${baseurl}signup`)
        //         .send({
        //             firstName: 'sunny',
        //             lastName: 'doe',
        //             password: '123456',
        //             confirmPassword: '123456',
        //             email: 'sunny@fixture.com',
        //             username: 'sunnydoe',
        //             gender: 'male'
        //         });
        //     expect(res.statusCode).toEqual(201);
        //     expect(res.body).toHaveProperty('success');
            
        //     expect(res.body).toHaveProperty('payload');
        //     expect(res.body.success).toEqual(true);
        //     expect(res.body.payload).toHaveProperty('isAdmin');
        //     expect(res.body.payload).toHaveProperty('_id');
        //     expect(res.body.payload).toHaveProperty('firstName');
        //     expect(res.body.payload).toHaveProperty('lastName');
        //     expect(res.body.payload).toHaveProperty('email');
        //     expect(res.body.payload).toHaveProperty('username');
        //     expect(res.body.payload).toHaveProperty('updated_at');
        //     expect(res.body.payload).toHaveProperty('created_at');
        //     expect(res.body.payload).toHaveProperty('token');
        // });

        it('should return error when passwords dont match', async ()=> {
            const res = await request(app)
                .post(`${baseurl}signup`)
                .send({
                    firstName: 'sunny',
                    lastName: 'doe',
                    password: '123456',
                    confirmPassword: '12345',
                    email: 'sunny@fixture.com',
                    username: 'sunnydoe',
                    gender: 'male'
                });
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('success');
            expect(res.body).toHaveProperty('payload');
            expect(res.body).toHaveProperty('message');
            expect(res.body.success).toEqual(false);
            expect(res.body.payload[0]).toEqual('confirmPassword must be one of [ref:password]');
        });

        it('should return error when required input is missing', async ()=> {
            const res = await request(app)
                .post(`${baseurl}signup`)
                .send({
                    lastName: 'doe',
                    password: '123456',
                    confirmPassword: '123456',
                    email: 'sunny@fixture.com',
                    username: 'sunny',
                    gender: 'male'
                });
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('success');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('payload');
            expect(res.body.success).toEqual(false);
            expect(res.body.payload[0]).toEqual('firstName is required');
        });

        it('should return error when trying to re-create existing user', async ()=> {
            const res = await request(app)
                .post(`${baseurl}signup`)
                .send({
                    firstName: 'sunny',
                    lastName: 'doe',
                    password: '123456',
                    confirmPassword: '123456',
                    email: 'sunny@fixture.com',
                    username: 'sunnydoe',
                    gender: 'male'
                });
            expect(res.statusCode).toEqual(409);
            expect(res.body).toHaveProperty('success');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('payload');
            expect(res.body.success).toEqual(false);
            expect(res.body.message).toEqual('resource already exist');
        });
    });

    describe('User Signin Tests', () => {

        it('should return a success responds when registered user signs in', async ()=> {
            const res = await request(app)
                .post(`${baseurl}signin`)
                .send({
                    email: 'sunny@fixture.com',
                    password: '123456'
                });
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('success');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('payload');
            expect(res.body.payload).toHaveProperty('isAdmin');
            expect(res.body.payload).toHaveProperty('_id');
            expect(res.body.payload).toHaveProperty('firstName');
            expect(res.body.payload).toHaveProperty('lastName');
            expect(res.body.payload).toHaveProperty('email');
            expect(res.body.payload).toHaveProperty('username');
            expect(res.body.payload).toHaveProperty('updated_at');
            expect(res.body.payload).toHaveProperty('created_at');
            expect(res.body.payload).toHaveProperty('token');
        });

        it('should return error when user doesn\'t exist', async ()=> {
            const res = await request(app)
                .post(`${baseurl}signin`)
                .send({
                    email: 'tony@fixture.com',
                    password: '123456'
                });
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('success');
            expect(res.body).toHaveProperty('payload');
            expect(res.body.success).toEqual(false);
            expect(res.body.message).toEqual('user not found');
        }); 
        
        it('should return error when required input is not provided', async ()=> {
            const res = await request(app)
                .post(`${baseurl}signin`)
                .send({
                    password: '123456'
                });
                console.log(res.body);
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('success');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('payload');
            expect(res.body.success).toEqual(false);
            expect(res.body.payload[0]).toEqual('email is required');
        });

        it('should return error when invalid password is inputted', async ()=> {
            const res = await request(app)
                .post(`${baseurl}signin`)
                .send({
                    email: 'sunny@fixture.com',
                    password: '12345'
                });
            expect(res.statusCode).toEqual(401);
            expect(res.body).toHaveProperty('success');
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('payload');
            expect(res.body.success).toEqual(false);
            expect(res.body.message).toEqual('invalid password');
        });
    });

    // afterAll((done) => {
    //     process.exit(0);
    // });
});