FROM logstash:latest

# COPY ./config /etc/logstash/conf.d

# COPY ./patterns /opt/logstash/patterns

# RUN chown -R logstash: /opt/logstash/patterns

RUN /opt/logstash/bin/logstash-plugin install logstash-output-influxdb

CMD ["logstash", "-f", "/etc/logstash/conf.d/logs_to_influxdb.conf", "--auto-reload"]
