import Title from "@/components/Title"
import VisitorsStatisChat from "./components/VisitorsStatisChat"
import ChartThree from "@/components/Charts/ChartThree"
import ChartTwo from "@/components/Charts/ChartTwo"
import ChatCard from "@/components/Chat/ChatCard"
import MapOne from "@/components/Maps/MapOne"
import TableOne from "@/components/Tables/TableOne"

export default () => {
    return (
        <>
            <Title value="数据可视化" />

            <div className="mt-2 grid grid-cols-12 gap-2">
                <VisitorsStatisChat />
                <ChartTwo />
                <ChartThree />
                <MapOne />

                <div className="col-span-12 xl:col-span-8">
                    <TableOne />
                </div>

                <ChatCard />
            </div>
        </>
    )
}