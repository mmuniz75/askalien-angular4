
#sudo docker build --build-arg ASKALIEN_SERVER=askalien-server.us-east-1.elasticbeanstalk.com -t mmuniz/askalien:client .
#sudo docker build --build-arg ASKALIEN_SERVER=localhost:8080 -t askalien:client-local .
#sudo docker run -d -p 80:8080 --name askalien-client-local askalien:client-local

FROM node as builder

COPY package.json package.json

RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

RUN npm i && mkdir /ng-app && cp -R ./node_modules ./ng-app

WORKDIR /ng-app

COPY . .

ARG ASKALIEN_SERVER

RUN sed -i -e 's|<ASKALIEN_SERVER>|'${ASKALIEN_SERVER}'|g' /ng-app/src/environments/environment.prod.ts

RUN $(npm bin)/ng build --prod --build-optimizer

FROM nginx:1.13.5-alpine

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /ng-app/dist /usr/share/nginx/html

RUN rm -rf /usr/share/nginx/html/nginx
    
EXPOSE 8080

RUN touch /var/run/nginx.pid && \
    chown -R nginx:0 /var/run/nginx.pid && \
    chmod -R ug+rw /var/run/nginx.pid && \
    chown -R nginx:0 /var/cache/nginx && \
   chmod -R ug+rw /var/cache/nginx

CMD ["nginx", "-g", "daemon off;"]


