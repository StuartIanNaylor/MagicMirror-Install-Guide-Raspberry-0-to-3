# Mirror complex
Not really complex but we are going to and some 3rd party modules to MagicMirror and introduce you to the concept of pages.
```
cd ~/MagicMirror/modules
git clone https://github.com/edward-shen/MMM-pages.git
git clone https://github.com/edward-shen/MMM-page-indicator.git
git clone https://github.com/eouia/MMM-News
```
Add this into your css/custom.css cd ~/MagicMirror/css nano custom.css
```
/*****************************************************
 * Magic Mirror                                      *
 * Custom CSS                                        *
 *                                                   *
 * By Michael Teeuw http://michaelteeuw.nl           *
 * MIT Licensed.                                     *
 *                                                   *
 * Add any custom CSS below.                         *
 * Changes to this files will be ignored by GIT. *
 *****************************************************/
#NEWS .articleImage {
    filter: grayscale(100%);
 body {
 	
 }
```
Add these changes to the modules css
cd ~/MagicMirror/modules/MMM-News nano MMM-News.css
```
/* Type: Vertical */

#NEWS.vertical {
  font-size: calc(2vh);
  width:600px;
}

#NEWS.vertical .content .articleImage {
  max-width:600px;
  max-height:400px;
  margin-left:auto;
  margin-right:auto;
  display:block;
}
```
```
cd ~/MagicMirror
rm config.js
wget https://raw.githubusercontent.com/StuartIanNaylor/MagicMirror-Install-Guide-Raspberry-0-to-3/master/Mirror%20complex/config.js
```
Now you can check through and visit the modules added and read up about the config and have a look at the changes and how that looks on screen.
Modules are:-
https://github.com/edward-shen/MMM-pages
https://github.com/edward-shen/MMM-page-indicator
https://github.com/eouia/MMM-News

That should give you a quick guide and understanding of how modules are installed and also how you can edit to change apperance to create any custom MagicMirror

