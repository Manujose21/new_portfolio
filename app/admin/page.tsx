import { getTotals } from "@/actions/getTotals"

export default async function Dashboard ()  {

    const totals = await getTotals()
    
    return (


        <>
            <h1 className="text-2xl font-bold">Mi dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="p-4 border-2 shadow-lg border-x-background-quaternary rounded-md">
                    <h2 className="text-center font-bold">Cursos</h2>
                    <div className="flex justify-center items-center">
                        { totals.courses }
                    </div>
                </div>
                <div className="p-4 border-2 shadow-lg border-x-background-quaternary rounded-md">
                    <h2 className="text-center font-bold">Tecnologias</h2>
                    <div className="flex justify-center items-center">
                        { totals.technologies }
                    </div>
                </div>
                <div className="p-4 border-2 shadow-lg border-x-background-quaternary rounded-md">
                    <h2 className="text-center font-bold">Proyectos</h2>
                    <div className="flex justify-center items-center">
                        { totals.proyects }
                    </div>
                </div>
                <div className="p-4 border-2 shadow-lg border-x-background-quaternary rounded-md">
                    <h2 className="text-center font-bold">Experiencias</h2>
                    <div className="flex justify-center items-center">
                        { totals.experiences }
                    </div>
                </div>
            </div>
        </>
    )
}