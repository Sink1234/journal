"use client"

import {Suspense, useEffect, useRef, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import font from "next/font/local";
import {Search} from "../Search";
import styles from "./styles.module.scss";
import cn from "clsx";

const myFont = font({src: '../../../../../public/font/PT Sans Pro Extra Condensed Light.otf'});

const navList = [
    {link: "/", content: "Главная"},
    {link: "/room", content: "Поиск по кабинетам"},
    {link: "/room/onGroup", content: "Кабинеты по группам"},
    {link: "/room/onTeacher", content: "Кабинеты по преподавателям"},
    {link: '/main/group', content: "Расписание на семестр для групп"},
    {link: '/main/teacher', content: "Расписание для преподавателей"},
];
export const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState(false);
    const nodeRef = useRef<HTMLDivElement>(null);
    const buttonOpenRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const handleOutsideClick = (e: globalThis.MouseEvent) => {
            const target = e.target as Node;
            if (!(nodeRef.current?.contains(target) || buttonOpenRef.current?.contains(target))) {
                closeMenu();
            }
        }
        window.addEventListener("click", handleOutsideClick);
        return () => {
            window.removeEventListener("click", handleOutsideClick);
        }
    }, []);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
    }, [open]);

    function closeMenu() {
        setOpen(false);
    }

    function toggleMenu() {
        setOpen((open) => !open);
    }

    function setStatusSearch(value: boolean) {
        setSearch(value);
        closeMenu();
    }

    return (
        <div id='custom' className={styles.sticky}>
            <header id="nav" className={styles.header}>
                <Suspense>
                    <div className={styles.fflex}>
                        <div className={styles.left}>
                            <Image quality={100}
                                   src='/images/icons/logo.svg'
                                   width={70} height={70}
                                   alt="Логотип СПАСКа"
                                   priority
                                   className={search ? styles.disImg : styles.image}
                            />
                            <p className={myFont.className}>Расписание занятий</p>
                        </div>

                        <div className={styles.right}>
                            <Search setStatus={setStatusSearch}/>
                            <button
                                className={`${search ? styles.disBurger : styles.burger} text-white`}
                                onClick={toggleMenu}
                            >
                                <span className={styles.nav} ref={buttonOpenRef}>
                                    <div
                                        className={cn("w-[33px] h-0 mt-[4px] rounded-[5px] border-[3px] border-solid border-white", styles.open)}></div>
                                    <div
                                        className={"w-[33px] h-0 mt-[4px] rounded-[5px] border-[3px] border-solid border-white"}></div>
                                    <div
                                        className={"w-[19px] h-0 mt-[4px] rounded-[5px] border-[3px] border-solid border-white"}></div>
                                </span>
                            </button>
                        </div>
                    </div>
                </Suspense>
            </header>

            <div className={open ? styles.mob_menu : styles.mob_menuClose} ref={nodeRef}>
                <button className={styles.burger} onClick={closeMenu}>
                    <span className={styles.nav}>
                        <div
                            className={styles.open}
                            style={{
                                border: "1px solid white",
                                width: 50,
                                height: 0,
                                marginTop: 5,
                                transform: "rotateZ(45deg)",
                            }}
                        ></div>
                        <div
                            style={{
                                border: "1px solid white",
                                width: 50,
                                height: 0,
                                marginTop: -1,
                                transform: "rotateZ(-45deg)",
                            }}
                        ></div>
                    </span>
                </button>
                <div>
                    {navList.map((value) => (
                        <Link
                            key={value.link}
                            href={value.link}
                            onClick={closeMenu}
                        >
                            {value.content}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

