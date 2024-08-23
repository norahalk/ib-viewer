FROM node:18
#EXPOSE 3000

WORKDIR /pkginfo

COPY package.json /pkginfo
COPY public/ /pkginfo/public/
COPY src/ /pkginfo/src/
#COPY package.json ./
#COPY src ./src
#COPY public ./public

RUN apt-get update && apt-get install -y vim
RUN npm install
RUN PUBLIC_URL=https://cmssdt.cern.ch/pkginfo npm run build
RUN npm install -g serve

#RUN npm install

CMD ["serve", "-s", "build"]
#CMD ["npm", "start"]