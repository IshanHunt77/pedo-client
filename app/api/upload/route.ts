import { NextRequest, NextResponse } from 'next/server'; // To handle the request and response
import { promises as fs } from 'fs'; // To save the file temporarily
import { v4 as uuidv4 } from 'uuid'; // To generate a unique filename
import PDFParser from 'pdf2json'; // To parse the pdf
import path from 'path';
import axios from 'axios';




export async function POST(req: NextRequest) {
  const formData: FormData = await req.formData();
  const uploadedFiles = formData.getAll('filepond');
  let fileName = '';
  let parsedText = '';

  if (uploadedFiles && uploadedFiles.length > 0) {
    const uploadedFile = uploadedFiles[1];

    if (uploadedFile instanceof File) {
      fileName = uuidv4();
      const tempDir = path.join(process.cwd(),'public', 'temp');

      try {
        await fs.mkdir(tempDir, { recursive: true });
      } catch (e) {
        console.error('Failed to create temp directory:', e);
      }

      const tempFilePath = path.join(tempDir, `${fileName}.pdf`);
      const fileBuffer = Buffer.from(await uploadedFile.arrayBuffer());
      await fs.writeFile(tempFilePath, new Uint8Array(fileBuffer));

      parsedText = await new Promise<string>((resolve, reject) => {
        const pdfParser = new (PDFParser as any)(null, 1);

        pdfParser.on('pdfParser_dataError', (errData: any) => {
          console.error('PDF parse error:', errData.parserError);
          reject(errData.parserError);
        });

        pdfParser.on('pdfParser_dataReady', () => {
          const text = (pdfParser as any).getRawTextContent();
          resolve(text);
        });

        pdfParser.loadPDF(tempFilePath);
      });
    } else {
      console.log('Uploaded file is not in the expected format.');
    }
  } else {
    console.log('No files found.');
  }

  // ✅ This now runs AFTER parsedText is set
  const chunkSize = 500;
  const contents: string[] = [];

  for (let i = 0; i < parsedText.length; i += chunkSize) {
    const chunk = parsedText.slice(i, i + chunkSize).trim();
    if (chunk.length > 0) contents.push(chunk);
  }

  if (contents.length === 0) {
    console.warn('Parsed contents array is empty.');
  }

  try {
    const url = process.env.PUBLIC_BASE_URL;
     const embedding = await axios.post(`${url}/api/embed`, { contents });
     console.log(embedding.data);
  } catch (e) {
    console.log('Error hitting embed:', e);
  }

  return NextResponse.json({
  fileName,
  fileUrl: `/temp/${fileName}.pdf`,
  text: parsedText,
});

}

