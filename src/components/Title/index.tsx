"use client"

import { Card } from "antd"
import { titleSty } from '@/styles/sty'
import { ReactNode } from "react"

interface Props {
    value: string,
    children?: ReactNode,
    className?: string
}

export default ({ value, children, className }: Props) => {
    return (
        <>
            <Card className={`${titleSty} p-4 mb-2 ${className}`}>
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-black dark:text-white text-xl">{value}</h2>

                    {children}
                </div>
            </Card>
        </>
    )
}