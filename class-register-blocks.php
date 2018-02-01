<?php
/**
 * Register plugin blocks
 *
 * @package WP_Lyrics
 */

namespace WP_Lyrics\Gutenblocks;

/**
 * Class Register_Blocks
 *
 * @package WP_Lyrucs\Gutenblocks
 */
class Register_Blocks {

	use \WP_Lyrics\Traits\Singleton;

	/**
	 * Init.
	 */
	protected function init() {

		add_action( 'enqueue_block_editor_assets', array( $this, 'add_lyrics_block' ) );
	}

	/**
	 * Register gutenberg lyrics block
	 */
	public function add_lyrics_block() {
		wp_enqueue_script(
			'gutenberg-lyrics-block',
			WP_LYRICS__DIR_URL . 'block/build/build.js',
			array( 'wp-blocks', 'wp-i18n', 'wp-element' ),
			WP_LYRICS__DIR_URL
		);
	}
}

add_action( 'plugins_loaded', function () {
	Register_Blocks::get_instance();
} );
