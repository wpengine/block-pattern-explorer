<?php
/**
 * Add support for pattern category types using editor settings.
 *
 * @package Block Pattern Explorer
 * @since 0.2.0
 */

namespace BlockPatternExplorer\Includes\Custom;

defined( 'ABSPATH' ) || exit;

/**
 * Internal dependencies
 */
use Pattern_Category_Type_REST_Controller;

/**
 * Function to register our new routes from the controller.
 */
function register_routes() {
	$categories_controller = new Pattern_Category_Type_REST_Controller();
	$categories_controller->register_routes();
}
add_action( 'rest_api_init', __NAMESPACE__ . '\register_routes' );

/**
 * Include the pattern category type registry.
 */
if ( ! class_exists( 'WP_Block_Pattern_Category_Type_Registry' ) ) {
    require_once BPE_ABSPATH . '/includes/class-wp-block-pattern-category-type-registry.php';
}

/**
 * Include our custom REST API controllers.
 */
if ( ! class_exists( 'Pattern_Category_Type_REST_Controller' ) ) {
	require_once BPE_ABSPATH . 'includes/custom/class-pattern-category-type-rest-controller.php';
}
