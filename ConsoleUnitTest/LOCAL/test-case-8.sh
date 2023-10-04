curl --request POST \
  --url http://localhost:3000/directoryToTree \
  --header 'Content-Type: application/json' \
  --data '{
  "rootPath": "linux-distros",
  "maxDepth": 3
}'