import express from 'express';
import cors from 'cors';
import jsonfile from 'jsonfile';
import * as cheerio from 'cheerio';
import fetch from 'node-fetch'; 

const app = express();
const PORT =  5000;

app.use(cors());
app.use(express.json());

app.post('/api/search', async (req, res) => {
    const query = req.body.query;
    
    var heightReq;
    if(req.body.height == null || req.body.height == ""){
        heightReq = 9999999;
    }else{
        heightReq = req.body.height;
    }
    var widthReq;
    if(req.body.width == null || req.body.width == ""){
        widthReq = 9999999;
    }else{
        widthReq = req.body.width;
    }
    var lengthReq;
    if(req.body.length == null || req.body.length == ""){
        lengthReq = 9999999;
    }else{
        lengthReq = req.body.length;
    }
    
    


    try {

        const url = await fetch('https://sik.search.blue.cdtapps.com/us/en/search?c=sr&v=20240110', {
            method: "POST",
            body: JSON.stringify({"searchParameters":{"input":query,"type":"QUERY"},"allowAutocorrect":true,"zip":"27514","store":"067","isUserLoggedIn":false,"optimizely":{"sik_null_test_20241030_default":"a"},"components":[{"component":"PRIMARY_AREA","columns":4,"types":{"main":"PRODUCT","breakouts":["PLANNER","CATEGORY","CONTENT","MATTRESS_WARRANTY"]},"filterConfig":{"subcategories-style":"tree-navigation","max-num-filters":4},"window":{"size":24,"offset":0},"forceFilterCalculation":true},{"component":"CONTENT_AREA","types":{"main":"CONTENT","breakouts":[]},"window":{"size":12,"offset":0}},{"component":"RELATED_SEARCHES"},{"component":"QUESTIONS_AND_ANSWERS"},{"component":"STORES"},{"component":"CATEGORIES"},{"component":"SIMILAR_PRODUCTS"},{"component":"SEARCH_SUMMARY"},{"component":"PAGE_MESSAGES"},{"component":"RELATED_CATEGORIES"},{"component":"PRODUCT_GROUP"}]}), 
            });
        
        const jsonResponse = await url.json();
        const queryResponse = jsonResponse.results
            .map(result => result.items)
            .filter(result => result)
            .flatMap(result => result)
            .flatMap(result => result.product)
            .filter(result => result)
        
        const array = await Promise.all(queryResponse.map(async (queryResponse) => {
            const subArr = {
                name: queryResponse.name,
                id: queryResponse.id,
                price: "$" + queryResponse.salesPrice.numeral,
                pipUrl: queryResponse.pipUrl,
                contextualImageUrl: queryResponse.contextualImageUrl,
                ratingValue: queryResponse.ratingValue,
                ratingCount: queryResponse.ratingCount,
                height: "",
                width: "",
                length: "",
            };
        
        
            const $ = await cheerio.fromURL(String(subArr.pipUrl));
            
            const $height  = $('span.pip-product-dimensions__measurement-name:contains("Height")').parent().text();
            const $heightVal = $height.slice(0, $height.indexOf('"')+1);
            subArr.height = $heightVal;
            
            const $width = $('span.pip-product-dimensions__measurement-name:contains("Width")').parent().text();
            const $bedWidthVal = $('span.pip-product-dimensions__measurement-name:contains("Bed width")').parent().text();
            if($width != ""){
                const $widthVal = $width.slice(0, $width.indexOf('"')+1);
                subArr.width = $widthVal;
            }
            if($bedWidthVal != ""){
                subArr.width = $bedWidthVal;
                
            }
            
            const $length = $('span.pip-product-dimensions__measurement-name:contains("ength")').parent().text();
            const $depth = $('span.pip-product-dimensions__measurement-name:contains("epth")').parent().text();
            const $bedLengthVal = $('span.pip-product-dimensions__measurement-name:contains("Bed length")').parent().text();
            if($length != ""){
                const $lengthVal = $length.slice(0, $length.indexOf('"')+1);
                subArr.length = $lengthVal;
            }
            if($depth != ""){
                const $depthVal = $depth.slice(0, $depth.indexOf('"')+1);
                subArr.length = $depthVal;
            }
            if($bedLengthVal != ""){
                subArr.length = $bedLengthVal;
            }
            

            //Don't return things that are too big .match(/(\d+)/)
            // const lenFilter = subArr.length.slice($height.indexOf(':')+2, $height.indexOf(' '));
            
            var lenFilter;
            try{
                lenFilter = subArr.length.match(/(\d+)/).slice(0, $height.indexOf(','));
            }catch{
                lenFilter = 0;
            }

            var widFilter;
            try{
                widFilter = subArr.width.match(/(\d+)/).slice(0, $height.indexOf(',')); 
            }catch{
                widFilter = 0;
            }

            var hiFilter;
            try{
                hiFilter = subArr.height.match(/(\d+)/).slice(0, $height.indexOf(','));
            }catch{
                hiFilter = 0;
            }
            

            const empty = {
                name: "",
                id: "",
                price:"",
                pipUrl: queryResponse.pipUrl,
                contextualImageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png",
                ratingValue: "",
                ratingCount: "",
                height: "",
                width: "",
                length: "",
            };

            if(lenFilter > lengthReq){
                return empty;
            }
            if(widFilter > widthReq){
                return empty;
            }
            if(hiFilter > heightReq){
                return empty;
            }

            return subArr;
        }));

    res.json(Array.isArray(array) ? array : []);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching data" });
    }
});

app.listen(PORT, () => {
    console.log('Server is running');
});
