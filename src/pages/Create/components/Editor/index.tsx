import { baseURL } from '@/utils/request';
import { useUserStore } from '@/stores';

import { Editor } from '@bytemd/react';
import 'bytemd/dist/index.css';
import highlight from '@bytemd/plugin-highlight';
import 'highlight.js/styles/vs2015.css';

import './index.scss';
import axios from 'axios';
import { Spin } from 'antd';
import { useState } from 'react';

interface Props {
    value: string;
    setValue: (value: string) => void;
    onChange: (value: string) => void;
}

const EditorMD = ({ value, setValue, onChange }: Props) => {
    const store = useUserStore();
    const [loading, setLoading] = useState(false)

    const plugins = [
        highlight()
    ];

    const uploadImages = async (files: File[]) => {
        setLoading(true);

        // 处理成后端需要的格式
        const formData = new FormData();
        formData.append("dir", "article");
        for (let i = 0; i < files.length; i++) formData.append('files', files[i])

        const { data: { code, data } } = await axios.post(`${baseURL}/file`, formData, {
            headers: {
                "Authorization": `Bearer ${store.token}`,
                "Content-Type": "multipart/form-data"
            }
        });

        setLoading(false);

        // 返回图片信息数组
        return data.map((url: string) => ({ url }));
    }

    return (
        <>
            <Spin spinning={loading} tip="图片上传中...">
                <Editor
                    value={value}
                    plugins={plugins}
                    onChange={onChange}
                    uploadImages={uploadImages}
                />
            </Spin>
        </>
    );
};

export default EditorMD;
