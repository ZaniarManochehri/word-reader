import React, { useRef, useState } from 'react';
import mammoth from 'mammoth/mammoth.browser';
import html2pdf from 'html2pdf.js';

import styles from './Home.module.scss'

const Home = ({ params }) => {
    const inputRef = useRef(null)
    const { color, textAlign, paddingTop, paddingRight, paddingBottom, paddingLeft, quality, scale } = params
    const [wordContent, setWordContent] = useState('');

    const handleConvertToPDF = () => {
        const element = document.getElementById('content');
        const opt = {
            margin: 0.5,
            filename: 'myfile.pdf',
            image: { type: 'jpeg', quality: +quality },
            html2canvas: { scale },
            jsPDF: {
                compress: true,
                unit: 'in',
                format: 'a4',
                orientation: 'portrait',
            },
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
            <div className={styles.fileSelectorContainer} onClick={() => inputRef.current.click()}>
                <span className={styles.desc}>فایل خود با پسوند .docx را وارد کنید</span>
                <input type="file" onChange={handleFileUpload} accept='.docx' ref={inputRef} hidden />
                <i class="fa-duotone fa-cloud-arrow-up" style={{ fontSize: 32 }}></i>
            </div>
            {wordContent && (<div className={styles.wordTextContainer}>
                <div className={styles.titleContainer}>
                    <button onClick={handleConvertToPDF}>تبدیل به pdf</button>
                    <span className={styles.titleText}>محتوای فایل ورد</span>
                </div>
                <div id="content" style={{
                    whiteSpace: 'pre-wrap',
                    color, paddingLeft: +paddingLeft, paddingRight: +paddingRight, paddingBottom: +paddingBottom, paddingTop: +paddingTop, textAlign
                }}>{wordContent}</div>
            </div>)}
        </div>
    );
}

export default Home