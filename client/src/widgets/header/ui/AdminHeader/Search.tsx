"use client"
import {useEffect, useRef, useState} from "react";
import type {ChangeEvent, KeyboardEvent, CSSProperties} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {useDebouncedCallback} from "use-debounce";
import {journalServiceOnClient} from "@/shared/api/journal";
import cn from "clsx";

enum Type {
    Teacher,
    Group
}

export function Search() {
    const [inputValue, setInputValue] = useState<string>("");
    const [data, setData] = useState<{ type: Type, name: string }[]>([]);
    const nodeRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const page = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();
    const [listNames, setListNames] = useState<{ type: Type, name: string }[]>([]);
    const [listGroups, setListGroups] = useState<{ type: Type, name: string }[]>([]);

    const [href, setHref] = useState(pathname);
    useEffect(() => {
        if (pathname !== href) {
            setHref(pathname);
        }
    }, [pathname]);


    function handleChangeInputValue(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setInputValue(value);
        handleSearch(value);
    }


    function handleCloseSearch() {
        setData([]);
        setInputValue("");
    }

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = page ? new URLSearchParams(page) : new URLSearchParams;
        if (!term) {
            params.delete('query');
            replace(`${pathname}?${params.toString()}`);
            setData([]);
            return;
        }
        if (term[0].toLowerCase() === term[0].toUpperCase()) {
            setData(listGroups.filter(value => value.name.toLowerCase().startsWith(term.toLowerCase())));
        } else {
            setData(listNames.filter(value => value.name.toLowerCase().startsWith(term.toLowerCase())));
        }
        params.set('query', term);
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    function handleKeyPress(event: KeyboardEvent<HTMLElement>) {
        switch (event.code) {
            case "Escape":
                handleCloseSearch();
                break;
        }
    }

    useEffect(() => {
        const handleOutsideClick = (e: globalThis.MouseEvent) => {
            if (!nodeRef.current?.contains(e.target as Node)) {
                handleCloseSearch();
            }
        }

        journalServiceOnClient.teacher.getListName().then(
            (names) => {
                setListNames(names.map(value => ({
                    type: Type.Teacher,
                    name: value
                })));
            })

        journalServiceOnClient.group.getListName().then(
            (names) => {
                setListGroups(names.map(value => ({
                        type: Type.Group,
                        name: value
                    }))
                );
            })

        window.addEventListener("click", handleOutsideClick);
        return () => {
            window.removeEventListener("click", handleOutsideClick);
        }
    }, []);
    return (
        <div className={"z-50 absolute -bottom-[19px] inset-x-1/2  -translate-x-1/2 w-fit lg:w-[70%] max-w-[700px]"}>
            <div
                className={cn("relative flex bg-[#E1E4E7] shadow-[0px_4px_33.4px_0px_rgba(0,0,0,0.08)] py-[12px] px-[18px]", data.length > 0 ? " rounded-t-[19px]" : " rounded-[19px]")}
            >
                <input
                    type="text"
                    className={"bg-inherit focus-visible:outline-none w-full min-w-[240px]"}
                    placeholder=""
                    value={inputValue}
                    ref={inputRef}
                    onChange={handleChangeInputValue}
                    onKeyDown={handleKeyPress}
                />
                <button className={"w-[22px] h-[22px]"}>
                    <Image
                        src={"/images/icons/search-primary.svg"}
                        width={22} height={22}
                        alt={"Поиск по группе или фамилии преподавателя"}
                    />
                </button>
            </div>
            <div className={data.length > 0 ? "" : "hidden"}>
                <div className={"absolute w-full p-[12px_2px_18px_28px] bg-[#E1E4E7] rounded-b-[19px]"}>
                    <ul
                        className={"h-full max-h-[130px] flex flex-col gap-[9px] overflow-y-auto text-[--grey] scrollbar"}
                        style={{"--scrollbar-thumb-bg-color": "#AEB1B5"} as CSSProperties}
                    >
                        {data.map((value, index) => (
                            <Link key={index}
                                  href={`/${value.type === Type.Teacher ? "teacher" : "group"}/${value.name}`}
                                  className={"block no-underline list-none"}
                                  onClick={handleCloseSearch}>
                                <li className={"text-xs text-gray no-underline list-none"}>
                                    {value.name}
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}