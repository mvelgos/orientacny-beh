# stolen from: https://stackoverflow.com/a/39898465/1671256

progress-bar() {
  local duration=${1}
  local columns=$(tput cols)
  local delay=$(echo "scale=3; ${duration} / ${columns}" | bc -q)

    already_done() { for ((done=0; done<$elapsed; done++)); do printf "▇"; done }
    remaining() { for ((remain=$elapsed; remain<${columns}; remain++)); do printf " "; done }
    #percentage() { printf "| %s%%" $(( (($elapsed)*100)/(${columns})*100/100 )); }
    clean_line() { printf "\r"; }

    # hide cursor
    tput civis

    # draw progress line
    for (( elapsed=1; elapsed<=${columns}; elapsed++ )); do
        already_done
        remaining
        sleep ${delay}
        clean_line
    done

    # cleanup and show cursor
    #clean_line
    tput cnorm
}
