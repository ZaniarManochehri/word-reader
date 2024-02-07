import React, { useState } from 'react';
import mammoth from 'mammoth/mammoth.browser';
import html2pdf from 'html2pdf.js';
import './App.css';

function App() {
  const [wordContent, setWordContent] = useState('');

  const handleConvertToPDF = () => {
    const element = document.getElementById('content');
    const opt = {
      margin: 0.5,
      filename: 'myfile.pdf',
      image: { type: 'jpeg', quality: 0.70 },
      html2canvas: { scale: 1 },
      jsPDF: { compress: true, unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    mammoth.extractRawText({ arrayBuffer: file })
      .then(result => {
        setWordContent(result.value);
      })
      .catch(error => {
        console.error('Error extracting text from Word file:', error);
      });
  };


  return (
    <div className='container'>
      <div className='content'>
        <button onClick={handleConvertToPDF}>تبدیل به pdf</button>
        <input type="file" onChange={handleFileUpload} />
        <div>
          <h2>محتوای فایل ورد</h2>
          <pre id="content" style={{ color: 'red', fontSize: 14, textAlign: 'center' }}>{wordContent}</pre>
        </div>
      </div>
    </div>
  );
}

export default App;
