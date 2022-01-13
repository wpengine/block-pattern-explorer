# Block Pattern Explorer

[![License](https://img.shields.io/badge/license-GPL--2.0%2B-green.svg)](https://github.com/wpengine/block-pattern-explorer/blob/master/LICENSE.txt)

![Block Pattern Explorer](https://raw.githubusercontent.com/ndiego/block-pattern-explorer/main/.wordpress-org/screenshot-1.png)

The Block Pattern Explorer is an experimental WordPress plugin based **heavily** on the work currently being done in [Gutenberg](https://github.com/WordPress/gutenberg).

The purpose of this project is to isolate the pattern explorer into a standalone plugin that WordPress users/developers can interact with immediately, provide feedback on, and begin implementing into their own websites. Ideally, this initiative will also help inform the direction of core development.

Once the pattern explorer is fully integrated into WordPress proper, this project will be sunsetted in favor of the core offering.

### Requirements

- WordPress 5.8+
- [Gutenberg](https://github.com/WordPress/gutenberg) plugin (Not required if using WordPress 5.9+)
- PHP 7.1+

### Follow Core Development

Below is a list of current pull requests that are related to the Block Pattern Explorer in Gutenberg.

- https://github.com/WordPress/gutenberg/pull/35006
- https://github.com/WordPress/gutenberg/pull/35773

### Development

1. Set up a local WordPress development environment, we recommend using [Local](https://localwp.com/).
2. In the `wp-content/plugins` folder, clone the GitHub repository: `https://github.com/wpengine/block-pattern-explorer.git`
3. Navigate to the `wp-content/plugins/block-pattern-explorer` folder in the command line.
4. Run `npm install` to install the plugin's dependencies within a `/node_modules/` folder.
5. Run `composer install` to install the additional WordPress composer tools within a `/vendor/` folder.
6. Run `npm run start` to compile and watch source files for changes while developing.

Refer to `package.json` and `composer.json` for additional commands.
