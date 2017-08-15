<template>
  <div>
    <arcs-graph :height="400" :width="400"
      :outer-radius="150" :inner-radius="80"
      :pad-angle=".3" :pad-radius="10"
      :domain="webpackModules"
      :colors="['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']"
      value-accessor="size" label-accessor="size"
    ></arcs-graph>
    <time-line-graph :height="400" :width="400"
      :domain="timelineData"
    >
    </time-line-graph>
  </div>
</template>

<script>
import data from "@/assets/stats.json";

// const ArcsGraph = () => import("@/components/ArcsGraph");
import ArcsGraph from "@/components/ArcsGraph";
import TimeLineGraph from "@/components/TimeLineGraph";

export default {
  data() {
    return {
      webpackModules: data,
      timelineData: [
        {date: new Date(2007, 3, 24), value: 93.24},
        {date: new Date(2007, 3, 25), value: 95.35},
        {date: new Date(2007, 3, 26), value: 98.84},
        {date: new Date(2007, 3, 28), value: 99.92},
        {date: new Date(2007, 3, 30), value: 99.80},
        {date: new Date(2007, 4,  1), value: 99.47}
      ]
    };
  },
  components: {
    TimeLineGraph,
    ArcsGraph
  },
  computed: {
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
    background: blue; /* nuxt (vue) logo color */
    width: 400px;
    height: 400px;
  }
</style>
