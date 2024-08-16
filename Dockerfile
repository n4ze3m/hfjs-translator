FROM node:18-slim
WORKDIR /app

RUN apt update
RUN apt update && apt -y install g++ make python3
RUN apt update && apt -y install --no-install-recommends ca-certificates git git-lfs openssh-client curl jq cmake sqlite3 openssl psmisc python3
RUN apt -y install g++ make
# RUN npm install -g node-gyp
RUN apt-get clean autoclean && apt-get autoremove --yes && rm -rf /var/lib/{apt,dpkg,cache,log}/
COPY . .

RUN npm install


RUN npm run build:ts

EXPOSE 3000

ENV NODE_ENV=production

CMD ["npm", "start"]