import { useEffect, useState } from "react";
import Vditor from "vditor";
import "vditor/dist/index.css";
import "./index.scss"

const VditorEditor = () => {
    const [vd, setVd] = useState<Vditor>();
    useEffect(() => {
        const vditor = new Vditor("vditor", {
            minHeight: 550,
            // outline: {
            //     enable: true,
            //     position: 'left'
            // },
            after: () => {
                vditor.setValue("`Vditor` 最小代码示例");
                vditor.setTheme("classic","","github")
                setVd(vditor);
            }
        })

        // Clear the effect
        return () => {
            vd?.destroy();
            setVd(undefined);
        };
    }, []);
    
    return <div id="vditor" className="vditor"/>;
};

export default VditorEditor;
