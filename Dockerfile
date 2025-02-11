# Node.js resmi imajı kullanılıyor
FROM node:18

# Çalışma dizinini ayarla
WORKDIR /app

# package.json ve package-lock.json'ı kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

# Uygulama dosyalarını kopyala
COPY . .

# Uygulamayı başlat
CMD ["node", "app.js"]
