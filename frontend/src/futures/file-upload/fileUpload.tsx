import { ChangeEvent, useState } from 'react';

import './styles.scss'
import { BaseModal, Complete, FormInput, FormSubmit } from '../../shared/index';
import { AnimatePresence } from 'framer-motion';

interface FileUploadProps {
    lectureId: number;
}

export const FileUpload = (props: FileUploadProps) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isCompleteModal, setIsCompleteModal] = useState<boolean>(false)

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            console.error('No file selected');
            return;
        }
        try {
            const formData = new FormData();
            formData.append('file', selectedFile);

            const response = await fetch(`https://educa.theomnia.ru/api/files/upload/${props.lectureId}`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                console.log('File uploaded successfully');
            } else {
                console.error('Failed to upload file');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        } finally {
            setIsCompleteModal(true)
            setSelectedFile(null);
        }
    };

    return <>
        <form onSubmit={handleUpload} className='upload'>
            <p className="upload--title">Прикрепить файл лекции</p>
            <FormInput inputType={'file'} labelName={'Выберите файл'} animation={{
                initial: {},
                animate: {},
                transition: {}
            }} onChangeHandle={handleFileChange}/>
            <FormSubmit inputType={'submit'} inputValue={'Добавить'} animation={{
                initial: {},
                animate: {},
                transition: {}
            }}/>
        </form>
        <AnimatePresence>
            { isCompleteModal
                && <BaseModal onClose={() => setIsCompleteModal(false)}>
                    <div className='modal--details'>
                        <Complete/>
                    </div>
                </BaseModal>
            }
        </AnimatePresence>
    </>
};
