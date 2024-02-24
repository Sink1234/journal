import { forwardRef } from "react"
import styles from './Fields.module.css'
import { error } from "console"

interface InputFieldProps{
    id: string
    label: string
    extra?: string
    placeholder: string
    variant?: string
    state?: 'error' | 'success'
    disabled?: boolean
    type?: string
    isNumber?: boolean
}

export const Fields = forwardRef<HTMLInputElement, InputFieldProps>(
    (
        {
            label,
            id,
            extra,
            type,
            placeholder,
            state,
            disabled,
            isNumber,
            ...rest
        },
        ref
    ) => {
        return(
            <div>
                <label htmlFor = {id}>
                    {label}
                </label>
                <input 
                    type = {type}
                    disabled = {disabled}
                    ref = {ref}
                    id = {id} 
                    placeholder={placeholder}
                    className={disabled === true ? (
                        styles.input
                    ):(
                        state === 'error' ? (
                            styles.input_error
                        ) : (
                            state === 'success' ? (
                                styles.input_success
                            ) : (
                                ''
                            )
                        )
                    )}
                    onKeyDown={event => {
                        if(
                            isNumber &&
                            !/[0-9]/.test(event.key) &&
                            event.key !== 'Backspace' &&
                            event.key !== 'Tab' &&
                            event.key !== 'Enter' &&
                            event.key !== 'ArrowLeft' &&
                            event.key !== 'ArrowRight'  
                        ) {
                            event.preventDefault()
                        }
                    }}
                    {...rest}
                />
            </div>
        )
    }
)

export default Fields