<template>
  <div id="app">

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">BEYAZIT</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>

    <div class="container mt-4">
      <div class="row">

        <div class="col-md-3 p-3">
          <div id="nodeDetails" v-if="this.selectedNode" class="alert alert-light alert-dismissible fade show"
               role="alert">
            <h4 class="alert-heading">Details</h4>
            <hr>
            <h1>{{ selectedNode.name }}</h1>
            <p class="mb-0">{{ selectedNode.description }}</p>
            <button type="button" class="btn-close" aria-label="Close" @click="this.deselectNode"></button>
          </div>
        </div>

        <div class="col-md-9">
          <TreeDisplay :data="treeData" :width="600" :height="500" @node-click="handleNodeClick"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'bootstrap/dist/js/bootstrap.min'

import graphService from './services/graph-service';

import TreeDisplay from './components/TreeDisplay.vue';


export default {
  name: 'App',
  components: {
    TreeDisplay,
  },
  created() {
    graphService.getAllNodes().then((data) => {
      this.treeData = data
    }).catch((error) => {
      console.error(`Failed to load tree data. Details: ${error}`)
    })
  },
  data() {
    return {
      treeData: {},
      selectedNode: null,
    }
  },
  methods: {
    handleNodeClick(node) {
      this.selectedNode = node;
    },
    deselectNode() {
      if (this.selectedNode) {
        this.$eventBus.$emit('nodeDeselected', this.selectedNode);
        this.selectedNode = null;
      }
    }
  }
}
</script>

<style></style>
