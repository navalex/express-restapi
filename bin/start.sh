#!/bin/sh

runAPI() {
    echo -e "##############################"
    echo -e "# Installing dependencies... #"
    echo -e "##############################\n"
    npm install
    echo -e "\n\n##############################"
    echo -e "#     Starting server...     #"
    echo -e "##############################\n"
    npm run dev
}

runPrismaStudio() {
    echo -e "\n\n##############################"
    echo -e "#     Starting server...     #"
    echo -e "##############################\n"
    npx prisma studio
}

# Run function based on argument
if [ "$1" = "api" ]; then
    runAPI
elif [ "$1" = "pstudio" ]; then
    runPrismaStudio
else
    echo -e "Invalid argument. Please use either 'api' or 'studio'."
fi
```