<?php
/**
 * Add support for pattern category types using editor settings.
 *
 * @package Block Pattern Explorer
 * @since 0.2.0
 */

namespace BlockPatternExplorer\Includes;

defined( 'ABSPATH' ) || exit;

/**
 * Internal dependencies
 */
use BPE_Pattern_Category_Types_REST_Controller;

/**
 * Function to register our new routes from the controller.
 */
function register_routes() {
	$categories_controller = new BPE_Pattern_Category_Types_REST_Controller();
	$categories_controller->register_routes();
}
add_action( 'rest_api_init', __NAMESPACE__ . '\register_routes' );

/**
 * Include the pattern category type registry.
 */
if ( ! class_exists( 'BPE_Block_Pattern_Category_Types_Registry' ) ) {
	require_once BPE_ABSPATH . '/includes/class-bpe-block-pattern-category-types-registry.php';
}

/**
 * Include our custom REST API controllers.
 */
if ( ! class_exists( 'BPE_Pattern_Category_Types_REST_Controller' ) ) {
	require_once BPE_ABSPATH . 'includes/class-bpe-pattern-category-types-rest-controller.php';
}
