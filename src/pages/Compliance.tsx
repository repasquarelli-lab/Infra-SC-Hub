import React, { useState } from 'react';
import { complianceStatus, projectDependencies } from '../data/mockData';
import { ShieldCheck, Scale, FileText, CheckCircle2, ChevronDown, ChevronUp, History, User2, Filter, Link2 } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Compliance() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('Todos');

  const toggleExpand = (idx: number) => {
    if (expandedId === idx) {
      setExpandedId(null);
    } else {
      setExpandedId(idx);
    }
  };

  const filteredStatus = complianceStatus.filter(item => statusFilter === 'Todos' || item.status === statusFilter);

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Compliance Socioambiental</h1>
          <p className="text-slate-400 mt-1 text-sm">Controle de licenças, desapropriações e engajamento para evitar judicializações.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="glass p-5 rounded-2xl flex flex-col justify-center items-center text-center">
            <ShieldCheck className="w-8 h-8 text-emerald-400 mb-3" />
            <div className="text-3xl font-bold text-white">12</div>
            <div className="text-xs uppercase tracking-widest text-slate-400 font-semibold mt-1">Licenças Emitidas</div>
        </div>
        <div className="glass p-5 rounded-2xl flex flex-col justify-center items-center text-center">
            <Scale className="w-8 h-8 text-yellow-400 mb-3" />
            <div className="text-3xl font-bold text-white">4 Risc.</div>
            <div className="text-xs uppercase tracking-widest text-slate-400 font-semibold mt-1">Judicializações Evitadas</div>
        </div>
        <div className="glass p-5 rounded-2xl flex flex-col justify-center items-center text-center">
            <FileText className="w-8 h-8 text-sky-400 mb-3" />
            <div className="text-3xl font-bold text-white">45</div>
            <div className="text-xs uppercase tracking-widest text-slate-400 font-semibold mt-1">Processos Desaprop.</div>
        </div>
        <div className="glass p-5 rounded-2xl flex flex-col justify-center items-center text-center">
            <div className="text-xs font-bold text-sky-300 bg-sky-900/40 border border-sky-500/20 px-3 py-1 rounded-full mb-3 uppercase tracking-widest">Escrow Data Room</div>
            <div className="text-sm text-slate-300">Prontidão PPPs: <strong className="text-white">ViaMar</strong></div>
        </div>
      </div>

      <div className="glass rounded-2xl overflow-hidden flex flex-col p-6 gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-white">Gaps e Gargalos (Visão de Risco)</h2>
          <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-2 sm:pb-0">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <div className="flex gap-1">
              {['Todos', 'Atrasado', 'Alerta', 'Em Dia'].map(status => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors",
                    statusFilter === status 
                      ? "bg-sky-500 text-white" 
                      : "glass text-slate-400 hover:text-white"
                  )}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-3">
          {filteredStatus.length === 0 ? (
             <div className="text-center py-8 text-slate-500 text-sm">Nenhum projeto encontrado para o filtro selecionado.</div>
          ) : (
            filteredStatus.map((item, idx) => {
              const isExpanded = expandedId === idx;
              return (
                <div key={idx} className="glass-dark p-4 rounded-xl flex flex-col transition-all duration-300">
                  <div 
                    className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between cursor-pointer group"
                    onClick={() => toggleExpand(idx)}
                  >
                      <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                              <h4 className="font-medium text-white group-hover:text-amber-400 transition-colors">{item.project}</h4>
                              <span className="px-2 py-0.5 glass border-white/10 rounded-full text-[10px] uppercase tracking-wider text-slate-300 font-bold">
                                  {item.type}
                              </span>
                          </div>
                          <p className="text-sm text-slate-400 mt-1 flex items-center gap-1.5 pt-1">
                              <span className="font-medium">Gargalo:</span> 
                              <span className={cn(
                                "px-2.5 py-0.5 rounded flex items-center gap-1.5",
                                (item.status === 'Atrasado' || item.status === 'Alerta') 
                                  ? "bg-red-500/10 text-red-300 border border-red-500/20 font-medium" 
                                  : "text-slate-300"
                              )}>
                                {(item.status === 'Atrasado' || item.status === 'Alerta') && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></span>
                                )}
                                {item.bottleneck}
                              </span>
                          </p>
                      </div>
                      
                      <div className="min-w-[200px] flex items-center justify-between sm:justify-end gap-6">
                          <div className="w-full sm:w-[150px]">
                              <div className="flex justify-between items-end mb-2">
                                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Progresso</span>
                                  <span className="text-sm font-bold text-white">{item.progress}%</span>
                              </div>
                              <div className="h-2 glass rounded-full overflow-hidden">
                                  <div 
                                    className={cn(
                                        "h-full rounded-full transition-all duration-500",
                                        item.status === 'Atrasado' ? 'bg-red-500' : item.status === 'Alerta' ? 'bg-yellow-500' : 'bg-emerald-500'
                                    )}
                                    style={{ width: `${item.progress}%` }}
                                  ></div>
                              </div>
                              <div className="text-right mt-1">
                                 <span className={cn(
                                     "text-[10px] font-bold uppercase tracking-wider",
                                     item.status === 'Atrasado' ? 'text-red-400' : item.status === 'Alerta' ? 'text-yellow-400' : 'text-emerald-400'
                                 )}>{item.status}</span>
                              </div>
                          </div>
                          <div className="text-slate-500 group-hover:text-slate-300 transition-colors">
                            {isExpanded ? <ChevronUp className="w-5 h-5"/> : <ChevronDown className="w-5 h-5"/>}
                          </div>
                      </div>
                  </div>
                  
                  {isExpanded && item.details && (
                    <div className="mt-4 pt-4 border-t border-white/10 animate-in fade-in slide-in-from-top-2">
                       <div className="flex items-center gap-2 text-sm text-slate-300 mb-4">
                         <User2 className="w-4 h-4 text-sky-400" />
                         <span className="font-semibold">Responsável:</span> {item.details.responsible}
                       </div>
                       
                       <div className="space-y-3">
                         <h5 className="text-xs uppercase tracking-widest font-bold text-slate-500 flex items-center gap-2">
                            <History className="w-3.5 h-3.5" />
                            Histórico de Ações
                         </h5>
                         <div className="pl-2 border-l border-white/10 space-y-4 relative ml-1">
                            {item.details.history.map((hist, hIdx) => (
                              <div key={hIdx} className="relative pl-4">
                                 <div className="absolute -left-[29px] top-1.5 w-2 h-2 rounded-full bg-sky-500/50 border border-sky-400 outline outline-4 outline-slate-900" style={{ transform: 'translateX(9px)' }}></div>
                                 <span className="text-[10px] font-bold text-sky-400 block mb-0.5">{hist.date}</span>
                                 <p className="text-sm text-slate-300">{hist.action}</p>
                              </div>
                            ))}
                         </div>
                       </div>
                    </div>
                  )}
              </div>
            );
          }))}
        </div>
      </div>

      <div className="glass rounded-2xl p-6 mt-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Link2 className="w-4 h-4" />
          </div>
          <h2 className="text-lg font-semibold text-white">Dependências de Projetos</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projectDependencies.map((proj, idx) => (
            <div key={idx} className="glass-dark p-4 rounded-xl shadow-lg border border-white/5">
              <h3 className="font-bold text-white mb-3 pb-3 border-b border-white/5 flex items-center justify-between">
                {proj.project}
              </h3>
              <ul className="space-y-3">
                {proj.dependencies.map((dep, depIdx) => (
                  <li key={depIdx} className="flex justify-between items-center gap-4">
                    <span className="text-sm text-slate-300 leading-tight flex-1">{dep.name}</span>
                    <span className={cn(
                        "text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full shrink-0",
                        dep.status === 'Atrasado' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 
                        dep.status === 'Alerta' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' : 
                        'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    )}>
                      {dep.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
