import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface AlertDeleteProps {
    onConfirm: () => void;
    triggerLabel?: string;
}

export function AlertDelete({ onConfirm, triggerLabel = "Open" }: AlertDeleteProps) {
    return (
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Deseja realmente deletar ?</AlertDialogTitle>
                <AlertDialogDescription>
                    Esta ação não pode ser desfeita. Você tem certeza de que deseja continuar?
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    );
}
