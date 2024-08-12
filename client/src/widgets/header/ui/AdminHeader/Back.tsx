"use client"
import Image from "next/image";
import {usePathname, useRouter} from 'next/navigation'

export function Back() {
    const router = useRouter();
    const pathname = usePathname()
    const showBackButton = pathname.startsWith('/i/') && pathname !== '/i';
    function handleBack() {
        router.back()
    }

    return showBackButton && (<button onClick={handleBack}>
        <Image src={"/images/icons/back-arrow-white.svg"} alt={"В зад"} width={36} height={36}/>
    </button>)
}
