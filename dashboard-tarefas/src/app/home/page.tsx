"use client"; 

import Header from "@/components/Header";
import AddTask from "@/components/AddTask";
import ShowTasks from "@/components/ShowTasks";
import SearchBar from "@/components/SearchBar";
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

export default function Home() {
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
      <Header />
      <div className="w-full h-[84%] flex flex-row">
        <div className="h-full w-5/12">
          <ShowTasks tarefas={tarefas} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        <div className="h-full w-3/12 mt-5">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <AddTask setTarefas={setTarefas} />
        </div>
        <div className="h-full w-4/12">
        <CountTask/>
        <Chart/>
        </div>
      </div>
    </div>
  );
}
