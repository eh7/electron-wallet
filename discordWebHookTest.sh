#curl \
#-H "Content-Type: application/json" \
#-d '{"username": "test", "content": "hello"}'
#-X POST \
#https://discord.com/api/webhooks/1121564988121817168/mYjE3pwT8qoAxTlZ29LDCnHCu8rJJZqoR_xJ4Ecysbdm2ZvRfha3y0ciFBwKKU4NMuBm

#curl -s https://discord.com/api/webhooks/1121564988121817168/mYjE3pwT8qoAxTlZ29LDCnHCu8rJJZqoR_xJ4Ecysbdm2ZvRfha3y0ciFBwKKU4NMuBm | jq .

echo '{"username": "$1"}'
echo "{\"username\": \"$1\"}"

curl -s \
	-H "Content-Type: application/json" \
	-d "{\"username\": \"repo: $1 :: $2\", \"content\": \"test message\"}" \
	https://discord.com/api/webhooks/1121564988121817168/mYjE3pwT8qoAxTlZ29LDCnHCu8rJJZqoR_xJ4Ecysbdm2ZvRfha3y0ciFBwKKU4NMuBm | jq .
