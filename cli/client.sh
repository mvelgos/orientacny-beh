#!/usr/bin/env bash

source progressbar.sh

URL="https://raw.githubusercontent.com/bletvaska/orientacny-beh/master/data/example.data.csv"
REPO="/tmp/data"
HEADER="Pos;Name;Organisation;Country;Time;Delta"
DELAY=30
CATEGORIES="M35-A M40-A M45-A M45-B M50-A M55-A M60-A M65-A M70-A M75-A W35-A W35-B W40-A W45-A W45-B W50-A W55-A W60-A W65-A W70-A"

# handle ctrl+c
trap "tput cnorm; exit 0" SIGINT

# check environment first
if [[ ! -d ${REPO} ]]; then
    mkdir ${REPO}
fi


# superloop
while true; do
    # download latest data first
    FILE="data-$(date +'%Y-%m-%dT%T').csv"
    wget -q ${URL} -O "${REPO}/${FILE}"
    if [[ $? -eq 0 ]]; then
        ln -fs "${REPO}/${FILE}" data.csv
    fi

    # count nr of pages based on the number of lines on the screen and nr of lines in the file
    lines=$(tput lines)
    #columns=$(tput cols)
    LINES_PER_PAGE=$(( ${lines} - 12 ))

    # cycle through categories
    for category in ${CATEGORIES}; do
        # extract specific category, remove first column, normalize line endings and append ';'
        DATA=$(grep "^${category};" data.csv | cut -d';' -f2- | sed -e 's/\r$//' -e 's/$/;/')

        # count nr of pages
        PAGES=$(echo "$(echo "${DATA}" | wc -l) / ${LINES_PER_PAGE}" | bc -q)

        # pagination
        for PAGE in $(seq 0 ${PAGES}); do
            clear

            # extract lines in the range from START to STOP
            START=$(( ${PAGE} * ${LINES_PER_PAGE} + 1 ))
            STOP=$(( ${START} + ${LINES_PER_PAGE} - 1 ))
            CONTENT=$(echo "${DATA}" | sed -n "${START},${STOP}p")

            # combine header and content
            OUTPUT=$(echo -e "${HEADER}\n${CONTENT}" | column -t -s ";")

            # print label first
            width=$(echo "${OUTPUT}" | head -1 | wc -m)
            echo
            figlet -w ${width} -c "${category}"

            # insert separator as second line and print it
            separator=$(echo "${OUTPUT}" | head -1 | sed 's/[^|]/=/g')
            echo "${OUTPUT}" | sed "2i${separator}"

            # show progress bar
            tput cup $(( ${lines} - 2 )) 0
            echo "Page $(( ${PAGE} + 1 )) of $(( ${PAGES} + 1))"
            progress-bar ${DELAY}
            echo -e "\r"
        done
    done
done
