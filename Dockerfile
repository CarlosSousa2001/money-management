FROM node:20

WORKDIR /frontend

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install --legacy-peer-deps

# Copia todo o restante do projeto
COPY . .

# Garante que as variáveis de ambiente estejam disponíveis no build
# O Next.js usa esse arquivo no momento do build
RUN cp .env.production .env

# Faz o build da aplicação
RUN npm run build

# Expõe a porta usada pela aplicação
EXPOSE 3000

# Comando para iniciar a aplicação em produção
CMD ["npm", "run", "start"]


# docker build -t frontend:latest .
# docker run -d -p 3000:3000 frontend:latest
# docker run -d -p 3000:3000 --name frontend frontend:latest
# docker exec -it frontend bash
# docker stop frontend
# docker rm frontend
# docker rmi frontend:latest
