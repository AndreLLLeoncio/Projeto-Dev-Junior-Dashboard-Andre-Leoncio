"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa"; // Importando ícones

interface ChangeStatusProps {
  status: 'pendente' | 'completa';
  onChangeStatus: (newStatus: 'pendente' | 'completa') => void;
}

export function ChangeStatus({ status, onChangeStatus }: ChangeStatusProps) {
  const icon = status === 'pendente' ? <FaExclamationCircle className="mr-2" /> : <FaCheckCircle className="mr-2"/>;
  const buttonClass = status === 'pendente' ? 'bg-yellow-500 text-white' : 'bg-green-500 text-white';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={`${buttonClass} flex items-center border-none`} >
          {icon} 
          {status}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Trocar Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={status} onValueChange={(value: string) => onChangeStatus(value as 'pendente' | 'completa')}>
          <DropdownMenuRadioItem value="pendente">Pendente</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="completa">Completa</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
