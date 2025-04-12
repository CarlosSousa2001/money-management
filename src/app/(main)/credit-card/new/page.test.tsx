import { expect, test } from 'vitest';
import { render, screen } from "@testing-library/react";
import CreditCardPage from "./page";

test("exibe o título e descrição da página de cartões", () => {
  render(<CreditCardPage />);
  
  expect(screen.getByTestId("header-page-title")).toHaveTextContent("Cartões de crédito");
  expect(screen.getByTestId("header-page-description")).toHaveTextContent("Crie novos cartões de crédito");
});
