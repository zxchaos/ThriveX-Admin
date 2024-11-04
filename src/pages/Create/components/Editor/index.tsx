import { Editor } from '@bytemd/react'
import 'bytemd/dist/index.css'
import highlight from '@bytemd/plugin-highlight'
import 'highlight.js/styles/vs2015.css';
import "./index.scss"

const plugins = [
    highlight()
]

// import FileUpload from "@/components/FileUpload";

interface Props {
    value: string,
    setValue: (value: string) => void
}

const EditorMD = ({ value, setValue }: Props) => {
    return (
        <>
            <Editor
                value={value}
                plugins={plugins}
                onChange={setValue}
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