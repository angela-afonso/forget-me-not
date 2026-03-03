import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Heart, LogOut, Pill, Calendar, Clock, Activity, MessageSquare,
  Phone, Sun, Moon, Utensils, ChevronRight, Bell, User, Smile, Frown, Meh,
} from "lucide-react";
import Logo from "../components/ui/logo"
import LogoTcs from "../components/ui/tcs-logo"

const activities = [
  { time: "08:00", event: "Café da manhã", icon: Utensils, done: true },
  { time: "09:00", event: "Fisioterapia", icon: Activity, done: true },
  { time: "10:30", event: "Terapia cognitiva", icon: Smile, done: false },
  { time: "12:00", event: "Almoço", icon: Utensils, done: false },
  { time: "14:00", event: "Atividade recreativa", icon: Sun, done: false },
  { time: "16:00", event: "Lanche da tarde", icon: Utensils, done: false },
  { time: "19:00", event: "Jantar", icon: Moon, done: false },
];

const messages = [
  { id: 1, from: "Terapeuta Antônio", text: "Hoje Dona Maria estava muito bem durante a sessão.", time: "07:30" },
  { id: 2, from: "Fisioterapeuta Paula", text: "Participou da fisioterapia com disposição.", time: "09:15" },
  { id: 3, from: "Administração", text: "Reunião de familiares marcada para sábado às 10h.", time: "Ontem" },
];

const weeklyMood = [
  { day: "Seg", mood: "happy" },
  { day: "Ter", mood: "neutral" },
  { day: "Qua", mood: "happy" },
  { day: "Qui", mood: "happy" },
  { day: "Sex", mood: "sad" },
  { day: "Sáb", mood: "neutral" },
  { day: "Dom", mood: "happy" },
];

const MoodIcon = ({ mood }: { mood: string }) => {
  if (mood === "happy") return <Smile className="w-5 h-5 text-success" />;
  if (mood === "sad") return <Frown className="w-5 h-5 text-destructive" />;
  return <Meh className="w-5 h-5 text-warning" />;
};

const PatientDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-primary sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="bg-white/90 backdrop-blur-md border border-white/40 rounded-xl px-4 py-2 shadow-md">
            <div className="flex items-center gap-4">
              <Logo className="h-[40px] sm:h-[50px] lg:h-[50px] w-auto" />
              <LogoTcs className="h-[25px] sm:h-[25px] lg:h-[25px] w-auto opacity-80" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full text-[10px] text-destructive-foreground flex items-center justify-center font-bold">2</span>
            </Button>
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10" onClick={() => navigate("/")}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-5">
        {/* Welcome card */}
        <Card className="border-none shadow-sm overflow-hidden">
          <CardContent className="p-5">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-xl shrink-0">
                MS
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Olá, Maria!</h2>
                <p className="text-sm text-muted-foreground">Hoje é quarta-feira, 25 de fevereiro</p>
                <p className="text-xs text-muted-foreground mt-1">Familiar responsável: <span className="font-medium text-foreground">João Silva</span></p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Atividades do dia */}
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Calendar className="w-4 h-4 text-secondary" />
              Atividades de hoje
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            {activities.map((item, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 p-3 rounded-lg ${item.done ? "opacity-60" : ""}`}
              >
                <span className="text-sm font-semibold text-foreground min-w-[50px]">{item.time}</span>
                <div className={`w-1 h-8 rounded-full ${item.done ? "bg-success" : "bg-secondary"}`} />
                <item.icon className={`w-4 h-4 shrink-0 ${item.done ? "text-success" : "text-secondary"}`} />
                <span className={`text-sm ${item.done ? "line-through text-muted-foreground" : "text-foreground"}`}>
                  {item.event}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Humor da semana */}
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Smile className="w-4 h-4 text-warning" />
              Humor da semana
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              {weeklyMood.map((d, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <MoodIcon mood={d.mood} />
                  <span className="text-xs text-muted-foreground">{d.day}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Mensagens dos cuidadores */}
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary" />
              Mensagens
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {messages.map((msg) => (
              <div key={msg.id} className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-foreground">{msg.from}</span>
                  <span className="text-xs text-muted-foreground">{msg.time}</span>
                </div>
                <p className="text-sm text-muted-foreground">{msg.text}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Contatos rápidos */}
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Phone className="w-4 h-4 text-info" />
              Contatos rápidos
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { name: "Cuidador Marcos", role: "Cuidador" },
                { name: "Terapeuta Antônio", role: "Cuidador" },
                { name: "Fisioterapeuta Paula", role: "Cuidador" },
                { name: "Recepção", role: "Administração" },
              ].map((contact) => (
                <div
                  key={contact.name}
                  className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-primary/30 transition-all cursor-pointer w-full min-w-0"
                >
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-accent-foreground" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground leading-snug line-clamp-2">
                      {contact.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {contact.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Botão de emergência */}
        <div className="pb-6">
          <Button className="w-full h-14 bg-destructive text-destructive-foreground font-bold text-lg hover:bg-destructive/90 rounded-xl">
            🚨 Emergência
          </Button>
        </div>
      </main>
    </div>
  );
};

export default PatientDashboard;
