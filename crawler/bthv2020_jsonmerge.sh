#/bin/bash

jq -c -s '[.[]]' json/*.json > out.json
