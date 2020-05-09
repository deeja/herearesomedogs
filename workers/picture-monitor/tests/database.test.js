const database = require('../database')

describe('Update the database', () => {
    test('should connect to the database',async () => {
        await database.updateDatabase();        

    
    });
});