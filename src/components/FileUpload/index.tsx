import { FileDir } from '@/types/app/file';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Modal, Radio, Select, Upload } from 'antd';
import { useUserStore } from '@/stores';
import { baseURL } from '@/utils/request';
import Compressor from 'compressorjs';
import { useState } from 'react';

const { Dragger } = Upload;

interface UploadFileProps {
    dir: FileDir,
    open: boolean,
    onSuccess: () => void,
    onCancel: () => void
}

export default ({ dir, open, onCancel, onSuccess }: UploadFileProps) => {
    const store = useUserStore();
    const [quality, setQuality] = useState(1000);
    const [isCompressionUpload, setIsCompressionUpload] = useState(false);
    const [fileList, setFileList] = useState<any[]>([]); // 已上传的文件列表

    const uploadProps: UploadProps = {
        name: 'files',
        multiple: true,
        action: `${baseURL}/file`,
        data: { dir },
        headers: {
            "Authorization": `Bearer ${store.token}`
        },
        fileList, // 设置文件列表
        onChange(info) {
            const { status } = info.file;

            // 更新文件列表状态
            setFileList(info.fileList);

            let res;
            if (status !== 'uploading') {
                res = info?.file?.response;

                if (res?.code === 400) return message.error(res.message);
            }
            if (status === 'done') {
                message.success(`文件上传成功`);
                onSuccess();
            } else if (status === 'error') {
                message.error(`文件上传失败：${res?.message}`);
            }
        },
        beforeUpload: async (file) => {
            if (quality === 1000) return file

            // 对图片进行压缩处理
            return new Promise((resolve, reject) => {
                new Compressor(file, {
                    quality,
                    success: (file) => {
                        resolve(file);
                    },
                    error: (err) => {
                        reject(err);
                    },
                });
            })
        },
        className: "py-4"
    };

    // 初始化操作
    const onCloseModel = () => {
        setIsCompressionUpload(false);
        setQuality(1000);
        setFileList([]); // 清空文件列表
        onCancel();
    }

    return (
        <>
            <Modal title="文件上传" open={open} onCancel={onCloseModel} footer={null}>
                <div className='my-4'>
                    <Radio.Group defaultValue={0} value={isCompressionUpload ? 1 : 0} onChange={(e) => setIsCompressionUpload(e.target.value ? true : false)}>
                        <Radio value={0}>无损上传</Radio>
                        <Radio value={1}>压缩上传</Radio>
                    </Radio.Group>

                    {
                        isCompressionUpload && <Select
                            onChange={setQuality}
                            options={[
                                { value: 1, label: '轻量压缩(推荐)' },
                                { value: "NaN", label: '自适应压缩' },
                                { value: 0.9, label: '0.9' },
                                { value: 0.8, label: '0.8' },
                                { value: 0.7, label: '0.7' },
                                { value: 0.6, label: '0.6' },
                                { value: 0.5, label: '0.5' },
                                { value: 0.4, label: '0.4' },
                                { value: 0.3, label: '0.3' },
                                { value: 0.2, label: '0.2' },
                                { value: 0.1, label: '0.1' },
                            ]}
                            placeholder="请选择图片压缩质量"
                            className='min-w-44'
                        />
                    }
                </div>

                <Dragger {...uploadProps}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">点击或拖动文件到此区域进行上传</p>
                    <p className="ant-upload-hint">支持单个或多个上传</p>
                </Dragger>
            </Modal>
        </>
    );
};