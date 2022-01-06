<?php
/**
 * Add support for pattern category types using editor settings.
 *
 * (Experimental) This functionality will be used once it's included in core.
 *
 * @package Block Pattern Explorer
 * @since 0.2.0
 */

namespace BlockPatternExplorer\Includes\Core;

use WP_Block_Pattern_Category_Type_Registry;

/**
 * Filter the supported block editor settings and add all registered pattern
 * category types.
 *
 * @param {Array}  $editor_settings      All Block Editor settings.
 * @param {Object} $block_editor_context The current Block Editor context.
 *
 * @return {Array} All Block Editor settings.
 */
function add_block_editor_settings( $editor_settings, $block_editor_context ) {
	$editor_settings['__experimentalBlockPatternCategoryTypes'] = WP_Block_Pattern_Category_Type_Registry::get_instance()->get_all_registered();

	return $editor_settings;
}
add_filter( 'block_editor_settings_all', __NAMESPACE__ . '\add_block_editor_settings', 10, 2 );

// Include the pattern category type registry.
if ( ! class_exists( 'WP_Block_Pattern_Category_Type_Registry' ) ) {
    require_once BPE_ABSPATH . '/includes/class-wp-block-pattern-category-type-registry.php';
}
