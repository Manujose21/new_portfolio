
interface Props {
    children: React.ReactNode,
    className?: string,
    icon?: JSX.Element
    type?: "submit" | "button" | "reset"
}

export const Button = ({ children, className, icon, type }: Props) => {
    return (
        <button 
            type={type}
            className={`p-2 border-[1.5px] text-center border-zinc-900 rounded-full bg-background-tertiary text-color-text-primary hover:bg-background-secondary transition duration-150 flex items-center gap-2 ${className}`}
        >   
            {
                icon && (icon)
            }
            {children}
        </button>
    )
}