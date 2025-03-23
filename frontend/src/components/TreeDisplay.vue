<template>
  <div class="tree-container">
    <svg ref="treeChart" :view-box="viewBox"></svg>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "TreeDisplay",
  props: {
    data: {
      type: Object,
      required: true,
    },
    width: {
      type: Number,
      default: 800,
    },
    height: {
      type: Number,
      default: 500,
    },
  },
  created() {
    this.$eventBus.$on('nodeDeselected', node => {
      this.deselectNode(node);
    });
  },
  data() {
    return {
      selectedNode: null
    }
  },
  watch: {
    data: {
      deep: true,
      immediate: true,
      handler(update) {
        if (update) {
          this.renderTree();
        }
      },
    },
  },
  computed: {
    viewBox() {
      return `0 0 ${this.width} ${this.height}`;
    }
  },
  methods: {
    renderTree() {
      const data = this.data;

      const svg = d3
          .select(this.$refs.treeChart)
          .attr("width", this.width)
          .attr("height", this.height);

      svg.selectAll("*").remove();

      const g = svg.append("g").attr("transform", "translate(40, 0)");

      const treeLayout = d3.tree().size([this.height, this.width - 100]);
      const root = d3.hierarchy(data);
      treeLayout(root);

      g.selectAll(".link")
          .data(root.links())
          .enter()
          .append("line")
          .attr("class", "link")
          .attr("x1", (d) => d.source.y)
          .attr("y1", (d) => d.source.x)
          .attr("x2", (d) => d.target.y)
          .attr("y2", (d) => d.target.x);

      const nodes = g
          .selectAll(".node")
          .data(root.descendants())
          .enter()
          .append("g")
          .attr("class", "node")
          .attr("transform", (d) => `translate(${d.y},${d.x})`)
          .on("click", (event, d) => this.selectNode(event, d))
          .on("mouseover", function () {
            d3.select(this).classed("hovered", true);
          })
          .on("mouseout", function () {
            d3.select(this).classed("hovered", false);
          });

      nodes.append("circle").attr("class", "node-circle").attr("r", 20);

      nodes
          .append("text")
          .attr("class", "node-text")
          .attr("dy", "0.35em")
          .attr("text-anchor", "middle")
          .text((d) => d.data.name);
    },

    selectNode(event, node) {
      d3.selectAll(".node-circle").classed("selected", false);
      this.selectedNode = node;
      this.$emit("node-click", node.data);

      d3.select(event.target).classed("selected", true);
    },
    deselectNode(node) {
      if (this.selectedNode && this.selectedNode.data == node) {
        this.selectedNode = null;
        d3.selectAll(".node-circle").classed("selected", false);
      }
    }
  },
};
</script>

<style>
.link {
  stroke: #ccc;
  stroke-width: 2px;
  fill: none;
}

.node-circle {
  fill: #e0f7fa;
  stroke: #007bff;
  stroke-width: 2px;
  cursor: pointer;
}

.node-circle.hovered {
  fill: #b3e5fc;
}

.node-circle.selected {
  fill: #bdbdbd;
}

.node-text {
  font: 12px sans-serif;
  fill: #333;
}
</style>
