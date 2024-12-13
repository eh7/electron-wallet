
BRANCH_URL="$GITHUB_SERVER_URL/$GITHUB_REPOSITORY/tree/$GITHUB_REF_NAME"

echo "BRANCH_URL VARIABLE -> $BRANCH_URL ->-> $BRANCH $GITHUB_REF_NAME"

message="`testing` \ngithub user: $3\n$BRANCH_URL\ncommit message: \n$GITHUB_COMMIT_MESSAGE\ncommit:$4\nref: $5\nrepo: $1\ntype: $2 \nGITHUB ACTIONS BOT"

#message="\ 
#$GITHUB_SERVER_URL/$GITHUB_REPOSITORY\
#commit message: $GITHUB_COMMIT_MESSAGE\
#commit:$4\
#ref: $5\
#actor: $3\
#repo: $1\
#type: $2\
#That's all folks\
#"

curl -s \
	-H "Content-Type: application/json" \
	-d "{\"username\": \"$1 :: $2\", \"content\": \"$message\"}" \
	$HOOK_URL_WALLETS
#	$HOOK_URL
#	https://discord.com/api/webhooks/1121564988121817168/mYjE3pwT8qoAxTlZ29LDCnHCu8rJJZqoR_xJ4Ecysbdm2ZvRfha3y0ciFBwKKU4NMuBm | jq .
