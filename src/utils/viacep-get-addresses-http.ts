import { toast } from "sonner"

export async function getAddressByZipCode(zipCode: string) {
  
    const response = await fetch(`https://viacep.com.br/ws/${zipCode}/json/`)
    const data = await response.json()
    if (data.erro) {
        toast.error("CEP inválido")
        return {
            street: "",
            city: "",
            state: "",
            zip_code: "",
            neighborhood: "",
            complement: "",
        }
    }
    return {
        street: data.logradouro,
        city: data.localidade,
        state: data.uf,
        zip_code: data.cep,
        neighborhood: data.bairro,
        complement: data.complemento,
    }
}