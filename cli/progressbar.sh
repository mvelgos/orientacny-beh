# stolen from: https://stackoverflow.com/a/39898465/1671256

progress-bar() {
  local duration=${COLUMNS} #${1}


    already_done() { for ((done=0; done<$elapsed; done++)); do printf "▇"; done }
    remaining() { for ((remain=$elapsed; remain<$duration; remain++)); do printf " "; done }
    percentage() { printf "| %s%%" $(( (($elapsed)*100)/($duration)*100/100 )); }
    clean_line() { printf "\r"; }

  tput civis
  for (( elapsed=1; elapsed<=$duration; elapsed++ )); do
      already_done; remaining; # percentage
      sleep 0.1
      clean_line
  done
  clean_line
  tput cnorm
}
