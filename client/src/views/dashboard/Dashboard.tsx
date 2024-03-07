import React, {useEffect, useRef, useState} from 'react';
import Image from "next/image";
import styles from "./Dashboard.module.css";

interface IRadioFieldProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    description: string;
}

function RadioField(props: IRadioFieldProps) {
    const {description, ...otherProps} = props;
    return (
        <div>
            <label className={styles.labelField}>
                <input
                    type="radio"
                    name="typeFile"
                    className={styles.inputRadio}
                    {...otherProps}
                    hidden
                />
                {description}
                <span className={styles.customRadio}></span>
            </label>
        </div>
    );
}

interface IUploadFileLargeProps {
    file: File | null;
    onDrop: React.DragEventHandler<HTMLLabelElement>;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}

function UploadFileLarge(props: IUploadFileLargeProps) {
    const {file, onDrop, onChange} = props;
    return (
        <div className={"h-full"}>
            <label
                className={styles.boxUploadLarge}
                onDrop={onDrop}
                onDragOver={(e) => e.preventDefault()}
                htmlFor={"image-event"}
            >
                <input
                    className={styles.input}
                    type="file"
                    id={"image-event"}
                    accept={"text/xml"}
                    onChange={onChange}
                    hidden
                />
                <div className={styles.boxContent}>
                    <Image src={"/upload.svg"} alt={""} width={80} height={80}/>
                    <div className={styles.boxText}>
                        {file ? file.name : "Перетащите файл сюда"}
                    </div>
                </div>
            </label>
        </div>
    );
}

function UploadFileSmall(props: IUploadFileLargeProps) {
    const {file, onDrop, onChange} = props;
    return (
        <div className={styles.holder}>
            <label
                className={styles.boxUploadSmall}
                onDrop={onDrop}
                onDragOver={(e) => e.preventDefault()}
                htmlFor={"image-event"}
            >
                <input
                    className={styles.input}
                    type="file"
                    id={"image-event"}
                    accept={"text/xml"}
                    onChange={onChange}
                    hidden
                />
                <div className={styles.boxContent}>
                    <Image src={"/upload.svg"} alt={""} width={20} height={20}/>
                    <div className={styles.boxText}>
                        {file ? file.name : "Загрузите сюда файл"}
                    </div>
                </div>
            </label>
        </div>

    );
}

enum typeFile {
    PART = "part",
    EVEN = "even",
    ODD = "odd",
    PERSON = "persons"
}

const Dashboard = () => {
    const [file, setFile] = useState<File | null>(null);
    const [radioValue, setRadioValue] = useState<null | typeFile>(null);
    const buttonSubmitRef = useRef<HTMLButtonElement>(null);
    const [loading, setLoading] = useState(false);
    const [matches, setMatches] = useState(
        window.matchMedia("(min-width: 800px)").matches
    );

    useEffect(() => {
        window
            .matchMedia("(min-width: 800px)")
            .addEventListener('change', e => setMatches(e.matches));
    }, []);

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value, checked} = event.target;
        if (!checked) return;
        if (radioValue) {
            setFile(null);
        }
        setRadioValue(value as typeFile);
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = event.target.files?.[0];
        if (uploadedFile) {
            setFile(uploadedFile);
        }
    };

    const handleFileDrop = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files?.[0];
        if (droppedFile) {
            setFile(droppedFile);
        }
    };

    const handleSubmit = async () => {
        if (!(file && radioValue)) {
            buttonSubmitRef.current!.classList.add(styles.submitError);
            setTimeout(() => {
                buttonSubmitRef.current!.classList.remove(styles.submitError);
            }, 600);
            return;
        }

        if (!Object.values(typeFile).includes(radioValue)) {
            buttonSubmitRef.current!.classList.add(styles.submitError);
            setTimeout(() => {
                buttonSubmitRef.current!.classList.remove(styles.submitError);
            }, 600);
            return;
        }

        const timer = setTimeout(() => {
            setLoading(true);
            buttonSubmitRef.current!.disabled = true;
        }, 500);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", radioValue);

        fetch(`/api/user/${radioValue}`, {
            method: "POST",
            body: formData,
        }).then((result) => {
            clearTimeout(timer);
            setLoading(false);
            buttonSubmitRef.current!.disabled = false;

            if (result.ok) {
                buttonSubmitRef.current!.classList.add(styles.submitSuccess);
                setTimeout(() => {
                    buttonSubmitRef.current!.classList.remove(styles.submitSuccess);
                }, 600);
            } else {
                buttonSubmitRef.current!.classList.add(styles.submitError);
                setTimeout(() => {
                    buttonSubmitRef.current!.classList.remove(styles.submitError);
                }, 600);
            }
        });
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.inner}>
                <div>
                    <RadioField
                        description={"Расписание на неделю"}
                        value={typeFile.PART}
                        onChange={handleRadioChange}
                    />
                    <div className={styles.holder}>
                        <h2 className={styles.title}>Расписание на семестр</h2>
                        <RadioField
                            description={"Четная неделя"}
                            value={typeFile.EVEN}
                            onChange={handleRadioChange}
                        />
                        <RadioField
                            description={"Нечетная неделя"}
                            value={typeFile.ODD}
                            onChange={handleRadioChange}
                        />
                    </div>

                    <RadioField
                        description={"Сотрудники"}
                        value={typeFile.PERSON}
                        onChange={handleRadioChange}
                    />

                    {!matches &&
                        <UploadFileSmall
                            file={file}
                            onDrop={handleFileDrop}
                            onChange={handleFileUpload}
                        />
                    }

                    <div className={styles.submitField}>
                        <button
                            ref={buttonSubmitRef}
                            className={styles.submit}
                            onClick={handleSubmit}
                            disabled={!(radioValue && file)}
                        >
                            {loading
                                ? <Image src={"/loading.svg"} width={14} height={14}
                                         alt={"Loading"} className={styles.loading}/>
                                : "Отправить"
                            }
                        </button>
                    </div>
                </div>

                {matches &&
                    <UploadFileLarge
                        file={file}
                        onDrop={handleFileDrop}
                        onChange={handleFileUpload}
                    />
                }
            </div>
        </div>
    );
};

export default Dashboard;