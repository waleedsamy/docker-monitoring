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
* run
 * docker-compose for monitoring
  ```bash
  # remove data because there are some permissions conflicts in mongo volume and mac
  rm -rf data && docker-compose -f docker-compose.yml -f docker-compose.monitoring.dev.yml up --build
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
* grok fitting
```bash
# https://grokdebug.herokuapp.com/
[18/Jul/2016:17:53:32 +0000] 85.140.97.76 "GET /animal HTTP/1.1" 103 200 229 2 - "curl/7.43.0" [172.17.0.11:8080, 172.17.0.9:8080] [502, 200] [0.000, 0.001] [0, 2] 0.069 [0.065, 0.004] [0.065, 0.004] 1.10.1
\[%{HTTPDATE:request_date}\] %{IPORHOST:remote_addr} "%{WORD:http_method} %{URIPATHPARAM:request_url} HTTP/%{NUMBER:http_version}" %{NUMBER:request_length} %{INT:status} %{INT:bytes_sent} %{INT:body_bytes_sent} %{NOTSPACE:http_referer} %{QS:agent} %{MY_QS:upstream_addr} %{MY_QS:upstream_status} %{MY_QS:upstream_connect_time} %{MY_QS:upstream_response_length} %{BASE10NUM:request_time} %{MY_QS:upstream_response_time} %{MY_QS:upstream_header_time} %{VERSION:nginx_version}

```

* cadvisor
 * no need to provide authentication, cause it will be linked to another containers only.


* services
 * api -> `http://127.0.0.1`
 * cadvisor -> `http://127.0.0.1:10011/metrics`
 * fluentd-prometheus -> `http://localhost:10022/metrics`
 * prometheus -> `http://127.0.0.1:10033/metrics`
 * grafana dashboard -> `http://127.0.0.1:10099`

# resources:
 * http://blog.couchbase.com/2016/april/monitoring-docker-containers-docker-stats-cadvisor-universal-control-plane
