import chromium from '@sparticuz/chromium'
import puppeteer from 'puppeteer-core'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { APIGatewayEventRequestContext, APIGatewayProxyEvent } from 'aws-lambda'

export const generatePDF = async (event: APIGatewayProxyEvent, context: APIGatewayEventRequestContext) => {

	// config browser
	const browser = await puppeteer.launch({
		args: chromium.args,
		defaultViewport: chromium.defaultViewport,
		executablePath: await chromium.executablePath('/opt/nodejs/chromium'),
		headless: chromium.headless,
	})

	console.log('browser is up')

	// create new page and set content
	const page = await browser.newPage()
	await page.setContent(`
		<div style="color: red">
			Hello world!
		</div> 	
	`)

	// generate pdf Buffer, store the file in S3 for example
	const pdfBuffer: Buffer = await page.pdf({
		format: 'a4',
		margin: {
			top: '0.4in',
			left: '0.4in',
			right: '0.4in',
			bottom: '0.4in',
		}
	})

	// upload file to S3
	const s3 = new S3Client({region: 'us-east-1'})
	await s3.send(new PutObjectCommand({
		Bucket: 'aws-lambda-puppeteer-tutorial',
		Key: 'my-doc.pdf',
		Body: pdfBuffer,
	}))

	// close the browser
	await browser.close()

	console.log('browser is closed!')
	return {
		statusCode: 200,
		body: 'Pdf Generated!',
		headers: {
			'Content-Type': 'application/json'
		}
	}
}
