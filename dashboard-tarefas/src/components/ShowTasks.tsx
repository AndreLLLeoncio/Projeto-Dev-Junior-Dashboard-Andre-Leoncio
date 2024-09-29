import { useState, useEffect } from 'react';
import { FaTrash } from "react-icons/fa";
import { ChangeStatus } from "@/components/ChangeStatus";
import { DeleteTask } from "@/components/DeleteTask"; // Importando o novo componente

interface Tarefa {
  id: number;
  titulo: string;
  descricao: string;
  status: 'pendente' | 'completa';
  createdAt: string;
}

interface ShowTasksProps {
  tarefas: Tarefa[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export default function ShowTasks({ tarefas, searchTerm, setSearchTerm }: ShowTasksProps) {
  const [taskList, setTaskList] = useState<Tarefa[]>(tarefas);

  useEffect(() => {
    setTaskList(tarefas);
  }, [tarefas]);

  const updateStatus = async (id: number, newStatus: 'pendente' | 'completa') => {
    const res = await fetch('/api/tarefas', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, status: newStatus }),
    });

    if (res.ok) {
      setTaskList(prevTasks =>
        prevTasks.map(tarefa =>
          tarefa.id === id ? { ...tarefa, status: newStatus } : tarefa
        )
      );
    } else {
      console.error('Falha ao atualizar o status da tarefa.');
    }
  };

  const deleteTask = async (id: number) => {
    const res = await fetch(`/api/tarefas`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setTaskList(prevTasks => prevTasks.filter(tarefa => tarefa.id !== id));
    } else {
      console.error('Falha ao deletar a tarefa.');
    }
  };

  const filteredTarefas = taskList
    .filter(tarefa =>
      tarefa.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className='w-11/12 h-full mt-5 text-white overflow-y-auto'>
      <ul>
        {filteredTarefas.map((tarefa) => (
          <div key={tarefa.id} className='h-1/5 w-11/12 bg-zinc-600 mb-4 p-4 rounded-lg mx-auto'>
            <li>
              <h2 className='text-3xl'>{tarefa.titulo}</h2>
              <p>{tarefa.descricao}</p>
              <div className='flex flex-row items-center mt-5'>
                <div className='text-white'>
                  <ChangeStatus
                    status={tarefa.status}
                    onChangeStatus={(newStatus) => updateStatus(tarefa.id, newStatus)}
                  />
                </div>
                <DeleteTask taskId={tarefa.id} onDelete={deleteTask} />
              </div>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}
