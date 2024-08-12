"use client"
import Image from "next/image";
import {type HTMLAttributes} from "react";
import cn from "clsx";


export function AdminFooter({className, ...otherProps}: HTMLAttributes<HTMLDivElement>) {

    const scrollToTop = () => {
        document.body.scrollTo({
            top: 0,
            behavior: 'smooth',
        });

    };
    return <div className={cn("bg-[#3D46A1]", className)} {...otherProps}>
        <div className={"flex my-[25px] justify-around"}>
            <div className={"flex gap-[30px]"}>
                <Image quality={100}
                       src='/images/icons/logo.svg'
                       width={70} height={70}
                       alt="Логотип СПАСКа"
                       priority
                       className={""}/>
                <div className={"flex items-center"}>
                    <div className={"flex items-center gap-[11px] before:content-[''] before:h-[29px] before:w-[1px] before:bg-white text-white text-[23px] leading-[29px]"}>Расписание
                        занятий
                    </div>
                </div>

            </div>

            <div className={"my-auto"}>
                <button onClick={scrollToTop} className={"bg-white py-[9px] px-[24px] text-[16px] leading-[20px] text-[#AAAAAA] rounded-[19px]"}>
                    Наверх
                </button>
            </div>
        </div>
    </div>
}