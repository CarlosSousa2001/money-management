import Image from "next/image";

interface CreditCardItemProps {
    cardHolder: string;  // Nome do titular do cartão
    cardNumber: string;  // Número do cartão
    cardIssuer: string;  // Banco emissor (ex: C6 Bank, Nubank)
    cardType: string;    // Tipo do cartão (ex: Carbon, Platinum, Gold)
    cardValidity: string; // Data de emissão
    cardExpire: string;   // Data de validade
    cardFlag: string;    // URL da bandeira do cartão
    cardActive?: boolean; // Indica se o cartão está ativo ou não
}

export function CreditCardItem({
    cardHolder,
    cardNumber,
    cardIssuer,
    cardType,
    cardValidity,
    cardExpire,
    cardFlag,
}: CreditCardItemProps) {
    return (
        <div className="min-w-[300px] h-36 m-auto rounded-xl relative text-white bg-red-400 shadow-2xl transition-transform transform overflow-hidden">
            {/* Fundo animado */}
            <div
                className="absolute inset-0 rounded-xl "
                style={{
                    background: "linear-gradient(110deg, #000000 45%, #303030 55%, #000000)",
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
                    {cardFlag && (
                        <span className="font-bold">{cardFlag}</span>
                    )}
                </div>
                <div className="pt-2">
                    <p className="font-light text-md">{cardIssuer} - {cardType}</p>
                    <p className="font-medium tracking-more-wider text-sm">{cardNumber}</p>
                </div>
                <div className="pt-8 pr-6">
                    <div className="flex justify-between">
                        <div>
                            <p className="font-light text-xs">Validade</p>
                            <p className="font-medium tracking-wider text-sm">{cardValidity}</p>
                        </div>
                        <div>
                            <p className="font-light text-xs">Expira</p>
                            <p className="font-medium tracking-wider text-sm">{cardExpire}</p>
                        </div>
                        <div>
                            <p className="font-light text-xs">CVV</p>
                            <p className="font-bold tracking-more-wider text-sm">···</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Adicionando keyframes diretamente no código */}
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