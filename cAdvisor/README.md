# cAdvisor
 > start cAdvisor with basic authentication

# add password for your team
 * make sure `team.htpasswd` is empty
 * use [htpasswd](https://httpd.apache.org/docs/current/programs/htpasswd.html) to create/update password
  `htpasswd ./cAdvisor/team.htpasswd teamgreen`

# compose it
  ```
  cadvisor:
    container_name: cAdvisor
    build: ./cAdvisor
    ports:
      - "7788:8080"
    volumes:
      - "/:/rootfs:ro"
      - "/var/run:/var/run:rw"
      - "/sys:/sys:ro"
      - "/var/lib/docker/:/var/lib/docker:ro"
  ```
