import React, { useState } from 'react';
import { MDXProvider } from '@mdx-js/react';
import { Editor, EditorState, ContentState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import ReactMarkdown from 'react-markdown';

interface MarkdownEditorProps {
    editable: boolean;
    initialText?: string;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ editable, initialText = '' }) => {
    const [editorState, setEditorState] = useState(
        EditorState.createWithContent(ContentState.createFromText(initialText))
    );

    const handleEditorChange = (editorState: EditorState) => {
        setEditorState(editorState);
    };

    return (
        <div>
        {editable ? (
            <div>
            <div style={{ display: 'flex' }}>
                <div style={{ width: '50%', marginRight: '20px' }}>
                <Editor editorState={editorState} onChange={handleEditorChange} />
                </div>
                <div style={{ width: '50%' }}>
                <div>
                    <MDXProvider>
                    <ReactMarkdown>{editorState.getCurrentContent().getPlainText()}</ReactMarkdown>
                    </MDXProvider>
                </div>
                </div>
            </div>
            </div>
        ) : (
            <MDXProvider>
                <ReactMarkdown>{editorState.getCurrentContent().getPlainText()}</ReactMarkdown>
            </MDXProvider>
        )}
        </div>
    );
};

export default MarkdownEditor;
