#!/usr/bin/env bash

source progressbar.sh

function download_data {
    # download latest data first
    local file="${REPO}/data-$(date +'%Y-%m-%dT%T').csv"
    wget -q ${URL} -O "${file}"
    if [[ $? -eq 0 ]]; then
        ln -fs "${file}" data.csv
    fi
}

URL="https://raw.githubusercontent.com/bletvaska/orientacny-beh/master/data/example.data.csv"
REPO="/tmp/data"
HEADER="Pos;Name;Organisation;Country;Time;Delta"
DELAY=5
CATEGORIES="M35-A M40-A M45-A M45-B M50-A M55-A M60-A M65-A M70-A M75-A W35-A W35-B W40-A W45-A W45-B W50-A W55-A W60-A W65-A W70-A"
TOP_LINES=3

# handle ctrl+c
trap "tput cnorm; exit 0" SIGINT

# check environment first
if [[ ! -d ${REPO} ]]; then
    mkdir ${REPO}
fi


# superloop
while true; do
    download_data

    # count nr of pages based on the number of lines on the screen and nr of lines in the file
    lines=$(tput lines)
    #columns=$(tput cols)
    LINES_PER_PAGE=$(( ${lines} - 15 ))

    # cycle through categories
    for category in ${CATEGORIES}; do
        # extract specific category, remove first column, normalize line endings and append ';'
        data=$(grep "^${category};" data.csv | cut -d';' -f2- | sed -e 's/\r$//' -e 's/$/;/')
        
        # extract the number of top runners
        top_runners=$(echo "${data}" | sed -r '/(MP)\s*$/d' | head -n ${TOP_LINES})

        # count nr of pages
        pages=$(echo "$(echo "${data}" | wc -l) / (${LINES_PER_PAGE} - ${TOP_LINES})" | bc -q)

        # pagination
        stop=0
        for page in $(seq 0 ${pages}); do
            clear

            # extract lines in the range from START to STOP
            start=$(( ${stop} + 1 ))
            if [[ ${page} -gt 0 ]]; then
                stop=$(( ${start} + ${LINES_PER_PAGE} - ${TOP_LINES} - 2 ))
            else
                stop=$(( ${start} + ${LINES_PER_PAGE} - 1 ))
            fi
            content=$(echo "${data}" | sed -n "${start},${stop}p")

            # insert top runners, if page is not first
            if [[ ${page} -gt 0 ]]; then
                separator=$(echo "${HEADER}" | sed -r 's/([^;]*)/.../g')
                content="${top_runners}\n${separator}\n${content}"
            fi

            # combine header and content
            output=$(echo -e "${HEADER}\n${content}" | column -t -s ";")

            # print label first
            width=$(echo "${output}" | head -1 | wc -m)
            echo
            figlet -w ${width} -c "${category}"
            echo


            # insert separator as second line and print it
            separator=$(echo "${output}" | head -1 | sed 's/[^|]/=/g')
            echo "${output}" | sed "2i${separator}"

            # show progress bar
            tput cup $(( ${lines} - 2 )) 0
            echo "Page $(( ${page} + 1 )) of $(( ${pages} + 1))"
            progress-bar ${DELAY}
            echo -e "\r"
        done
    done
done
