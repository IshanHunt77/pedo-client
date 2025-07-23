'use client';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function FileUpload() {
  const [pdfUrl, setPdfUrl] = useState('');
  const router = useRouter()

  return (
    <>
    <div style={{
      color:"#6366f1"
    } }>
      <FilePond
      
        server={{
          process: {
            url: '/api/upload',
            method: 'POST',
            onload: (res) => {
              // res is the JSON string returned by your server
              const data = JSON.parse(res);
              return data.fileUrl; // This will become file.serverId
            },
          },
          fetch: null,
          revert: null,
        }}
        onprocessfile={(error, file) => {
          if (error) {
            console.error('Upload failed:', error);
            return;
          }

          // file.serverId will be the fileUrl if returned from onload
          console.log('File URL:', file.serverId);
          setPdfUrl(file.serverId);
          const filename = file.serverId;
          router.push(`/c/pdf?file=${filename}`)
        }}
      />
      </div>
      
    </>
  );
}
