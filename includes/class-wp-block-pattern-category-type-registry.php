<?php
/**
 * Blocks API: WP_Block_Pattern_Category_Type_Registry class
 *
 * @package WordPress
 * @subpackage Blocks
 * @since 6.0.0
 */

/**
 * Class used for interacting with block pattern category types.
 */
final class WP_Block_Pattern_Category_Type_Registry {
	/**
	 * Registered block pattern category types array.
	 *
	 * @since 6.0.0
	 * @var array
	 */
	private $registered_category_types = array();

	/**
	 * Container for the main instance of the class.
	 *
	 * @since 6.0.0
	 * @var WP_Block_Pattern_Category_Type_Registry|null
	 */
	private static $instance = null;

	/**
	 * Registers a pattern category type.
	 *
	 * @since 6.0.0
	 *
	 * @param string $category_type_name       Pattern category type name including namespace.
	 * @param array  $category_type_properties Array containing the properties of the category type: label.
	 * @return bool True if the pattern category type was registered with success and false otherwise.
	 */
	public function register( $category_type_name, $category_type_properties ) {
		if ( ! isset( $category_type_name ) || ! is_string( $category_type_name ) ) {
			_doing_it_wrong(
				__METHOD__,
				__( 'Block pattern category type name must be a string.' ),
				'6.0.0'
			);
			return false;
		}

		$this->registered_category_types[ $category_type_name ] = array_merge(
			array( 'name' => $category_type_name ),
			$category_type_properties
		);

		return true;
	}

	/**
	 * Unregisters a pattern category type.
	 *
	 * @since 6.0.0
	 *
	 * @param string $category_type_name Pattern category type name including namespace.
	 * @return bool True if the pattern category type was unregistered with success and false otherwise.
	 */
	public function unregister( $category_type_name ) {
		if ( ! $this->is_registered( $category_type_name ) ) {
			_doing_it_wrong(
				__METHOD__,
				/* translators: %s: Block pattern categpry type name. */
				sprintf( __( 'Block pattern category type "%s" not found.' ), $category_type_name ),
				'6.0.0'
			);
			return false;
		}

		unset( $this->registered_category_types[ $category_type_name ] );

		return true;
	}

	/**
	 * Retrieves an array containing the properties of a registered pattern category type.
	 *
	 * @since 6.0.0
	 *
	 * @param string $category_type_name Pattern category type name including namespace.
	 * @return array Registered pattern category type properties.
	 */
	public function get_registered( $category_type_name ) {
		if ( ! $this->is_registered( $category_type_name ) ) {
			return null;
		}

		return $this->registered_category_types[ $category_type_name ];
	}

	/**
	 * Retrieves all registered pattern category types.
	 *
	 * @since 6.0.0
	 *
	 * @return array Array of arrays containing the registered pattern category types.
	 */
	public function get_all_registered() {
		return array_values( $this->registered_category_types );
	}

	/**
	 * Checks if a pattern category type is registered.
	 *
	 * @since 6.0.0
	 *
	 * @param string $category_type_name Pattern category name including namespace.
	 * @return bool True if the pattern category type is registered, false otherwise.
	 */
	public function is_registered( $category_type_name ) {
		return isset( $this->registered_category_types[ $category_type_name ] );
	}

	/**
	 * Utility method to retrieve the main instance of the class.
	 *
	 * The instance will be created if it does not exist yet.
	 *
	 * @since 6.0.0
	 *
	 * @return WP_Block_Pattern_Category_Type_Registry The main instance.
	 */
	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}
}

/**
 * Registers a new pattern category type.
 *
 * @since 6.0.0
 *
 * @param string $category_type_name       Pattern category type name including namespace.
 * @param array  $category_type_properties Array containing the properties of the category type.
 * @return bool True if the pattern category type was registered with success and false otherwise.
 */
function register_block_pattern_category_type( $category_type_name, $category_type_properties ) {
	return WP_Block_Pattern_Category_Type_Registry::get_instance()->register( $category_type_name, $category_type_properties );
}

/**
 * Unregisters a pattern category type.
 *
 * @since 6.0.0
 *
 * @param string $category_type_name Pattern category type name including namespace.
 * @return bool True if the pattern category type was unregistered with success and false otherwise.
 */
function unregister_block_pattern_category_type( $category_type_name ) {
	return WP_Block_Pattern_Category_Type_Registry::get_instance()->unregister( $category_type_name );
}
