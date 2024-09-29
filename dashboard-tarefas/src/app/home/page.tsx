"use client"; 

import Header from "@/components/Header";
import AddTask from "@/components/AddTask";
import ShowTasks from "@/components/ShowTasks";
import SearchBar from "@/components/SearchBar";
import { useState, useEffect } from 'react';
import CountTask from "@/components/CountTasks";
import { Calendario } from "@/components/Calendario";
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
      <div className="h-[12%]">
      <Header />
      </div>
      

      <div className="w-full h-[88%] flex lg:flex-row flex-col">

        {/* Esquerda */}
        <div className="lg:h-full h-5/6 lg:w-5/12 w-full lg:order-1 order-2 items-start justify-center flex ">
          <ShowTasks tarefas={tarefas} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        {/* Meio */}
        <div className="lg:h-full h-1/6 lg:w-3/12 w-full mt-0 flex flex-col lg:order-2 order-1 lg:items-start items-center">
          <div className="lg:w-full w-11/12">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <AddTask setTarefas={setTarefas} />
          </div>

          <div className="lg:flex hidden mx-auto mt-10">
            <Calendario/>
          </div>
          

        </div>


        {/* Direita */}
        <div className="h-full lg:block hidden w-4/12 lg:order-3 order-1 ">
          <CountTask/>
          <Chart/>
        </div>

      </div>
    </div>
  );
}
