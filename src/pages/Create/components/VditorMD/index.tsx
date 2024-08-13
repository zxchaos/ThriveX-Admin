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

    // useEffect(() => {
    //     if (vd) {
    //         vd.setValue(value || '')
    //     }
    //     console.log(value,444);
        
    // }, [value])

    useEffect(() => {
        const vditor = new Vditor("vditor", {
            minHeight: 550,
            // 是否开启侧边栏目录
            // outline: {
            //     enable: true,
            //     position: 'left'
            // },
            cache: {
                enable: false
            },
            input: (value) => {
                // 把数据传给父组件
                getValue(value)
            },
            after: () => {
                console.log(value?.trim(),!!value?.trim().length);
                
                // value?.trim().length && vditor.setValue(value)

                // vditor.setValue("`Vditor` 最小代码示例");

                setVd(vditor);
            }
        })

        // Clear the effect
        return () => {
            vd?.destroy();
            setVd(undefined);
        };
    }, []);

    return <div id="vditor" className="vditor" />;
};

export default VditorEditor;
