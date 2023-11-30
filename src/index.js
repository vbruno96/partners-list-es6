import { registerBlockType } from '@wordpress/blocks'
import { edit } from './edit'
import { save } from './save'
import json from './block.json'

import './editor.scss'
import './style.scss'

registerBlockType(json.name, {
  edit,
  save
})