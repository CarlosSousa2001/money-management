"use client";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTablePaginationProps {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  perPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export function DataTablePagination({
  totalItems,
  totalPages,
  currentPage,
  perPage,
  hasNextPage,
  hasPrevPage,
  onPageChange,
  onPageSizeChange,
}: DataTablePaginationProps) {
  // Função de mudança de página, verifica se a página está dentro do intervalo permitido
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page); // Atualiza a página na API
    }
  };

  // Função para mudar o número de itens por página
  const handlePageSizeChange = (size: number) => {
    onPageSizeChange(size); // Atualiza a quantidade de itens por página
    onPageChange(1); // Reinicia para a página 1 ao alterar o tamanho da página
  };

  return (
    <div className="flex items-center justify-between px-2 ">
      <div className="flex-1 text-sm text-muted-foreground max-sm:hidden">
        {totalItems} item(s) encontrado(s).
      </div>
      <div className="flex max-sm:flex-col sm:items-center space-x-6 lg:space-x-8 gap-6">
        <div className="flex items-center space-x-2 gap-2">
          <Select
            value={`${perPage}`}
            onValueChange={(value) => handlePageSizeChange(Number(value))}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={perPage} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Página {currentPage} de {totalPages}
        </div>
        <div className="flex items-center space-x-2 gap-2">
          <Button
            variant="outline"
            className=" h-8 w-8 p-2"
            onClick={() => handlePageChange(1)} // Vai para a primeira página
            disabled={!hasPrevPage}
          >

            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-2"
            onClick={() => handlePageChange(currentPage - 1)} // Vai para a página anterior
            disabled={!hasPrevPage}
          >
  
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-2 "
            onClick={() => handlePageChange(currentPage + 1)} // Vai para a próxima página
            disabled={!hasNextPage}
          >

            <ChevronRight />
          </Button>

          
          <Button
            variant="outline"
            className=" h-8 w-8 p-2"
            onClick={() => handlePageChange(totalPages)} // Vai para a última página
            disabled={!hasNextPage}
          >
 
            <ChevronsRight />
          </Button>

          
        </div>
      </div>
    </div>
  );
}
