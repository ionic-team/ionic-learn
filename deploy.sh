git branch -D gh-pages
rm -rf output
git clone . output
cd output
git checkout --orphan gh-pages
rm -rf *
git add --all
git commit -m "prep for deploy"
git remote rm origin
git remote add origin git@github.com:driftyco/ionic-learn
cd ..
nanoc
cd output
git add --all
git commit -m "Content creation"
git push -f origin gh-pages
cd ..
