FROM node:20
WORKDIR /frontend
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build
EXPOSE 3000

CMD ["npm", "run", "start"]

# docker build -t frontend:latest .
# docker run -d -p 3000:3000 frontend:latest
# docker run -d -p 3000:3000 --name frontend frontend:latest
# docker exec -it frontend bash
# docker stop frontend
# docker rm frontend
# docker rmi frontend:latest
