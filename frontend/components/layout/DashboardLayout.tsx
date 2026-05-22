import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100 flex">
      <AppSidebar />

      <main className="flex-1 min-w-0">
        <AppHeader />

        <section className="p-6">
          {children}
        </section>
      </main>
    </div>
  );
}