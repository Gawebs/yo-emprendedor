import { Sidebar } from '@/components/dashboard/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-64 bg-gray-50 min-h-screen">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
