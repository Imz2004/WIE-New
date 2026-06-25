const fs = require('fs');
const path = require('path');

const projectDir = path.join(__dirname, '../Project');
const files = [
  { slug: 'sherlock-3', file: 'SHErlock3.0.html' },
  { slug: 'becoming', file: 'Becoming.html' },
  { slug: 'syncup', file: 'SyncUp.html' },
  { slug: 'shespark', file: 'Shespark.html' },
  { slug: 'wso2-visit', file: 'WS02Visit.html' },
  { slug: 'sherlock-2', file: 'SHErlock2.0.html' },
  { slug: 'elevate-me', file: 'ElevateMe.html' },
  { slug: 'sherlock-1', file: 'SHErlock.html' }
];

const events = [];

function extractMatch(text, regex, defaultValue = '') {
  const match = text.match(regex);
  return match ? match[1].trim() : defaultValue;
}

function extractAllMatches(text, regex) {
  const matches = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    matches.push(match[1].trim());
  }
  return matches;
}

for (const { slug, file } of files) {
  const filePath = path.join(projectDir, file);
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${file}`);
    continue;
  }
  const content = fs.readFileSync(filePath, 'utf8');

  const titleMatch = content.match(/<h1>(.*?)<\/h1>/i);
  const title = titleMatch ? titleMatch[1].trim() : extractMatch(content, /<title>(.*?)<\/title>/i);

  const subtitle = extractMatch(content, /<h2 class="content-title">(.*?)<\/h2>/i);
  
  // Extract paragraphs
  const descMatch = content.match(/<div class="event-description">([\s\S]*?)<\/div>/i);
  const descriptionHtml = descMatch ? descMatch[1] : '';
  const paragraphs = extractAllMatches(descriptionHtml, /<p>([\s\S]*?)<\/p>/gi);

  // Extract details
  const detailsMatch = content.match(/<div class="event-details">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/i) || content.match(/<div class="event-details">([\s\S]*?)<\/div>\s*<\/div>/i);
  const detailsHtml = detailsMatch ? detailsMatch[1] : '';
  const detailSpans = extractAllMatches(detailsHtml, /<span>(.*?)<\/span>/gi);
  
  const date = detailSpans[0] || '';
  const location = detailSpans[1] || '';
  const participants = detailSpans[2] || '';

  // Extract hero image
  const heroMatch = content.match(/<div class="hero-image">[\s\S]*?<img[^>]*?src="\.\.([^"]*)"/i);
  let heroImage = heroMatch ? heroMatch[1] : '';
  // sometimes it's src="/Images..."
  if (!heroImage) {
     const heroMatch2 = content.match(/<div class="hero-image">[\s\S]*?<img[^>]*?src="([^"]*)"/i);
     heroImage = heroMatch2 ? heroMatch2[1] : '';
     if (heroImage.startsWith('..')) heroImage = heroImage.substring(2);
  }

  // Extract gallery images
  const galleryMatch = content.match(/<div class="gallery-container">([\s\S]*?)<\/div>\s*<\/div>\s*<\/section>/i) || content.match(/<div class="gallery-container">([\s\S]*?)<\/section>/i);
  const galleryHtml = galleryMatch ? galleryMatch[1] : '';
  let galleryMatches = extractAllMatches(galleryHtml, /<img[^>]*?src="\.\.([^"]*)"/gi);
  if (galleryMatches.length === 0) {
      const g2 = extractAllMatches(galleryHtml, /<img[^>]*?src="([^"]*)"/gi);
      galleryMatches = g2.map(src => src.startsWith('..') ? src.substring(2) : src);
  }

  events.push({
    slug,
    title,
    subtitle,
    date,
    location,
    participants,
    description: paragraphs,
    image: heroImage,
    gallery: galleryMatches
  });
}

const outPath = path.join(__dirname, 'src/data');
if (!fs.existsSync(outPath)) {
  fs.mkdirSync(outPath, { recursive: true });
}

fs.writeFileSync(path.join(outPath, 'events.ts'), `export const events = ${JSON.stringify(events, null, 2)};\n`);
console.log('Successfully generated src/data/events.ts');
