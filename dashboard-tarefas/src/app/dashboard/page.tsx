"use client"; 

import Header from "@/components/Header";
import { useState, useEffect } from 'react';
import CountTask from "@/components/CountTasks";

import { Chart } from "@/components/Chart";

interface Tarefa {
  id: number;
  titulo: string;
  descricao: string;
  status: 'pendente' | 'completa';
  createdAt: string;
}

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  // Função para buscar as tarefas
  const fetchTarefas = async () => {
    const res = await fetch('/api/tarefas');
    const data = await res.json();
    setTarefas(data.tarefas);
  };

  useEffect(() => {
    fetchTarefas();
  }, []);

  return (
    <div className="tw-full h-screen bg-zinc-400">
      <div className="h-[12%]">
      <Header />
      </div>

      <div className="h-[88%] w-full ">
        <CountTask/>
        <Chart/>
      </div>

    </div>
  );
}
