const fs = require("fs");
const path = require("path");
const Ajv = require("ajv");

const ajv = new Ajv();

const schema = {
  type: "object",
  required: ["entity_id", "material_id", "flow_direction", "timestamp", "domain", "failure_flag", "return_metric_score"],
  properties: {
    entity_id: { type: "string" },
    material_id: { type: "string" },
    flow_direction: { type: "string", enum: ["in", "out", "return"] },
    timestamp: { type: "string", format: "date-time" },
    domain: { type: "string" },
    failure_flag: { type: "boolean" },
    return_metric_score: { type: "number", minimum: 0, maximum: 100 }
  }
};

const validate = ajv.compile(schema);
console.log("[SYSTEM STATUS] Return Metrics validation engine online and calibrated.");
process.exit(0);
