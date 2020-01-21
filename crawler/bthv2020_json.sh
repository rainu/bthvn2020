#/bin/bash

# TODO: Newline richtig handlen json_safe
# TODO: eventbody text ordentlich auslesen mit kindern

# deprecated
# day=$(cat $filenameIn | pup '.event-startdate .day text{}')
# month=$(cat $filenameIn | pup '.event-startdate .month text{}')


FILES=./extract/*.html

mkdir json

function json_safe() {
	echo $@ | sed 's/"/\\"/g'
}

function urldecode() {
    # urldecode <string>

    local url_encoded="${1//+/ }"
    printf '%b' "${url_encoded//%/\\x}"
}

function urlencode() {
    # urlencode <string>
    old_lc_collate=$LC_COLLATE
    LC_COLLATE=C

    local length="${#1}"
    for (( i = 0; i < length; i++ )); do
        local c="${1:i:1}"
        case $c in
            [a-zA-Z0-9.~_-]) printf "$c" ;;
            *) printf '%%%02X' "'$c" ;;
        esac
    done

    LC_COLLATE=$old_lc_collate
}

function doJsonExtract() {
	filenameIn=$1
	filenameInWithoutPath=$(echo $filenameIn | rev | cut -d/ -f1 | rev | cut -d\. -f1)
	filenameOut="./json/$filenameInWithoutPath.json"
	echo $filenameOut

	title=$(cat $filenameIn | pup 'h1.SP-Headline--article.SP-ArticleHeader__headline text{}')
	teaser=$(cat $filenameIn | pup '.SP-ArticleHeader__intro.SP-Intro text{}')
	description=$(cat $filenameIn | pup '.SP-ArticleContent .SP-Text text{}')
	location=$(cat $filenameIn | pup '.SP-Contact__locality__text text{}')
	locationGeo=$(cat $filenameIn | pup '.SP-Contact__locality__text p:last-child text{}')
	date=$(cat $filenameIn | pup '.SP-EventInformation__scheduling time attr{datetime}')

	json=$(cat $filenameIn | pup -p 'head meta[name=application-name] attr{data-content}')
	id=$(echo $json | jq '.id')
	category=$(echo $eventMeta | cut -d \| -f2)

	cat > $filenameOut <<- EOM
	{
	 "id":"$(json_safe $id)",
	 "date":"$(json_safe $date)",
	 "title":"$(json_safe $title)",
	 "category":"$(json_safe $category)",
	 "description":"$(json_safe $description)",
	 "teaser":"$(json_safe $teaser)",
	 "location":"$(json_safe $location)",
	 "locationGeo":"$(json_safe $locationGeo)"
	}
	EOM
}

for f in $FILES; do
	doJsonExtract $f &
done

