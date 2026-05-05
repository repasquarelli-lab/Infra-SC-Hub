import React from 'react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend,
  LineChart, Line, XAxis
} from 'recharts';
import { portfolioOverview, conditionTrendData } from '../data/mockData';
import { TrendingUp, Activity, FileCheck2, HardHat } from 'lucide-react';

export default function DashboardOverview() {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white/90">Visão Geral do Portfólio (PMO)</h1>
          <p className="text-slate-400 mt-1 text-sm">Controle de investimentos e saúde da carteira de infraestrutura de SC.</p>
        </div>
        <div className="flex glass rounded-xl p-1 text-sm shadow-sm">
          <button className="px-3 py-1.5 rounded-lg bg-white/10 font-bold text-white shadow-sm">2025 (LOA)</button>
          <button className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-white transition-colors">2026 (PLOA)</button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass p-5 rounded-2xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 flex items-center justify-center text-sky-400 font-bold text-xl">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-xs uppercase tracking-widest font-semibold text-slate-400">Capex Total (Ativo)</h3>
          </div>
          <div className="text-3xl font-bold text-white">{portfolioOverview.totalInvestments}</div>
          <div className="text-xs text-emerald-400 mt-2">↑ Mudança de patamar vs 2019-2022</div>
        </div>

        <div className="glass p-5 rounded-2xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xl">
              <HardHat className="w-5 h-5" />
            </div>
            <h3 className="text-xs uppercase tracking-widest font-semibold text-slate-400">Obras Estruturantes</h3>
          </div>
          <div className="flex items-baseline gap-2">
            <div className="text-3xl font-bold text-white">47</div>
            <div className="text-sm text-slate-300">em andamento</div>
          </div>
          <div className="text-xs text-slate-400 mt-2">Programa Estrada Boa</div>
        </div>

        <div className="glass p-5 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xs uppercase tracking-widest font-semibold text-slate-400">Condição da Malha (%)</h3>
              <span className="text-xs font-bold text-emerald-400 ml-auto">84% Atual</span>
            </div>
          </div>
          <div className="h-16 w-full -ml-2 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={conditionTrendData}>
                <XAxis dataKey="year" hide />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '10px', padding: '4px 8px' }}
                  labelStyle={{ display: 'none' }}
                  itemStyle={{ fill: '#fff' }}
                  formatter={(value: number) => [`${value}%`, 'Condição']}
                />
                <Line type="monotone" dataKey="history" stroke="#10b981" strokeWidth={2} dot={{ r: 0 }} activeDot={{ r: 4 }} />
                <Line type="monotone" dataKey="projection" stroke="#38bdf8" strokeWidth={2} strokeDasharray="3 3" dot={{ r: 0 }} activeDot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between text-[9px] text-slate-500 font-bold uppercase mt-2 border-t border-white/5 pt-2">
            <span>Histórico ('19-'24)</span>
            <span className="text-sky-400">Projeção ('25-'26)</span>
          </div>
        </div>

        <div className="glass p-5 rounded-2xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold text-xl">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h3 className="text-xs uppercase tracking-widest font-semibold text-slate-400">Operações de Crédito</h3>
          </div>
          <div className="text-3xl font-bold text-white">&gt; R$ 1,1 Bi</div>
          <div className="text-xs text-slate-400 mt-2">BNDES, BB, Banco Mundial</div>
        </div>
      </div>

      {/* Main Charts area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass p-6 rounded-2xl lg:col-span-2 flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-white">Distribuição Financeira dos Principais Programas (Milhões R$)</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={portfolioOverview.budgetDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth={2}
                >
                  {portfolioOverview.budgetDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  formatter={(value) => `R$ ${value} mi`}
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ color: '#cbd5e1' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-auto p-4 glass-dark rounded-xl text-sm border-none">
            <span className="font-semibold text-sky-400">Insight Estratégico:</span> <span className="text-slate-300">A carteira deixou de ser unicamente rodoviária. Há forte transição com os R$ 12bi de ferrovias planejadas e R$ 9bi da PPP ViaMar. A integração SPAF, SIE e SEF é mandatória.</span>
          </div>
        </div>

        <div className="glass rounded-2xl overflow-hidden flex flex-col pt-2">
          <div className="p-5 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Atenção Imediata</h3>
            <span className="px-2.5 py-1 rounded-full bg-red-900/50 border border-red-500/20 text-red-300 text-xs font-bold uppercase tracking-wider">3 Alertas</span>
          </div>
          <div className="flex-1 p-5 pt-0 flex flex-col gap-3">
            <div className="glass-dark p-4 rounded-xl flex items-center justify-between">
              <div className="flex gap-4 items-center">
                <div className="w-1.5 h-10 bg-red-500 rounded-full"></div>
                <div>
                  <h4 className="font-medium text-white text-sm">Vale do Itajaí / Foz</h4>
                  <p className="text-xs text-slate-400 mt-1">Duplicação da BR-470 e do PROMOBIS sob risco climático e atraso legal.</p>
                </div>
              </div>
            </div>
            
            <div className="glass-dark p-4 rounded-xl flex items-center justify-between">
              <div className="flex gap-4 items-center">
                <div className="w-1.5 h-10 bg-yellow-500 rounded-full"></div>
                <div>
                  <h4 className="font-medium text-white text-sm">Norte e Litoral Norte</h4>
                  <p className="text-xs text-slate-400 mt-1">Saturação da BR-280 afeta acesso portuário. Necessidade urgente ViaMar.</p>
                </div>
              </div>
            </div>

            <div className="glass-dark p-4 rounded-xl flex items-center justify-between">
              <div className="flex gap-4 items-center">
                <div className="w-1.5 h-10 bg-yellow-500 rounded-full"></div>
                <div>
                  <h4 className="font-medium text-white text-sm">Grande Florianópolis</h4>
                  <p className="text-xs text-slate-400 mt-1">Integração do transporte aquaviário e rodoviário demanda modelagem.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
