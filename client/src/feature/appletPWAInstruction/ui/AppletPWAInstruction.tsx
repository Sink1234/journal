"use client"

import {useEffect, useState} from "react";

export const AppletPWAInstruction = () => {
    const [deferredPrompt, setDeferredPrompt] = useState<any>()
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('/sw.js')
                .then((registration) => console.log('scope is: ', registration.scope));
        }
        window.addEventListener('beforeinstallprompt', function (event) {
            event.preventDefault();
            setDeferredPrompt(event);
        });
    }, []);

    function handleClick() {
        if (deferredPrompt) {
            deferredPrompt.prompt();
        }
    }

    return (
        <div>
            {deferredPrompt
                ? <div className={"flex flex-col gap-[10px] justify-center"}>
                    <div>Установить как приложение</div>
                    <button
                        className={"text-white miw-w-[160px] rounded-[30px] my-0 mx-auto cursor-pointer p-[15px] bg-[#3D46A1]"}
                        onClick={handleClick}
                    >
                        <span>Установить</span>
                    </button>
                </div>
                : <div>

                </div>
            }
        </div>

    );
};
