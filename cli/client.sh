#!/usr/bin/env bash

source progressbar.sh

URL="https://raw.githubusercontent.com/bletvaska/orientacny-beh/master/data/example.data.csv"
REPO="/tmp/data"
HEADER="Kat;Por.;Meno;Klub;Kraj;Cas;Rozdiel"
DELAY=30

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
    LINES_PER_PAGE=$(( ${LINES} - 5 ))
    PAGES=$(echo "$(wc -l < data.csv) / ${LINES_PER_PAGE}" | bc -q)

    # pagination
    for PAGE in $(seq 0 ${PAGES}); do
        clear
        # extract lines in the range from START to STOP
        START=$(( ${PAGE} * ${LINES_PER_PAGE} + 1 ))
        STOP=$(( ${START} + ${LINES_PER_PAGE} - 1 ))
        CONTENT=$(sed -n "${START},${STOP}p" data.csv)

        # append header
        CONTENT=$(echo -e "${HEADER}\n${CONTENT}")
        echo "${CONTENT}" | column -t -s ";" -o "| "

        tput cup $(( ${LINES} - 2 )) 0
        echo "Strana ${PAGE}/${PAGES}"
        progress-bar ${DELAY}
        echo -e "\r"
    done
done
