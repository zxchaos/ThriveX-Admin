import { useEffect, useState } from "react";
import Vditor from "vditor";
import "vditor/dist/index.css";
import "./index.scss"

const toolbar = [
    {
        hotkey: "⌘H",
        icon:
            '<svg><use xlink:href="#vditor-icon-headings"></use></svg>',
        name: "headings",
        tipPosition: "ne",
    },
    {
        hotkey: "⌘B",
        icon: '<svg><use xlink:href="#vditor-icon-bold"></use></svg>',
        name: "bold",
        prefix: "**",
        suffix: "**",
        tipPosition: "ne",
    },
    {
        hotkey: "⌘I",
        icon: '<svg><use xlink:href="#vditor-icon-italic"></use></svg>',
        name: "italic",
        prefix: "*",
        suffix: "*",
        tipPosition: "ne",
    },
    {
        hotkey: "⌘D",
        icon: '<svg><use xlink:href="#vditor-icon-strike"></use></svg>',
        name: "strike",
        prefix: "~~",
        suffix: "~~",
        tipPosition: "ne",
    },
    {
        hotkey: "⌘K",
        icon: '<svg><use xlink:href="#vditor-icon-link"></use></svg>',
        name: "link",
        prefix: "[",
        suffix: "](https://)",
        tipPosition: "n",
    },
    {
        name: "|",
    },
    {
        hotkey: "⌘L",
        icon: '<svg><use xlink:href="#vditor-icon-list"></use></svg>',
        name: "list",
        prefix: "* ",
        tipPosition: "n",
    },
    {
        hotkey: "⌘O",
        icon:
            '<svg><use xlink:href="#vditor-icon-ordered-list"></use></svg>',
        name: "ordered-list",
        prefix: "1. ",
        tipPosition: "n",
    },
    {
        hotkey: "⌘J",
        icon: '<svg><use xlink:href="#vditor-icon-check"></use></svg>',
        name: "check",
        prefix: "* [ ] ",
        tipPosition: "n",
    },
    {
        hotkey: "⇧⌘I",
        icon:
            '<svg><use xlink:href="#vditor-icon-outdent"></use></svg>',
        name: "outdent",
        tipPosition: "n",
    },
    {
        hotkey: "⇧⌘O",
        icon: '<svg><use xlink:href="#vditor-icon-indent"></use></svg>',
        name: "indent",
        tipPosition: "n",
    },
    {
        name: "|",
    },
    {
        hotkey: "⌘;",
        icon: '<svg><use xlink:href="#vditor-icon-quote"></use></svg>',
        name: "quote",
        prefix: "> ",
        tipPosition: "n",
    },
    {
        hotkey: "⇧⌘H",
        icon: '<svg><use xlink:href="#vditor-icon-line"></use></svg>',
        name: "line",
        prefix: "---",
        tipPosition: "n",
    },
    {
        hotkey: "⌘U",
        icon: '<svg><use xlink:href="#vditor-icon-code"></use></svg>',
        name: "code",
        prefix: "```",
        suffix: "\n```",
        tipPosition: "n",
    },
    {
        hotkey: "⌘G",
        icon:
            '<svg><use xlink:href="#vditor-icon-inline-code"></use></svg>',
        name: "inline-code",
        prefix: "`",
        suffix: "`",
        tipPosition: "n",
    },
    {
        name: "|",
    },
    {
        icon: '<svg><use xlink:href="#vditor-icon-upload"></use></svg>',
        name: "upload",
        tipPosition: "n",
    },
    {
        hotkey: "⌘M",
        icon: '<svg><use xlink:href="#vditor-icon-table"></use></svg>',
        name: "table",
        prefix: "| col1",
        suffix:
            " | col2 | col3 |\n| --- | --- | --- |\n|  |  |  |\n|  |  |  |",
        tipPosition: "n",
    },
    {
        name: "|",
    },
    {
        hotkey: "⌘Z",
        icon: '<svg><use xlink:href="#vditor-icon-undo"></use></svg>',
        name: "undo",
        tipPosition: "nw",
    },
    {
        hotkey: "⌘Y",
        icon: '<svg><use xlink:href="#vditor-icon-redo"></use></svg>',
        name: "redo",
        tipPosition: "nw",
    },
    {
        name: "|",
    },
    {
        icon:
            '<svg><use xlink:href="#vditor-icon-align-center"></use></svg>',
        name: "outline",
        tipPosition: "nw",
    },
    {
        icon: '<svg><use xlink:href="#vditor-icon-theme"></use></svg>',
        name: "content-theme",
        tipPosition: "nw",
    },
    {
        icon: '<svg><use xlink:href="#vditor-icon-code-theme"></use></svg>',
        name: "code-theme",
        tipPosition: "nw",
    },
    {
        name: "br",
    }
]

interface VditorProps {
    value?: string,
    getValue: (value: string) => void
}

const VditorEditor = ({ value, getValue }: VditorProps) => {
    const [vd, setVd] = useState<Vditor>();

    useEffect(() => {
        const vditor = new Vditor("vditor", {
            minHeight: 550,
            // 禁止缓存数据
            cache: {
                enable: false
            },
            preview: {
                // 限制防抖时间
                delay: 500
            },
            toolbar,
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