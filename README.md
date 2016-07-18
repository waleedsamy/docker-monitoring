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

* Test nginx failover
```bash
for ((i=1;i<=100;i++)); do   curl -v --header "Connection: keep-alive" "127.0.0.1/animal"; done
#
# you should get
# 18/Jul/2016:17:53:32 +0000 172.17.0.1 GET /animal HTTP/1.1 103 200 229 2 - "curl/7.43.0" "172.17.0.11:8080, 172.17.0.9:8080" "502, 200" "0.000, 0.001" "0, 2" "0.069" "0.065, 0.004" "0.065, 0.004" 1.10.1
# to simulate it just
echo 18/Jul/2016:17:53:32 +0000 172.17.0.1 GET /animal HTTP/1.1 103 200 229 2 - \"curl/7.43.0\" \"172.17.0.11:8080, 172.17.0.9:8080\" \"502, 200\" \"0.000, 0.001\" \"0, 2\" \"0.069\" \"0.065, 0.004\" \"0.065, 0.004\" 1.10.1 >> /var/log/nginx/access-node-app.log
#
```
# resources:
 * http://blog.couchbase.com/2016/april/monitoring-docker-containers-docker-stats-cadvisor-universal-control-plane
