"use client"; 

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Importar useRouter

// Definindo o esquema de validação com Zod
const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

// Definindo o tipo baseado no esquema
type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter(); // Instanciar o useRouter
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    setLoading(true);
    try {
      setTimeout(() => {

        router.push("/home"); // Substitua "/dashboard" pela URL desejada
      }, 1000);
      
    } catch (error: any) {
      console.error(error);
      // Aqui você pode exibir um erro para o usuário
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="email">Email</label>
        <Input
          type="email"
          id="email"
          placeholder="Seu e-mail"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password">Senha</label>
        <Input
          type="password"
          id="password"
          placeholder="Sua senha"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      <Button type="submit" disabled={loading} className="w-full h-16 text-xl">
        {loading ? "Carregando..." : "Entrar"}
      </Button>
    </form>
  );
}
