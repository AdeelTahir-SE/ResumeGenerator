import puppeteer from "puppeteer";
export default async function webPagetopdf(url,outputfilepath){
 // Launch a headless browser
 const browser = await puppeteer.launch();
  
 // Open a new page
 const page = await browser.newPage();

 // Navigate to the specified URL
 await page.goto(url, { waitUntil: 'networkidle0' });

 // Generate a PDF from the page content
 await page.pdf({
   path: outputfilepath, // Path to save the PDF
   format: 'A4', // Page format (A4, Letter, etc.)
   printBackground: true, // Include background graphics in the PDF
 });

 // Close the browser
 await browser.close();
}
