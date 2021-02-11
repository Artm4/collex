# Install dependencies based on ./package.json
npm install

# Make a copy that changes symlinks to hard copies
rsync --archive --verbose --copy-links ./node_modules/ ./node_modules_cp/

# Remove and replace
rm -r ./node_modules/
mv ./node_modules_cp/ ./node_modules/

expo build:android -t apk
