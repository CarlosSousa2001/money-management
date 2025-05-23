"use client"

import { HeaderPageUi } from "@/components/header-page-ui";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useGetAllGoals } from "./hooks/use-get-all-goals";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { ContainerIcon } from "@/components/container-icon";
import { Bolt } from "lucide-react";
import { GoalType } from "./types/goals-schema-types";
import { translateGoalType } from "@/utils/translations-goals-type";
import { DataTablePagination } from "@/components/pagination-base";
import { GoalTableRow } from "./goal-table-row";
import { GoalDialogFormCreate } from "./goal-dialog-form-create";

export function GoalOverview() {


    const [searchValue, setSearchValue] = useState<string>("")
    const [selectedGoalType, setSelectedGoalType] = useState<string | undefined>();
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const [openDialogNewGoal, setOpenDialogNewGoal] = useState(false)
    const { data, isLoading, isError } = useGetAllGoals({
        search: searchValue,
        page: currentPage,
        perPage: perPage
    })


    const totalItems = data?.meta.totalItems ?? 0;
    const totalPages = data?.meta.totalPages ?? 1;
    const hasNextPage = data?.meta.nextPage === true;
    const hasPrevPage = data?.meta.prevPage === true;

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const handlePageSizeChange = (newPerPage: number) => {
        setPerPage(newPerPage);
        setCurrentPage(1); // Reset para a primeira página ao mudar o tamanho da página
    };

    const rows = data?.data && Array.isArray(data.data) ? data.data : [];

    const handleOpenDialog = () => {
        setOpenDialogNewGoal(true)
    }

    function handleResetFilters() {
        setSearchValue("");
        setSelectedGoalType(undefined);
    }


    return (
        <div className="space-y-4 p-10  w-full m-auto">
            <div className="space-y-6">
                <div className="">
                    <HeaderPageUi title="Objetivos" description="Gerencie seus objetivos" onHandleClick={handleOpenDialog} onhandleClickTtitle="Novo objetivo" />
                </div>
                <Separator />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4">
                <Input placeholder="Buscar por..." value={searchValue} className=" flex-1 min-w-[180px]" onChange={(e) => setSearchValue(e.target.value)} />

                <Select
                    value={selectedGoalType}
                    onValueChange={(value) => setSelectedGoalType(value)}
                >
                    <SelectTrigger className="min-w-[240px] max-sm:flex-1">
                        <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.entries(GoalType).map(([key, value]) => (
                            <SelectItem key={value} value={value}>
                                {translateGoalType(value)}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>


                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <ContainerIcon>
                            <Bolt className="size-5 mt-[2px]" />
                        </ContainerIcon>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleResetFilters()}>Resetar filtros</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>


            </div>

            <div className="max-xs:hidden min-h-[400px] max-h-[60vh] overflow-auto border rounded-lg bg-slate-100 dark:bg-black/20 border-gray-200 dark:border-gray-700">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="max-w-[40px] w-[40px]"></TableHead>
                            <TableHead className="">Nome</TableHead>
                            <TableHead className="">Valor</TableHead>
                            <TableHead className="">Tipo</TableHead>
                            <TableHead className="">Expiração</TableHead>
                            <TableHead className=""></TableHead>
                            <TableHead className=""></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rows.length > 0 ? (
                            rows.map(item => (
                                <GoalTableRow key={item.id} item={item} />
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center py-10 text-muted-foreground">
                                    Nenhuma transação encontrada.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="mt-4">
                <DataTablePagination
                    totalItems={totalItems}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    perPage={perPage}
                    hasNextPage={hasNextPage}
                    hasPrevPage={hasPrevPage}
                    onPageChange={handlePageChange}
                    onPageSizeChange={handlePageSizeChange}
                />
            </div>

            {openDialogNewGoal && (
                <Dialog open={openDialogNewGoal} onOpenChange={setOpenDialogNewGoal}>
                    <DialogTrigger></DialogTrigger>
                    <GoalDialogFormCreate onClose={setOpenDialogNewGoal} />
                </Dialog>
            )}
        </div>
    )
}