import OpacityProp from "@/utils/opacity";

export default {
  props: {
    stroke: {
      type: String
    },
    strokeWidth: {
      type: Number,
      default: 1
    },
    strokeLinecap: {
      type: String,
      default: "butt",
      validator: (v) => ["butt", "round", "square", "initial"].indexOf(v) > -1
    },
    strokeLinejoin: {
      type: String,
      default: "miter",
      validator: (v) => ["miter", "round", "bevel", "initial"].indexOf(v) > -1
    },
    strokeMiterlimit: {
      type: Number,
      default: 4
    },
    strokeDasharray: {
      type: String
    },
    strokeDashoffset: {
      type: [Number, String],
      default: 0
    },
    strokeOpacity: OpacityProp
  },
  computed: {
    strokeProps() {
      const {stroke, strokeWidth, strokeLinecap, strokeLinejoin, strokeMiterlimit, strokeDasharray, strokeDashoffset, strokeOpacity} = this;

      return {
        stroke,
        strokeWidth,
        strokeLinecap,
        strokeLinejoin,
        strokeMiterlimit,
        strokeDasharray,
        strokeDashoffset,
        strokeOpacity
      }
    }
  }
}
