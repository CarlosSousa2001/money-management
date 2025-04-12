import { test, expect } from '@playwright/test';

test.describe('Forms', () => {
    test('has title', async ({ page }) => {
        await page.goto('http://localhost:3000/credit-card/new');

        // Verifica se o título está visível
        await expect(page.getByRole('heading', { name: 'Cartões de crédito' })).toBeVisible();

        // Verifica se a descrição está visível (span ou texto qualquer)
        await expect(page.getByText('Crie novos cartões de crédito')).toBeVisible();
    });

    test('preenche e envia o formulário de cartão de crédito', async ({ page }) => {
        await page.goto('http://localhost:3000/credit-card/new');

        // Preenche os campos
        await page.getByLabel(/nome do titular/i).fill('João da Silva');
        await page.getByLabel(/número do cartão/i).fill('4111111111111111');
        await page.getByLabel(/empresa emissora/i).fill('Nubank');
        await page.getByLabel(/bandeira/i).fill('Visa');
        await page.getByLabel(/data de vencimento/i).fill('12/30');

        await page.getByRole('combobox', { name: /tipo do cartão/i }).click();
        await page.getByRole('option', { name: 'Crédito' }).click();

        await page.getByTestId('select-cores').click();
        await page.getByRole('option', { name: /azul/i }).click();


        // Envia o formulário
        await page.getByRole('button', { name: /salvar/i }).click(); // ✅ agora encontra

        await page.waitForTimeout(5000);

        await expect(page.getByLabel(/nome do titular/i)).toHaveValue('');
        await expect(page.getByLabel(/número do cartão/i)).toHaveValue('');
        await expect(page.getByLabel(/empresa emissora/i)).toHaveValue('');
        await expect(page.getByLabel(/bandeira/i)).toHaveValue('');
        await expect(page.getByLabel(/data de vencimento/i)).toHaveValue('');

        // Exemplo para select ou combobox se aplicável:
        await expect(page.getByRole('combobox', { name: /tipo do cartão/i })).toHaveValue('');
    });
});