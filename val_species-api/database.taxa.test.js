const db = require('./database');
var randomId = Math.floor(Math.random());
var randomName = `kingdom_${randomId}`;

beforeAll(async () => {
    await db.sequelize.sync();
});

test('create taxon', async () => {
    expect.assertions(1);
    const taxon = await db.Taxa.create({
        taxonId: `${randomId}`,
        scientificName: randomName,
        taxonRank: 'kingdom'
    });
    expect(taxon.taxonId).toEqual(`${randomId}`);
});

test('get taxon', async () => {
    expect.assertions(3);
    const taxon = await db.Taxa.findByPk(`${randomId}`);
    expect(taxon.taxonId).toEqual(`${randomId}`);
    expect(taxon.scientificName).toEqual(randomName);
    expect(taxon.taxonRank).toEqual('kingdom');
});

test('update taxon', async () => {
    expect.assertions(1);
    const taxon = await db.Taxa.update({
        scientificName: randomName + '2',
        taxonRank: 'Kingdom'
    },{
      where: {taxonId: `${randomId}`}
    });
    expect(taxon).toEqual([1]);
});

test('get taxon', async () => {
    expect.assertions(3);
    const taxon = await db.Taxa.findByPk(`${randomId}`);
    expect(taxon.taxonId).toEqual(`${randomId}`);
    expect(taxon.scientificName).toEqual(randomName + '2');
    expect(taxon.taxonRank).toEqual('Kingdom');
});

test('delete taxon', async () => {
    expect.assertions(1);
    await db.Taxa.destroy({
        where: {
            taxonId: `${randomId}`
        }
    });
    const taxon = await db.Taxa.findByPk(`${randomId}`);
    expect(taxon).toBeNull();
});

afterAll(async () => {
    await db.sequelize.close();
});
