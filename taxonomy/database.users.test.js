const db = require('./database');

beforeAll(async () => {
    await db.sequelize.sync();
});

test('create user', async () => {
    expect.assertions(1);
    const user = await db.Users.create({
        id: 1,
        email: 'test@test.org',
        password: 'MangeRoquette'
    });
    expect(user.id).toEqual(1);
});

test('get user', async () => {
    expect.assertions(2);
    const user = await db.Users.findByPk(1);
    expect(user.email).toEqual('test@test.org');
    expect(user.password).toEqual('MangeRoquette');
});

test('delete user', async () => {
    expect.assertions(1);
    await db.Users.destroy({
        where: {
            id: 1
        }
    });
    const user = await db.Users.findByPk(1);
    expect(user).toBeNull();
});

afterAll(async () => {
    await db.sequelize.close();
});
