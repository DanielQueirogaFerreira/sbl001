const fs = require('fs');
const path = require('path');

const docPath = path.join(__dirname, '..', 'docs', 'database_import_master_01_21.md');
const content = fs.readFileSync(docPath, 'utf8');

// Find JSON section
const startMarker = '## 3. Formato JSON Master Unificado para Ingestão (Seed Data / API Payload)';
const startIndex = content.indexOf(startMarker);
if (startIndex === -1) {
  console.error('Marker not found');
  process.exit(1);
}

const jsonSubstring = content.slice(startIndex + startMarker.length);
// Extract from the first [ to the last ]
const firstBracket = jsonSubstring.indexOf('[');
const lastBracket = jsonSubstring.lastIndexOf(']');

if (firstBracket === -1 || lastBracket === -1) {
  console.error('Bracket not found');
  process.exit(1);
}

let rawJson = jsonSubstring.slice(firstBracket, lastBracket + 1);

// Replace non-breaking spaces (\u00a0) and other invisible chars
rawJson = rawJson.replace(/\u00a0/g, ' ').replace(/\r\n/g, '\n');

try {
  const parsed = JSON.parse(rawJson);
  console.log(`Successfully parsed ${parsed.length} form records.`);
  
  // Calculate stats
  let totalResponses = 0;
  const patients = new Set();
  parsed.forEach(item => {
    patients.add(item.patient);
    totalResponses += (item.responses ? item.responses.length : 0);
  });
  console.log(`Patients found: ${Array.from(patients).join(', ')}`);
  console.log(`Total response entries: ${totalResponses}`);

  const outDir = path.join(__dirname, '..', 'src', 'data');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // Save JSON
  fs.writeFileSync(
    path.join(outDir, 'masterDatabase.json'),
    JSON.stringify(parsed, null, 2),
    'utf8'
  );

  // Generate JS module with enriched helpers
  const jsContent = `// Auto-generated master dataset from docs/database_import_master_01_21.md
export const MASTER_FORMS_DATA = ${JSON.stringify(parsed, null, 2)};

export default MASTER_FORMS_DATA;
`;

  fs.writeFileSync(path.join(outDir, 'masterDatabase.js'), jsContent, 'utf8');
  console.log('Successfully saved to src/data/masterDatabase.json and src/data/masterDatabase.js');
} catch (err) {
  console.error('JSON parse error:', err.message);
  process.exit(1);
}
