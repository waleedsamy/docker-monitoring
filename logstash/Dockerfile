FROM logstash:latest

COPY ./config /etc/logstash/conf.d

COPY ./patterns /opt/logstash/patterns

RUN chown -R logstash: /opt/logstash/patterns

CMD ["logstash", "-f", "/etc/logstash/conf.d/nginx_to_stdout.conf"]
