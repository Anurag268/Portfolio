import { logout } from "@/app/actions/auth";
import { LogOut, LayoutDashboard } from "lucide-react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-zinc-800 bg-zinc-900/50 flex flex-col">
        <div className="p-6 border-b border-zinc-800">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <LayoutDashboard size={20} className="text-primary" />
            Admin Panel
          </h2>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="block px-4 py-2 rounded-lg bg-primary/10 text-primary font-medium">
            Dashboard
          </Link>
          <a href="/" target="_blank" className="block px-4 py-2 rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors">
            View Live Site
          </a>
        </nav>
        
        <div className="p-4 border-t border-zinc-800 mt-auto">
          <form action={logout}>
            <button type="submit" className="flex items-center gap-2 w-full px-4 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors">
              <LogOut size={18} />
              Logout
            </button>
          </form>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
