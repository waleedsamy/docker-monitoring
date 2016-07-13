FROM fluent/fluentd:latest-onbuild

RUN gem install fluent-plugin-secure-forward fluent-plugin-prometheus

EXPOSE 24284

CMD fluentd -c /fluentd/etc/$FLUENTD_CONF -p /fluentd/plugins $FLUENTD_OPT
