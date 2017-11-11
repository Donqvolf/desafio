#!/bin/bash
echo "+ Setup for NginX"
rm -f /etc/nginx/sites-enabled/*
cp -f /project/bootstrap/ws/nginx /etc/nginx/sites-enabled/shared
sudo nginx -t && sudo nginx -s reload  1>/dev/null 2>&1
service nginx restart 1>/dev/null 2>&1

