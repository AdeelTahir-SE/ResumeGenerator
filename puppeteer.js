import puppeteer from "puppeteer";
export  async function webPagetopdf(url,outputfilepath){
 // Launch a headless browser
 const browser = await puppeteer.launch();
  
 // Open a new page
 const page = await browser.newPage();

 // Navigate to the specified URL
 await page.goto(url, { waitUntil: 'networkidle0' });


{ await page.pdf({
   path: outputfilepath, // Path to save the PDF
   format: 'Letter', // Page format (A4, Letter, etc.)
   printBackground: true, // Include background graphics in the PDF
   landscape:false
 });}
 

 // Close the browser
 await browser.close();
}

export  async function webPagetojpeg(url,outputfilepath){
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle0' });
  await page.screenshot({path: outputfilepath,fullPage:true});
  await browser.close();
}

