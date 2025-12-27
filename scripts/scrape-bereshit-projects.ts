/**
 * Scraper for bereshitgroup.co.il projects
 * Run with: pnpm scrape
 */

import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Types
type ProjectCategory = 'פינוי בינוי' | 'הריסה ובנייה (38/2)' | 'חיזוק ותוספת (38/1)' | 'אחר';
type ProjectStatus = 'בבדיקה' | 'בתכנון' | 'בביצוע' | 'הושלם' | 'לא ידוע';

interface Project {
  id: string;
  slug: string;
  name: string;
  city: string | null;
  address: string | null;
  category: ProjectCategory;
  status: ProjectStatus;
  apartments_before: number | null;
  apartments_after: number | null;
  short_description: string | null;
  raw_details_text: string | null;
  images: string[];
  external_link: string;
}

const BASE_URL = 'https://bereshitgroup.co.il';
const OUTPUT_PATH = path.join(__dirname, '..', 'src', 'data', 'projects.json');

// Whitelist of projects to include (only these will be shown)
const ALLOWED_PROJECTS = [
  'הרצל מוהליבר',          // מתחם הרצל מוהליבר | ראשון לציון
  'הרצל 102',              // מתחם הרצל 102 | ראשון לציון
  'שיפר 13',               // שיפר 13 | פתח תקווה
  'קצנלסון 1-3-5',         // קצנלסון 1-3-5 | נתניה
  'השקמה 40',              // השקמה 40 | בת ים
  'וינגייט 6-8',           // וינגייט 6-8 | פתח תקווה
  'מיכאל לוין 2-4-6',      // מיכאל לוין 2-4-6 | ראשון לציון
  'פרופסור שור 22-30',     // מתחם פרופסור שור 22-30 | פתח תקווה
  'פרץ נפתלי 17-25',       // מתחם פרץ נפתלי 17-25 | פתח תקווה
];

function isAllowedProject(name: string): boolean {
  const normalizedName = name.toLowerCase();
  return ALLOWED_PROJECTS.some(keyword => 
    normalizedName.includes(keyword.toLowerCase())
  );
}

// Utility functions
function sanitizeUrl(url: string): string | null {
  // Convert http:// to https://
  let sanitized = url.replace(/^http:\/\//i, 'https://');
  
  // Validate it's now https
  if (!sanitized.startsWith('https://')) {
    console.log(`  ⚠ Dropping non-https URL: ${url}`);
    return null;
  }
  
  return sanitized;
}

function slugify(text: string): string {
  return text
    .replace(/[^\u0590-\u05FF\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .toLowerCase();
}

function extractNumber(text: string, patterns: RegExp[]): number | null {
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      const numStr = match[1].replace(/,/g, '');
      const num = parseInt(numStr, 10);
      if (!isNaN(num)) return num;
    }
  }
  return null;
}

function extractApartmentsBefore(text: string): number | null {
  const patterns = [
    /(\d[\d,]*)\s*יחידות?\s*דיור\s*קיימות/,
    /(\d[\d,]*)\s*יח"ד\s*קיימות/,
    /(\d[\d,]*)\s*דירות?\s*קיימות/,
    /קיימות\s*(\d[\d,]*)\s*יחידות/,
    /(\d[\d,]*)\s*יחידות?\s*קיימות/,
  ];
  return extractNumber(text, patterns);
}

function extractApartmentsAfter(text: string): number | null {
  const patterns = [
    /(\d[\d,]*)\s*יחידות?\s*דיור\s*חדשות/,
    /(\d[\d,]*)\s*יח"ד\s*חדשות/,
    /(\d[\d,]*)\s*דירות?\s*חדשות/,
    /יבנו\s*(\d[\d,]*)\s*יחידות/,
    /(\d[\d,]*)\s*יחידות?\s*דיור\s*מתוכננות/,
    /סה"כ\s*(\d[\d,]*)\s*יחידות/,
  ];
  return extractNumber(text, patterns);
}

function extractCity(title: string): string | null {
  // Extract city from title format "מתחם XXX | עיר"
  const pipeMatch = title.match(/\|\s*(.+)$/);
  if (pipeMatch) {
    return pipeMatch[1].trim();
  }
  
  // Common Israeli cities
  const cities = [
    'תל אביב', 'ירושלים', 'חיפה', 'באר שבע', 'ראשון לציון', 'פתח תקווה',
    'אשדוד', 'נתניה', 'בני ברק', 'חולון', 'רמת גן', 'אשקלון', 'רחובות',
    'בת ים', 'הרצליה', 'כפר סבא', 'רעננה', 'הוד השרון', 'גבעתיים',
    'קריית אונו', 'קריית גת', 'נס ציונה', 'לוד', 'רמלה', 'מודיעין',
    'יבנה', 'נהריה', 'עכו', 'כרמיאל', 'טבריה', 'אילת', 'דימונה',
    'ערד', 'צפת', 'עפולה', 'נצרת', 'מגדל העמק', 'יהוד', 'גבעת שמואל',
    'אור יהודה', 'קריית אתא', 'נשר', 'טירת כרמל', 'רמת השרון',
    'גני תקווה', 'קריית שמונה', 'גדרה', 'קדימה', 'בית שמש',
  ];

  for (const city of cities) {
    if (title.includes(city)) {
      return city;
    }
  }
  return null;
}

function inferCategory(_breadcrumb: string, text: string): ProjectCategory {
  const fullText = text.toLowerCase();
  
  if (fullText.includes('פינוי בינוי') || fullText.includes('פינוי-בינוי')) {
    return 'פינוי בינוי';
  }
  if (fullText.includes('38/2') || fullText.includes('הריסה ובנייה')) {
    return 'הריסה ובנייה (38/2)';
  }
  if (fullText.includes('38/1') || fullText.includes('חיזוק ותוספת') || fullText.includes('תמ"א 38')) {
    return 'חיזוק ותוספת (38/1)';
  }
  return 'פינוי בינוי'; // Default for bereshit group
}

function extractShortDescription(text: string): string | null {
  if (!text) return null;
  // Take first 2 sentences or up to 200 chars
  const sentences = text.split(/[.!?]/).filter(s => s.trim().length > 10);
  if (sentences.length === 0) return null;
  const desc = sentences.slice(0, 2).join('. ').trim();
  return desc.length > 200 ? desc.substring(0, 197) + '...' : desc + '.';
}

async function fetchWithRetry(url: string, retries = 2): Promise<string | null> {
  for (let i = 0; i <= retries; i++) {
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return await response.text();
    } catch (error) {
      console.log(`  Attempt ${i + 1} failed for ${url}: ${error}`);
      if (i < retries) {
        await new Promise(r => setTimeout(r, 1000 * (i + 1)));
      }
    }
  }
  return null;
}

async function getProjectLinksFromArchive(): Promise<{ name: string; link: string }[]> {
  const archiveUrl = `${BASE_URL}/פרוייקטים/`;
  console.log('Fetching projects archive page...');
  const html = await fetchWithRetry(archiveUrl);
  if (!html) {
    console.log('Failed to fetch projects archive');
    return [];
  }

  const $ = cheerio.load(html);
  const projects: { name: string; link: string }[] = [];

  // Find project headings with links - format: "מתחם XXX | עיר" or "שם | עיר"
  $('h3 a, h4 a, h2 a').each((_, el) => {
    const name = $(el).text().trim();
    const href = $(el).attr('href');
    
    // Check if it looks like a project name (contains "|" separator)
    if (href && name && name.includes('|') && href.includes('פרוייקטים')) {
      if (!projects.some(p => p.link === href)) {
        projects.push({ name, link: href });
      }
    }
  });

  // Also check for article links with project-like names
  $('article a').each((_, el) => {
    const href = $(el).attr('href');
    const text = $(el).text().trim();
    
    if (href && href.includes('פרוייקטים') && text.includes('|') && text.length > 5) {
      if (!projects.some(p => p.link === href)) {
        projects.push({ name: text, link: href });
      }
    }
  });

  console.log(`Found ${projects.length} projects on archive page`);
  return projects;
}

async function scrapeProject(projectInfo: { name: string; link: string }, index: number): Promise<Project | null> {
  console.log(`[${index + 1}] Scraping: ${projectInfo.name}`);
  
  const html = await fetchWithRetry(projectInfo.link);
  if (!html) {
    console.log(`  Failed to fetch project page`);
    return null;
  }

  const $ = cheerio.load(html);

  // Extract title (use provided name or page title)
  const pageTitle = $('h1').first().text().trim() || 
                    $('title').text().split('|')[0].trim() ||
                    projectInfo.name;
  
  const title = projectInfo.name || pageTitle;

  // Extract breadcrumb for category
  const breadcrumb = $('.breadcrumb, .yoast-breadcrumb, nav[aria-label="Breadcrumb"]').text();

  // Extract project details text
  let detailsText = '';
  
  // Try various selectors for project details
  const detailsSelectors = [
    '.project-details',
    '.project-content',
    '.project-description',
    '.elementor-widget-text-editor',
    'article .content',
    'article p',
    'main p',
  ];

  for (const selector of detailsSelectors) {
    $(selector).each((_, el) => {
      detailsText += ' ' + $(el).text().trim();
    });
  }

  // Clean up details text
  detailsText = detailsText
    .replace(/\s+/g, ' ')
    .replace(/\n+/g, ' ')
    .trim();

  // Extract images from gallery
  const images: string[] = [];
  const seenImages = new Set<string>();
  
  $('img').each((_, el) => {
    const src = $(el).attr('src') || $(el).attr('data-src');
    if (src && !seenImages.has(src) && 
        !src.includes('logo') && 
        !src.includes('icon') &&
        !src.includes('placeholder') &&
        !src.includes('data:image') &&
        (src.includes('.jpg') || src.includes('.jpeg') || src.includes('.png') || src.includes('.webp'))) {
      seenImages.add(src);
      // Make URL absolute if needed
      const fullUrl = src.startsWith('http') ? src : `${BASE_URL}${src.startsWith('/') ? '' : '/'}${src}`;
      // Sanitize URL (convert http to https, drop invalid)
      const sanitized = sanitizeUrl(fullUrl);
      if (sanitized) {
        images.push(sanitized);
      }
    }
  });

  // Parse data
  const city = extractCity(title);
  const category = inferCategory(breadcrumb, detailsText);
  const apartmentsBefore = extractApartmentsBefore(detailsText);
  const apartmentsAfter = extractApartmentsAfter(detailsText);
  const shortDescription = extractShortDescription(detailsText);

  // Generate unique ID and slug
  const id = `proj-${index + 1}`;
  const slug = slugify(title) || `project-${index + 1}`;

  // Extract address from title
  const address = title.replace(/\s*\|.*$/, '').trim();

  const project: Project = {
    id,
    slug,
    name: title,
    city,
    address,
    category,
    status: 'בבדיקה',
    apartments_before: apartmentsBefore,
    apartments_after: apartmentsAfter,
    short_description: shortDescription,
    raw_details_text: detailsText.substring(0, 2000) || null,
    images: images.slice(0, 10),
    external_link: sanitizeUrl(projectInfo.link) || projectInfo.link,
  };

  console.log(`  ✓ ${title} (${city || 'unknown city'})`);
  return project;
}

// Sample data based on allowed projects
function getSampleProjects(): Project[] {
  const sampleData = [
    { name: "מתחם הרצל מוהליבר | ראשון לציון", city: "ראשון לציון" },
    { name: "מתחם הרצל 102 | ראשון לציון", city: "ראשון לציון" },
    { name: "שיפר 13 | פתח תקווה", city: "פתח תקווה" },
    { name: "קצנלסון 1-3-5 | נתניה", city: "נתניה" },
    { name: "השקמה 40 | בת ים", city: "בת ים" },
    { name: "וינגייט 6-8 | פתח תקווה", city: "פתח תקווה" },
    { name: "מיכאל לוין 2-4-6 | ראשון לציון", city: "ראשון לציון" },
    { name: "מתחם פרופסור שור 22-30 | פתח תקווה", city: "פתח תקווה" },
    { name: "מתחם פרץ נפתלי 17-25 | פתח תקווה", city: "פתח תקווה" },
  ];

  return sampleData.map((item, index) => ({
    id: `proj-${index + 1}`,
    slug: slugify(item.name) || `project-${index + 1}`,
    name: item.name,
    city: item.city,
    address: item.name.replace(/\s*\|.*$/, '').trim(),
    category: 'פינוי בינוי' as ProjectCategory,
    status: 'בבדיקה' as ProjectStatus,
    apartments_before: null,
    apartments_after: null,
    short_description: `פרויקט פינוי בינוי ב${item.city}.`,
    raw_details_text: null,
    images: [],
    external_link: BASE_URL,
  }));
}

async function main() {
  console.log('='.repeat(60));
  console.log('Bereshit Group Projects Scraper');
  console.log('='.repeat(60));
  console.log();

  try {
    const allProjectInfos = await getProjectLinksFromArchive();
    
    // Filter to only allowed projects
    const projectInfos = allProjectInfos.filter(p => isAllowedProject(p.name));
    console.log(`Filtered to ${projectInfos.length} allowed projects (from ${allProjectInfos.length} total)`);
    
    if (projectInfos.length === 0) {
      console.log('No matching project links found. Using sample data...');
      const sampleProjects = getSampleProjects();
      fs.writeFileSync(OUTPUT_PATH, JSON.stringify(sampleProjects, null, 2), 'utf-8');
      console.log(`Wrote ${sampleProjects.length} sample projects to ${OUTPUT_PATH}`);
      return;
    }

    const projects: Project[] = [];
    let failed = 0;

    for (let i = 0; i < projectInfos.length; i++) {
      const project = await scrapeProject(projectInfos[i], i);
      if (project) {
        projects.push(project);
      } else {
        failed++;
      }
      // Small delay between requests
      await new Promise(r => setTimeout(r, 500));
    }

    // If we got no projects, use sample data
    if (projects.length === 0) {
      console.log('Scraping failed for all projects. Using sample data...');
      const sampleProjects = getSampleProjects();
      fs.writeFileSync(OUTPUT_PATH, JSON.stringify(sampleProjects, null, 2), 'utf-8');
      console.log(`Wrote ${sampleProjects.length} sample projects to ${OUTPUT_PATH}`);
      return;
    }

    // Sort by name
    projects.sort((a, b) => a.name.localeCompare(b.name, 'he'));

    // Add manual fallback project at the end (not on Bereshit website)
    const manualProject: Project = {
      id: 'proj-manual-1',
      slug: 'הרצל-סוקולוב-ראשון-לציון',
      name: 'הרצל סוקולוב | ראשון לציון',
      city: 'ראשון לציון',
      address: 'הרצל סוקולוב',
      category: 'פינוי בינוי',
      status: 'בבדיקה',
      apartments_before: null,
      apartments_after: null,
      short_description: 'פרויקט פינוי בינוי בראשון לציון.',
      raw_details_text: null,
      images: [],
      external_link: '',
    };
    projects.push(manualProject);
    console.log('  + Added manual project: הרצל סוקולוב | ראשון לציון');

    // Write output
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(projects, null, 2), 'utf-8');

    console.log();
    console.log('='.repeat(60));
    console.log('Summary:');
    console.log(`  Total links found: ${projectInfos.length}`);
    console.log(`  Successfully scraped: ${projects.length}`);
    console.log(`  Failed: ${failed}`);
    console.log(`  Output: ${OUTPUT_PATH}`);
    console.log('='.repeat(60));
  } catch (error) {
    console.error('Fatal error:', error);
    console.log('Using sample data as fallback...');
    const sampleProjects = getSampleProjects();
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(sampleProjects, null, 2), 'utf-8');
    console.log(`Wrote ${sampleProjects.length} sample projects to ${OUTPUT_PATH}`);
  }
}

main();
