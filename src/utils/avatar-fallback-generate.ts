export function generateAvatarFallback(name?: string | null): string {
    if (!name) return "U"; 
  
    const words = name.trim().split(" "); 
    const initials = words
      .filter((word) => word.length > 0) 
      .slice(0, 2) 
      .map((word) => word[0].toUpperCase())
      .join(""); // Junta as iniciais
  
    return initials || "U"; 
  }