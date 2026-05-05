import React, { useState } from 'react';
import { regionsData } from '../data/mockData';
import { MapPin, Route, Ship, Train, FileCheck2, Filter, X } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Corridors() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [tooltipInfo, setTooltipInfo] = useState<{ id: string, x: number, y: number } | null>(null);
  const [activeMapLayer, setActiveMapLayer] = useState<'topology' | 'density' | 'investment'>('topology');

  const heatmapData = [
    { 
      region: 'Norte e Litoral Norte', 
      modais: [
        { name: 'Rodovias', density: 85, investment: 'R$ 2.1 Bi' },
        { name: 'Ferrovias', density: 90, investment: 'R$ 8.5 Bi' },
        { name: 'Portos', density: 95, investment: 'R$ 1.2 Bi' },
        { name: 'Aero', density: 30, investment: 'R$ 50 Mi' }
      ]
    },
    { 
      region: 'Vale do Itajaí / Foz', 
      modais: [
        { name: 'Rodovias', density: 95, investment: 'R$ 3.5 Bi' },
        { name: 'Ferrovias', density: 20, investment: 'E. Viab.' },
        { name: 'Portos', density: 85, investment: 'R$ 800 Mi' },
        { name: 'Aero', density: 20, investment: 'R$ 20 Mi' }
      ]
    },
    { 
      region: 'Grande Florianópolis', 
      modais: [
        { name: 'Rodovias', density: 85, investment: 'R$ 1.8 Bi' },
        { name: 'Ferrovias', density: 10, investment: '-' },
        { name: 'Portos', density: 10, investment: '-' },
        { name: 'Aero', density: 70, investment: 'R$ 300 Mi' }
      ]
    },
    { 
      region: 'Sul', 
      modais: [
        { name: 'Rodovias', density: 75, investment: 'R$ 1.1 Bi' },
        { name: 'Ferrovias', density: 50, investment: 'R$ 2.5 Bi' },
        { name: 'Portos', density: 80, investment: 'R$ 900 Mi' },
        { name: 'Aero', density: 40, investment: 'R$ 120 Mi' }
      ]
    },
    { 
      region: 'Oeste / Meio-Oeste', 
      modais: [
        { name: 'Rodovias', density: 90, investment: 'R$ 2.8 Bi' },
        { name: 'Ferrovias', density: 65, investment: 'R$ 4.2 Bi' },
        { name: 'Portos', density: 0, investment: '-' },
        { name: 'Aero', density: 55, investment: 'R$ 250 Mi' }
      ]
    },
  ];

  const mapNodes = [
    { id: 'Oeste / Meio-Oeste', x: 100, y: 100, label: 'Oeste/Meio-Oeste' },
    { id: 'Norte e Litoral Norte', x: 280, y: 40, label: 'Norte / Litoral' },
    { id: 'Vale do Itajaí / Foz', x: 280, y: 100, label: 'Vale do Itajaí' },
    { id: 'Grande Florianópolis', x: 300, y: 140, label: 'Florianópolis' },
    { id: 'Sul', x: 250, y: 180, label: 'Sul' },
  ];

  const connections = [
    { from: 'Oeste / Meio-Oeste', to: 'Vale do Itajaí / Foz' },
    { from: 'Norte e Litoral Norte', to: 'Vale do Itajaí / Foz' },
    { from: 'Vale do Itajaí / Foz', to: 'Grande Florianópolis' },
    { from: 'Grande Florianópolis', to: 'Sul' },
  ];

  const filteredRegionsData = selectedRegion ? regionsData.filter(r => r.region === selectedRegion) : regionsData;
  const filteredHeatmapData = selectedRegion ? heatmapData.filter(r => r.region === selectedRegion) : heatmapData;

  const handleNodeClick = (id: string) => {
    setSelectedRegion(prev => prev === id ? null : id);
  };

  const getAggregatedData = (regionId: string) => {
    const regionData = heatmapData.find(d => d.region === regionId || d.region.includes(regionId.split('/')[0].trim()));
    if (!regionData) return { densityAvg: 0, totalInvestVal: 0, formattedInvest: 'R$ 0' };
    
    let validModais = regionData.modais.filter(m => m.density > 0);
    const densityAvg = validModais.length > 0 ? validModais.reduce((acc, curr) => acc + curr.density, 0) / validModais.length : 0;
    
    let totalMi = 0;
    regionData.modais.forEach(curr => {
        if (curr.investment !== '-' && curr.investment !== 'E. Viab.') {
            let val = parseFloat(curr.investment.replace(/[^0-9.]/g, ''));
            if (curr.investment.includes('Bi')) val *= 1000;
            if (!isNaN(val)) totalMi += val;
        }
    });
    
    let formattedInvest = totalMi >= 1000 ? `R$ ${(totalMi/1000).toFixed(1)} Bi` : `R$ ${totalMi} Mi`;
    if (totalMi === 0) formattedInvest = '-';

    return { densityAvg, totalInvestVal: totalMi, formattedInvest };
  };

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white/90">Gestão por Corredor Multimodal</h1>
          <p className="text-slate-400 mt-1 text-sm">A visão deixou de ser 'obra isolada' para integração de rotas porto-rodovia-ferrovia.</p>
        </div>
        {selectedRegion && (
          <button 
            onClick={() => setSelectedRegion(null)}
            className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-sm font-bold text-sky-400 hover:text-white transition-colors"
          >
            <Filter className="w-4 h-4" /> Limpar Filtro
            <X className="w-4 h-4 ml-2 opacity-50" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Interactive Topological Map */}
        <div className="glass rounded-2xl p-6 flex flex-col lg:col-span-1 min-h-[350px]">
          <div className="flex justify-between items-start z-10 relative">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Mapa Topológico</h3>
              <p className="text-xs text-slate-400">Selecione para filtrar, ou altere a camada:</p>
            </div>
          </div>
          
          <div className="relative z-20 mt-4 flex gap-2 flex-wrap">
             <button onClick={() => setActiveMapLayer('topology')} className={cn("px-2.5 py-1 text-[10px] uppercase tracking-widest rounded transition-colors font-bold", activeMapLayer === 'topology' ? "bg-sky-500 text-white" : "glass text-slate-400 hover:text-white border border-white/5 border-b-white/10")}>Topologia</button>
             <button onClick={() => setActiveMapLayer('density')} className={cn("px-2.5 py-1 text-[10px] uppercase tracking-widest rounded transition-colors font-bold", activeMapLayer === 'density' ? "bg-emerald-500 text-white" : "glass text-slate-400 hover:text-white border border-white/5 border-b-white/10")}>Densidade</button>
             <button onClick={() => setActiveMapLayer('investment')} className={cn("px-2.5 py-1 text-[10px] uppercase tracking-widest rounded transition-colors font-bold", activeMapLayer === 'investment' ? "bg-purple-500 text-white" : "glass text-slate-400 hover:text-white border border-white/5 border-b-white/10")}>Investimento</button>
          </div>
          
          <div className="relative flex-1 mt-6 min-h-[200px] pointer-events-none">
            <svg viewBox="0 0 400 220" className="absolute inset-0 w-full h-full drop-shadow-xl pointer-events-auto" preserveAspectRatio="xMidYMid meet">
              {/* Draw connections */}
              {connections.map((conn, idx) => {
                const fromNode = mapNodes.find(n => n.id === conn.from);
                const toNode = mapNodes.find(n => n.id === conn.to);
                if (!fromNode || !toNode) return null;
                const isHighlighted = !selectedRegion || selectedRegion === conn.from || selectedRegion === conn.to;
                return (
                  <line 
                    key={idx}
                    x1={fromNode.x} y1={fromNode.y}
                    x2={toNode.x} y2={toNode.y}
                    stroke={isHighlighted ? "rgba(56, 189, 248, 0.4)" : "rgba(255, 255, 255, 0.05)"}
                    strokeWidth="3"
                    strokeDasharray="6 4"
                    className="transition-all duration-300"
                  />
                );
              })}

              {/* Draw nodes */}
              {mapNodes.map((node) => {
                const isSelected = selectedRegion === node.id;
                const isDimmed = selectedRegion && !isSelected;
                const data = getAggregatedData(node.id);
                
                let baseR = 10;
                let fill = "rgba(56, 189, 248, 0.2)";
                let stroke = "#38bdf8";
                
                if (activeMapLayer === 'density') {
                   baseR = 10 + (data.densityAvg / 100) * 15;
                   fill = `rgba(16, 185, 129, ${(data.densityAvg / 100) * 0.8 + 0.2})`;
                   stroke = "#10b981";
                } else if (activeMapLayer === 'investment') {
                   const investRatio = Math.min(data.totalInvestVal / 12000, 1);
                   baseR = 10 + investRatio * 20;
                   fill = `rgba(168, 85, 247, ${investRatio * 0.8 + 0.2})`;
                   stroke = "#a855f7";
                } else {
                   if (isSelected) {
                     fill = "#38bdf8";
                     stroke = "#fff";
                   }
                }
                
                const finalR = isSelected ? baseR + 4 : baseR;

                return (
                  <g 
                    key={node.id} 
                    transform={`translate(${node.x}, ${node.y})`}
                    className={cn("cursor-pointer transition-all duration-300", isDimmed ? "opacity-30 grayscale" : "opacity-100 hover:scale-110")}
                    onClick={() => handleNodeClick(node.id)}
                    onMouseEnter={(e) => setTooltipInfo({ id: node.id, x: e.clientX, y: e.clientY })}
                    onMouseMove={(e) => setTooltipInfo({ id: node.id, x: e.clientX, y: e.clientY })}
                    onMouseLeave={() => setTooltipInfo(null)}
                  >
                    <circle 
                      r={finalR} 
                      fill={fill}
                      stroke={stroke}
                      strokeWidth={isSelected ? "3" : "2"}
                      className="transition-all duration-300 shadow-lg"
                    />
                    {isSelected && (
                      <circle r={finalR + 6} fill="transparent" stroke={stroke} strokeWidth="1" className="animate-ping opacity-50" />
                    )}
                    {(activeMapLayer === 'density' || activeMapLayer === 'investment') && (
                       <text y="4" textAnchor="middle" className="text-[9px] font-bold fill-white opacity-80 pointer-events-none">
                         {activeMapLayer === 'density' ? `${Math.round(data.densityAvg)}%` : (data.totalInvestVal > 0 ? (data.totalInvestVal >= 1000 ? `${(data.totalInvestVal/1000).toFixed(1)}Bi` : `${data.totalInvestVal}Mi`) : '-')}
                       </text>
                    )}
                    <text 
                      y={finalR + 15} 
                      textAnchor="middle" 
                      className={cn("text-[10px] font-bold tracking-widest", isSelected ? "fill-white" : "fill-slate-300")}
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        <div className="glass rounded-2xl p-6 flex flex-col relative overflow-hidden lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-white">Heatmap: Densidade por Região</h3>
                <p className="text-xs text-slate-400 mt-1">Interaja com a matriz para ver o Capex</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                 <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Densidade</span>
                 <div className="w-20 h-2 rounded-full bg-gradient-to-r from-sky-400/10 to-sky-400 border border-white/10"></div>
              </div>
            </div>
            
            <div className="flex flex-col gap-2 flex-1 justify-center overflow-x-auto pb-4 custom-scrollbar">
              <div className="min-w-[400px]">
                <div className="flex gap-2">
                   <div className="w-20 sm:w-24 shrink-0"></div>
                   {['Rodovias', 'Ferrovias', 'Portos', 'Aero'].map(m => (
                     <div key={m} className="flex-1 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">{m}</div>
                   ))}
                </div>
                {filteredHeatmapData.map((row) => (
                  <div key={row.region} className="flex gap-2 items-center mt-2">
                    <div className="w-20 sm:w-24 shrink-0 text-[10px] sm:text-[11px] font-bold text-slate-300 text-right pr-2 leading-tight uppercase tracking-wider truncate" title={row.region}>
                      {row.region.split('/')[0].trim()}
                    </div>
                    {row.modais.map((cell) => {
                       const opacity = cell.density === 0 ? 0.02 : (cell.density / 100) * 0.8 + 0.1;
                       return (
                         <div 
                           key={cell.name}
                           className="flex-1 h-10 sm:h-12 rounded-lg relative cursor-pointer overflow-hidden group transition-all duration-300 border border-white/5 hover:border-white/30 hover:scale-[1.02] hover:z-10 shadow-sm"
                           style={{ backgroundColor: `rgba(56, 189, 248, ${opacity})` }}
                         >
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/60 backdrop-blur-md">
                               <span className="text-[10px] sm:text-xs font-bold text-white tracking-widest uppercase">{cell.investment}</span>
                            </div>
                            {cell.density > 0 && <div className="absolute bottom-1 right-1.5 text-[8px] font-bold text-white/50 group-hover:opacity-0 transition-opacity">{cell.density}%</div>}
                         </div>
                       )
                    })}
                  </div>
                ))}
                {filteredHeatmapData.length === 0 && (
                  <div className="text-center text-slate-500 py-4 text-sm">Nenhum dado encontrado para esta região.</div>
                )}
              </div>
            </div>
         </div>
      </div>

      <div className="glass rounded-2xl overflow-hidden mb-6">
        <div className="p-5 glass-dark border-b border-white/5 flex items-center justify-between">
          <div className="flex gap-4">
            <span className="flex items-center gap-1.5 text-sm font-medium text-slate-200"><Route className="w-4 h-4 text-emerald-400" /> Rodovias</span>
            <span className="flex items-center gap-1.5 text-sm font-medium text-slate-200"><Train className="w-4 h-4 text-sky-400" /> Ferrovias</span>
            <span className="flex items-center gap-1.5 text-sm font-medium text-slate-200"><Ship className="w-4 h-4 text-blue-400" /> Portos</span>
          </div>
        </div>
        <div className="hidden md:block overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="glass-dark border-b border-white/5 text-xs uppercase text-slate-400 font-semibold tracking-wider">
              <tr>
                <th className="px-6 py-4">Região Logística</th>
                <th className="px-6 py-4">Gargalos / Demanda Dominante</th>
                <th className="px-6 py-4">Impacto Econ.</th>
                <th className="px-6 py-4">Status Hub</th>
                <th className="px-6 py-4">Risco Principal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredRegionsData.map((region, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium text-white flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-sky-400" />
                    {region.region}
                  </td>
                  <td className="px-6 py-4">{region.demand}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap",
                      region.priority === "Muito alta" ? "bg-red-900/50 text-red-300 border border-red-500/20" : "bg-yellow-900/50 text-yellow-300 border border-yellow-500/20"
                    )}>
                      {region.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4"><span className="px-3 py-1 glass-dark rounded-full text-white text-xs whitespace-nowrap">{region.status}</span></td>
                  <td className="px-6 py-4 text-slate-400">{region.risk}</td>
                </tr>
              ))}
              {filteredRegionsData.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">Nenhuma região corresponde aos critérios.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col md:hidden divide-y divide-white/5">
          {filteredRegionsData.length === 0 ? (
            <div className="px-6 py-8 text-center text-slate-500">Nenhuma região corresponde aos critérios.</div>
          ) : (
            filteredRegionsData.map((region, idx) => (
              <div key={idx} className="p-5 flex flex-col gap-3 hover:bg-white/5 transition-colors">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="font-medium text-white flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-sky-400" />
                    {region.region}
                  </div>
                  <span className={cn(
                    "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap",
                    region.priority === "Muito alta" ? "bg-red-900/50 text-red-300 border border-red-500/20" : "bg-yellow-900/50 text-yellow-300 border border-yellow-500/20"
                  )}>
                    {region.priority}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold block mb-1">Gargalos / Demanda Dominante</span>
                  <p className="text-sm text-slate-300">{region.demand}</p>
                </div>
                <div className="flex flex-wrap gap-4 mt-1">
                  <div className="flex-1 min-w-[120px]">
                    <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold block mb-1">Risco Principal</span>
                    <p className="text-sm text-slate-400">{region.risk}</p>
                  </div>
                  <div className="text-left w-full sm:w-auto">
                    <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold block mb-1">Status Hub</span>
                    <span className="px-3 py-1 glass-dark rounded-full text-white text-[10px] inline-block">{region.status}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {tooltipInfo && (
        <div 
          className="fixed z-50 pointer-events-none transform -translate-x-1/2 -translate-y-[calc(100%+16px)]"
          style={{ left: tooltipInfo.x, top: tooltipInfo.y }}
        >
          <div className="glass-dark border border-white/20 p-3 rounded-xl shadow-2xl w-56 backdrop-blur-xl bg-slate-900/90">
            <h4 className="font-bold text-white text-sm mb-3 border-b border-white/10 pb-2">{tooltipInfo.id}</h4>
            <div className="flex flex-col gap-2">
              {heatmapData.find(d => d.region === tooltipInfo.id)?.modais.map(m => (
                <div key={m.name} className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-medium">{m.name}</span>
                  <div className="text-right">
                     {m.investment !== '-' && <span className="text-sky-400 font-bold block leading-none mb-0.5">{m.investment}</span>}
                     {m.density > 0 && <span className="text-[10px] text-emerald-400 uppercase tracking-widest">{m.density}% Dens.</span>}
                     {m.density === 0 && <span className="text-[10px] text-slate-500 uppercase tracking-widest">Sem infra.</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
