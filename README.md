# A sample Docker workflow with Node.js, Redis, mongo and NGiNX + monitoring (cAdvisor, logstash, prometheus and grafana)

* full picture
```
   nginx
          -> node1 -->                        | ->  elasticsearch ->|
          -> node2 --> mongo + redis + logstash  ->                 |-----------
          -> node3 -->                        | -> influxdb ------- |           | -> grafana   
   cAdvisor ------------------------------------->  prometheus -----------------
```

* prometheus pushgateway
 ```bash
  DATA="some_metric{label=\"val1\"} 349^J"
  curl -i -X POST http://prometheusPushGateway:9091/metrics/job/api-server/ --data "${DATA}"
 ```

# resources:
 * http://blog.couchbase.com/2016/april/monitoring-docker-containers-docker-stats-cadvisor-universal-control-plane
