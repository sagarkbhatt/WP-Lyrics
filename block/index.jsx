/**
 * External dependencies
 */
const { __ } = wp.i18n;

/**
 * Internal dependencies
 */
import './editor.scss';
import './style.scss';
import Lyrics from './lyrics.jsx';

const { registerBlockType } = wp.blocks;

const blockAttr = {
	content: {
		type: 'text',
		selector: '.song-lyrics__content',
	},
	title: {
		type: 'text',
		selector: '.song-lyrics__title pre',
	},
};

registerBlockType( 'wpblocks/song-lyrics', {
	title: __( 'Song Lyrics' ),
	description: __( 'Get Song Lyrics' ),
	attributes: blockAttr,
	category: 'common',
	edit: Lyrics,
	save: props => {
		const title = props.attributes.title ? props.attributes.title : '';
		const content = props.attributes.content ? props.attributes.content : '';

		return (
			<div className={ props.className ? props.className : '' }>
				<h3 className="song-lyrics__title">{ title }</h3>
				<div className="song-lyrics__content">
					<pre>{ content }</pre>
				</div>
			</div>
		);
	},
} );

