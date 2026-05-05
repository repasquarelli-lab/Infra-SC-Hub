export const portfolioOverview = {
  totalInvestments: "R$ 31.8 Bilhões",
  activeProjects: 147,
  corridors: 7,
  budgetDistribution: [
    { name: "Ferrovias (Chapecó/Araquari)", value: 12000, color: "#38bdf8" }, // sky-400
    { name: "ViaMar (Rodoviário)", value: 9000, color: "#10b981" }, // emerald-500
    { name: "Estrada Boa (Rodovias)", value: 3500, color: "#818cf8" }, // indigo-400
    { name: "Estrada Boa Rural", value: 2500, color: "#f472b6" }, // pink-400
    { name: "PROMOBIS (Túnel/BRT)", value: 1700, color: "#facc15" }, // yellow-400
    { name: "Obras Hídricas / Mitigação", value: 342, color: "#94a3b8" }, // slate-400
  ],
};

export const conditionTrendData = [
  { year: "2019", history: 27 },
  { year: "2020", history: 34 },
  { year: "2021", history: 45 },
  { year: "2022", history: 58 },
  { year: "2023", history: 72 },
  { year: "2024", history: 84, projection: 84 },
  { year: "2025", projection: 88 },
  { year: "2026", projection: 92 },
];

export const regionsData = [
  { region: "Norte e Litoral Norte", demand: "Acesso portuário (BR-280), Ferrovias", priority: "Muito alta", status: "Em estruturação", risk: "Atrasos no licenciamento" },
  { region: "Vale do Itajaí / Foz", demand: "Duplicação BR-470, PROMOBIS, Dragagem", priority: "Muito alta", status: "Obras em andamento", risk: "Risco hidrológico/Climático" },
  { region: "Grande Florianópolis", demand: "SC-401, Transporte Aquaviário, Integração", priority: "Muito alta", status: "Estudos / Planejamento", risk: "Governança interfederativa" },
  { region: "Sul", demand: "Acesso Porto de Imbituba, Aeroportos", priority: "Alta", status: "Projetos", risk: "Manutenção e SLA" },
  { region: "Oeste / Meio-Oeste", demand: "Conectividade agroindustrial, Ferrovias", priority: "Muito alta", status: "Estudos / Viabilidade", risk: "Dependência rodoviária" },
];

export const precipitationData = [
  { day: 'Sex', atual: 15, media: 12 },
  { day: 'Sáb', atual: 45, media: 15 },
  { day: 'Dom', atual: 80, media: 20 },
  { day: 'Seg', atual: 120, media: 25 },
  { day: 'Ter', atual: 95, media: 18 },
  { day: 'Qua', atual: 10, media: 15 },
];

export const predictiveAlerts = [
  { id: "A01", type: "Climático", asset: "BR-470 / KM 45", severity: "Crítico", message: "Risco de deslizamento de encosta devido a chuvas acumuladas (120mm em 48h).", date: "Hoje, 09:30" },
  { id: "A02", type: "Pavimento", asset: "SC-401", severity: "Médio", message: "Degradação acelerada detectada por inspeção IoT na faixa da direita.", date: "Ontem, 14:15" },
  { id: "A03", type: "Drenagem", asset: "Acesso Porto Itajaí", severity: "Alto", message: "Obstrução de galeria pluvial identificada superior a 60%.", date: "2 dias atrás" },
];

export const complianceStatus = [
  { 
    project: "ViaMar (Litorâneo Norte)", 
    type: "Licenciamento", 
    status: "Atrasado", 
    progress: 35, 
    bottleneck: "IBAMA / Estudos de Fauna",
    details: {
      responsible: "Consórcio ViaMar / SIE",
      history: [
        { date: "10/08/2024", action: "Notificação do IBAMA solicitando complemento de estudos fauna/flora." },
        { date: "25/08/2024", action: "Contratação de consultoria ambiental para realizar o laudo estendido." },
        { date: "05/09/2024", action: "Previsão de entrega do estudo adicional." }
      ]
    }
  },
  { 
    project: "PROMOBIS (Túnel Imerso)", 
    type: "Desapropriação", 
    status: "Em Dia", 
    progress: 60, 
    bottleneck: "Negociações locais",
    details: {
      responsible: "AMFRI / Prefeituras",
      history: [
        { date: "01/08/2024", action: "Início das negociações com proprietários da Foz do Itajaí." },
        { date: "15/08/2024", action: "50% dos acordos amigáveis firmados." },
        { date: "02/09/2024", action: "Abertura de processos judiciais para casos litigiosos." }
      ]
    }
  },
  { 
    project: "Ferrovia Chapecó-Litoral", 
    type: "Acesso Fundiário", 
    status: "Alerta", 
    progress: 20, 
    bottleneck: "Liberação de propriedades",
    details: {
      responsible: "SPAF / Procuradoria",
      history: [
        { date: "20/07/2024", action: "Mapeamento das propriedades bloqueadas concluído." },
        { date: "12/08/2024", action: "Notificação expedida para 45 propriedades críticas." }
      ]
    }
  },
  { 
    project: "Estrada Boa (Lote 3)", 
    type: "PBA (Ambiental)", 
    status: "Em Dia", 
    progress: 85, 
    bottleneck: "Nenhum",
    details: {
      responsible: "SIE / IMA",
      history: [
        { date: "15/07/2024", action: "Relatório de conformidade entregue ao IMA." },
        { date: "28/08/2024", action: "Inspeção em campo realizada sem não-conformidades graves." }
      ]
    }
  },
];

export const projectDependencies = [
  {
    project: "ViaMar (Litorâneo Norte)",
    dependencies: [
      { name: "Licenciamento Ambiental Prévio (LAP)", status: "Atrasado" },
      { name: "Estudos de Impacto de Vizinhança (EIV)", status: "Em Dia" },
      { name: "Projeto Executivo de Engenharia", status: "Alerta" }
    ]
  },
  {
    project: "PROMOBIS (Túnel Imerso)",
    dependencies: [
      { name: "Desapropriação na Foz do Itajaí", status: "Em Dia" },
      { name: "Aprovação Marinha do Brasil", status: "Alerta" },
      { name: "Licitação Internacional Concluída", status: "Atrasado" }
    ]
  },
  {
    project: "Ferrovia Chapecó-Litoral",
    dependencies: [
      { name: "Liberação de Faixa de Domínio", status: "Alerta" },
      { name: "Projeto Básico de Engenharia", status: "Em Dia" },
      { name: "Licença de Instalação (LI)", status: "Atrasado" }
    ]
  }
];
