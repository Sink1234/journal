"use client";

import type {KeyboardEvent, ChangeEvent, FC} from "react";
import {useEffect, useRef, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useDebouncedCallback} from "use-debounce";
import {journalServiceOnClient} from "@/shared/api/journal";
import cn from "clsx";
import styles from "./styles.module.scss";

// import Timetable from "@/shared/lib/data"


enum Type {
    Teacher,
    Group
}

interface IProps {
    setStatus: (v: boolean) => void;
}

export const Search: FC<IProps> = ({setStatus}) => {
    const [inputValue, setInputValue] = useState<string>("");
    const [active, setActive] = useState(false);
    const [data, setData] = useState<{ type: Type, name: string }[]>([]);
    const nodeRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const page = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();
    const [listNames, setListNames] = useState([] as { type: Type, name: string }[])
    const [listGroups, setListGroups] = useState([] as { type: Type, name: string }[])

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

    function changeActiveSearch() {
        setActive(active => !active);
    }


    function handleCloseSearch() {
        setData([]);
        setInputValue("");
        setActive(false);
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
        if (active) {
            inputRef.current?.focus();
        }
        if (typeof window !== 'undefined') {
            // Вызываем setStatus только если window доступен
            setStatus(active);
        }
    }, [active]);

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
        <div className={styles.wrapper}>
            <div ref={nodeRef} className={cn(styles.search, active && styles["search-active"])}>
                <div className={cn("flex", styles.box)}>
                    <button className={styles.button} onClick={changeActiveSearch}>
                        <Image
                            src={"/images/icons/zoom.svg"}
                            width={22} height={22}
                            className={styles.icon}
                            alt={"Поиск по группе или фамилии преподавателя"}
                        />
                    </button>
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="Введите группу или фамилию"
                        ref={inputRef}
                        value={inputValue}
                        onChange={handleChangeInputValue}
                        onKeyDown={handleKeyPress}
                    />
                </div>
                <div className={active && data.length > 0 ? styles.resultActive : styles.result}>
                    <div className={styles["result__wrapper"]}>
                        <ul className={styles.list}>
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
        </div>
    );
};

