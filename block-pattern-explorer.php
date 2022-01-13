<?php
/**
 * Plugin Name:        Block Pattern Explorer
 * Description:        An experimental plugin to preview and insert block patterns in the Block Editor.
 * Author:             Nick Diego
 * Author URI:         https://www.nickdiego.com
 * Version:            0.3.0
 * Requires at least:  5.8
 * Requires PHP:       7.1
 * License:            GPL2+
 * License URI:        http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:        block-pattern-explorer
 * Domain Path:        /languages
 *
 * @package Block Pattern Explorer
 */

namespace BlockPatternExplorer;

defined( 'ABSPATH' ) || exit;

define( 'BPE_ABSPATH', dirname( __FILE__ ) . '/' );
define( 'BPE_VERSION', get_file_data( __FILE__, [ 'Version' ] )[0] ); // phpcs:ignore
define( 'BPE_PLUGIN_DIR_URL', plugin_dir_url( __FILE__ ) );

/**
 * Enqueue assets for Block Editor.
 *
 * @since 0.1.0
 */
function enqueue_editor_assets() {

	// Scripts.
	$script_asset = get_asset_file( 'build/block-pattern-explorer-editor' );

	wp_enqueue_script(
		'block-pattern-explorer-editor-scripts',
		BPE_PLUGIN_DIR_URL . 'build/block-pattern-explorer-editor.js',
		array_merge( $script_asset['dependencies'], array( 'wp-api' ) ),
		$script_asset['version'],
		true
	);

	// Styles.
	$style_asset = get_asset_file( 'build/block-pattern-inserter-editor-styles' );

	wp_enqueue_style(
		'block-pattern-explorer-editor-styles',
		BPE_PLUGIN_DIR_URL . 'build/style-block-pattern-explorer-editor-styles.css',
		array(),
		$style_asset['version']
	);
}
add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\enqueue_editor_assets' );

/**
 * Loads the asset file for the given script or style.
 * Returns a default if the asset file is not found.
 *
 * @since 0.1.0
 *
 * @param string $filepath The name of the file without the extension.
 * @return array           The asset file contents.
 */
function get_asset_file( $filepath ) {
	$asset_path = BPE_ABSPATH . $filepath . '.asset.php';

	return file_exists( $asset_path )
		? require_once $asset_path
		: array(
			'dependencies' => array(),
			'version'      => BPE_VERSION,
		);
}

/**
 * Load the plugin language file.
 *
 * @since 0.1.0
 * @return void
 */
function load_textdomain() {
	load_plugin_textdomain( 'block-pattern-explorer', false, BPE_ABSPATH . 'languages' );
}
add_action( 'init', __NAMESPACE__ . '\load_textdomain' );

/**
 * Enqueue the editor scripts translations.
 *
 * @since 0.1.0
 * @return void
 */
function enqueue_script_translations() {
	wp_set_script_translations(
		'block-pattern-explorer-editor-scripts',
		'block-pattern-explorer',
		BPE_ABSPATH . 'languages'
	);
}
add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\enqueue_script_translations' );

// Custom pattern category type implementation.
require_once BPE_ABSPATH . '/includes/add-pattern-category-type-support.php';

// (Experimental) Will be used once Block Editor settings are filterable in core.
// include_once BPE_ABSPATH . '/includes/core/add-pattern-category-type-support.php';
