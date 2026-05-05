import React, { useState, useRef, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Map, 
  AlertTriangle, 
  ShieldCheck, 
  Menu,
  Bell,
  Search,
  TrainTrack,
  Ship,
  Plane,
  Clock,
  X
} from 'lucide-react';
import { cn } from '../lib/utils';
import { complianceStatus } from '../data/mockData';
import DashboardOverview from '../pages/DashboardOverview';
import Corridors from '../pages/Corridors';
import PredictiveMaintenance from '../pages/PredictiveMaintenance';
import Compliance from '../pages/Compliance';

type Page = 'dashboard' | 'corridors' | 'maintenance' | 'compliance';

export default function Layout() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isAlertsOpen, setAlertsOpen] = useState(false);
  const alertsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (alertsRef.current && !alertsRef.current.contains(event.target as Node)) {
        setAlertsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeAlerts = complianceStatus
    .filter(item => item.status === 'Atrasado' || item.status === 'Alerta')
    .map(item => ({
      project: item.project,
      status: item.status,
      bottleneck: item.bottleneck,
      type: item.type,
      // Just a mock way to find a date or general text
      dueDate: item.details?.history?.[item.details.history.length - 1]?.date || 'Prazo Crítico'
    }));

  const navigation = [
    { name: 'Visão Geral (PMO)', id: 'dashboard', icon: LayoutDashboard },
    { name: 'Gestão de Corredores', id: 'corridors', icon: Map },
    { name: 'Manutenção Preditiva', id: 'maintenance', icon: AlertTriangle },
    { name: 'Compliance & Ambiental', id: 'compliance', icon: ShieldCheck },
  ] as const;

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <DashboardOverview />;
      case 'corridors': return <Corridors />;
      case 'maintenance': return <PredictiveMaintenance />;
      case 'compliance': return <Compliance />;
      default: return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen flex text-slate-100">
      {/* Sidebar */}
      <div 
        className={cn(
          "glass-dark transition-all duration-300 flex flex-col fixed inset-y-0 left-0 z-50 md:relative border-r border-white/5",
          isSidebarOpen ? "w-64" : "w-0 md:w-20 -translate-x-full md:translate-x-0"
        )}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/5">
          {isSidebarOpen ? (
            <span className="font-bold text-lg tracking-tight flex items-center gap-2 text-white">
              <span className="text-sky-400">Infra</span>SC Hub
            </span>
          ) : (
            <span className="font-bold text-lg text-sky-400 mx-auto">SC</span>
          )}
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="md:hidden">
            <Menu className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="flex-1 py-6 flex flex-col gap-2 px-3">
          <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2 px-3">Módulos</div>
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-sm font-medium",
                currentPage === item.id 
                  ? "bg-white/10 border border-white/10 text-white" 
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {isSidebarOpen && <span>{item.name}</span>}
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-white/5 text-xs text-slate-400">
          {isSidebarOpen ? "Torre Multimodal v1.0" : "v1.0"}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 glass border-b-0 border-l-0 border-r-0 border-t-0 rounded-none md:rounded-b-2xl border-white/10 flex items-center justify-between px-4 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-2 -ml-2 rounded-lg text-slate-300 hover:bg-white/10 hidden md:block"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative hidden sm:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Buscar projetos, rodovias..." 
                className="pl-9 pr-4 py-2 glass-dark rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 w-64 transition-all text-white placeholder-slate-400"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Multimodal Quick Status */}
            <div className="hidden md:flex items-center gap-3 px-4 py-1.5 glass-dark rounded-full text-xs font-medium text-slate-200">
              <div className="flex items-center gap-1.5"><Map className="w-3.5 h-3.5 text-emerald-400"/> 84% O/B</div>
              <div className="w-px h-3 bg-white/20"></div>
              <div className="flex items-center gap-1.5"><Ship className="w-3.5 h-3.5 text-sky-400"/> 65M ton</div>
              <div className="w-px h-3 bg-white/20"></div>
              <div className="flex items-center gap-1.5"><Plane className="w-3.5 h-3.5 text-blue-400"/> 8.5M cap</div>
            </div>

            <div className="relative" ref={alertsRef}>
              <button 
                onClick={() => setAlertsOpen(!isAlertsOpen)}
                className={cn("relative p-2 text-slate-300 hover:bg-white/10 rounded-xl transition-colors", isAlertsOpen && "bg-white/10 text-white")}
              >
                <Bell className="w-5 h-5" />
                {activeAlerts.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border-2 border-[#1e293b] animate-pulse"></span>
                )}
              </button>
              
              {isAlertsOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 glass-dark border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-4">
                  <div className="flex items-center justify-between p-4 border-b border-white/5 bg-white/5">
                    <h4 className="font-bold text-white text-sm">Alertas de Compliance</h4>
                    <span className="bg-red-500/20 text-red-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                       {activeAlerts.length} Críticos
                    </span>
                  </div>
                  <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                    {activeAlerts.length === 0 ? (
                      <div className="p-6 text-center text-slate-400 text-sm">Nenhum alerta pendente.</div>
                    ) : (
                      <div className="flex flex-col divide-y divide-white/5">
                        {activeAlerts.map((alert, idx) => (
                          <div key={idx} className="p-4 hover:bg-white/5 transition-colors cursor-pointer" onClick={() => { setAlertsOpen(false); setCurrentPage('compliance'); }}>
                            <div className="flex items-start justify-between gap-2 mb-1">
                               <span className="font-semibold text-white text-sm line-clamp-1">{alert.project}</span>
                               <span className={cn(
                                   "text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full whitespace-nowrap",
                                   alert.status === 'Atrasado' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                               )}>
                                  {alert.status}
                               </span>
                            </div>
                            <div className="text-xs text-slate-400 mb-2">Gargalo: {alert.bottleneck}</div>
                            <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                               <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded-full">{alert.type}</div>
                               <div className="flex items-center gap-1.5 text-[10px] text-amber-400 font-bold uppercase">
                                  <Clock className="w-3 h-3" />
                                  Ação: {alert.dueDate}
                               </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="p-2 border-t border-white/5 bg-slate-900/50">
                     <button 
                       onClick={() => { setAlertsOpen(false); setCurrentPage('compliance'); }}
                       className="w-full py-2 text-center text-xs font-bold text-sky-400 hover:text-white transition-colors"
                     >
                       Ir para Central de Compliance
                     </button>
                  </div>
                </div>
              )}
            </div>
            <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white text-sm font-bold">
              SIE
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-6">
             {renderPage()}
          </div>
        </main>
      </div>
      
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm" 
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
