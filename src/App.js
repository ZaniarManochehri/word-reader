import React, { useState } from 'react';
import mammoth from 'mammoth/mammoth.browser';
import './App.css';

function App() {
  const [wordContent, setWordContent] = useState('');

  // فرض کنید این تابع زمانی فراخوانی می‌شود که کاربر یک فایل ورد آپلود می‌کند
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    var path = (window.URL || window.webkitURL).createObjectURL(file);
    console.log('Uploaded file:', file, path);

    // استفاده از Mammoth برای اکسترکت کردن محتوای فایل ورد
    mammoth.extractRawText({ arrayBuffer: file })
      .then(result => {
        console.log('Extracted text:', result.value);
        setWordContent(result.value); // ذخیره محتوای فایل ورد در استیت
      })
      .catch(error => {
        console.error('Error extracting text from Word file:', error);
      });
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <div>
        <h2>محتوای فایل ورد</h2>
        <pre>{wordContent}</pre>
      </div>
    </div>
  );
}

export default App;
