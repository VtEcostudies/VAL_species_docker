const db = require('./database');

beforeAll(async () => {
    await db.sequelize.sync();
});

test('create user', async () => {
    expect.assertions(1);
    const user = await db.Users.create({
        id: 99999,
        email: 'test@test.org',
        password: 'MangeRoquette'
    });
    expect(user.id).toEqual(99999);
});

test('get user', async () => {
    expect.assertions(2);
    const user = await db.Users.findByPk(99999);
    expect(user.email).toEqual('test@test.org');
    expect(user.password).toEqual('MangeRoquette');
});

test('update user', async () => {
    expect.assertions(1);
    const user = await db.Users.update({
        email: 'testaroli@test.org',
        password: 'MangeLesItaliens'
    },{
      where: {id: 99999}
    });
    expect(user).toEqual([1]);
});

test('get user', async () => {
    expect.assertions(2);
    const user = await db.Users.findByPk(99999);
    expect(user.email).toEqual('testaroli@test.org');
    expect(user.password).toEqual('MangeLesItaliens');
});

test('delete user', async () => {
    expect.assertions(1);
    await db.Users.destroy({
        where: {
            id: 99999
        }
    });
    const user = await db.Users.findByPk(99999);
    expect(user).toBeNull();
});

afterAll(async () => {
    await db.sequelize.close();
});
