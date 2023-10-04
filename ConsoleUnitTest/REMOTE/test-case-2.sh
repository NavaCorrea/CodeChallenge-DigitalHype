curl --request POST \
  --url https://nodeone.armandonava.repl.co/directoryToTree \
  --header 'Content-Type: application/json' \
  --data '{
  "rootPath": "dummy_dir",
  "maxDepth": 5
}'