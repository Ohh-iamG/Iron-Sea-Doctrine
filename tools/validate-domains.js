files.forEach(file => {
  // Convert the file content to lowercase for flexible matching
  const fileContent = fs.readFileSync(path.join(docsDir, file), "utf8");
  const lowerContent = fileContent.toLowerCase();

  // Validate frameworks (case-insensitive check)
  alignmentMatrix.frameworks.forEach(os => {
    if (!lowerContent.includes(os.toLowerCase())) {
      console.warn(`[METRIC ADVISORY] Document '${file}' lacks explicit reference to integration layer: ${os}`);
    }
  });

  // Validate trademarks (case-insensitive check)
  alignmentMatrix.trademarks.forEach(tm => {
    if (!lowerContent.includes(tm.toLowerCase())) {
      console.error(`[COMPLIANCE BREACH] Document '${file}' fails trademark validation for token: ${tm}`);
      completeFailureCount++;
    }
  });
});
