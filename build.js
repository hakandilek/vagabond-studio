var fs = require('fs');
var jison = require('jison');

var nomnomlParser = new jison.Parser(fs.readFileSync('nomnoml/nomnoml.jison', { encoding: 'utf8' }));
fs.writeFileSync('nomnoml/nomnoml.jison.js', nomnomlParser.generate({moduleName: 'nomnomlCoreParser'}));

var nomnomlFiles = [
    'lib/dagre.min.js',
    'nomnoml/skanaar.canvas.js',
    'nomnoml/skanaar.util.js',
    'nomnoml/skanaar.vector.js',
    'nomnoml/nomnoml.jison.js',
    'nomnoml/nomnoml.parser.js',
    'nomnoml/nomnoml.layouter.js',
    'nomnoml/nomnoml.renderer.js',
    'nomnoml/nomnoml.js'
];

function concat(files){
    return files.map(function (filename){
        return fs.readFileSync(filename, { encoding: 'utf8' })
    }).join(';\n')
}

function replace(source, token, replacement){
    return source.split(token).join(replacement)
}

var wrapper = fs.readFileSync('bundleWrapper.js', { encoding: 'utf8' })
var bundle = replace(wrapper, '/*{{body}}*/', concat(nomnomlFiles))

fs.writeFileSync('dist/nomnoml.js', bundle)
