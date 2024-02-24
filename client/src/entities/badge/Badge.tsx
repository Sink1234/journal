import type { CSSProperties, PropsWithChildren } from 'react'
import styles from './Badge.module.css'

interface IBadge {
	variant?: string
	style?: CSSProperties
}

export function Badge({
	children,
	variant,
	style
}: PropsWithChildren<IBadge>) {
	return (
		<span
			className={variant ? (
                variant === 'low' ?
                (
                    styles.green
                ) : (
                    variant === 'medium' ? (
                        styles.orange
                    ) : (
                        styles.red
                    )
                )
            ) : (styles.grey)}
			style={style}
		>
			{children}
		</span>
	)
}