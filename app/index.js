'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var YoreactGenerator = module.exports = function YoreactGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(YoreactGenerator, yeoman.generators.Base);

YoreactGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    type: 'confirm',
    name: 'projName',
    message: 'What do you want to call your project?',
    default: true
  },
  {
	name: 'authorName',
	message: 'What is your name?'
  }
  ];

  this.prompt(prompts, function (props) {
	this.projName = props.projName;
	this.authorName = props.authorName; 

    cb();
  }.bind(this));
};

YoreactGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/templates');

  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
};

YoreactGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
