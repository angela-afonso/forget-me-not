import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Heart, UserPlus, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Logo from "../components/ui/logo"
import LogoTcs from "../components/ui/tcs-logo"

const RegisterPatient = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    gender: "",
    cpf: "",
    phone: "",
    email: "",
    address: "",
    emergencyContact: "",
    emergencyPhone: "",
    stage: "",
    diagnosis: "",
    medications: "",
    allergies: "",
    observations: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.birthDate || !formData.stage) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha nome, data de nascimento e estágio.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Paciente cadastrado!",
      description: `${formData.name} foi adicionado(a) com sucesso.`,
    });
    navigate("/dashboard/cuidador");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-primary sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => navigate("/dashboard/cuidador")}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="bg-white/90 backdrop-blur-md border border-white/40 rounded-xl px-4 py-2 shadow-md">
              <div className="flex items-center gap-4">
                <Logo className="h-[40px] sm:h-[50px] lg:h-[50px] w-auto" />
                <LogoTcs className="h-[25px] sm:h-[25px] lg:h-[25px] w-auto opacity-80" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dados Pessoais */}
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-primary" />
                Dados Pessoais
              </CardTitle>
              <CardDescription>Informações básicas do paciente</CardDescription>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 space-y-2">
                <Label htmlFor="name">Nome completo *</Label>
                <Input
                  id="name"
                  placeholder="Nome do paciente"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthDate">Data de nascimento *</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => handleChange("birthDate", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gênero</Label>
                <Select value={formData.gender} onValueChange={(v) => handleChange("gender", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="masculino">Masculino</SelectItem>
                    <SelectItem value="feminino">Feminino</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  placeholder="000.000.000-00"
                  value={formData.cpf}
                  onChange={(e) => handleChange("cpf", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  placeholder="(00) 00000-0000"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@exemplo.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>
              <div className="sm:col-span-2 space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <Input
                  id="address"
                  placeholder="Rua, número, bairro, cidade"
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Contato de Emergência */}
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Contato de Emergência</CardTitle>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Nome do contato</Label>
                <Input
                  id="emergencyContact"
                  placeholder="Nome do familiar ou responsável"
                  value={formData.emergencyContact}
                  onChange={(e) => handleChange("emergencyContact", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyPhone">Telefone de emergência</Label>
                <Input
                  id="emergencyPhone"
                  placeholder="(00) 00000-0000"
                  value={formData.emergencyPhone}
                  onChange={(e) => handleChange("emergencyPhone", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Informações Clínicas */}
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Informações Clínicas</CardTitle>
              <CardDescription>Dados médicos e de acompanhamento</CardDescription>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stage">Estágio da doença *</Label>
                <Select value={formData.stage} onValueChange={(v) => handleChange("stage", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o estágio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="leve">Leve</SelectItem>
                    <SelectItem value="moderado">Moderado</SelectItem>
                    <SelectItem value="avancado">Avançado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="diagnosis">Diagnóstico</Label>
                <Input
                  id="diagnosis"
                  placeholder="Ex: Alzheimer, Demência Vascular"
                  value={formData.diagnosis}
                  onChange={(e) => handleChange("diagnosis", e.target.value)}
                />
              </div>
              <div className="sm:col-span-2 space-y-2">
                <Label htmlFor="medications">Medicações em uso</Label>
                <Textarea
                  id="medications"
                  placeholder="Liste as medicações atuais e dosagens"
                  value={formData.medications}
                  onChange={(e) => handleChange("medications", e.target.value)}
                />
              </div>
              <div className="sm:col-span-2 space-y-2">
                <Label htmlFor="allergies">Alergias</Label>
                <Input
                  id="allergies"
                  placeholder="Liste alergias conhecidas"
                  value={formData.allergies}
                  onChange={(e) => handleChange("allergies", e.target.value)}
                />
              </div>
              <div className="sm:col-span-2 space-y-2">
                <Label htmlFor="observations">Observações adicionais</Label>
                <Textarea
                  id="observations"
                  placeholder="Informações relevantes sobre o paciente"
                  value={formData.observations}
                  onChange={(e) => handleChange("observations", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-3 justify-center md:justify-end pb-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/dashboard/cuidador")}
            >
              Cancelar
            </Button>
            <Button type="submit" className="gap-2">
              <Save className="w-4 h-4" />
              Cadastrar Paciente
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default RegisterPatient;
