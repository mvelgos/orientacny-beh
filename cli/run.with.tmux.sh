#!/usr/bin/env bash

session='orientacny beh'

tmux start-server
tmux new-session -d -s "${session}" -n 'session'

tmux selectp -t 1
tmux send-keys "./client.sh" C-m

tmux splitw -h -p 50
tmux send-keys "./client.sh" C-m

tmux attach-session -t "${session}"
