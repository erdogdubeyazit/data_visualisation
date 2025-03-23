const {getAllData} = require('../../graph/graph-service');
const {NoDataFoundException, MultipleRootsInTreeError} = require('../../common/errors');
const graphRepository = require('../../graph/graph-repository');

jest.mock('../../graph/graph-repository');

describe('Graph Service Tests', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should throw NoDataFoundException when no data is found', async () => {
        // GIVEN
        graphRepository.getAllNodes.mockResolvedValue([]);

        // THEN
        await expect(getAllData()).rejects.toThrow(NoDataFoundException);
    });

    it('should throw MultipleRootsInTreeError when multiple root nodes are found', async () => {
        // GIVEN
        graphRepository.getAllNodes.mockResolvedValue([{name: 'A'}, {name: 'B'}]);

        // THEN
        await expect(getAllData()).rejects.toThrow(MultipleRootsInTreeError);
    });

    it('should map nodes to GraphNode tree structure', async () => {
        // GIVEN
        const mockData = [
            {name: 'Root', description: 'Root Node', parent: '', children: []},
        ];
        graphRepository.getAllNodes.mockResolvedValue(mockData);

        // WHEN
        const result = await getAllData();

        // THEN
        expect(result).toEqual([
            {
                name: 'Root',
                description: 'Root Node',
                parent: '',
                children: [],
            },
        ]);
    });
});
