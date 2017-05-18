module.exports = function(grunt) {

    // This is where we configure each task that we'd like to run.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            options: {
                livereload: true, // Set this to false if you do not wish to enable live reloading.
            },
            // This is where we set up all the tasks we'd like grunt to watch for changes.
            scripts: {
                files: ['js/source/*.js'],
                tasks: ['uglify'],
                options: {
                    spawn: false,
                },
            },
            sprites: {
                files: ['images/sprites/*.png'],
                tasks: ['sprite'],
                options: {
                    spawn: false,
                }
            },
            images: {
                files: ['images/source/**/*.{png,jpg,gif}', 'images/source/*.{png,jpg,gif}'],
                tasks: ['imagemin'],
                options: {
                    spawn: false,
                }
            },
            css: {
                files: ['sass/*.sass', 'sass/**/*.sass'],
                tasks: ['sass'],
                options: {
                    spawn: false,
                }
            }
        },
        uglify: {
            // This is for minifying all of our scripts.
            options: {
                sourceMap: true,
                mangle: false
            },
            my_target: {
                files: [{
                    expand: true,
                    cwd: 'js/source',
                    src: '*.js',
                    dest: 'js/build'
                }]
            }
        },
        sprite:{
            // This will grab all of our sprite images and turn them into one sprite file and accompanying mixin sass file.
            all: {
                src: 'images/sprites/*.png',
                destImg: 'images/optimized/spritesheet.png',
                imgPath: 'images/optimized/spritesheet.png',
                algorithm: 'diagonal',
                padding: 2,
                destCSS: 'sass/_sprites.sass'
            }
        },
        imagemin: {
            // This will optimize all of our images for the web.
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'images/source/',
                    src: ['**/*.{png,jpg,gif}','*.{png,jpg,gif}' ],
                    dest: 'images/optimized/'
                }]
            }
        },
        sass: {
            // This will compile all of our sass files
            // Additional configuration options can be found at https://github.com/gruntjs/grunt-contrib-sass
            dist: {
                options: {
                    style: 'expanded', // This controls the compiled css and can be changed to nested, compact or compressed
                    sourcemap: 'true',
                    require: 'sass-globbing',
                },
                files: [{
                    expand: true,
                    cwd: 'sass/',
                    src: ['*.sass'],
                    dest: 'css/',
                    ext: '.css'
                }]
            }
        },
    });
    // This is where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-spritesmith');
    // Now that we've loaded the package.json and the node_modules we set the base path
    // for the actual execution of the tasks
    grunt.file.setBase('../')
    // This is where we tell Grunt what to do when we type "grunt" into the terminal.
    // Note. if you'd like to run and of the tasks individually you can do so by typing 'grunt mytaskname' alternatively
    // you can type 'grunt watch' to automatically track your files for changes.
    grunt.registerTask('default', ['uglify','imagemin','sprite','watch','sass']);
};
