import { expect, test, describe, vi, beforeEach, beforeAll } from 'vitest';
import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import { CreditCardForms } from './credit-card-form';
import { createCardCreditDebit } from './_api/create-card-credit-debit';

vi.mock("@/hooks/use-data", () => ({
    useData: () => ({
        data: { data: [] },
        isLoading: false,
        error: null,
        fetchData: vi.fn(),
    }),
}));

vi.mock("./_api/create-card-credit-debit", () => ({
    createCardCreditDebit: vi.fn(() => Promise.resolve({ status: 200 })),
}));

beforeAll(() => {
    // Mock necessário pro Radix
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
});

describe("CreditCardForms", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("renderiza todos os campos do formulário", () => {
        render(<CreditCardForms />);

        expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/número do cartão/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/empresa emissora/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/bandeira/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/data de vencimento/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/tipo do cartão/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /salvar/i })).toBeInTheDocument();
    });

    test("permite digitar nos campos do formulário", () => {
        render(<CreditCardForms />);
        const nomeInput = screen.getByLabelText(/nome do titular/i);
        const numeroInput = screen.getByLabelText(/número do cartão/i);
        const empresaInput = screen.getByLabelText(/empresa emissora/i);
        const bandeiraInput = screen.getByLabelText(/bandeira/i);
        const vencimentoInput = screen.getByLabelText(/data de vencimento/i);

        fireEvent.change(nomeInput, { target: { value: "João Silva" } });
        fireEvent.change(numeroInput, { target: { value: "1234 5678 9012 3456" } });
        fireEvent.change(empresaInput, { target: { value: "C6 Bank" } });
        fireEvent.change(bandeiraInput, { target: { value: "Visa" } });
        fireEvent.change(vencimentoInput, { target: { value: "12/2026" } });

        expect(nomeInput).toHaveValue("João Silva");
        expect(numeroInput).toHaveValue("1234 5678 9012 3456");
        expect(empresaInput).toHaveValue("C6 Bank");
        expect(bandeiraInput).toHaveValue("Visa");
        expect(vencimentoInput).toHaveValue("12/2026");
    });
    test("permite selecionar o tipo do cartão", async () => {
        render(<CreditCardForms />);

        const trigger = screen.getByRole("combobox", { name: /tipo do cartão/i });
        fireEvent.click(trigger);

        const options = await screen.findAllByText("Crédito");

        // Tenta encontrar a opção que é realmente clicável
        const clickableOption = options.find(
            (el) => el.closest("[role=option]") !== null
        );

        expect(clickableOption).toBeDefined();
        if (clickableOption) fireEvent.click(clickableOption);

        expect(
            screen.getByRole("combobox", { name: /tipo do cartão/i })
        ).toHaveTextContent("Crédito");
    });

    test("permite selecionar a cor do cartão", async () => {
        render(<CreditCardForms />);
        const trigger = screen.getByTestId("select-cores");
        fireEvent.click(trigger);

        // Aguarda as opções aparecerem e filtra uma opção clicável, por exemplo, "Azul"
        const options = await screen.findAllByText("Azul");
        const clickableOption = options.find(
            (el) => el.closest("[role=option]") !== null
        );

        expect(clickableOption).toBeDefined();
        if (clickableOption) fireEvent.click(clickableOption);

        // Verifica se o valor selecionado foi atualizado para "Azul" no trigger
        expect(screen.getByTestId("select-cores")).toHaveTextContent("Azul");
    });

    test("envia o formulário com dados válidos e chama createCardCreditDebit", async () => {
        render(<CreditCardForms />);

        // Preenche os inputs de texto
        const nomeInput = screen.getByLabelText(/nome do titular/i);
        const numeroInput = screen.getByLabelText(/número do cartão/i);
        const empresaInput = screen.getByLabelText(/empresa emissora/i);
        const bandeiraInput = screen.getByLabelText(/bandeira/i);
        const vencimentoInput = screen.getByLabelText(/data de vencimento/i);

        fireEvent.change(nomeInput, { target: { value: "João Silva" } });
        fireEvent.change(numeroInput, { target: { value: "1234 5678 9012 3456" } });
        fireEvent.change(empresaInput, { target: { value: "C6 Bank" } });
        fireEvent.change(bandeiraInput, { target: { value: "Visa" } });
        fireEvent.change(vencimentoInput, { target: { value: "12/2026" } });

        // Seleciona o tipo do cartão (igual ao teste existente)
        const cardTypeTrigger = screen.getByRole("combobox", { name: /tipo do cartão/i });
        fireEvent.click(cardTypeTrigger);

        const cardTypeOptions = await screen.findAllByText("Crédito");
        const cardTypeClickable = cardTypeOptions.find(
            (el) => el.closest("[role=option]") !== null
        );
        expect(cardTypeClickable).toBeDefined();
        if (cardTypeClickable) fireEvent.click(cardTypeClickable);

        expect(
            screen.getByRole("combobox", { name: /tipo do cartão/i })
        ).toHaveTextContent("Crédito");

        // Seleciona a cor do cartão
        const colorTrigger = screen.getByTestId("select-cores");
        fireEvent.click(colorTrigger);

        const colorOptions = await screen.findAllByText("Azul");
        const colorClickable = colorOptions.find(
            (el) => el.closest("[role=option]") !== null
        );
        expect(colorClickable).toBeDefined();
        if (colorClickable) fireEvent.click(colorClickable);

        expect(screen.getByTestId("select-cores")).toHaveTextContent("Azul");

        // Submete o formulário
        const submitButton = screen.getByRole("button", { name: /salvar/i });
        fireEvent.click(submitButton);

        // Aguarda a chamada da API
        await waitFor(() => {
            expect(createCardCreditDebit).toHaveBeenCalledTimes(1);
        });

        expect(createCardCreditDebit).toHaveBeenCalledWith(
            expect.objectContaining({
                name: "João Silva",
                number: "1234 •••• •••• 3456",
                company: "C6 Bank",
                flag: "Visa",
                expiredDate: "12/2026",
                cardType: "CREDIT", // Considerando que "Crédito" é mapeado para "CREDIT"
                colors: expect.any(Array), // O array de cores, definido por getColorsCard
            })
        );
    });

})