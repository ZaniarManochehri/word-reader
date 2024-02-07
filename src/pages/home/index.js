import React, { useState } from 'react';
import mammoth from 'mammoth/mammoth.browser';
import html2pdf from 'html2pdf.js';
import styles from './Home.module.scss'

const Home = () => {
    const [wordContent, setWordContent] = useState('');

    const handleConvertToPDF = () => {
        const element = document.getElementById('content');
        const opt = {
            margin: 0.5,
            filename: 'myfile.pdf',
            image: { type: 'jpeg', quality: 0.7 },
            html2canvas: { scale: 2 },
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
        <div className={styles.container}>
            <div className={styles.fileSelectorContainer}>
                <span className={styles.desc}>فایل خود با پسوند .docx را وارد کنید</span>
                <input type="file" onChange={handleFileUpload} accept='.docx' />
            </div>
            {wordContent && (<div className={styles.wordTextContainer}>
                <div className={styles.titleContainer}>
                    <button onClick={handleConvertToPDF}>تبدیل به pdf</button>
                    <span className={styles.titleText}>محتوای فایل ورد</span>
                </div>
                <pre id="content" style={{ whiteSpace: 'pre-wrap', color: 'red', fontSize: 14, padding: 16 }}>{wordContent}</pre>
            </div>)}
        </div>
    );
}

export default Home