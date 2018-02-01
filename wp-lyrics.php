<?php
/**
 * Plugin Name: WP Lyrics.
 * Description: Gutenblock that fetch lyrics of songs..
 * Author: sagarkbhatt
 * Author URI: https://github.com/sagarkbhatt/
 * Version: 0.1
 * License: GPLv2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain: wp-blocks
 *
 * @package WP_Lyrics
 */

if ( ! defined( 'WP_LYRICS_VERSION' ) ) {
	define( 'WP_LYRICS_VERSION', '0.1' );
}

if ( ! defined( 'WP_LYRICS__DIR_URL' ) ) {
	define( 'WP_LYRICS__DIR_URL', plugin_dir_url( __FILE__ ) );
}

if ( ! defined( 'ABSPATH' ) ) {
	return;
}

require_once __DIR__ . '/trait-singleton.php';
require_once __DIR__ . '/class-register-blocks.php';
