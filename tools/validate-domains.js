const fs = require("fs");
const path = require("path");

const alignmentMatrix = {
  frameworks: ["BIOPHYSICAL OS", "LIFE OS", "INDUSTRIAL OS", "ATMOSPHERIC OS", "CONSTELLATION OS", "CORE OS"],
const alignmentMatrix = {
  frameworks : [ "BIOPHYSICAL OS" , "LIFE OS" , "INDUSTRIAL OS" , "ATMOSPHERIC OS" , "CONSTELLATION OS" , "CORE OS" ],
  trademarks : [ "Drift Guard" , "Rhythm Engine" , "Return Metrics" , "Ethics Gate" , "Regeneration OS" , "EARTH-I" ]
};

const docsDir = "./docs";

if (!fs.existsSync(docsDir)) {
  console.error("CRITICAL ERROR: Documentation layout directory missing.");
  process.exit(1);
}

const files = fs.readdirSync(docsDir).filter(f => f.endsWith(".md"));
let completeFailureCount = 0;

console.log("=== Initiating Ethics Gate / 100-Domain Alignment Matrix Audit ===");

files.forEach(file => {
  const fileContent = fs.readFileSync(path.join(docsDir, file), "utf8");
  const lowerContent = fileContent.toLowerCase();

  const hasLevel2 = lowerContent.includes("biophysical os") || lowerContent.includes("life os");
  if (!hasLevel2) {
    console.warn(`[METRIC ADVISORY] Document '${file}' lacks explicit reference to Level 2 Custodianship (BIOPHYSICAL/LIFE OS)`);
  }

  alignmentMatrix.frameworks.forEach(os => {
    if (!lowerContent.includes(os.toLowerCase())) {
      console.warn(`[METRIC ADVISORY] Document '${file}' lacks explicit reference to integration layer: ${os}`);
    }
  });

  let hasEarthIToken = lowerContent.includes("earth-i") || lowerContent.includes("earth—i");
  
  alignmentMatrix.trademarks.forEach(tm => {
    if (tm === "earth-i" || tm === "earth—i") {
      if (!hasEarthIToken) {
        console.error(`[COMPLIANCE BREACH] Document '${file}' fails trademark validation for token: EARTH-I`);
        completeFailureCount++;
      }
    } else if (!lowerContent.includes(tm)) {
      console.error(`[COMPLIANCE BREACH] Document '${file}' fails trademark validation for token: ${tm}`);
      completeFailureCount++;
    }
  });
});

if (completeFailureCount > 0) {
  console.error(`\n[GATE DECLINED] Framework alignment audit failed with ${completeFailureCount} structural errors.`);
  process.exit(1);
}

console.log("[GATE PASSED] All core trademarks and structural operating system layers verified.");
process.exit(0);