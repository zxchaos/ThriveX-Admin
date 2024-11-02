import { useEffect, useState } from 'react'
import { Editor, Viewer } from '@bytemd/react'
import 'bytemd/dist/index.css'
import highlight from '@bytemd/plugin-highlight'
import 'highlight.js/styles/vs2015.css';
import "./index.scss"

const plugins = [
    highlight()
]

// import FileUpload from "@/components/FileUpload";

interface Props {
    value?: string,
    getValue: (value: string) => void
}

const EditorMD = ({ value, getValue }: Props) => {
    const [content, setContent] = useState('')

    return (
        <>
            <Editor
                value={content}
                plugins={plugins}
                onChange={(v) => {
                    setContent(v)
                }}
            />

            {/* 文件上传 */}
            {/* <FileUpload
                dir="article"
                open={openUploadModalOpen}
                onSuccess={(urls: string[]) => {
                    urls.forEach((path: string) => {
                        vd?.insertValue(`![${path}](${path})`);
                    });
                }}
                onCancel={() => setOpenUploadModalOpen(false)}
            /> */}
        </>
    );
};

export default EditorMD;