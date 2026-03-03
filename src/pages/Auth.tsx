import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Heart, Stethoscope, User } from "lucide-react";
import authBg from "@/assets/auth-bg.jpg";
import Logo from "../components/ui/logo";
import LogoTcs from "../components/ui/tcs-logo"

type Role = "cuidador" | "familiar" | null;
type Mode = "login" | "register";

const Auth = () => {
  const [mode, setMode] = useState<Mode>("login");
  const [role, setRole] = useState<Role>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(role === "cuidador" ? "/dashboard/cuidador" : "/dashboard/familiar");
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Image */} 
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* IMAGEM COMO FUNDO */}
        <img
          src={authBg}
          alt="Não Me Esqueças"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* OVERLAY 1 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
        {/* OVERLAY 2 */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-indigo-600/30" />
              {/* PAINEL */}
        <div className="absolute bottom-12 left-12 z-10">
          <div className="rounded-2xl bg-white/40 backdrop-blur-md border border-white/30 px-8 py-6 shadow-xl">
            <h1 className="text-2xl lg:text-3xl font-bold text-purple-900 mb-2">
              Não Me Esqueças
            </h1>
            <p className="text-lg text-slate-700">
              Instituto de Apoio • Londrina, PR
            </p>
            <p className="text-slate-600 mt-4 max-w-md">
              Cuidando com amor e dedicação das nossas vidas,
              para que nenhum momento seja esquecido.
            </p>
          </div>
        </div>
    </div>
          

      {/* Right side - Form */}
      
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md space-y-6 animate-fade-in">
          <div className="hidden lg:flex justify-center mb-2">
            <div className="inline-flex items-center gap-2 p-3">
              <div className="hidden lg:flex justify-center items-center gap-12 mb-8 animate-fade-in">
                <Logo className="h-[70px] w-auto" />
                <LogoTcs className="h-[40px] w-auto opacity-80" />
              </div>
            </div>
          </div>
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
           <div className="flex justify-center items-center gap-6 mb-8 animate-fade-in">
            <Logo className="h-[50px] lg:h-[70px] w-auto" />
            <LogoTcs className="h-[30px] lg:h-[40px] w-auto opacity-80" />
          </div>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-foreground">
              {mode === "login" ? "Bem-vindo de volta" : "Criar conta"}
            </h2>
            <p className="text-muted-foreground mt-1">
              {mode === "login" ?
              "Acesse sua conta para continuar" :
              "Preencha seus dados para começar"}
            </p>
          </div>

          {/* Role selector */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Eu sou:</Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole("cuidador")}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 ${
                role === "cuidador" ?
                "border-primary bg-accent shadow-md" :
                "border-border hover:border-primary/40 bg-card"}`
                }>

                <Stethoscope className={`w-8 h-8 ${role === "cuidador" ? "text-primary" : "text-muted-foreground"}`} />
                <span className={`text-sm font-medium ${role === "cuidador" ? "text-primary" : "text-foreground"}`}>
                  Cuidador
                </span>
              </button>
              <button
                type="button"
                onClick={() => setRole("familiar")}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 ${
                role === "familiar" ?
                "border-secondary bg-accent shadow-md" :
                "border-border hover:border-secondary/40 bg-card"}`
                }>

                <User className={`w-8 h-8 ${role === "familiar" ? "text-secondary" : "text-muted-foreground"}`} />
                <span className={`text-sm font-medium ${role === "familiar" ? "text-secondary" : "text-foreground"}`}>
                  Membro / Familiar
                </span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" &&
            <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome completo"
                className="h-11" />

              </div>
            }
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="h-11" />

            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="h-11" />

            </div>

            <Button
              type="submit"
              className="w-full h-11 gradient-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
              disabled={!role}>

              {mode === "login" ? "Entrar" : "Criar conta"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            {mode === "login" ? "Não tem conta?" : "Já tem conta?"}{" "}
            <button
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              className="text-secondary font-semibold hover:underline">

              {mode === "login" ? "Registre-se" : "Entrar"}
            </button>
          </p>
        </div>
      </div>
    </div>);

};

export default Auth;