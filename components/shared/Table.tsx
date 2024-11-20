"use client";
interface Props {
    headers: string[];
    children: React.ReactNode;
}
export const Table = ( { headers, children }: Props ) => {
    return (
        <>
            <div className=" bg-background-light">
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-xl">
                        <thead>
                            <tr className="bg-blue-gray-100 text-gray-700">
                                {   headers.map((header, index) => (
                                    <th key={index} className="py-3 px-4 border-b border-blue-gray-200 text-left">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="text-blue-gray-900">
                            
                            {children}
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}