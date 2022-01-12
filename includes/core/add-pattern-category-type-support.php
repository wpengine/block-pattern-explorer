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

use BPE_Block_Pattern_Category_Types_Registry;

/**
 * Filter the supported block editor settings and add all registered pattern
 * category types.
 *
 * @param {Array} $editor_settings All Block Editor settings.
 * @return {Array} All Block Editor settings.
 */
function add_block_editor_settings( $editor_settings ) {
	$editor_settings['__experimentalBlockPatternCategoryTypes'] = BPE_Block_Pattern_Category_Types_Registry::get_instance()->get_all_registered();

	return $editor_settings;
}
add_filter( 'block_editor_settings_all', __NAMESPACE__ . '\add_block_editor_settings', 10, 2 );

// Include the pattern category type registry.
if ( ! class_exists( 'BPE_Block_Pattern_Category_Types_Registry' ) ) {
	require_once BPE_ABSPATH . '/includes/class-bpe-block-pattern-category-types-registry.php';
}
