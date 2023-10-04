curl --request POST \
  --url https://nodeone.armandonava.repl.co/directoryToTree \
  --header 'Content-Type: application/json' \
  --data '{
  "rootPath": "linux-distros",
  "maxDepth": 0
}'