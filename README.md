# A sample Docker workflow with Node.js, Redis, mongo and NGiNX + monitoring (cAdvisor, logstash, prometheus and grafana)

* full picture
```
   nginx
          -> node1 -->
          -> node2 --> mongo + redis + logstash -> prometheus -> grafana
          -> node3 -->                            |
   cAdvisor ------------------------------------->  
```
