# A sample Docker workflow with Node.js, Redis, mongo and NGiNX + monitoring (cAdvisor, logstash, prometheus and grafana)

* full picture
```
   nginx
          -> node1 -->                        | ->  elasticsearch --->|
          -> node2 --> mongo + redis + fluentd  ->                    |-------> grafana
          -> node3 -->                          -> prometheus ------->|
                                                  |
   cAdvisor -------------------------------------^
```

* fluentd
 * replace logstash cause fluentd has a very good plugin for prometheus
 * no need for prometheus push gateway anymore

* run container example
```bash
  docker run -it --volumes-from data-container-logs --link mongo --link redis dockermonitoring_node1 /bin/bash
```

# resources:
 * http://blog.couchbase.com/2016/april/monitoring-docker-containers-docker-stats-cadvisor-universal-control-plane
