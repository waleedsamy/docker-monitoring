FROM fluent/fluentd:latest-onbuild

USER fluent

RUN mkdir -p /fluentd/grok

COPY ./grok /fluentd/grok

RUN gem install fluent-plugin-secure-forward fluent-plugin-grok-parser fluent-plugin-prometheus fluent-plugin-grep fluent-plugin-elasticsearch

EXPOSE 24284 24231

CMD fluentd -c /fluentd/etc/$FLUENTD_CONF -p /fluentd/plugins $FLUENTD_OPT
