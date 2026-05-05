import React from 'react';
import { predictiveAlerts, precipitationData } from '../data/mockData';
import { CloudRain, AlertCircle, Eye, Settings2 } from 'lucide-react';
import { BarChart, Bar, XAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { cn } from '../lib/utils';

export default function PredictiveMaintenance() {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">IoT & Manutenção Preditiva</h1>
          <p className="text-slate-400 mt-1 text-sm">Resiliência climática, monitoramento de pavimentos, pontes e alertas antecipados.</p>
        </div>
        <button className="bg-sky-400 text-slate-900 px-6 py-2 rounded-xl font-bold text-sm hover:bg-sky-300 transition-colors">
          Sincronizar Sensores
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="glass p-5 rounded-2xl relative overflow-hidden flex flex-col justify-between">
           <CloudRain className="absolute right-[-16px] top-[-16px] w-48 h-48 text-white/5 z-0" />
           <div className="relative z-10 mb-4">
              <h3 className="text-xs uppercase tracking-widest font-semibold text-slate-400">Risco Climático Iminente</h3>
              <div className="text-3xl font-bold mt-2 text-red-400">1 Nível Crítico</div>
              <p className="text-[10px] text-slate-300 mt-2 leading-tight">Drenagem e Encostas no Vale do Itajaí</p>
           </div>
           <div className="h-24 w-full relative z-10 -ml-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={precipitationData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <XAxis dataKey="day" hide />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '10px', padding: '4px 8px' }}
                    labelStyle={{ display: 'none' }}
                    itemStyle={{ fill: '#fff' }}
                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  />
                  <Bar dataKey="media" name="Média (mm)" fill="rgba(255,255,255,0.1)" radius={[2, 2, 0, 0]} barSize={12} />
                  <Bar dataKey="atual" name="Atual (mm)" fill="#f87171" radius={[2, 2, 0, 0]} barSize={12} />
                </BarChart>
              </ResponsiveContainer>
           </div>
           <div className="flex justify-between items-center mt-3 pt-2 border-t border-white/5 relative z-10">
             <div className="flex items-center gap-1.5 text-[9px] text-slate-400 font-bold uppercase"><div className="w-2 h-2 rounded-sm bg-white/20"></div> Média</div>
             <div className="flex items-center gap-1.5 text-[9px] text-red-400 font-bold uppercase"><div className="w-2 h-2 rounded-sm bg-red-400"></div> Atual</div>
           </div>
        </div>
        
        <div className="glass p-5 rounded-2xl">
           <h3 className="text-xs uppercase tracking-widest font-semibold text-slate-400">Backlog de OAEs</h3>
           <div className="text-3xl font-bold mt-2 text-white">14 Vistorias</div>
           <p className="text-xs text-yellow-400 mt-2">Pendentes na Litoral Sul</p>
        </div>

        <div className="glass p-5 rounded-2xl">
           <h3 className="text-xs uppercase tracking-widest font-semibold text-slate-400">Economia com Preditiva</h3>
           <div className="text-3xl font-bold mt-2 text-white">R$ 4.2mi</div>
           <p className="text-xs text-emerald-400 mt-2">Evitados em Manutenção Emergencial</p>
        </div>
      </div>

      <div className="glass rounded-2xl overflow-hidden flex flex-col gap-4 p-6">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-sky-400" /> Alertas Ativos da Telemetria (Inspeção Móvel + IoT)
        </h2>
        
        <div className="flex flex-col gap-3">
          {predictiveAlerts.map((alert) => (
            <div key={alert.id} className="glass-dark p-4 rounded-xl flex items-center justify-between">
              <div className="flex gap-4 items-center">
                <div className={cn(
                  "w-1.5 h-12 rounded-full shrink-0",
                  alert.severity === 'Crítico' ? 'bg-red-500' :
                  alert.severity === 'Alto' ? 'bg-orange-500' : 'bg-yellow-500'
                )}></div>
                <div>
                  <div className="flex items-center gap-3">
                    <h4 className="font-medium text-white">{alert.asset}</h4>
                    <span className={cn(
                      "badge px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      alert.severity === 'Crítico' ? 'bg-red-900/50 text-red-300 border border-red-500/20' :
                      alert.severity === 'Alto' ? 'bg-orange-900/50 text-orange-300 border border-orange-500/20' : 
                      'bg-yellow-900/50 text-yellow-300 border border-yellow-500/20'
                    )}>{alert.type}</span>
                  </div>
                  <p className="text-sm text-slate-400 mt-1">{alert.message}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0 hidden sm:flex">
                <span className="text-xs text-slate-500">{alert.date}</span>
                <div className="flex gap-2">
                    <button className="px-3 py-1.5 glass text-slate-300 rounded-lg hover:bg-white/10 font-medium flex items-center gap-1.5 text-xs">
                        <Eye className="w-3.5 h-3.5" /> Dados
                    </button>
                    <button className="px-3 py-1.5 bg-sky-500/20 text-sky-300 border border-sky-500/20 rounded-lg hover:bg-sky-500/30 font-medium flex items-center gap-1.5 text-xs">
                        <Settings2 className="w-3.5 h-3.5" /> Gerar OS
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
