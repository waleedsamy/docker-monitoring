FROM alpine:3.2
RUN apk add --update nginx && rm -rf /var/cache/apk/*

COPY nginx.conf /etc/nginx/nginx.conf

RUN chown -R  nginx:nginx /var/lib/nginx

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
