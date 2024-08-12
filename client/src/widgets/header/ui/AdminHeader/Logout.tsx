"use client"
import Image from "next/image";
import {useRouter} from "next/navigation";
import {useMutation} from "@tanstack/react-query";

export function Logout() {
    const router = useRouter();

    const { mutate } = useMutation({
        mutationKey: ['logout'],
        mutationFn: async () => {
            const response = await fetch('/auth/logout', {
                method: 'POST',
            });

            if (!response.ok) {
                throw new Error('Logout failed');
            }
        },
        onSuccess: () => {
            router.refresh();
            router.push('/auth');
            return window.location.reload();
        },
        onError: (error) => {
            console.error(error.message);
        },
    });

    const handleLogout = () => {
        mutate();
    };

    return <button onClick={handleLogout} className={"hover:scale-[0.95]"}>
        <Image src={"/images/icons/logout.svg"} alt={"Выйти"} width={36} height={36}/>
    </button>
}