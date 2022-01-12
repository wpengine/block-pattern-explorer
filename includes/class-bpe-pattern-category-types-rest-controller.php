<?php
/**
 * REST API Pattern Category Types Controller
 *
 * @package Block Pattern Explorer
 * @since 0.2.0
 */

defined( 'ABSPATH' ) || exit;

/**
 * Handles requests to block-pattern-explorer/v1/pattern-category-types.
 */
class BPE_Pattern_Category_Types_REST_Controller extends WP_REST_Controller {

	/**
	 * Endpoint namespace.
	 *
	 * @var string
	 */
	protected $namespace = 'block-pattern-explorer/v1';

	/**
	 * Route base.
	 *
	 * @var string
	 */
	protected $rest_base = 'pattern-category-types';

	/**
	 * Register the routes for the objects of the controller.
	 */
	public function register_routes() {

		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base,
			array(
				array(
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_pattern_category_types' ),
					'permission_callback' => '__return_true', // Read only, so anyone can view.
				),
				'schema' => array( $this, 'get_public_item_schema' ),
			)
		);
	}

	/**
	 * Get a collection of items
	 *
	 * @return WP_Error|WP_REST_Response
	 */
	public function get_pattern_category_types() {

		$pattern_category_types = BPE_Block_Pattern_Category_Types_Registry::get_instance()->get_all_registered();

		if ( is_array( $pattern_category_types ) ) {
			// @TODO Possibly add a prepare_settings_for_response function here
			// in the future.
			return new WP_REST_Response( array( 'patternCategoryTypes' => $pattern_category_types ), 200 );
		} else {
			return new WP_Error( '404', __( 'Something went wrong, the category types could not be found.', 'block-pattern-explorer' ), array( 'status' => 404 ) );
		}
	}

	/**
	 * Get the Settings schema, conforming to JSON Schema.
	 *
	 * @return array
	 */
	public function get_item_schema() {
		if ( $this->schema ) {
			// Since WordPress 5.3, the schema can be cached in the $schema property.
			return $this->schema;
		}

		$this->schema = array(
			'$schema' => 'http://json-schema.org/draft-04/schema#',
			'title'   => 'pattern-category-types',
			'type'    => 'array',
			'items'   => array(
				'type'       => 'object',
				'properties' => array(
					'name'  => array(
						'type' => 'string',
					),
					'label' => array(
						'type' => 'string',
					),
				),
			),
		);

		return $this->schema;
	}
}
