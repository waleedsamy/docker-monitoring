FROM google/cadvisor:latest

ADD team.htpasswd /

ENTRYPOINT ["/usr/bin/cadvisor", "-logtostderr", "--http_auth_file", "/team.htpasswd", "--http_auth_realm", "localhost"]
