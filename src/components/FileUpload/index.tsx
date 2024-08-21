import { FileDir } from '@/types/app/file';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Modal, Upload } from 'antd';
import { useUserStore } from '@/stores'
import { baseURL } from '@/utils/request'

const { Dragger } = Upload;

interface UploadFileProps {
    dir: FileDir,
    open: boolean,
    onSuccess: () => void,
    onCancel: () => void
}

export default ({ dir, open, onCancel, onSuccess }: UploadFileProps) => {
    const store = useUserStore()

    const uploadProps: UploadProps = {
        name: 'files',
        multiple: true,
        action: `${baseURL}/file`,
        data: { dir },
        headers: {
            "Authorization": `Bearer ${store.token}`
        },
        onChange(info) {
            const { status } = info.file;

            let res;
            if (status !== 'uploading') {
                res = info?.file?.response

                if (res.code === 400) return message.error(res.message)
            }
            if (status === 'done') {
                message.success(`文件上传成功`);
                onSuccess()
            } else if (status === 'error') {
                message.error(`文件上传失败：${res.message}`);
            }
        },
        className: "py-4"
    };

    return (
        <>
            <Modal title="文件上传" open={open} onCancel={onCancel} footer={null}>
                <Dragger {...uploadProps}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">点击或拖动文件到此区域进行上传</p>
                    <p className="ant-upload-hint">支持单个或多个上传</p>
                </Dragger>
            </Modal>
        </>
    )
}