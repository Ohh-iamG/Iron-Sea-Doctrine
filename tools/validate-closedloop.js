const fs = require("fs");
const path = require("path");

const operationalPrerequisites = [
    "closed loop",
    "regenerative capacity",
    "nutrient stream",
    "category 1 systemic failure",
    "drift guard",
    "rhythm engine",
    "return metrics"
  ];

const specDir = "./docs";
let complianceErrors = 0;

if (!fs.existsSync(specDir)) {
    console.error("Critical Specifications Path Unavailable.");
    process.exit(1);
}

const specFiles = fs.readdirSync(specDir).filter(f => f.endsWith(".md"));

specFiles.forEach(file => {
    const content = fs.readFileSync(path.join(specDir, file), "utf8").toLowerCase();

                    operationalPrerequisites.forEach(term => {
                          if (!content.includes(term)) {
                                  console.error(`[MALFORMED SPECIFICATION] Token missing: '${term}' in specification file /docs/${file}`);
                                  complianceErrors++;
                          }
                    });
});

if (complianceErrors > 0) {
    console.error(`\n[VALIDATION FAILED] ${complianceErrors} core closed-loop architectural requirements missing.`);
    process.exit(1);
}

console.log("[SPECIFICATION VALID] All critical technical primitives conform to closed-loop mandates.");
process.exit(0);
