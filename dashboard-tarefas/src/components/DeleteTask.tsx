import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FaTrash } from "react-icons/fa";

interface DeleteTaskProps {
  taskId: number;
  onDelete: (id: number) => void;
}

export function DeleteTask({ taskId, onDelete }: DeleteTaskProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <FaTrash className='text-red-500 ml-auto size-5 cursor-pointer' />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Deletar Tarefa</DialogTitle>
          <DialogDescription>
            Você tem certeza que deseja deletar esta tarefa?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <Button variant="destructive" onClick={() => onDelete(taskId)}>
            Sim, deletar
          </Button>
          <DialogClose asChild>
            <Button type="button">Cancelar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
