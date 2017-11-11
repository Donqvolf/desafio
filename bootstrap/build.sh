#!/bin/bash
echo "+++ BUILDING THE VIRTUAL MACHINE"
bash /project/bootstrap/vm/build.sh

echo "+++ BUILDING THE NGINX WEB SERVER"
bash /project/bootstrap/ws/build.sh

echo "+++ ALL DONE. VAGRANT SSH' TO ENTER VIRTUAL MACHINE."

