"use client"

import { Card } from "antd"
import Breadcrumb from "../Breadcrumbs"
import { titleSty } from '@/styles/sty'

export default ({ value }: { value: string }) => {
    return (
        <>
            <Card title={<Breadcrumb pageName={value} />} className={titleSty} />
        </>
    )
}