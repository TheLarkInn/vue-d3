<template>
  <div id="ColorBarGraph">
    <svg :height="height" :width="width">
        <arc :transform="`translate(${height/2}, ${width/2})`"
          v-for="(arc, index) in pie" :key="index"
          v-bind="arcProps"
          :startAngle="arc.startAngle"
          :endAngle="arc.endAngle"
          :padAngle="arc.padAngle"
          :fill="colors[index]"
          :label="arc['data'][labelAccessor]"
          :arc-index="index"
        >
        </arc>
    </svg>
  </div>
</template>

<script>
import pie from "d3-shape/src/pie";
import Arc from "@/components/Arc";
import GraphMixin from "@/mixins/graph";
import ArcMixin from "@/mixins/arc";

export default {
  name: "arcs-graph",
  mixins: [GraphMixin, ArcMixin],
  props: {
    colors: {
      type: Array
    },
    valueAccessor: {
      type: String,
      default: "value"
    },
    labelAccessor: {
      type: String,
      default: "label"
    }
  },
  components: {
    Arc
  },
  computed: {
    normalizedDomain() {
      const {domain, valueAccessor, labelAccessor} = this;

      if (typeof domain[0] !== "object") {
        return domain.map((datum, index) => {
          const datumObject = {};
          datumObject[valueAccessor] = datum;
          datumObject[labelAccessor] = datum;
          return datumObject;
        });
      }
      debugger;
      return domain;
    },
    pie() {
      const {valueAccessor, labelAccessor, normalizedDomain, padAngle} = this;

      return pie()
        .sort(null)
        .padAngle(padAngle)
        .value((d, i) => d[valueAccessor])(normalizedDomain);
    }
  }
}
</script>

<style>
#ColorBarGraph {
  background: whitesmoke;
}

rect.bar {
  fill: black;
}
</style>
