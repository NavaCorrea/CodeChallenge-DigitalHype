curl --request POST \
  --url http://localhost:3000/directoryToTree \
  --header 'Content-Type: application/json' \
  --data '{
  "rootPath": "dummy_dir/a_dir",
  "maxDepth": 5
}'