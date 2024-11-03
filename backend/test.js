import jsonfile from "jsonfile"
import * as cheerio from 'cheerio';

const $ = await cheerio.fromURL('https://www.ikea.com/us/en/p/balkarp-sleeper-sofa-vissle-gray-50307936/');

//const $height  = $('span.pip-product-dimensions__measurement-name:contains("Height")').text();
const $height  = $('span.pip-product-dimensions__measurement-name:contains("Height")').parent().text();
const $heightVal = $height.slice(0, $height.indexOf('"')+1);
//const $bedWidth = $('span.pip-product-dimensions__measurement-name:contains("Bed width")').text();
const $bedWidthVal = $('span.pip-product-dimensions__measurement-name:contains("Bed width")').parent().text();

//const $bedLength = $('span.pip-product-dimensions__measurement-name:contains("Bed length")').text();
const $bedLengthVal = $('span.pip-product-dimensions__measurement-name:contains("Bed length")').parent().text();

console.log($heightVal)

console.log($bedWidthVal)

console.log($bedLengthVal)