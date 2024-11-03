import jsonfile from "jsonfile"
import * as cheerio from 'cheerio';

const query = "futon"

const url = await fetch('https://sik.search.blue.cdtapps.com/us/en/search?c=sr&v=20240110', {
    method: "POST",
    body: JSON.stringify({"searchParameters":{"input":query,"type":"QUERY"},"allowAutocorrect":true,"zip":"27514","store":"067","isUserLoggedIn":false,"optimizely":{"sik_null_test_20241030_default":"a"},"components":[{"component":"PRIMARY_AREA","columns":4,"types":{"main":"PRODUCT","breakouts":["PLANNER","CATEGORY","CONTENT","MATTRESS_WARRANTY"]},"filterConfig":{"subcategories-style":"tree-navigation","max-num-filters":4},"window":{"size":24,"offset":0},"forceFilterCalculation":true},{"component":"CONTENT_AREA","types":{"main":"CONTENT","breakouts":[]},"window":{"size":12,"offset":0}},{"component":"RELATED_SEARCHES"},{"component":"QUESTIONS_AND_ANSWERS"},{"component":"STORES"},{"component":"CATEGORIES"},{"component":"SIMILAR_PRODUCTS"},{"component":"SEARCH_SUMMARY"},{"component":"PAGE_MESSAGES"},{"component":"RELATED_CATEGORIES"},{"component":"PRODUCT_GROUP"}]}), 
    });

const queryResponse = (await url.json()).results
    .map(result => result.items)
    .filter(result => result)
    .flatMap(result => result)
    .flatMap(result => result.product)
    .filter(result => result)

const array = queryResponse.map(queryResponse => ({
    name: queryResponse.name,
    id: queryResponse.id,
    pipUrl: queryResponse.pipUrl,
    contextualImageUrl: queryResponse.contextualImageUrl,
    ratingValue: queryResponse.ratingValue,
    ratingCount: queryResponse.ratingCount,
    height: "",
    width: "",
    length: "",

}))

array.forEach(async subArr => {
    const $ = await cheerio.fromURL(String(subArr.pipUrl));

    const $height  = $('span.pip-product-dimensions__measurement-name:contains("Height")').parent().text();
    const $heightVal = $height.slice(0, $height.indexOf('"')+1);
    subArr.height = $heightVal;
    const $bedWidthVal = $('span.pip-product-dimensions__measurement-name:contains("Bed width")').parent().text();
    subArr.width = $bedWidthVal;
    const $bedLengthVal = $('span.pip-product-dimensions__measurement-name:contains("Bed length")').parent().text();
    subArr.length = $bedLengthVal;
  });


setTimeout(() => {
    console.log(array)
}, 10000); 

await jsonfile.writeFile("./result.json", queryResponse)
