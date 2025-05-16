'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FAQItem = {
  question: string;
  answer: string;
};

const faqData: FAQItem[] = [
  {
    question: 'Como posso redefinir minha senha?',
    answer: 'Você pode redefinir sua senha acessando a página de configurações e clicando em "Alterar senha".',
  },
  {
    question: 'Onde encontro minhas faturas?',
    answer: 'Suas faturas estão disponíveis na seção "Cobrança" dentro do seu perfil.',
  },
  {
    question: 'Como entro em contato com o suporte?',
    answer: 'Você pode usar o formulário de contato nesta página ou enviar um e-mail para suporte@exemplo.com.',
  },
  {
    question: 'Como faço para obter a versão Pro?',
    answer: 'Para obter a versão Pro, acesse a seção "Planos" no menu principal e escolha o plano Pro. Siga as instruções de pagamento para concluir a atualização.',
  },
];

export function HelpFAQSection() {
  return (
    <section className="">
      <h2 className="text-2xl font-semibold mb-6">Perguntas Frequentes</h2>

      <Accordion type="single" collapsible className="w-full">
        {faqData.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
