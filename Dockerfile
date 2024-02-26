FROM node:14.15.4-slim

RUN echo "deb http://archive.debian.org/debian stretch main contrib non-free" > /etc/apt/sources.list
RUN apt update && apt-get install -y --no-install-recommends \
  git \
  ca-certificates

# usuario do container - root
USER node

WORKDIR /home/node/app

CMD ["sh", "-c", "npm install && tail -f /dev/null"]