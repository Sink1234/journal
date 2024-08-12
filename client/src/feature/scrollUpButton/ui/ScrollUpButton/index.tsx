"use client"
import {useEffect, useState} from 'react';
import styles from "./styles.module.scss";
import cn from "clsx";

export const ScrollUpButton = () => {
    const [view, setView] = useState(false);

    useEffect(() => {
        function handleScroll() {
            setView(window.scrollY > document.documentElement.clientHeight);
        }
        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, []);

    function handleClick() {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    }

    return (
        <button id='custom' className={cn(styles.btn, view && styles.view)} onClick={handleClick}>
            <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M7 13C7 13.5523 7.44772 14 8 14C8.55228 14 9 13.5523 9 13L7 13ZM8.70711 0.292893C8.31658 -0.0976315 7.68342 -0.0976314 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 13L9 1L7 1L7 13L9 13Z"
                    fill="white"/>
            </svg>
        </button>
    );
};

