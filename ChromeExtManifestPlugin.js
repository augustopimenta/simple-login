const fs = require('fs');

function ChromeExtManifestPlugin() {

}

ChromeExtManifestPlugin.prototype.apply = function(compiler) {
    compiler.plugin('emit', (compilation, callback) => {
        const stats = compilation.getStats().toJson();

        const assets = stats.assets.reduce((files, stat) => {
            if (/\.js$/.test(stat.name)) {
                files.js.push(stat.name);
            }
            if (/\.css$/.test(stat.name)) {
                files.css.push(stat.name);
            }
            return files;
        }, {css: [], js: []});

        let manifest = JSON.parse(fs.readFileSync('./src/manifest.json'));

        manifest.background.scripts = assets.js;

        manifest.content_scripts = [
            {
                "matches": ["*://*/*"],
                "css": assets.css,
                "js": ['js/popup.js']
            }
        ];

        const manifestData = JSON.stringify(manifest, null, 4);

        compilation.assets['js/popup.js'] = {
            source: function() {
                return '';
            },
            size: function() {
                return 0;
            }
        };

        compilation.assets['manifest.json'] = {
            source: function() {
                return manifestData;
            },
            size: function() {
                return manifestData.length;
            }
        };

        callback();
    });
};

module.exports = ChromeExtManifestPlugin;