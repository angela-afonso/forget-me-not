import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Users, Stethoscope, AlertTriangle, Bell, Calendar, UserPlus, ClipboardList,
  BarChart3, Activity, Search, Heart, LogOut, Pill, Clock, FileText,
  MessageSquare, Shield, Eye, ChevronRight, TrendingUp, TrendingDown, Menu, X
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import Logo from "../components/ui/logo"
import LogoTcs from "../components/ui/tcs-logo"
import MobileMenu from "@/components/ui/mobile-menu";

const severityStyles = {
  danger: "border-destructive/30 text-destructive bg-destructive/5",
  warning: "border-warning/30 text-warning bg-warning/5",
  info: "border-info/30 text-info bg-info/5",
  success: "border-green-500/30 text-green-600 bg-green-500/5",
};

const activityData = [
  { day: "Seg", presença: 85 },
  { day: "Ter", presença: 90 },
  { day: "Qua", presença: 78 },
  { day: "Qui", presença: 92 },
  { day: "Sex", presença: 88 }
];

const evolutionData = [
  { day: "Seg", estável: 30, melhora: 12, piora: 3 },
  { day: "Ter", estável: 28, melhora: 14, piora: 3 },
  { day: "Qua", estável: 32, melhora: 10, piora: 3 },
  { day: "Qui", estável: 29, melhora: 15, piora: 1 },
  { day: "Sex", estável: 31, melhora: 13, piora: 1 },
];

const presenceData = [
  { name: "Participaram", value: 38, color: "hsl(142, 71%, 45%)" },
  { name: "Atrasados", value: 5, color: "hsl(38, 92%, 50%)" },
  { name: "Não compareceram", value: 2, color: "hsl(0, 72%, 51%)" },
];

const alertPatients = [
  { id: 1, name: "Maria da Silva", age: 82, stage: "Moderado", alert: "Presença não confirmada hoje", type: "warning", avatar: "MS" },
  { id: 2, name: "José Santos", age: 78, stage: "Leve", alert: "Participação confirmada na oficina", type: "success", avatar: "JS" },
  { id: 3, name: "Ana Oliveira", age: 85, stage: "Avançado", alert: "Observação crítica", type: "danger", avatar: "AO" },
  { id: 4, name: "Carlos Pereira", age: 90, stage: "Moderado", alert: "Necessita acompanhamento individual", type: "info", avatar: "CP" },
];

const notifications = [
  { id: 1, type: "info", icon: ClipboardList, text: "3 participantes confirmados para a oficina de música", time: "5 min" },
  { id: 2, type: "info", icon: Calendar, text: "Oficina de estimulação cognitiva inicia em 15 minutos", time: "10 min" },
  { id: 3, type: "danger", icon: FileText, text: "Documento pendente: Laudo de José Santos", time: "2h" },
  { id: 4, type: "warning", icon: Calendar, text: "Nova observação registrada pela equipe sobre Maria da Silva", time: "3h" },
];

const agenda = [
  { time: "08:00", event: "Recepção e acolhimento dos participantes", type: "atividade" },
  { time: "09:30", event: "Terapia cognitiva - Turma A", type: "atividade" },
  { time: "10:00", event: "Fisioterapia em grupo", type: "atividade" },
  { time: "14:00", event: "Reunião de equipe", type: "evento" },
  { time: "15:30", event: "Atividade recreativa", type: "atividade" },
];

const comunicados = [
  { id: 1, title: "Treinamento de primeiros socorros", date: "25/02", priority: false },
  { id: 2, title: "Alerta: surto de gripe na região", date: "24/02", priority: true },
  { id: 3, title: "Novos eventos em breve", date: "23/02", priority: false },
];

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-primary sticky top-0 z-[9999]">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-8 py-3 flex items-center relative">
          <div className="flex items-center justify-between w-full">
            {/* Left */}
            <div className="flex items-center gap-2 min-w-0">
              <div className="bg-white/90 backdrop-blur-md border border-white/40 rounded-xl px-4 py-2 shadow-md">
                <div className="flex items-center gap-4">
                  <Logo className="h-[40px] sm:h-[50px] lg:h-[50px] w-auto" />
                  <LogoTcs className="h-[25px] sm:h-[25px] lg:h-[25px] w-auto opacity-80" />
                </div>
              </div>
              <p className={`text-xs sm:text-sm md:text-base text-primary-foreground/90 break-words whitespace-normal hidden lg:block`}>
                Painel de Controle
              </p>
            </div>

            {/* Right (desktop) */}
            <div className="flex items-center gap-3">
              {/* Search (desktop only) */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/50" />
                <Input
                  placeholder="Buscar participante, cuidador..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-72 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 h-9"
                />
              </div>

              {/* Bell (always) */}
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-primary-foreground/10 relative"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full text-[10px] text-destructive-foreground flex items-center justify-center font-bold">
                  3
                </span>
              </Button>

              {/* Logout (desktop only) */}
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-primary-foreground/10"
                onClick={() => navigate("/")}
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Mobile search */}
        <div className="lg:hidden relative">
          <p className="text-lg sm:text-lg md:text-lg bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent break-words whitespace-normal text-center">
            Painel de Controle
          </p>
        </div>
        <div className="md:hidden relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar paciente, cuidador..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* 1. Resumo Geral */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Residentes ativos", value: "143", icon: Users, trend: "+2", color: "text-primary" },
            { label: "Cuidadores", value: "12", icon: Stethoscope, trend: "0", color: "text-secondary" },
            { label: "Internados", value: "8", icon: Activity, trend: "-1", color: "text-info" },
            { label: "Alertas críticos", value: "3", icon: AlertTriangle, trend: "+1", color: "text-destructive" },
          ].map((stat) => (
            <Card key={stat.label} className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
                    <p className="text-3xl font-bold text-foreground mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-2 rounded-xl bg-accent`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  {parseInt(stat.trend) > 0 ? (
                    <TrendingUp className="w-3 h-3 text-success" />
                  ) : parseInt(stat.trend) < 0 ? (
                    <TrendingDown className="w-3 h-3 text-destructive" />
                  ) : null}
                  <span className="text-xs text-muted-foreground">
                    {stat.trend !== "0" ? `${stat.trend} esta semana` : "Sem alterações"}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* 2. Notificações + 3. Agenda */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full min-w-0">
          {/* Notificações */}
          <Card className="border-none shadow-sm w-full max-w-full min-w-0 overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Bell className="w-4 h-4 text-primary" />
                Notificações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 w-full min-w-0">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer hover:bg-muted w-full min-w-0 ${
                    n.type === "danger" ? "bg-destructive/5" : n.type === "warning" ? "bg-warning/5" : "bg-muted/50"
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    n.type === "danger" ? "bg-destructive/10" : n.type === "warning" ? "bg-warning/10" : "bg-info/10"
                  }`}>
                    <n.icon className={`w-4 h-4 ${
                      n.type === "danger" ? "text-destructive" : n.type === "warning" ? "text-warning" : "text-info"
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground leading-snug line-clamp-2 lg:line-clamp-1">{n.text}</p>
                    <p className="text-xs text-muted-foreground">{n.time} atrás</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Agenda */}
          <Card className="border-none shadow-sm w-full max-w-full min-w-0 overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Calendar className="w-4 h-4 text-secondary" />
                Agenda de hoje
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 w-full min-w-0">
              {agenda.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer w-full min-w-0">
                  <div className="text-center min-w-[50px] shrink-0">
                    <span className="text-sm font-semibold text-foreground">{item.time}</span>
                  </div>
                  <div className={`w-1 h-10 rounded-full shrink-0 ${
                    item.type === "atividade" ? "bg-secondary" : item.type === "médico" ? "bg-primary" : "bg-info"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground leading-snug line-clamp-2 lg:line-clamp-1">{item.event}</p>
                    <Badge variant="outline" className="text-[10px] mt-1">
                      {item.type === "atividade" ? "Atividade" : item.type === "médico" ? "Médico" : "Evento"}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        {/* 4. Atalhos rápidos */}
        <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { label: "Adicionar paciente", icon: UserPlus, color: "bg-primary", route: "/cadastrar-paciente" },,
            { label: "Adicionar cuidador", icon: Stethoscope, color: "bg-secondary" },
            { label: "Registrar observação", icon: ClipboardList, color: "bg-info" },
            { label: "Ver relatórios", icon: BarChart3, color: "bg-success" },
            { label: "Agendar atividade", icon: Calendar, color: "bg-warning" },
          ].map((action) => (
            <Button
              key={action.label}
              variant="outline"
              className="h-auto flex flex-col items-center gap-2 p-4 hover:shadow-md transition-all border-border hover:border-primary/30"
              onClick={() => action.route && navigate(action.route)}
            >
              <div className={`${action.color} p-3 rounded-xl`}>
                <action.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xs font-medium text-foreground text-center leading-tight">{action.label}</span>
            </Button>
          ))}
        </section>

        {/* 5. Pacientes em destaque */}
        <section>
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-warning" />
                Participantes em acompanhamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {alertPatients.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-primary/30 hover:shadow-sm transition-all cursor-pointer"
                  >
                  <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">
                    {p.avatar}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.age} anos • {p.stage}</p>
                    <Badge
                      variant="outline"
                      className={`text-[10px] mt-1 ${severityStyles[p.type]}`}
                    >
                      {p.alert}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        </section>

        {/* 6. Relatórios resumidos */}
        <section className="grid lg:grid-cols-3 gap-4">
          <Card className="border-none shadow-sm">
            <CardHeader className="p-6 pb-2">
              <CardTitle className="text-sm font-semibold py-2">Presença nas atividades</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={activityData} margin={{ top: 20, right: 10, left: -30, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                  <Tooltip />
                  <Bar dataKey="presença" fill="hsl(249, 85%, 62%)" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader className="p-6 pb-2">
              <CardTitle className="text-sm font-semibold py-2">Evolução dos participantes</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={evolutionData} margin={{ top: 20, right: 10, left: -30, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="estável" stroke="hsl(249, 85%, 62%)" strokeWidth={2} />
                  <Line type="monotone" dataKey="melhora" stroke="hsl(142, 71%, 45%)" strokeWidth={2} />
                  <Line type="monotone" dataKey="piora" stroke="hsl(0, 72%, 51%)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Participações hoje</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={presenceData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" paddingAngle={3}>
                    {presenceData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 mt-2">
                {presenceData.map((item) => (
                  <div key={item.name} className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-muted-foreground">{item.name} ({item.value})</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 7. Comunicados */}
        <section>
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary" />
                Comunicados
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {comunicados.map((c) => (
                <div key={c.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    {c.priority && <Shield className="w-4 h-4 text-destructive" />}
                    <span className="text-sm text-foreground">{c.title}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{c.date}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        {/* 9. Dicas rápidas */}
        <section className="pb-6">
          <Card className="border-none shadow-sm bg-accent/50">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="bg-secondary/10 p-2 rounded-xl">
                <Eye className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Dica do dia</p>
                <p className="text-xs text-muted-foreground">
                  Registre observações dos participantes regularmente para acompanhar mudanças de comportamento e saúde.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
