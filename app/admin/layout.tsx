import { Sidebar } from '../../components/shared/Sidebar';

export default function AdminLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <div className='flex'>

        <Sidebar />

        <div className='px-4 md:px-8 max-w-6xl mx-auto min-h-screen w-full '>
            <div className='mt-8'>

                {children}
            </div>
        </div>
    </div>
  );
}