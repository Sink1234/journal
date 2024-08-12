import {Search} from "./Search";
import {Logout} from "./Logout";
import {Back} from "./Back";


interface IProps {
    title: string;
}
export function AdminHeader({title}: IProps) {
    return (<header className={"relative"}>
        <div className={"text-white bg-[#3D46A1] py-[50px] rounded-b-[42px] text-center flex "}>
            <div className={"ml-[40px]"}>
                <Back />
            </div>
            <div className={"font-extrabold text-[20px] leading-[24px] w-full"}>
                {title}
            </div>
            <div className={"mr-[40px]"}>
                <Logout />
            </div>
        </div>
        <Search/>
    </header>)
}