=== Block Pattern Explorer ===
Author URI:        https://wwww.nickdiego.com
Contributors:      ndiego, bgardner, wpengine
Tags:              patterns, blocks, block patterns, starter content
Requires at least: 5.8
Tested up to:      5.9
Requires PHP:      7.1
Stable tag:        0.3.0
License:           GPLv2 or later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

An experimental plugin to preview and insert block patterns in the Block Editor.

== Description ==

An experimental plugin to preview and insert block patterns in the Block Editor (Gutenberg).

Please note that no block patterns are included with this plugin. Patterns must be provided by your theme or another plugin. You can also use the patterns provided by WordPress if enabled by your theme.

Furthermore, this plugin should be used in conjunction with the [Gutenberg plugin](https://wordpress.org/plugins/gutenberg/) until WordPress 5.9 is officially released on January 25, 2022.

=== Mission ===

The Block Pattern Explorer is heavily influenced by the work currently being done in the Gutenberg [GitHub repository](https://github.com/WordPress/gutenberg) on pattern previews.

The purpose of this project is to isolate the pattern explorer into a standalone plugin that WordPress users/developers can interact with immediately, provide feedback on, and begin implementing into their own websites. Ideally, this initiative will also help inform the direction of core development.

Once the pattern explorer is fully integrated into WordPress proper, this project will be sunsetted in favor of the core offering.

== Screenshots ==

1. Inserting a pattern from the upcoming Twenty Twenty-Two theme into the Block Editor using the block pattern explorer.

=== Stay Connected ===

Stay up-to-date on the Block Pattern Explorer, and Gutenberg development, using the links below. The plugin is also being built transparently on GitHub, so give it a star and follow along! 😉

* [Follow on Twitter](https://twitter.com/nickmdiego)
* [View on GitHub](https://github.com/wpengine/block-pattern-explorer)
* [Gutenberg plugin](https://wordpress.org/plugins/gutenberg/)
* [Gutenberg on GitHub](https://github.com/WordPress/gutenberg)

== Installation ==

1. You have a couple options:
	* Go to Plugins &rarr; Add New and search for "Block Pattern Explorer". Once found, click "Install".
	* Download the Block Pattern Explorer from WordPress.org and make sure the folder is zipped. Then upload via Plugins &rarr; Add New &rarr; Upload.
2. Activate the plugin through the 'Plugins' menu in WordPress.
3. Once activated, navigate to the Block Editor and you will see the "Insert Pattern" button in header toolbar. See the plugin screenshots for reference.

== Changelog ==

= 0.3.0 - 2022-01-13 =

**Changed**

* Replaced custom search component with core version.
* Updated modal styling to match core pattern explorer.
* Updated screenshots.

**Fixed**

* Fixed API bug causing the pattern explorer to be inaccessible on themes that do not utilize pattern category types.
* Fixed linting and code quality errors.

= 0.2.1 - 2021-11-23 =

**Changed**

* The button used to launch the Pattern Explorer is now disabled while pattern category types are being retrieved from the REST API.
* Updated tooltip on the button used to launch the Pattern Explorer.

= 0.2.0 - 2021-11-22 =

**Added**

* Added support for the experimental block pattern category types.

= 0.1.0 - 2021-11-09 =

Initial release! 🎉
