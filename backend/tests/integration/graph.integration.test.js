const request = require("supertest");
const {app} = require('../../app');
const neo4jDriver = require("../../common/neo4j");

jest.mock("../../common/neo4j");

let server;

beforeAll((done) => {
    server = app.listen(0, () => {
        done();
    });
});

afterAll(async () => {
    await server.close();
    await neo4jDriver.close();
});

describe("Graph API Integration Tests", () => {
    let sessionMock;

    beforeEach(() => {
        sessionMock = {
            run: jest.fn(),
            close: jest.fn(),
        };
        neo4jDriver.session.mockReturnValue(sessionMock);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("should parse serve data correctly", async () => {
        // GIVEN
        sessionMock.run.mockResolvedValue({
            records: [
                {
                    get: (key) =>
                        key === "n"
                            ? {properties: {name: "A", description: "Root Node"}}
                            : [
                                {properties: {name: "B", description: "Child Node B"}},
                                {properties: {name: "C", description: "Child Node C"}},
                            ],
                },
            ],
        });

        // WHEN
        const response = await request(app).get("/api/v1/nodes");

        // THEN
        expect(response.status).toBe(200);
        expect(response.body.data).toEqual([
            {
                name: "A",
                description: "Root Node",
                children: [
                    {name: "B", description: "Child Node B", children: []},
                    {name: "C", description: "Child Node C", children: []},
                ],
            },
        ]);
    });

    test("empty data set reults in HTTP 404", async () => {
        // GIVEN
        sessionMock.run.mockResolvedValue({records: []});

        // WHEN
        const response = await request(app).get("/api/v1/nodes");

        // THEN
        expect(response.status).toBe(404);
        expect(response.body.error).toBe("No data found");
    });

    test("multiple roots results in 409", async () => {
        // GIVEN
        sessionMock.run.mockResolvedValue({
            records: [
                {
                    get: (key) =>
                        key === "n"
                            ? {properties: {name: "A", description: "Root Node A"}}
                            : [],
                },
                {
                    get: (key) =>
                        key === "n"
                            ? {properties: {name: "B", description: "Root Node B"}}
                            : [],
                },
            ],
        });

        // WHEN
        const response = await request(app).get("/api/v1/nodes");

        // THEN
        expect(response.status).toBe(409);
        expect(response.body.error).toBe("Multiple root nodes exist int the three");
    });
});
