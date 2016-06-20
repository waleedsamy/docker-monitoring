FROM node

MAINTAINER Waleed Samy <waleedsamy634@gmail.com>

RUN mkdir -p /src
WORKDIR /src
ADD . /src
RUN npm install

EXPOSE  8080

CMD ["node", "index.js"]
