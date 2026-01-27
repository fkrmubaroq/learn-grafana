FROM grafana/promtail:3.6.0

COPY promtail-config.yaml /etc/promtail/promtail-config.yaml

EXPOSE 9080

CMD ["-config.file=/etc/promtail/promtail-config.yaml"]
