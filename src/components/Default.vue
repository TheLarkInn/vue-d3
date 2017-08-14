<template>
  <div>
     <!-- <bar-graph :domain="webpackModules"
      :height="200" :width="200"
      :margin="{top: 20, bottom: 20, left: 20, right: 20}">
    </bar-graph> -->
    <!-- <color-bar-graph :domain="webpackModules"
      :height="200" :width="200"
      :margin="{top: 20, bottom: 20, left: 20, right: 20}">
    </color-bar-graph>  -->
    <arcs-graph
      :height="400"
      :width="400"
      :domain="[10, 60, 400, 235, 534, 34]"
      :outer-radius="100"
      :inner-radius="50"
      :pad-angle=".3"
      :pad-radius="10"
      value-accessor="size"
      label-accessor="name"
      :colors="['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']"
    ></arcs-graph>
    <!-- {{chunksWithModules()}} -->
  </div>
</template>

<script>
import data from "@/assets/bundle-stats.json";

const BarGraph = () => import("@/components/BarGraph");
const ColorBarGraph = () => import("@/components/ColorBarGraph");
const ArcsGraph = () => import("@/components/ArcsGraph");

export default {
  data() {
    return {
      height: 400,
      width: 400,
      margin: {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20
      },
      webpackModules: data
    };
  },
  components: {
    BarGraph,
    ColorBarGraph,
    ArcsGraph
  },
  computed: {
    valuesOnly() {
      return this.chunksWithModules().map(c => c.size)
    },
    h() {
      const {margin, height} = this;
      const {top, bottom} = margin;
      return height - top - bottom;
    },
    w() {
      const {margin, width} = this;
      const {left, right} = margin;
      return width - left - right;
    },
    chartAreaStyle() {
      const {h, w} = this;
      return {
        height: h,
        width: w
      }
    },
    marginOffsetObject() {
      const {margin} = this;
      const {left, top} = margin;
      return `translate(${left},${top})`;
    }
  },
  methods: {
    chunksWithModules() {
      const { webpackModules } = this;
      const { modules, chunks } = webpackModules;
      let newChunks = chunks.map(chunk => {
        chunk["modules"] = [];
        return chunk;
      });

      for (const module in modules) {
        const moduleObject = modules[module];

        moduleObject["chunks"].forEach(chunkId => {
          const chunkObject = newChunks[chunkId];
          newChunks[chunkId]["modules"].push(moduleObject)
        });
      }

      newChunks = newChunks.map(chunk => {
        chunk.modules = chunk.modules.sort((a, b) => a.id - b.id);
        return chunk;
      });

      console.log(newChunks[2].modules.map(m => m.id));

      return newChunks;
    }
  }
}
</script>

<style>
  #chart {
    background: #41B883; /* nuxt (vue) logo color */
    width: 400px;
    height: 400px;
  }
</style>
