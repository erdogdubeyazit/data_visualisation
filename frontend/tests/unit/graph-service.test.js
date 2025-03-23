import axios from 'axios';
import graphService from '@/services/graph-service';

jest.mock('axios');

describe('GraphService - getAllNodes Tests', () => {
  it('should fetch and parse data correctly', async () => {
    // GIVEN
    const mockData = { data: [{ id: 1, name: 'Root' }] };
    axios.get.mockResolvedValueOnce({ data: { data: mockData.data } });

    // WHEN
    const result = await graphService.getAllNodes();

    //THEN
    expect(result).toEqual(mockData.data[0]); 
    expect(axios.get).toHaveBeenCalledWith('/nodes');
  });

  it('should throw an error for invalid data format', async () => {
    // GIVEN
    const mockData = { data: 'Invalid data format' };
    axios.get.mockResolvedValueOnce({ data: { data: mockData.data } });

    // THEN
    await expect(graphService.getAllNodes()).rejects.toThrow(
      "Invalid data format. Expected an array."
    );
  });

  it('should throw an error if there are multiple roots', async () => {
    // GIVEN
    const mockData = { data: [{ id: 1, name: 'Root' }, { id: 2, name: 'Another Root' }] };
    axios.get.mockResolvedValueOnce({ data: { data: mockData.data } });

    // THEN
    await expect(graphService.getAllNodes()).rejects.toThrow(
      "There can not be multiple roots in a tree."
    );
  });

  it('should handle axios errors correctly', async () => {
    // GIVEN
    const mockError = { message: 'Network Error' };
    axios.get.mockRejectedValueOnce(mockError);

    // THEN
    await expect(graphService.getAllNodes()).rejects.toBeDefined(); 
  });
});
