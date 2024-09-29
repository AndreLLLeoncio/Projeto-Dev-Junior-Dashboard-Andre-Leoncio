import React, { useEffect, useState } from 'react';
import { BiTask } from "react-icons/bi";
import { BiTaskX } from "react-icons/bi";

interface Tarefa {
  id: number;
  titulo: string;
  descricao: string;
  status: 'pendente' | 'completa';
  createdAt: string;
}

const CountTask: React.FC = () => {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [count, setCount] = useState({ pendente: 0, completa: 0 });

  useEffect(() => {
    const fetchTarefas = async () => {
      const response = await fetch('/api/tarefas');
      const data = await response.json();
      setTarefas(data.tarefas);
    };

    fetchTarefas();
  }, []);

  useEffect(() => {
    const pendenteCount = tarefas.filter(tarefa => tarefa.status === 'pendente').length;
    const completaCount = tarefas.filter(tarefa => tarefa.status === 'completa').length;
    
    setCount({ pendente: pendenteCount, completa: completaCount });
  }, [tarefas]);

  return (
    <div className='w-full flex lg:flex-row flex-col items-center justify-center lg:space-x-8 lg:space-y-0 space-y-5 mt-5 mb-10'>

      {/* Caixa de Tarefas Concluidas */}
      <div className="p-2 border border-gray-300 rounded shadow-md">
        <div className='flex flex-row w-full space-x-3'>
          <div className='w-2/6 '> 
            <BiTask className='size-full'/> 
          </div>
          <div className='w-4/6 '>
            <h2 className="text-md font-semibold">Tarefas Concluidas</h2>
            <div className="text-xl">
                {count.completa}
            </div>
          </div>
        </div>
      </div>

      {/* Caixa de Tarefas Pendentes */}
      <div className="p-2 border border-gray-300 rounded shadow-md">
        <div className='flex flex-row w-full space-x-3'>
          <div className='w-2/6 '> 
            <BiTaskX className='size-full'/> 
          </div>
          <div className='w-4/6 '>
            <h2 className="text-md font-semibold">Tarefas Pendentes</h2>
            <div className="text-xl">
                {count.pendente}
            </div>
          </div>
        </div>
      </div>


    </div>

  );
};

export default CountTask;
