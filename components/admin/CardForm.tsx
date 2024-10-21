export const CardForm = ({ children, title }: { children: React.ReactNode, title: string }) => {
    return (
        <>
        <div className="p-4 border-2 shadow-lg border-x-background-quaternary rounded-md w-[600px] bg-background-light mb-16 overflow-hidden ">
                <h1 className="font-semibold">{ title }</h1>
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {children}
                </div>
            </div>

        </>
    )
}