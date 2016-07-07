FROM alpine:3.4
RUN apk add --update nginx && rm -rf /var/cache/apk/*

COPY nginx.conf /etc/nginx/nginx.conf

RUN mkdir /run/nginx

RUN chown -R  nginx:nginx /var/lib/nginx

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
