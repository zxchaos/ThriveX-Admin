import { useEffect, useState } from "react";
import Vditor from "vditor";
import "vditor/dist/index.css";
import "./index.scss"

interface VditorProps {
    getValue: (value: string) => void
}

const VditorEditor = ({ getValue }: VditorProps) => {
    const [vd, setVd] = useState<Vditor>();
    useEffect(() => {
        const vditor = new Vditor("vditor", {
            minHeight: 550,
            // outline: {
            //     enable: true,
            //     position: 'left'
            // },
            input: (value) => {
                // 把数据传给父组件
                getValue(value)
            },
            after: () => {
                vditor.setValue("`Vditor` 最小代码示例");

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
