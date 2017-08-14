<template>
  <g class="arc-group">
    <path v-bind="bindMixinProps" :d="d()"></path>
    <text class="arc-text" :dy="(endAngle > 90 * Math.PI/180 ? 22 : -11)"
      fill="black"
      stroke="black">
      <textPath
        startOffset="50%"
        :style="{'text-anchor': 'middle'}"
        v-bind:xlink:href="`#donutArc-${arcIndex}`"
      >
      {{label}}
      </textPath>
    </text>
    <path v-bind="bindMixinProps" class="hiddenDonutArcs" :id="`donutArc-${arcIndex}`"
      fill="none"
      stroke="red"
      :d="dLabel"
    ></path>
  </g>
</template>

<script>
import makeArc from "d3-shape/src/arc";

import PaintMixin from "@/mixins/paint";
import ArcMixin from "@/mixins/arc";

export default {
  mixins: [PaintMixin, ArcMixin],
  props: {
    startAngle: {
      type: Number,
      required: true
    },
    endAngle: {
      type: Number,
      required: true
    },
    label: {

    },
    arcIndex: {
      type: Number
    }
  },
  computed: {
    bindMixinProps() {
      const {paintProps, arcProps} = this;
      return {...paintProps, ...arcProps};
    },
    d() {
      const {innerRadius, outerRadius, startAngle, endAngle, cornerRadius, padRadius, padAngle} = this;

      return makeArc()
        .outerRadius(outerRadius)
        .innerRadius(innerRadius)
        .startAngle(startAngle)
        .endAngle(endAngle)
        .cornerRadius(cornerRadius)
        .padRadius(padRadius)
        .padAngle(padAngle);
    },
    dLabel() {
      const {d, endAngle} = this;
      const firstArcRegex = /(^.+?)L/;

      let newArc = firstArcRegex.exec(d())[1].replace(/,/g , " ");

      if (endAngle > 90 * Math.PI/180) {
        const startLocationRegex = /M(.*?)A/;
        const middleLocationRegex = /A(.*?)0 0 1/;
        const endLocationRegex = /0 0 1 (.*?)$/;

        const newStart = endLocationRegex.exec(newArc)[1];
        const newEnd = startLocationRegex.exec(newArc)[1];
        const newMiddle = middleLocationRegex.exec(newArc)[1];

        newArc = `M${newStart}A${newMiddle}0 0 0 ${newEnd}`;
        return newArc;
      }

      return newArc;
    }
  }
}
</script>

<style>

</style>
