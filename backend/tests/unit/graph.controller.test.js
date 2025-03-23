const request = require('supertest');
const express = require('express');

const {getAllNodes} = require('../../graph/graph-controller');
const graphService = require('../../graph/graph-service');
const {NoDataFoundError, MultipleRootsInTreeError} = require('../../common/errors');
const {handleError} = require('../../common/error-handler')

jest.mock('../../graph/graph-service');
jest.mock('../../graph/graph-repository');

const app = express();
app.use(express.json());
app.get('/nodes', getAllNodes);
app.use(handleError);

describe('Graph Controller Tests', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should serve tree data coming from service', async () => {
        // GIVEN
        const mockData = [
            {name: 'Root', description: 'Root Node', parent: '', children: []},
        ];
        graphService.getAllData.mockResolvedValue(mockData);

        // WHEN
        const res = await request(app).get('/nodes');

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({data: mockData});
    });

    it('should handle internal server errors', async () => {
        // GIVEN
        const mockError = new Error('Test error');
        mockError.statusCode = 500;
        graphService.getAllData.mockRejectedValue(mockError);

        // WHEN
        const res = await request(app).get('/nodes');

        // THEN
        expect(res.statusCode).toBe(500);
        expect(res.body).toMatchObject({error: 'Test error'});
    });

    it('should handle NoDataFoundError', async () => {
        // GIVEN
        graphService.getAllData.mockRejectedValue(new NoDataFoundError());

        // WHEN
        const res = await request(app).get('/nodes');

        // THEN
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({error: 'No data found'});
    });

    it('should handle MultipleRootsInTreeError', async () => {
        // GIVEN
        graphService.getAllData.mockRejectedValue(new MultipleRootsInTreeError());

        // WHEN
        const res = await request(app).get('/nodes');

        // THEN
        expect(res.statusCode).toBe(409);
        expect(res.body).toEqual({error: 'Multiple root nodes exist int the three'});
    });
});