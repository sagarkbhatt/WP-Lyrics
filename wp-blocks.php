<?php
/**
 * Plugin Name: WP Blocks.
 * Description: Experiment with gutenberg blocks.
 * Author: sagarkbhatt
 * Author URI: https://github.com/sagarkbhatt/
 * Version: 0.1
 * License: GPLv2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain: wp-blocks
 *
 * @package WP_Blocks
 */

if ( ! defined( 'WP_BLOCKS_VERSION' ) ) {
	define( 'WP_BLOCKS_VERSION', '0.1' );
}

if ( ! defined( 'WP_BLOCKS_VERSION_DIR_URL' ) ) {
	define( 'WP_BLOCKS_VERSION_DIR_URL', plugin_dir_url( __FILE__ ) );
}

if ( ! defined( 'ABSPATH' ) ) {
	return;
}

require_once __DIR__ . '/trait-singleton.php';
