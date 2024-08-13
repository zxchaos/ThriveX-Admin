import { useEffect, useState } from "react";
import Vditor from "vditor";
import "vditor/dist/index.css";
import "./index.scss"

interface VditorProps {
    value?: string,
    getValue: (value: string) => void
}

const VditorEditor = ({ value, getValue }: VditorProps) => {
    const [vd, setVd] = useState<Vditor>();

    useEffect(() => {
        const vditor = new Vditor("vditor", {
            minHeight: 550,
            // 是否开启侧边栏目录
            // outline: {
            //     enable: true,
            //     position: 'left'
            // },
            // 禁止缓存数据
            cache: {
                enable: false
            },
            preview: {
                // 限制防抖时间
                delay: 500
            },
            input: (value) => {
                // 把数据传给父组件
                getValue(value)
            },
            after: () => {
                setVd(vditor);
            }
        })

        return () => {
            vd?.destroy();
            setVd(undefined);
        };
    }, []);

    // 监听 value 变化并更新编辑器内容
    useEffect(() => {
        if (vd && value) {
            vd.setValue(value);
        }
    }, [value, vd]);

    return <div id="vditor" className="vditor" />;
};

export default VditorEditor;