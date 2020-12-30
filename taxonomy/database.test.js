const db = require('./database');

beforeAll(async () => {
    await db.sequelize.sync();
});

test('create taxon', async () => {
    expect.assertions(1);
    const taxon = await db.Taxa.create({
        id: 1,
        taxonId: '1',
        scientificName: 'Animalia',
        taxonRank: 'kingdom'
    });
    expect(taxon.id).toEqual(1);
});

test('get taxon', async () => {
    expect.assertions(3);
    const taxon = await db.Taxa.findByPk(1);
    expect(taxon.taxonId).toEqual('1');
    expect(taxon.scientificName).toEqual('Animalia');
    expect(taxon.taxonRank).toEqual('kingdom');
});

test('delete taxon', async () => {
    expect.assertions(1);
    await db.Taxa.destroy({
        where: {
            id: 1
        }
    });
    const taxon = await db.Taxa.findByPk(1);
    expect(taxon).toBeNull();
});

afterAll(async () => {
    await db.sequelize.close();
});
