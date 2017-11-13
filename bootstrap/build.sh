#!/bin/bash
echo "+++ BUILDING THE VIRTUAL MACHINE"
bash /project/bootstrap/vm/build.sh

echo "+++ BUILDING THE DATABASE"
bash /project/bootstrap/db/build.sh

echo "+++ ALL DONE. VAGRANT SSH' TO ENTER VIRTUAL MACHINE."

