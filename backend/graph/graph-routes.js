const express = require('express');
const router = express.Router();
const graphController = require('./graph-controller');
const {collectMetrics} = require('../common/metrics');

/**
 * @swagger
 * /api/v1/nodes:
 *   get:
 *     summary: Get all nodes from database.
 *     description: Fetches all nodes from the database and constructs a hierarchical tree structure.
 *     tags:
 *      - Tree data
 *     responses:
 *       200:
 *         description: Successfully retrieved nodes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GraphNode'
 *       404:
 *         description: No data found in the database.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NoDataFoundError'
 *       409:
 *         description: Multiple root nodes exist in the tree structure.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MultipleRootsInTreeError'
 * components:
 *   schemas:
 *     GraphNode:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the node.
 *         description:
 *           type: string
 *           description: A brief description of the node.
 *         parent:
 *           type: string
 *           nullable: true
 *           description: The parent node's name, null for the root node.
 *         children:
 *           type: array
 *           description: The children nodes of this node.
 *           items:
 *             $ref: '#/components/schemas/GraphNode'
 *     NoDataFoundError:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: No data found
 *           description: Describes the error when no nodes exist in the database.
 *     MultipleRootsInTreeError:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: Multiple root nodes exist in the tree
 *           description: Describes the error when multiple root nodes are found in the tree structure.
 */
router.get('/nodes', collectMetrics(), graphController.getAllNodes);

module.exports = router;