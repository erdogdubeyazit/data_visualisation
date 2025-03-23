const neo4jDriver = require('../../common/neo4j');
const {getAllNodes} = require('../../graph/graph-repository')

jest.mock('../../common/neo4j');

describe('Graph Repository Tests', () => {
    let mockSession;

    beforeEach(() => {
        mockSession = {
            run: jest.fn(),
            close: jest.fn(),
        };
        neo4jDriver.session = jest.fn(() => mockSession);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return tree data', async () => {

        // GIVEN
        const mockResult = {
            records: [
                {
                    get: (key) => {
                        if (key === 'n') {
                            return {properties: {name: 'A', description: 'A Node', parent: ''}};
                        }
                        if (key === 'children') {
                            return [
                                {properties: {name: 'A-1', description: 'A-1 Node', parent: 'A'}},
                                {properties: {name: 'A-2', description: 'A-2 Node', parent: 'A'}},
                            ];
                        }
                    },
                },
            ],
        };


        mockSession.run.mockResolvedValue(mockResult);
        // WHEN
        const nodes = await getAllNodes();

        // THEN
        expect(nodes).toEqual([
            {
                name: 'A', description: 'A Node', parent: '', children: [
                    {name: 'A-1', description: 'A-1 Node', parent: 'A', children: []},
                    {name: 'A-2', description: 'A-2 Node', parent: 'A', children: []}
                ]
            },
        ]);
    });

    it('should throw an error if Neo4j query fails', async () => {
        // WHEN
        mockSession.run.mockRejectedValue(new Error('Query failed'));

        // THEN
        await expect(getAllNodes()).rejects.toThrow('Failed to fetch data from Neo4j');
    });
});