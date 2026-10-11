# build react -> dist
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# nginx + ssh
FROM nginx:alpine

# install openSSH server
RUN apk upgrade --no-cache && apk add --no-cache openssh

# buat user biasa
RUN adduser -D fatawa

#buat folder SSH
RUN mkdir -p /home/fatawa/.ssh

# copy pub key
COPY id_rsa.pub /home/fatawa/.ssh/authorized_keys

# permision SSH
RUN chmod 700 /home/fatawa/.ssh && chmod 600 /home/fatawa/.ssh/authorized_keys && chown -R fatawa:fatawa /home/fatawa/.ssh

# copy dist dari build
COPY --from=build /app/dist /usr/share/nginx/html

# copy config nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# configurasi SSH ( tidak boleh login sebagai root)
RUN sed -i 's/^#\?PermitRootLogin.*/PermitRootLogin no/' /etc/ssh/sshd_config

# tidak boleh login menggunakan password
RUN sed -i 's/^#\?PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config

# login menggunakan pub key
RUN sed -i 's/^#\?PubkeyAuthentication.*/PubkeyAuthentication yes/' /etc/ssh/sshd_config

# hanya user fatawa yg boleh login
RUN echo "AllowUsers fatawa" >> /etc/ssh/sshd_config

# generate ssh host key
RUN ssh-keygen -A

# port nginx
EXPOSE 80
# port ssh
EXPOSE 22

# jalankan nginx & ssh
CMD ["/bin/sh", "-c", "nginx && exec /usr/sbin/sshd -D"]
