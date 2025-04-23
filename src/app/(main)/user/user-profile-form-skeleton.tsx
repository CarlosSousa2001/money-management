import { Skeleton } from "@/components/ui/skeleton";

export function UserProfileFormSkeleton() {
  return (
    <div className="space-y-8 w-full animate-pulse">
      {/* Foto de perfil e input de imagem */}
      <div className="flex items-center gap-4">
        <Skeleton className="w-22 h-20 rounded-full" />
        <Skeleton className="h-10 w-40" />
      </div>

      {/* Nome */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </div>

      {/* Telefone */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </div>

      {/* Aniversário */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </div>

      {/* Endereços (simula um grupo) */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full col-span-1" />
          <Skeleton className="h-10 w-full col-span-1" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full col-span-1" />
          <Skeleton className="h-10 w-full col-span-1" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full col-span-1" />
          <Skeleton className="h-10 w-full col-span-1" />
        </div>
      </div>

      {/* Botão */}
      <Skeleton className="h-10 w-40" />
    </div>
  );
}
