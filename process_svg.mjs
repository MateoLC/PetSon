import fs from 'fs';

const svg = fs.readFileSync('logoPetson.svg', 'utf8');

let groupIndex = 1;
// We'll replace <g> that are inside <g> <g>... Wait, the structure is:
/*
  <g>
    <g>
      <g> ... </g>
      <g> ... </g>
    </g>
    <g>
      ...
    </g>
*/

// Using a simple regex to replace the specific <g> tags we found
let modified = svg.replace(/<g>\s*<g>\s*(<path[^]+?)<\/g>\s*<g>\s*(<path[^]+?)<\/g>\s*<\/g>\s*<g>\s*(<path[^]+?)<g>\s*(<path[^]+?)<\/g>\s*<g>\s*(<path[^]+?)<\/g>\s*<\/g>/g, (match) => {
    // This regex is probably too fragile.
    return match;
});
// Let's just do it with jsdom or cheerio
