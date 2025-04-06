import Image from "next/image";

interface CreditCardItemProps {
  cardHolder: string;
  cardNumber: string;
  cardIssuer: string;
  cardType: string;
  cardValidity: string;
  cardFlag: string;
  cardActive?: boolean;
  minHeight?: string;
  cardColors?: [string, string, string]; // <-- NOVO: gradiente em 3 cores
}

export function CreditCardItem({
  cardHolder,
  cardNumber,
  cardIssuer,
  cardType,
  cardValidity,
  cardFlag,
  minHeight = "h-36",
  cardColors = ["#000000", "#303030", "#000000"], // padrão igual ao original
}: CreditCardItemProps) {
  const gradient = `linear-gradient(110deg, ${cardColors[0]} 45%, ${cardColors[1]} 55%, ${cardColors[2]})`;

  return (
    <div
      className={`min-w-[300px] ${minHeight} m-auto rounded-xl relative text-white shadow-2xl transition-transform transform overflow-hidden`}
    >
      {/* Fundo animado com cores customizáveis */}
      <div
        className="absolute inset-0 rounded-xl"
        style={{
          background: gradient,
          backgroundSize: "400% 100%",
          animation: "shine 6s linear infinite",
        }}
      />

      {/* Conteúdo do cartão */}
      <div className="relative z-10 w-full px-8 absolute top-8">
        <div className="flex justify-between">
          <div>
            <p className="font-light text-md">Nome</p>
            <p className="font-medium tracking-widest text-sm">{cardHolder}</p>
          </div>
          {cardFlag && <span className="font-bold">{cardFlag}</span>}
        </div>
        <div className="pt-2">
          <p className="font-light text-md">
            {cardIssuer} {cardType}
          </p>
          <p className="font-medium tracking-more-wider text-sm">{cardNumber}</p>
        </div>
        <div className="pt-8 pr-6">
          <div className="flex justify-between">
            <div>
              <p className="font-light text-xs">Validade</p>
              <p className="font-medium tracking-wider text-sm">{cardValidity}</p>
            </div>
            <div />
            <div>
              <p className="font-light text-xs">CVV</p>
              <p className="font-bold tracking-more-wider text-sm">···</p>
            </div>
          </div>
        </div>
      </div>

      {/* Animação shine */}
      <style>
        {`
          @keyframes shine {
            from {
              background-position: 0 0;
            }
            to {
              background-position: -400% 0;
            }
          }
        `}
      </style>
    </div>
  );
}
