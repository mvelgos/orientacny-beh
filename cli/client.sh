#!/usr/bin/env bash

source config.sh
source progressbar.sh

function download_data {
    # download latest data first
    local file="${REPO}/data-$(date +'%Y-%m-%dT%T').csv"
    wget -q ${URL} -O "${file}"
    if [[ $? -eq 0 ]]; then
        ln -fs "${file}" data.csv
    fi
}

# handle ctrl+c
trap "tput cnorm; exit 0" SIGINT

# check environment first
if [[ ! -d ${REPO} ]]; then
    mkdir ${REPO}
fi


# superloop
while true; do
    download_data

    # check the screen "resolution"
    lines=$(tput lines)
    lines_per_page=$(( ${lines} - 15 ))
    # check if screen is high enough
    if [[ ${lines_per_page} -lt 0 ]]; then
        echo "Error: Not enough lines to show." > /dev/stderr
        exit 1
    fi

    # cycle through categories
    for category in ${CATEGORIES}; do
        # extract specific category, remove first column, normalize line endings and append ';'
        data=$(grep "^${category};" data.csv | cut -d';' -f2- | sed -e 's/\r$//' -e 's/$/;/')
        
        # extract the number of top runners
        top_runners=$(echo "${data}" | sed -r '/(MP)\s*$/d' | head -n ${TOP_LINES})

        # count nr of pages
        pages=$(echo "$(echo "${data}" | wc -l) / (${lines_per_page} - ${TOP_LINES} - 1)" | bc -q)

        # pagination
        stop=0
        for page in $(seq ${pages}); do
            clear

            # extract lines in the range from START to STOP
            start=$(( ${stop} + 1 ))
            if [[ ${page} -eq 1 ]]; then
                stop=$(( ${start} + ${lines_per_page} - 1 ))
            else
                stop=$(( ${start} + ${lines_per_page} - ${TOP_LINES} - 2 ))
            fi
            content=$(echo "${data}" | sed -n "${start},${stop}p")

            # insert top runners, if page is not first
            if [[ ${page} -gt 1 ]]; then
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
            echo "Page ${page} of ${pages}"
            progress-bar ${DELAY}
            echo -e "\r"
        done
    done
done
