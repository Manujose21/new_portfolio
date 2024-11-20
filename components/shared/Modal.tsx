import React from "react"

export const Modal = ({isOpen, action, body}: {isOpen: boolean, body: React.ReactNode, action: () => void}) => {
    return (
        <>
            <div className="flex items-center justify-center h-screen">
                <div className={ (isOpen) ?  'flex items-center justify-center h-screen scale-1 transition-all duration-500' : 'scale-0'}>
                
                    <div x-show="showModal" x-transition:enter="transition ease-out duration-300 transform" x-transition:enter-start="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" x-transition:enter-end="opacity-100 translate-y-0 sm:scale-100" x-transition:leave="transition ease-in duration-200 transform" x-transition:leave-start="opacity-100 translate-y-0 sm:scale-100" x-transition:leave-end="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" className="fixed z-10 inset-0 overflow-y-auto" x-cloak>
                        
                        
                        {body}

                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            
                            <button onClick={ action } type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"> Sí </button>
                            
                            <button onClick={()=> isOpen = false} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"> Cancelar 

                            </button>
                        </div>

                    </div>
                </div>
            </div>
                
           

        </>
    )
}