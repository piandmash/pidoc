///#pi-pidoc - index.js
///This module creates documentation from a code file passed and creates a README.md file in the path passed
(function () {
    //add in the requires
    var requires = {
        fs: null
    };
    //create the default object
    var pidoc = {};

    // global on the server, window in the browser
    var root, previous_pidoc;
    root = this;
    if (root != null) {
        previous_pidoc = root.pidoc;
    }

    ///## Stubs

    ///### pidoc.init = function ()
    ///Initiates the pidoc, should be called at setup with a config object to assist in set up
    pidoc.init = function () {

        var log = function (message) {
            console.log(message);
        }

        var build = function (dir, output, recursive) {
            var readme = '';
            log('Reading directory:' + dir);
            var pidocignore = false;
            (requires.fs.readdirSync(dir)).forEach(function (file) {
                //check if an ignore is in the folder
                if (file === '.pidocignore') pidocignore = true;
            });
            if (!pidocignore)
                {
                (requires.fs.readdirSync(dir)).forEach(function (file) {
                //check if an ignore is in the folder
                if (file === '.pidocignore') pidocignore = true;
                //call child folders
                if (recursive && requires.fs.lstatSync(dir + '/' + file).isDirectory()) {
                    build(dir + '/' + file, output, recursive);
                }
                //if js file then read
                if (file.indexOf('.js') >= 0) {
                    log('Reading file:' + dir + '/' + file);
                    //read file
                    var lastLineBullet = false;
                    requires.fs.readFileSync(dir + '/' + file).toString().split('\n').forEach(function (line) {
                        var l = line.toString().replace(/^\s+/, '')
                        if (l.indexOf('///') === 0) {
                            readme += ((readme.length > 0 && lastLineBullet && l.indexOf('///*') < 0) ? '\n' : '') + l.replace('///\\', '').replace('///', '') + ((l.indexOf('///*') < 0 && l.indexOf('///\\') < 0) ? '\n' : '\n');
                            lastLineBullet = (l.indexOf('///*') === 0);
                        }
                    });
                }
                //if js file then read
                if (file.indexOf('.cs') >= 0) {
                    log('Reading file:' + dir + '/' + file);
                    //read file
                    var lastLineBullet = false;
                    requires.fs.readFileSync(dir + '/' + file).toString().split('\n').forEach(function (line) {
                        var l = line.toString().replace(/^\s+/, '').replace(/#region /g, '///##').replace(/<property>/g, '<property>###').replace(/<method>/g, '<method>###').replace(/<param name="/g, '<param>* ').replace(/<exception cref="/g, '<exception>').replace(/">/g, ': ').replace(/<returns>/g, 'Returns: ');
                        var rex = /(<([^>]+)>)/ig;
                        l = l.replace(rex, "");
                        if (l.indexOf('///') === 0) {
                            readme += ((readme.length > 0 && lastLineBullet && l.indexOf('///*') < 0) ? '\n' : '') + l.replace('///\\', '').replace('/// ', '').replace('///', '') + ((l.indexOf('///*') < 0 && l.indexOf('///\\') < 0) ? '\n\n' : '\n');
                            lastLineBullet = (l.indexOf('///*') === 0);
                        }
                    });
                }
            });
            }
            if (readme !== '' && !pidocignore) {
                log('Writting output to:' + dir + '/' + output);
                requires.fs.writeFileSync(dir + '/' + output, readme);
            } else {
                log('NOT writting output: ' + ((!pidocignore)? 'no copy' : '.pidocignore found'));
            }
        }

        //first check for options
        if(process.argv.length > 2){
            
            if (process.argv[2] == '-h') {
                //show help
                console.log('');
                console.log('Usage: [options] [input file|folder] [output file name]');
                console.log('');
                console.log('Options:');
                console.log('  -s       build a markdown file from a single input file');
                console.log('  -f       build a markdown file from all .js files within the folder');
                console.log('  -r       recursively call sub folders');
                console.log('');
                console.log('Defaults: -f ./ README.md');
                console.log('');
                console.log('Add a .pidocignore file to a folder to ignore the folder and any child folders');
                console.log('');
                console.log('Example: node pidoc.js -f-r ./ README.md');
            }
            else {
                var op = '-f'; //no options
                var inputIndex = 2;
                //get parameters
                if (process.argv[2].substring(0, 1) === '-') {
                    //check options
                    op = process.argv[2];
                    inputIndex = 3;
                }
                var input = (process.argv.length - 1 >= inputIndex) ? process.argv[inputIndex] : './';
                var output = (process.argv.length - 1 >= (inputIndex + 1)) ? process.argv[inputIndex + 1] : 'README.md';

                var ops = op.split('-');

                //build by folder
                if (ops.indexOf('s') >= 0) {
                    //do single file check
                    console.log('single file');
                    var readme = '';

                    requires.fs.readFileSync(input).toString().split('\n').forEach(function (line) {
                        var l = line.toString().replace(/^\s+/, '');
                        if (l.indexOf('///') === 0) {
                            readme += l.replace('///', '') + '\n\n';
                        }
                    });

                    requires.fs.writeFileSync(output, readme);
                }
                else {
                    //build for folder
                    build(input, output, (ops.indexOf('r') >= 0));
                }
                console.log(input);
                console.log(output);
            }
        }

    }
    
    ///## Requires
    ///* fs

    // AMD / RequireJS
    if (typeof define !== 'undefined' && define.amd) {
        define(['fs'], function (fs) {
            requires.fs = fs;
            //calls the init function
            pidoc.init();
            return pidoc;
        });
    }
        // Node.js
    else if (typeof module !== 'undefined' && module.exports) {
        requires.fs = require('fs');
        module.exports = pidoc;
        //calls the init function
        pidoc.init();
    }
        // included directly via <script> tag
    else {
    }

}());
