# Usa uma imagem do Node.js como base
FROM node:18-alpine

# Define o diretório de trabalho no contêiner
WORKDIR /app

# Copia os arquivos necessários
COPY package.json package-lock.json ./
RUN npm install

# Copia o restante do código
COPY . .

# Expõe a porta do Nuxt
EXPOSE 3000

# Comando para iniciar o Nuxt
CMD ["npm", "run", "dev"]
