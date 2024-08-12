import {ReactNode} from "react";
import {AdminHeader} from "@/widgets/header";
import {AdminFooter} from "@/widgets/footer";

export function AdminWrapper({children, title}: { children: ReactNode, title?: string }) {
    return <div className={"min-h-screen flex flex-col"}>
        <AdminHeader title={title || "Главная"}/>
        <div className={"flex-1 mt-[20px] mx-[16px]"}>
            {children}
        </div>
        <AdminFooter/>
    </div>
}